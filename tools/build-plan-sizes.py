"""Build content/plan-sizes.json - how big each topic actually is.

The revision planner used to budget days by a count of topics, which is only
meaningful if topics are the same size. They are not: notes run 413 to 10779
words and decks 5 to 248 cards. This index gives the planner the real numbers
so it can budget by time instead.

Each entry is [notesWords, flashcards, mcqs], keyed <tab>__<SYSTEM>__<Topic>,
which is the key the planner already builds. Rebuild with:
    python3 tools/build-plan-sizes.py
"""
import json,os,re,glob,html,sys,collections

ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))) if os.path.basename(os.path.dirname(os.path.abspath(__file__)))=='tools' else '.'
os.chdir(ROOT)
W=lambda s: len(re.findall(r'\w+',html.unescape(re.sub('<[^>]+>',' ',s or ''))))

# tab map: which system names belong to which tab, from the app's own tab data
idx=open('index.html',encoding='utf-8').read()
def js_obj(name):
    m=re.search(r'(?:const|var)\s+'+name+r'\s*=\s*(\{)',idx)
    if not m: return None
    i=m.start(1); depth=0
    for j in range(i,len(idx)):
        c=idx[j]
        if c=='{': depth+=1
        elif c=='}':
            depth-=1
            if depth==0: return idx[i:j+1]
    return None

# TAB_OSCE is assembled at runtime from three literals, so read those instead.
TABVARS=[('conditions',['CONDITIONS_SYSTEMS']),('anatomy',['TAB_ANATOMY']),('histology',['TAB_HISTOLOGY']),
         ('signs',['TAB_SIGNS']),('investigations',['TAB_INVESTIGATIONS']),
         ('osce',['TAB_OSCE_EXAM','TAB_OSCE_COMMS','TAB_SKILLS'])]
tabmap={}
for tab,varnames in TABVARS:
    merged={}
    for var in varnames:
        raw=js_obj(var)
        if not raw: print('  (no %s)'%var); continue
        try: d=json.loads(raw)
        except Exception as e: print('  (%s not plain JSON: %s)'%(var,e)); continue
        for k,v in d.items(): merged[k]=v
    if merged: tabmap[tab]={k:(v.get('conditions') or v.get('topics') or []) for k,v in merged.items()}

# --- notes -----------------------------------------------------------------
words={}
for p in glob.glob('content/notes/*.json'):
    try: d=json.load(open(p,encoding='utf-8'))
    except Exception: continue
    for k,v in d.items(): words[k]=W(v)
osce=js_obj('RICH_NOTES_OSCE')
if osce:
    for k,v in json.loads(osce).items(): words['osce::'+k]=W(v)

# --- cards -----------------------------------------------------------------
FC=collections.Counter(); Q=collections.Counter()
for p in glob.glob('content/cards/*.json'):
    try: d=json.load(open(p,encoding='utf-8'))
    except Exception: continue
    for k,v in (d.get('fc') or {}).items(): FC[k]=len(v)
    for k,v in (d.get('q')  or {}).items(): Q[k]=len(v)

out={}
for tab,systems in tabmap.items():
    for sys_,topics in systems.items():
        for t in topics:
            key='%s__%s__%s'%(tab,sys_,t)
            nk=('osce::%s__%s'%(sys_,t)) if tab=='osce' else '%s__%s'%(sys_,t)
            out[key]=[words.get(nk,0),FC.get(key,0),Q.get(key,0)]

# --- pharmacology: class -> subsection, the unit the planner schedules ------
ph=js_obj('PHARMA_SECTIONS')
if ph:
    phd=json.loads(ph)
    phfc=collections.Counter()
    try:
        f=json.load(open('content/cards/pharmacology-flashcards.json',encoding='utf-8'))
        for k,v in (f.get('fc') or {}).items(): phfc[k]=len(v)
    except Exception: pass
    FIELDS=('mechanism','uses','side_effects','contraindications','individual',
            'monitoring','interactions','pearl','dosing','drugs','drug_class')
    for cls,d in phd.items():
        for sub,items in (d.get('subsections') or {}).items():
            n=sum(W(' '.join(str(e.get(f,'')) for f in FIELDS)) for e in items)
            out['pharmacology__%s__%s'%(cls,sub)]=[n,phfc.get('pharmacology__%s__%s'%(cls,sub),0),0]

json.dump(out,open('content/plan-sizes.json','w',encoding='utf-8'),separators=(',',':'),ensure_ascii=False)
per=collections.Counter(k.split('__')[0] for k in out)
print('topics indexed:',len(out),dict(per))
print('file size: %.1f KB'%(os.path.getsize('content/plan-sizes.json')/1024))
missing=[k for k,v in out.items() if not v[0]]
print('topics with no note text found:',len(missing), missing[:4])
