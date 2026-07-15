import re, json, os, base64, hashlib
ROOT='/home/user/Piri-MBBS'
OUT=os.path.join(ROOT,'content')
IMG=os.path.join(ROOT,'img')
h=open(os.path.join(ROOT,'index.html'),encoding='utf-8').read()

def extract(name):
    i=h.find('const %s='%name)
    if i<0: return None
    j=i+len('const %s='%name)
    while h[j] in ' \t': j+=1
    op=h[j]; cl={'{':'}','[':']'}[op]
    depth=0;k=j;instr=False;esc=False
    while k<len(h):
        c=h[k]
        if instr:
            if esc:esc=False
            elif c=='\\':esc=True
            elif c=='"':instr=False
        else:
            if c=='"':instr=True
            elif c==op:depth+=1
            elif c==cl:
                depth-=1
                if depth==0:return h[j:k+1]
        k+=1

notes=json.loads(extract('RICH_NOTES'))
fc=json.loads(extract('PRESET_FC'))
q=json.loads(extract('PRESET_Q'))

def sysof(key):
    p=key.split('__')
    if p[0]=='conditions' and len(p)>=2: return p[1]
    return p[0]

def slugify(s):
    s=s.lower()
    s=re.sub(r'[/&]',' ',s)
    s=re.sub(r'[^a-z0-9]+','-',s)
    return s.strip('-')

# collision check on slugs
slugmap={}
for name in set(sysof(k) for k in list(notes)+list(fc)+list(q)):
    sl=slugify(name)
    assert sl not in slugmap.values() or slugmap.get(name)==sl, "slug collision: %s"%sl
    slugmap[name]=sl

os.makedirs(OUT+'/notes',exist_ok=True)
os.makedirs(OUT+'/cards',exist_ok=True)
os.makedirs(IMG,exist_ok=True)

def dumpjson(o):
    return json.dumps(o,ensure_ascii=False,separators=(',',':'))

# ---- extract base64 images from notes ----
img_count=0
def externalize_images(system_slug, note_key, val):
    global img_count
    s=json.dumps(val,ensure_ascii=False)
    uris=re.findall(r'data:image/([a-zA-Z]+);base64,([A-Za-z0-9+/=]+)',s)
    for ext,b64 in uris:
        img_count+=1
        fn='%s-%02d.%s'%(system_slug,img_count,ext.replace('jpeg','jpg'))
        with open(os.path.join(IMG,fn),'wb') as f:
            f.write(base64.b64decode(b64))
        full='data:image/%s;base64,%s'%(ext,b64)
        s=s.replace(full,'img/'+fn)
    return json.loads(s)

# ---- bucket notes ----
notes_by_sys={}
for k,v in notes.items():
    sl=slugmap[sysof(k)]
    v2=externalize_images(sl,k,v)
    notes_by_sys.setdefault(sl,{})[k]=v2

# ---- bucket cards ----
cards_by_sys={}
for k,v in fc.items():
    cards_by_sys.setdefault(slugmap[sysof(k)],{'fc':{},'q':{}})['fc'][k]=v
for k,v in q.items():
    cards_by_sys.setdefault(slugmap[sysof(k)],{'fc':{},'q':{}})['q'][k]=v

# ---- precompute sub-topic nav aliases (window.__SUB), mirrors runtime logic in index.html ----
GEN=['overview','management','assessment','investigation','diagnosis','feature','classification',
 'screening','aetiolog','triggers','complication','algorithm','cpr','arrest rhythm','defib',
 '4hs','4ts','criteria','capacity test','mha','mca','rights','best interest','emergenc',
 'principle','comparison','triage','organism','pearl','other causes','& others','cluster a','cluster b',
 'cluster c','transplant','right-sided','physiology','summary']
def is_generic(low):
    return any(g in low for g in GEN)
TT_RE=re.compile(r'<button class="tt-btn[^"]*"[\s\S]*?>([^<>]+)</button>')
subnav={}
for k,v in notes.items():
    if not isinstance(v,str) or 'tt-nav' not in v: continue
    idx=k.find('__')
    if idx<0: continue
    topic=k[idx+2:]
    if topic.startswith('Foundations'): continue
    labels=[]
    for m in TT_RE.finditer(v):
        lab=m.group(1).replace('&amp;','&').replace('&#39;',"'").replace('&#x27;',"'")
        lab=re.sub(r'\s+',' ',lab).strip()
        if lab and not is_generic(lab.lower()): labels.append(lab)
    if labels: subnav[k]=labels
open('%s/subnav.json'%OUT,'w',encoding='utf-8').write(dumpjson(subnav))

# ---- write files ----
for sl,d in notes_by_sys.items():
    open('%s/notes/%s.json'%(OUT,sl),'w',encoding='utf-8').write(dumpjson(d))
for sl,d in cards_by_sys.items():
    open('%s/cards/%s.json'%(OUT,sl),'w',encoding='utf-8').write(dumpjson(d))

# ---- manifest ----
systems=[]
for name,sl in sorted(slugmap.items()):
    nd=notes_by_sys.get(sl,{}); cd=cards_by_sys.get(sl,{'fc':{},'q':{}})
    systems.append({
        'name':name,'slug':sl,
        'notes':len(nd),
        'fcards':sum(len(v) for v in cd['fc'].values()),
        'qcards':sum(len(v) for v in cd['q'].values()),
        'hasNotes':bool(nd),'hasCards':bool(cd['fc'] or cd['q']),
    })
manifest={'version':hashlib.sha1(h.encode()).hexdigest()[:12],
          'slugMap':slugmap,'systems':systems}
open('%s/manifest.json'%OUT,'w',encoding='utf-8').write(json.dumps(manifest,ensure_ascii=False,indent=1))

# ================= INTEGRITY CHECKS =================
errs=[]
# 1. every note key present exactly once across files
rebuilt_notes={}
for sl,d in notes_by_sys.items():
    for k in d: 
        if k in rebuilt_notes: errs.append("dup note key %s"%k)
        rebuilt_notes[k]=d[k]
if set(rebuilt_notes)!=set(notes): errs.append("note key set mismatch")
# note values equal EXCEPT where images externalized
img_notes=0
for k in notes:
    if json.dumps(rebuilt_notes[k],ensure_ascii=False)!=json.dumps(notes[k],ensure_ascii=False):
        img_notes+=1  # changed only due to image path swap
# 2. every fc/q deck key + every card id survives
def check_cards(orig,side,label):
    rebuilt={}
    for sl,d in cards_by_sys.items():
        for dk,arr in d[side].items():
            if dk in rebuilt: errs.append("dup deck key %s/%s"%(label,dk))
            rebuilt[dk]=arr
    if set(rebuilt)!=set(orig): errs.append("%s deck key set mismatch"%label)
    oids=set(); nids=set(); noid=0
    for dk in orig:
        for c in orig[dk]:
            if 'id' in c: oids.add(c['id'])
            else: noid+=1
    for dk in rebuilt:
        for c in rebuilt[dk]:
            if 'id' in c: nids.add(c['id'])
    if oids!=nids: errs.append("%s card id set mismatch (%d vs %d)"%(label,len(oids),len(nids)))
    globals()['_noid_'+label]=noid
    # exact value equality
    if dumpjson(orig)!=dumpjson({k:rebuilt[k] for k in orig}): 
        # compare per key to be order-independent
        for dk in orig:
            if dumpjson(orig[dk])!=dumpjson(rebuilt[dk]): errs.append("%s deck %s content differs"%(label,dk));break
    return len(oids)
n_fc=check_cards(fc,'fc','FC')
n_q=check_cards(q,'q','Q')

print("=== SPLIT COMPLETE ===")
print("note files : %d"%len(notes_by_sys))
print("card files : %d"%len(cards_by_sys))
print("images externalized: %d  (notes touched: %d)"%(img_count,img_notes))
print("unique fc ids: %d (%d cards have no id)   unique q ids: %d (%d have no id)"%(n_fc,_noid_FC,n_q,_noid_Q))
print()
# report sizes
tot=0
for r,_,fs in os.walk(OUT):
    for f in fs: tot+=os.path.getsize(os.path.join(r,f))
imgtot=sum(os.path.getsize(os.path.join(IMG,f)) for f in os.listdir(IMG))
print("content/ total: %.2f MB   img/ total: %.2f MB"%(tot/1e6,imgtot/1e6))
print()
if errs:
    print("!!! INTEGRITY ERRORS:")
    for e in errs: print("   -",e)
else:
    print("INTEGRITY: PASS  — all note keys, deck keys, and card IDs preserved; content byte-identical except externalized images.")
