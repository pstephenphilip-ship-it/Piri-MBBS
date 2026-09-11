"""Build content/plan-sizes.json - how big each topic actually is.

The revision planner used to budget days by a count of topics, which is only
meaningful if topics are the same size. They are not: notes run 413 to 10779
words and decks 5 to 248 cards. This index gives the planner the real numbers
so it can budget by time instead.

Each entry is [notesWords, flashcards, mcqs, clusterId], keyed
<tab>__<SYSTEM>__<Topic>, which is the key the planner already builds.

The cluster id groups topics that are actually about the same thing, so the plan
can keep them together: the aortic group (dissection, thoracic and abdominal
aneurysm, pulsatile mass), the adrenal group (Addison's, Conn's, Cushing's), the
thyroid group. Topics are compared on the words their notes use - TF-IDF over
the note text, cosine similarity - clustered greedily within each system, and
any topic left on its own joins whichever group it is closest to. Clustering is
done per system across all tabs, so a sign sits with the condition it points to.

Rebuild with:
    python3 tools/build-plan-sizes.py
"""
import json,os,re,glob,html,sys,collections,math

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
words={}; notes_text={}
for p in glob.glob('content/notes/*.json'):
    try: d=json.load(open(p,encoding='utf-8'))
    except Exception: continue
    for k,v in d.items(): words[k]=W(v); notes_text[k]=v
osce=js_obj('RICH_NOTES_OSCE')
if osce:
    for k,v in json.loads(osce).items(): words['osce::'+k]=W(v); notes_text['osce::'+k]=v

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

# --- cluster topics by what their notes actually talk about ----------------
STOP=set(("the a an and or of to in for with is are be as on at by from that this it its not no if when "
          "then than which who whom whose what how why can may should would could will shall do does did "
          "done have has had been being also more most other others such these those there their them they "
          "he she his her you your we our us i but so because while during within without into onto over "
          "under between among each per via vs versus e g eg ie etc patient patients give given first "
          "second third new one two three").split())
def _toks(s):
    return [w for w in re.findall(r'[a-z][a-z-]{2,}',html.unescape(re.sub('<[^>]+>',' ',s or '')).lower())
            if w not in STOP]

def _vectors(keys,text):
    docs={k:collections.Counter(_toks(text.get(k,''))) for k in keys}
    df=collections.Counter()
    for k in keys: df.update(set(docs[k]))
    N=len(keys); vec={}
    for k in keys:
        v={}; mx=max(docs[k].values()) if docs[k] else 1
        for w,c in docs[k].items():
            if df[w]>=N: continue          # a word in every note separates nothing
            v[w]=(c/mx)*math.log(N/df[w])
        n=math.sqrt(sum(x*x for x in v.values())) or 1.0
        vec[k]={w:x/n for w,x in v.items()}
    return vec

def _cluster(keys,text,thresh=0.15,cap=5):
    keys=list(keys)
    if len(keys)<3: return [keys]
    vec=_vectors(keys,text)
    def sim(a,b):
        va,vb=vec[a],vec[b]
        if len(va)>len(vb): va,vb=vb,va
        return sum(x*vb.get(w,0) for w,x in va.items())
    left=set(keys); groups=[]
    while len(left)>1:
        best=None; bs=-1
        for a in left:
            for b in left:
                if a<b:
                    sc=sim(a,b)
                    if sc>bs: bs=sc; best=(a,b)
        if bs<thresh: break                 # nothing left is related enough to seed a group
        g=list(best); left-=set(g)
        while left and len(g)<cap:
            c=max(left,key=lambda x: max(sim(x,y) for y in g))
            if max(sim(c,y) for y in g)<thresh: break
            g.append(c); left.discard(c)
        groups.append(g)
    for k in sorted(left):                   # stragglers join whatever they are nearest
        if not groups: groups.append([k]); continue
        t=max(range(len(groups)),key=lambda i: max(sim(k,y) for y in groups[i]))
        if len(groups[t])<cap+2: groups[t].append(k)
        else: groups.append([k])
    return groups

# text for every indexed topic, under its planner key
text={}
for key in out:
    tab,rest=key.split('__',1)
    sys_,t=rest.split('__',1)
    nk=('osce::%s__%s'%(sys_,t)) if tab=='osce' else '%s__%s'%(sys_,t)
    text[key]=notes_text.get(nk,'') or ''
bysys=collections.defaultdict(list)
for key in out: bysys[key.split('__',1)[1].split('__',1)[0]].append(key)
cid=0; nclust=0
for sys_,keys in sorted(bysys.items()):
    for g in _cluster(keys,text):
        if not g: continue
        cid+=1; nclust+=1
        for k in g: out[k].append(cid)
for k in out:
    if len(out[k])==3: cid+=1; out[k].append(cid)      # never leave a topic without one
print('clusters:',nclust,'| systems:',len(bysys))

json.dump(out,open('content/plan-sizes.json','w',encoding='utf-8'),separators=(',',':'),ensure_ascii=False)
per=collections.Counter(k.split('__')[0] for k in out)
print('topics indexed:',len(out),dict(per))
print('file size: %.1f KB'%(os.path.getsize('content/plan-sizes.json')/1024))
missing=[k for k,v in out.items() if not v[0]]
print('topics with no note text found:',len(missing), missing[:4])
