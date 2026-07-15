#!/usr/bin/env python3
"""Step 3: turn index.html into a thin shell that loads per-system content on demand.
Slims RICH_NOTES/PRESET_FC/PRESET_Q to {} and rewires the app's loaders to fetch
content/{notes,cards}/<slug>.json lazily. Idempotent-guarded via exact-match asserts."""
import re, sys
P='/home/user/Piri-MBBS/index.html'
h=open(P,encoding='utf-8').read()
orig_len=len(h)

def brace_span(name, s):
    i=s.find('const %s='%name); assert i>=0, 'not found: '+name
    j=i+len('const %s='%name)
    while s[j] in ' \t': j+=1
    op=s[j]; cl={'{':'}','[':']'}[op]; depth=0;k=j;instr=False;esc=False
    while k<len(s):
        c=s[k]
        if instr:
            if esc:esc=False
            elif c=='\\':esc=True
            elif c=='"':instr=False
        else:
            if c=='"':instr=True
            elif c==op:depth+=1
            elif c==cl:
                depth-=1
                if depth==0:return i,k+1
        k+=1
    raise AssertionError('unbalanced: '+name)

LOADER = (
"const RICH_NOTES={};\n"
"/* ---- on-demand content loader (added by tools/wire_shell.py) ---- */\n"
"const CONTENT_BASE='content/';\n"
"const __ensure={};\n"           # memoize the outer promise synchronously, keyed by system NAME
"let __manifestPromise=null, __slugMap={};\n"
"function loadManifest(){\n"
"  if(!__manifestPromise){\n"
"    __manifestPromise=fetch(CONTENT_BASE+'manifest.json').then(function(r){return r.json();})\n"
"      .then(function(mf){ __slugMap=(mf&&mf.slugMap)||{}; return mf; })\n"
"      .catch(function(){ return {systems:[],slugMap:{}}; });\n"
"  }\n"
"  return __manifestPromise;\n"
"}\n"
"function __slugify(s){ return (s||'').toLowerCase().replace(/[\\/&]/g,' ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }\n"
"function ensureSystemLoaded(systemName){\n"
"  if(!systemName) return Promise.resolve();\n"
"  if(__ensure[systemName]) return __ensure[systemName];\n"
"  __ensure[systemName]=loadManifest().then(function(){\n"
"    var slug=__slugMap[systemName]||__slugify(systemName);\n"
"    if(!slug) return;\n"
"    return Promise.all([\n"
"      fetch(CONTENT_BASE+'notes/'+slug+'.json').then(function(r){return r.ok?r.json():null;})\n"
"        .then(function(d){ if(d) Object.assign(RICH_NOTES,d); }),\n"
"      fetch(CONTENT_BASE+'cards/'+slug+'.json').then(function(r){return r.ok?r.json():null;})\n"
"        .then(function(d){ if(d){ Object.assign(PRESET_FC,d.fc||{}); Object.assign(PRESET_Q,d.q||{}); } })\n"
"    ]);\n"
"  }).catch(function(){ delete __ensure[systemName]; });\n"   # allow retry if a fetch failed
"  return __ensure[systemName];\n"
"}\n"
"window.ensureSystemLoaded=ensureSystemLoaded;\n"
"window.loadManifest=loadManifest;\n"
)

# 1) slim RICH_NOTES (multi-line) + inject loader
a,b=brace_span('RICH_NOTES',h)
h=h[:a]+LOADER+h[b:]
# 2) slim PRESET_FC and PRESET_Q (single mega-lines)
for name in ('PRESET_FC','PRESET_Q'):
    a,b=brace_span(name,h)
    h=h[:a]+('const %s={}'%name)+h[b:]

def rep(old,new,label):
    global h
    n=h.count(old)
    assert n==1, 'expected 1 occurrence of [%s], found %d'%(label,n)
    h=h.replace(old,new)

# 3) selectSystem: prefetch on system open (fire-and-forget)
rep('  const st = getState(p); st.activeSystem = name; st.activeTopic = null;',
    '  const st = getState(p); st.activeSystem = name; st.activeTopic = null; ensureSystemLoaded(name);',
    'selectSystem')

# 4) selectTopic: await the active system before rendering the note
rep('function selectTopic(p, name, skipHash) {\n  const st = getState(p); st.activeTopic = name;',
    'async function selectTopic(p, name, skipHash) {\n  const st = getState(p); st.activeTopic = name; await ensureSystemLoaded(st.activeSystem);',
    'selectTopic')

# 5) switchMode: async + await before flashcards/questions load
rep('function switchMode(p, mode, el, skipHash) {',
    'async function switchMode(p, mode, el, skipHash) {',
    'switchMode header')
rep("  if (mode === 'flashcards') loadFCView(p);\n  if (mode === 'questions') loadQView(p);",
    "  { const _st = getState(p); await ensureSystemLoaded(_st.activeSystem); }\n  if (mode === 'flashcards') loadFCView(p);\n  if (mode === 'questions') loadQView(p);",
    'switchMode body')

# 6) homepage stats: derive totals from manifest, __SUB from subnav.json
OLD_STATS = (
"""    <script>
    window.addEventListener('DOMContentLoaded',function(){
      var fc=Object.values(PRESET_FC), q=Object.values(PRESET_Q);
      document.getElementById('stat-conditions').textContent=Object.keys(CONDITIONS_SYSTEMS).reduce(function(s,sys){var m=CONDITIONS_SYSTEMS[sys];return s+((m.conditions||[]).reduce(function(a,t){var subs=(window.__SUB&&window.__SUB[sys+'__'+t])||null;return a+((subs&&subs.length)?subs.length:1);},0));},0);
      document.getElementById('stat-flashcards').textContent=fc.reduce(function(s,a){return s+a.length;},0);
      document.getElementById('stat-questions').textContent=q.reduce(function(s,a){return s+a.length;},0);
      document.getElementById('stat-systems').textContent=Object.keys(CONDITIONS_SYSTEMS).length;
    });
    </script>""")
NEW_STATS = (
"""    <script>
    window.addEventListener('DOMContentLoaded',function(){
      function setTxt(id,v){var e=document.getElementById(id); if(e)e.textContent=v;}
      setTxt('stat-systems', Object.keys(CONDITIONS_SYSTEMS).length);
      Promise.all([
        (window.loadManifest?window.loadManifest():Promise.resolve({systems:[]})),
        fetch('content/subnav.json').then(function(r){return r.ok?r.json():{};}).catch(function(){return {};})
      ]).then(function(res){
        var mf=res[0]||{}, sn=res[1]||{}; window.__SUB=sn;
        var tf=0,tq=0; (mf.systems||[]).forEach(function(s){tf+=s.fcards||0; tq+=s.qcards||0;});
        setTxt('stat-flashcards', tf); setTxt('stat-questions', tq);
        setTxt('stat-conditions', Object.keys(CONDITIONS_SYSTEMS).reduce(function(s,sys){var m=CONDITIONS_SYSTEMS[sys];return s+((m.conditions||[]).reduce(function(a,t){var subs=(sn&&sn[sys+'__'+t])||null;return a+((subs&&subs.length)?subs.length:1);},0));},0));
      });
    });
    </script>""")
rep(OLD_STATS, NEW_STATS, 'stats script')

# 7) __SUB builder: fetch precomputed subnav.json instead of scanning RICH_NOTES
OLD_SUB = (
"""  try{
    if(typeof RICH_NOTES!=='undefined'){
      Object.keys(RICH_NOTES).forEach(function(key){
        var v=RICH_NOTES[key]; if(!v || v.indexOf('tt-nav')<0) return;
        var idx=key.indexOf('__'); if(idx<0) return;
        var topic=key.slice(idx+2);
        if(topic.indexOf('Foundations')===0) return;          // skip physiology foundations
        var labels=[], re=/<button class="tt-btn[^"]*"[\\s\\S]*?>([^<>]+)<\\/button>/g, m;
        while((m=re.exec(v))){
          var lab=m[1].replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/\\s+/g,' ').trim();
          if(lab && !isGeneric(lab.toLowerCase())) labels.push(lab);
        }
        if(labels.length) window.__SUB[key]=labels;
      });
    }
  }catch(e){}""")
NEW_SUB = (
"""  try{ fetch('content/subnav.json').then(function(r){return r.ok?r.json():null;}).then(function(sn){ if(sn) window.__SUB=sn; }).catch(function(){}); }catch(e){}""")
rep(OLD_SUB, NEW_SUB, '__SUB builder')

# 8) SRS review overlay: load systems for due cards before building the card map
rep('  function cardMap(){',
    """  function ensureDueSystems(){
    try{ var due=dueList(), names={};
      due.forEach(function(sid){ var pk=sid.split('::')[0]; var parts=pk.split('__'); if(parts.length>=3 && parts[0]==='conditions') names[parts[1]]=1; });
      return Promise.all(Object.keys(names).map(function(n){ return window.ensureSystemLoaded?window.ensureSystemLoaded(n):Promise.resolve(); }));
    }catch(e){ return Promise.resolve(); }
  }
  function cardMap(){""",
    'ensureDueSystems inject')
rep('  function renderSummary(){\n    var due=dueList(), map=cardMap();',
    '  async function renderSummary(){\n    await ensureDueSystems();\n    var due=dueList(), map=cardMap();',
    'renderSummary')
rep('  function startSession(){\n    var due=dueList(), map=cardMap();',
    '  async function startSession(){\n    await ensureDueSystems();\n    var due=dueList(), map=cardMap();',
    'startSession')

open(P,'w',encoding='utf-8').write(h)
print('OK  %d -> %d bytes  (%.2f MB removed)'%(orig_len,len(h),(orig_len-len(h))/1e6))
