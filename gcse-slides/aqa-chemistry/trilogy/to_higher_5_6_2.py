# Convert the AQA Trilogy 5.6.2 Foundation deck into a Higher deck, keeping its design.
import copy, sys, re
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.ns import qn
from lxml import etree

SRC, OUT = sys.argv[1], sys.argv[2]
prs = Presentation(SRC)
S = list(prs.slides)
NAVY, VIOLET, MID, PANEL, LIGHT, INK, GREY, ORANGE, RED, CREAM, WHITE, LILAC = '2C1B47', '6A3FA0', '4A2E7A', 'F3EDFA', 'E8DDF5', '1F1B2E', '635C73', 'F2A541', 'C64550', 'FFF4E2', 'FFFFFF', 'C29FE3'
BLUE = '2F6DB5'

# ---------------- helpers: text ----------------
def runs_of(shape):
    return shape._element.findall('.//' + qn('a:r'))

def rtext(r):
    return r.find(qn('a:t')).text or ''

def set_rtext(r, t):
    r.find(qn('a:t')).text = t

def replace_run(slide, prefix, new, count=1):
    """Replace the text of the first run(s) whose text starts with prefix."""
    n = 0
    for sh in slide.shapes:
        if not sh.has_text_frame:
            continue
        for r in runs_of(sh):
            if rtext(r).startswith(prefix):
                set_rtext(r, new); n += 1
                if n >= count:
                    return
    assert n, f'run not found: {prefix!r}'

def sub_all(old, new):
    for sl in prs.slides:
        for sh in sl.shapes:
            if sh.has_text_frame:
                for r in runs_of(sh):
                    if old in rtext(r):
                        set_rtext(r, rtext(r).replace(old, new))

def shape_by_id(slide, sid):
    for sh in slide.shapes:
        if sh.shape_id == sid:
            return sh
    raise KeyError(sid)

def set_notes(slide, text):
    slide.notes_slide.notes_text_frame.text = text

def rebuild(shape, paras):
    """paras: list of lists of (text, template_run_index_in_original). Keeps paragraph/run formatting from the original."""
    tx = shape._element.find(qn('p:txBody'))
    ps = tx.findall(qn('a:p'))
    tmpl_runs = [copy.deepcopy(r) for r in tx.iter(qn('a:r'))]
    tmpl_p = copy.deepcopy(ps[0])
    for p in ps:
        tx.remove(p)
    for para in paras:
        p = copy.deepcopy(tmpl_p)
        for r in p.findall(qn('a:r')):
            p.remove(r)
        end = p.find(qn('a:endParaRPr'))
        for text, k in para:
            r = copy.deepcopy(tmpl_runs[k])
            r.find(qn('a:t')).text = text
            if end is not None:
                end.addprevious(r)
            else:
                p.append(r)
        tx.append(p)

# ---------------- helpers: drawing ----------------
def rgb(h):
    return RGBColor.from_string(h)

def rect(sl, x, y, w, h, fill, line=None, rnd=False, lw=1.0):
    s = sl.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if rnd else MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    if rnd:
        s.adjustments[0] = 0.08
    if fill:
        s.fill.solid(); s.fill.fore_color.rgb = rgb(fill)
    else:
        s.fill.background()
    if line:
        s.line.color.rgb = rgb(line); s.line.width = Pt(lw)
    else:
        s.line.fill.background()
    s.shadow.inherit = False
    return s

def oval(sl, cx, cy, d, fill, line=None, lw=1.0):
    s = sl.shapes.add_shape(MSO_SHAPE.OVAL, Inches(cx - d / 2), Inches(cy - d / 2), Inches(d), Inches(d))
    s.fill.solid(); s.fill.fore_color.rgb = rgb(fill)
    if line:
        s.line.color.rgb = rgb(line); s.line.width = Pt(lw)
    else:
        s.line.fill.background()
    s.shadow.inherit = False
    return s

def text(sl, x, y, w, h, parts, size=12, color=INK, bold=False, align='c', anchor='m', italic=False):
    """parts: str, or list of paragraphs; each paragraph a str or list of (text, {bold,color,size,italic})."""
    tb = sl.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = {'m': MSO_ANCHOR.MIDDLE, 't': MSO_ANCHOR.TOP, 'b': MSO_ANCHOR.BOTTOM}[anchor]
    if isinstance(parts, str):
        parts = [parts]
    for i, para in enumerate(parts):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = {'c': PP_ALIGN.CENTER, 'l': PP_ALIGN.LEFT, 'r': PP_ALIGN.RIGHT}[align]
        segs = [(para, {})] if isinstance(para, str) else para
        for t, o in segs:
            r = p.add_run(); r.text = t
            f = r.font; f.name = 'Calibri'; f.size = Pt(o.get('size', size)); f.bold = o.get('bold', bold); f.italic = o.get('italic', italic)
            f.color.rgb = rgb(o.get('color', color))
    return tb

def arrow(sl, x1, y1, x2, y2, color=NAVY, w=2.0, both=False):
    c = sl.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
    c.line.color.rgb = rgb(color); c.line.width = Pt(w)
    ln = c.line._get_or_add_ln()
    t = etree.SubElement(ln, qn('a:tailEnd')); t.set('type', 'triangle')
    if both:
        h = etree.SubElement(ln, qn('a:headEnd')); h.set('type', 'triangle')
    return c

def molecule(sl, cx, cy, kind, k=1.0):
    """small particle pictures: N2, H2, NH3"""
    if kind == 'N2':
        oval(sl, cx - 0.09 * k, cy, 0.2 * k, '4C6FD0', '2C3F80'); oval(sl, cx + 0.09 * k, cy, 0.2 * k, '4C6FD0', '2C3F80')
    elif kind == 'H2':
        oval(sl, cx - 0.06 * k, cy, 0.14 * k, WHITE, '8A8F99'); oval(sl, cx + 0.06 * k, cy, 0.14 * k, WHITE, '8A8F99')
    elif kind == 'NH3':
        for dx, dy in ((-0.13, 0.1), (0.13, 0.1), (0, -0.15)):
            oval(sl, cx + dx * k, cy + dy * k, 0.12 * k, WHITE, '8A8F99')
        oval(sl, cx, cy, 0.22 * k, '4C6FD0', '2C3F80')

# ---------------- helpers: slides ----------------
def dup(src, keep_ids=None):
    new = prs.slides.add_slide(src.slide_layout)
    for sh in list(new.shapes):
        sh._element.getparent().remove(sh._element)
    tree = new.shapes._spTree
    for el in src.shapes._spTree:
        if el.tag in (qn('p:sp'), qn('p:cxnSp'), qn('p:grpSp')):
            cNvPr = el.find('.//' + qn('p:cNvPr'))
            sid = int(cNvPr.get('id'))
            if keep_ids is None or sid in keep_ids:
                tree.append(copy.deepcopy(el))
    bg = src._element.find(qn('p:cSld')).find(qn('p:bg'))
    if bg is not None:
        new._element.find(qn('p:cSld')).insert(0, copy.deepcopy(bg))
    return new

def move(slide, index):
    lst = prs.slides._sldIdLst
    ids = list(lst)
    for el in ids:
        if el.get('id') == str(slide.slide_id):
            lst.remove(el); lst.insert(index, el); return

def content_slide(title, sub, caption, card, qc, page, notes):
    base = S[12]  # equilibrium content slide
    sl = dup(base, keep_ids={2, 3, 4, 5, 95, 96, 97, 98, 99, 100, 102, 103})
    replace_run(sl, 'Equilibrium: When the Rates', title)
    replace_run(sl, 'Specification 5.6.2.3', sub)
    replace_run(sl, 'forward and reverse rates in a closed', caption)
    # card: list of (kind, text) kind 'h' heading, 'b' body
    rebuild(shape_by_id(sl, 97), [[(t, 0 if k == 'h' else 1)] for k, t in card])
    replace_run(sl, 'At equilibrium, how does the rate', qc)
    replace_run(sl, '5.6.2.3', page)
    set_notes(sl, notes)
    return sl

def hint_pill(sl):
    rect(sl, 10.95, 0.32, 1.85, 0.42, RED, None, True)
    text(sl, 10.95, 0.32, 1.85, 0.42, 'HIGHER TIER', 11, WHITE, True)

# ======================= 1. relabel the whole deck =======================
sub_all('Trilogy (Foundation)', 'Trilogy (Higher)')
replace_run(S[0], 'AQA GCSE COMBINED SCIENCE: TRILOGY', 'AQA GCSE COMBINED SCIENCE: TRILOGY  •  HIGHER')
sub_all('For Foundation, this deck covers 5.6.2.1 to 5.6.2.3.', 'For Higher, this deck covers all of 5.6.2.1 to 5.6.2.7, including Le Chatelier’s principle.')

# ======================= 2. objectives =======================
replace_run(S[1], 'Know which parts of 5.6.2', 'Predict, using Le Chatelier’s principle, how changing concentration, temperature or pressure moves an equilibrium (HT)')

# ======================= 3. where this fits =======================
for sh in S[2].shapes:
    if sh.has_text_frame:
        for r in runs_of(sh):
            t = rtext(r)
            if t.strip() == 'Foundation focus':
                set_rtext(r, t.replace('Foundation focus', 'Higher focus'))
            elif 'Changing conditions at equilibrium' in t:
                set_rtext(r, '• Le Chatelier: predict how concentration, temperature and pressure change the position of equilibrium (5.6.2.4 – 5.6.2.7)')
            elif 'Equilibrium = EQUAL RATES' in t or 'EQUAL RATES, not equal amounts' in t:
                set_rtext(r, '• Equilibrium = EQUAL RATES, not equal amounts')

# ======================= 4. what's in 5.6.2 =======================
s4 = S[3]
replace_run(s4, "What's in 5.6.2?", "What's in 5.6.2? Core Ideas and Higher Tier")
replace_run(s4, 'FOUNDATION', 'ALL TIERS — the core ideas')
replace_run(s4, 'HIGHER TIER ONLY', 'HIGHER TIER — on YOUR paper')
replace_run(s4, 'The rest of this deck covers', 'Slides 5–15 cover these core ideas: what reversible reactions are, their energy changes, and what equilibrium means.')
replace_run(s4, 'Predicting how the position', 'Slides 16–21: predicting how the position of equilibrium moves when you change concentration, temperature or pressure.')
replace_run(s4, 'Is the effect of changing pressure', 'Is the effect of changing pressure on an equilibrium on the Higher paper — yes or no?')
set_notes(s4, 'Quick check answer: yes — 5.6.2.7 (pressure) is Higher Tier content, so it is on the Higher paper. Teacher note: in the Trilogy specification (8464), 5.6.2.4 The effect of changing conditions on equilibrium, 5.6.2.5 concentration, 5.6.2.6 temperature and 5.6.2.7 pressure are marked (HT only). This Higher deck teaches all of 5.6.2.1 – 5.6.2.7. Higher students are expected to make qualitative predictions using Le Chatelier’s principle; no Kc or calculations are required.')

set_notes(S[11], 'Quick check answer: a closed system. Teacher note: the Haber process (N₂ + 3H₂ ⇌ 2NH₃, forward reaction exothermic) is used again on slides 16–21 to show how temperature, pressure and concentration change the position of equilibrium (HT).')

# ======================= 5. new Higher slides =======================
NEW = []
# --- A: Le Chatelier's principle
a = content_slide("Changing Conditions: Le Chatelier's Principle", 'Specification 5.6.2.4  •  Higher Tier', 'a system at equilibrium responds to oppose a change',
    [('h', "LE CHATELIER'S PRINCIPLE:"), ('b', 'If a system at equilibrium is subjected to a change in conditions, the system responds to COUNTERACT the change.'), ('b', ' '),
     ('h', 'POSITION OF EQUILIBRIUM:'), ('b', 'The relative amounts of reactants and products at equilibrium.'),
     ('b', '• Shifts to the RIGHT → MORE PRODUCTS'), ('b', '• Shifts to the LEFT → MORE REACTANTS'), ('b', ' '),
     ('h', 'THE THREE CONDITIONS:'), ('b', 'Concentration (5.6.2.5)  •  Temperature (5.6.2.6)  •  Pressure (5.6.2.7)'),
     ('b', 'A catalyst does NOT change the position — it only means equilibrium is reached faster.')],
    'If the position of equilibrium shifts to the RIGHT, what happens to the amount of products?', '5.6.2.4',
    'Quick check answer: the amount of products increases (and the amount of reactants decreases). Teacher note: AQA wording for 5.6.2.4: "If a system is at equilibrium and a change is made to any of the conditions, then the system responds to counteract the change." Students should use this to make qualitative predictions only. The catalyst point links to 5.6.1 (rates): a catalyst speeds up the forward and reverse reactions equally.')
hint_pill(a)
steps = [('SYSTEM AT EQUILIBRIUM', 'forward rate = reverse rate', VIOLET), ('CHANGE A CONDITION', 'concentration, temperature or pressure', ORANGE),
         ('SYSTEM RESPONDS', 'to COUNTERACT (oppose) the change', RED), ('NEW EQUILIBRIUM', 'different relative amounts', NAVY)]
for i, (h, sbt, col) in enumerate(steps):
    y = 1.6 + i * 0.92
    rect(a, 1.3, y, 5.0, 0.7, col, None, True)
    text(a, 1.3, y + 0.04, 5.0, 0.34, h, 13, WHITE, True)
    text(a, 1.3, y + 0.36, 5.0, 0.3, sbt, 11, WHITE, False, italic=True)
    if i < 3:
        arrow(a, 3.8, y + 0.71, 3.8, y + 0.91, NAVY, 2)
NEW.append(a)

# --- B: concentration
b = content_slide('The Effect of Changing Concentration', 'Specification 5.6.2.5  •  Higher Tier', 'the equilibrium shifts to use up what is added, or replace what is removed',
    [('h', 'INCREASE the concentration of a REACTANT:'), ('b', 'More products are formed until equilibrium is reached again (shifts RIGHT).'), ('b', ' '),
     ('h', 'INCREASE the concentration of a PRODUCT:'), ('b', 'More reactants are formed (shifts LEFT).'), ('b', ' '),
     ('h', 'REMOVE a product:'), ('b', 'More of it is made to replace it (shifts RIGHT).'), ('b', ' '),
     ('h', 'EXAMPLE:'), ('b', 'N₂ + 3H₂ ⇌ 2NH₃.  Adding more N₂, or removing NH₃ as it forms, means MORE ammonia is made.')],
    'Ammonia is removed from N₂ + 3H₂ ⇌ 2NH₃ as it forms. Which way does the equilibrium shift?', '5.6.2.5',
    'Quick check answer: to the right — more N₂ and H₂ react to replace the ammonia that was removed. Teacher note: AQA 5.6.2.5: "If the concentration of one of the reactants or products is changed, the system is no longer at equilibrium and the concentrations of all the substances will change until equilibrium is reached again. If the concentration of a reactant is increased, more products will be formed until equilibrium is reached again. If the concentration of a product is decreased, more reactants will react until equilibrium is reached again."')
hint_pill(b)
text(b, 0.7, 1.55, 6.2, 0.5, [[('A + B', {'color': VIOLET}), ('  ⇌  ', {'color': NAVY}), ('C + D', {'color': RED})]], 24, INK, True)
rows = [('ADD more A', 'shifts RIGHT', 'more C + D', ORANGE), ('REMOVE C', 'shifts RIGHT', 'more C + D made', ORANGE), ('ADD more C', 'shifts LEFT', 'more A + B', BLUE)]
for i, (chg, sh_, res, col) in enumerate(rows):
    y = 2.25 + i * 0.85
    rect(b, 0.75, y, 2.0, 0.62, LIGHT, VIOLET, True)
    text(b, 0.75, y, 2.0, 0.62, chg, 12.5, INK, True)
    arrow(b, 2.85, y + 0.31, 3.6, y + 0.31, NAVY, 2)
    rect(b, 3.7, y, 3.15, 0.62, col, None, True)
    text(b, 3.7, y, 3.15, 0.62, [[(sh_ + ': ', {'bold': True}), (res, {})]], 12.5, WHITE)
NEW.append(b)

# --- C: temperature
c = content_slide('The Effect of Changing Temperature', 'Specification 5.6.2.6  •  Higher Tier', 'sealed tubes of NO₂ / N₂O₄; the forward reaction is exothermic',
    [('h', 'INCREASE the temperature:'), ('b', 'Equilibrium shifts in the ENDOTHERMIC direction (to take in the extra energy). The amount of products of the exothermic reaction DECREASES.'), ('b', ' '),
     ('h', 'DECREASE the temperature:'), ('b', 'Equilibrium shifts in the EXOTHERMIC direction (to give out energy). The amount of products of the exothermic reaction INCREASES.'), ('b', ' '),
     ('h', 'METHOD:'), ('b', '1. Is the FORWARD reaction exo or endo?  2. Hotter → endothermic way.  Colder → exothermic way.'), ('b', ' '),
     ('b', 'Haber: forward is exothermic, so a LOWER temperature gives MORE ammonia.')],
    'A forward reaction is exothermic. The temperature is raised. Does the amount of product go up or down?', '5.6.2.6',
    'Quick check answer: down — raising the temperature shifts the equilibrium in the endothermic (reverse) direction. Teacher note: AQA 5.6.2.6: "If the temperature of a system at equilibrium is increased: the relative amount of products at equilibrium increases for an endothermic reaction; the relative amount of products at equilibrium decreases for an exothermic reaction. If the temperature is decreased the opposite happens." Demonstration: sealed NO₂/N₂O₄ tubes in hot water and ice (teacher demo; NO₂ is toxic — sealed tubes only).')
hint_pill(c)
text(c, 0.7, 1.5, 6.2, 0.45, [[('2NO₂', {'color': '8B4A1A'}), (' (brown)  ⇌  ', {}), ('N₂O₄', {'color': GREY}), (' (colourless)', {})]], 16, INK, True)
text(c, 0.7, 1.92, 6.2, 0.3, 'forward reaction: EXOTHERMIC', 12, RED, True)
for i, (bx, water, gas, t1, t2, col) in enumerate([(1.0, 'F9C9A8', '8B3A12', 'HOT WATER', 'darker brown: shifts LEFT', RED), (4.1, 'CFE4F7', 'EBC99A', 'ICE BATH', 'paler: shifts RIGHT', BLUE)]):
    rect(c, bx, 3.0, 2.2, 1.35, water, '6B7385')
    oval(c, bx + 1.1, 3.35, 0.95, gas, '4A4F5A', 1.25)
    rect(c, bx + 0.98, 2.35, 0.24, 0.55, gas, '4A4F5A')
    rect(c, bx + 0.94, 2.28, 0.32, 0.12, '5A3E2B')
    text(c, bx, 4.4, 2.2, 0.3, t1, 12, INK, True)
    text(c, bx - 0.2, 4.7, 2.6, 0.3, t2, 11.5, col, True)
NEW.append(c)

# --- D: pressure
d = content_slide('The Effect of Changing Pressure', 'Specification 5.6.2.7  •  Higher Tier', 'count the gas molecules on each side of the balanced equation',
    [('h', 'ONLY for reactions involving GASES:'), ('b', 'Count the molecules of gas on each side of the balanced equation.'), ('b', ' '),
     ('h', 'INCREASE the pressure:'), ('b', 'Equilibrium shifts to the side with FEWER molecules of gas (fewer molecules take up less space).'), ('b', ' '),
     ('h', 'DECREASE the pressure:'), ('b', 'Equilibrium shifts to the side with MORE molecules of gas.'), ('b', ' '),
     ('h', 'SAME number each side:'), ('b', 'Changing the pressure has NO effect on the position, e.g. H₂ + I₂ ⇌ 2HI (2 : 2).')],
    'In N₂ + 3H₂ ⇌ 2NH₃, how many gas molecules are on each side? Which side does high pressure favour?', '5.6.2.7',
    'Quick check answer: 4 on the left (1 + 3), 2 on the right; high pressure favours the right (fewer molecules), so more ammonia. Teacher note: AQA 5.6.2.7: "For gaseous reactions at equilibrium: an increase in pressure causes the equilibrium position to shift towards the side with the smaller number of molecules as shown by the symbol equation for that reaction; a decrease in pressure causes the equilibrium position to shift towards the side with the larger number of molecules." Molecule counts checked: N₂ + 3H₂ (4) → 2NH₃ (2); H₂ + I₂ (2) → 2HI (2).')
hint_pill(d)
rect(d, 0.75, 1.6, 2.65, 2.3, WHITE, '6B7385')
rect(d, 4.15, 1.6, 2.65, 2.3, WHITE, '6B7385')
molecule(d, 1.4, 2.25, 'N2', 1.7)
for (mx, my) in ((2.75, 2.15), (1.45, 3.3), (2.8, 3.35)):
    molecule(d, mx, my, 'H2', 1.7)
for (mx, my) in ((4.85, 2.4), (6.05, 3.25)):
    molecule(d, mx, my, 'NH3', 1.7)
text(d, 0.75, 3.95, 2.65, 0.3, 'N₂ + 3H₂: 4 molecules', 12, INK, True)
text(d, 4.15, 3.95, 2.65, 0.3, '2NH₃: 2 molecules', 12, INK, True)
arrow(d, 3.5, 2.5, 4.05, 2.5, RED, 2.5)
text(d, 3.42, 1.95, 0.72, 0.5, 'high pressure', 9, RED, True)
arrow(d, 4.05, 3.1, 3.5, 3.1, BLUE, 2.5)
text(d, 3.42, 3.15, 0.72, 0.5, 'low pressure', 9, BLUE, True)
text(d, 0.75, 4.35, 6.1, 0.35, 'Higher pressure → fewer molecules → MORE ammonia', 13, NAVY, True)
NEW.append(d)

# --- E: summary / worked example
e = content_slide('Predicting the Effect: Worked Example', 'Specification 5.6.2.4 – 5.6.2.7  •  Higher Tier', 'N₂ + 3H₂ ⇌ 2NH₃; forward reaction exothermic; 4 gas molecules → 2',
    [('h', 'WORKED EXAMPLE:'), ('b', '2SO₂(g) + O₂(g) ⇌ 2SO₃(g). The forward reaction is exothermic.'), ('b', ' '),
     ('h', '(a) The pressure is increased.'), ('b', 'Left: 3 molecules; right: 2. Shifts to the side with FEWER molecules: RIGHT. MORE SO₃.'), ('b', ' '),
     ('h', '(b) The temperature is increased.'), ('b', 'Shifts in the ENDOTHERMIC direction: LEFT (reverse). LESS SO₃.'), ('b', ' '),
     ('h', 'EXAM TIP:'), ('b', 'Always say WHICH WAY it shifts AND what happens to the AMOUNT of product, then give the REASON.')],
    'For 2SO₂ + O₂ ⇌ 2SO₃, what happens to the amount of SO₃ if more O₂ is added?', 'HT Summary',
    'Quick check answer: it increases — adding a reactant shifts the equilibrium to the right. Teacher note: molecule counts checked: 2SO₂ + O₂ = 3 gas molecules; 2SO₃ = 2. The table summarises the Haber process predictions; the conditions actually used (450 °C, 200 atm) are not required for Trilogy 5.6.2.')
hint_pill(e)
hdr = [('Change', 1.55), ('Shifts…', 1.95), ('Amount of NH₃', 2.45)]
x0, y0 = 0.7, 1.55
xx = x0
for h_, w_ in hdr:
    rect(e, xx, y0, w_, 0.42, NAVY)
    text(e, xx, y0, w_, 0.42, h_, 11.5, WHITE, True)
    xx += w_
data = [('Raise temperature', 'LEFT (endothermic way)', 'decreases', RED), ('Lower temperature', 'RIGHT (exothermic way)', 'increases', BLUE),
        ('Raise pressure', 'RIGHT (fewer molecules)', 'increases', BLUE), ('Lower pressure', 'LEFT (more molecules)', 'decreases', RED),
        ('Add more N₂ or H₂', 'RIGHT', 'increases', BLUE), ('Remove NH₃', 'RIGHT', 'increases', BLUE), ('Add a catalyst', 'no shift', 'no change (faster)', GREY)]
for i, (a1, a2, a3, col) in enumerate(data):
    y = y0 + 0.42 + i * 0.46
    xx = x0
    for j, (val, (h_, w_)) in enumerate(zip((a1, a2, a3), hdr)):
        rect(e, xx, y, w_, 0.46, WHITE if i % 2 else LIGHT, 'D9CCEB', lw=0.5)
        text(e, xx + 0.06, y, w_ - 0.12, 0.46, val, 11, col if j == 2 else INK, j != 1, 'l' if j < 2 else 'c')
        xx += w_
NEW.append(e)

# --- F: HT exam practice (duplicate the equilibrium exam-practice slide)
f = dup(S[14])
replace_run(f, 'Equilibrium — Exam Practice', 'Changing Conditions — Exam Practice')
replace_run(f, 'Specification 5.6.2.3', 'Specification 5.6.2.4 – 5.6.2.7  •  Higher Tier')
qs = [(8, 'Q10.  State Le Chatelier’s principle.   ', '[1 mark]'),
      (12, 'Q11.  2NO₂ (brown) ⇌ N₂O₄ (colourless). The forward reaction is exothermic. A sealed tube of the equilibrium mixture is put in ice. Predict and explain the colour change.   ', '[3 marks]'),
      (16, 'Q12.  Explain the effect of increasing the pressure on the amount of ammonia in N₂ + 3H₂ ⇌ 2NH₃.   ', '[2 marks]')]
for sid, q, m in qs:
    sh = shape_by_id(f, sid)
    rs = runs_of(sh)
    set_rtext(rs[0], q)
    if len(rs) > 1:
        set_rtext(rs[-1], m)
        for r in rs[1:-1]:
            set_rtext(r, '')
    else:
        set_rtext(rs[0], q + m)
replace_run(f, '5.6.2.3 Recap', 'HT Recap')
set_notes(f, 'Q10: if a system at equilibrium is subjected to a change in conditions (1), the system responds to counteract the change (1 mark total for a full statement). Q11: the mixture becomes paler / less brown (1); lowering the temperature shifts the equilibrium in the exothermic direction (1); the forward reaction is exothermic so more (colourless) N₂O₄ forms / less brown NO₂ (1). Q12: the amount of ammonia increases / equilibrium shifts right (1); the right-hand side has fewer gas molecules (2 compared with 4) (1).')
hint_pill(f)
NEW.append(f)

for i, sl in enumerate(NEW):
    move(sl, 15 + i)   # after slide 15 (index 14)

# ======================= 6. key words =======================
kw = S[15]
replace_run(kw, 'Higher Tier only', 'Le Chatelier’s principle (HT)')
replace_run(kw, '5.6.2.4 – 5.6.2.7: effect of changing', 'A change in conditions shifts the equilibrium to counteract it (concentration, temperature, pressure)')

# ======================= 7. full question =======================
fq = S[16]
replace_run(fq, 'Describe what the student sees when water is added', 'HT  For N₂ + 3H₂ ⇌ 2NH₃, explain the effect of increasing the pressure on the amount of ammonia.  ')
replace_run(fq, 'Give one use of anhydrous copper sulfate', 'HT  In (d), the forward reaction is exothermic. Predict the effect of raising the temperature on the amount of ammonia.  ')
set_notes(fq, 'Total 14 marks. (a) the reaction is reversible / can go in both directions / the products can react to form the original reactants (1). (b) the gases (ammonia and hydrogen chloride) move up to the cooler part of the tube (1); where they react to re-form (solid) ammonium chloride / the reverse reaction happens on cooling (1). (c) it is exothermic / energy is given out (1); the same amount of energy is transferred (as is taken in when it breaks down) (1). (d) HT: the amount of ammonia increases / equilibrium shifts to the right (1); the right-hand side has fewer molecules of gas (2 compared with 4) (1). (e) HT: the amount of ammonia decreases / equilibrium shifts left (in the endothermic direction) (1). (f) apparatus / a container that prevents the escape of reactants and products (1). (g) the forward and reverse reactions are both still happening (1); at the same rate (1); so the amounts of reactants and products stay constant (1). (h) no / the student is not correct (0 marks alone); at equilibrium the RATES of the forward and reverse reactions are equal (1); the amounts stay constant but are not (usually) equal (1). Mark total check: 1+2+2+2+1+1+3+2 = 14.')

# ======================= 8. homework =======================
hw = S[18]
replace_run(hw, 'Complete the equation with the symbol', 'HT  State Le Chatelier’s principle.  ')
replace_run(hw, 'Describe what you would see when blue hydrated', 'HT  2SO₂ + O₂ ⇌ 2SO₃. The forward reaction is exothermic. Predict and explain the effect of raising the temperature on the amount of SO₃.  ')
replace_run(hw, 'Describe how anhydrous copper sulfate can be used', 'HT  For 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), predict and explain the effect of increasing the pressure on the amount of SO₃.  ')
replace_run(hw, 'State what is EQUAL at equilibrium.', 'HT  More reactant is added to a system at equilibrium. Which way does the position of equilibrium move?  ')
replace_run(hw, 'Blue hydrated copper sulfate is heated, then water', 'HT  N₂ + 3H₂ ⇌ 2NH₃; the forward reaction is exothermic. Explain how changing the temperature AND the pressure affects the amount of ammonia at equilibrium.')
set_notes(hw, 'Total 22 marks. 1. a reaction in which the products can react to produce the original reactants (1). 2. HT: if a system at equilibrium is subjected to a change in conditions, the system responds to counteract the change (1). 3. heating / high temperature makes the forward reaction happen (1); cooling / lower temperature makes the reverse reaction happen (1). 4. (a) exothermic (1); (b) it is endothermic / energy is taken in from the surroundings (1); 30 kJ / the same amount (1). 5. HT: the amount of SO₃ decreases / equilibrium shifts left (1); raising the temperature favours the endothermic (reverse) direction (1). 6. HT: the amount of SO₃ increases / shifts right (1); the right-hand side has fewer gas molecules (2 compared with 3) (1). 7. the gas escapes from the beaker (1); so it cannot react in the reverse reaction / the reverse reaction cannot keep going (1). 8. HT: to the right / towards the products (1). 9. any two from: the forward and reverse reactions happen at the same rate; the amounts (concentrations) of reactants and products stay constant; both reactions are still happening / it is dynamic (1 each, max 2). Do not accept \'equal amounts\'. 10. HT [Indicative content, 6-mark extended response, levels marked: Level 3 (5–6) correct predictions for BOTH temperature and pressure, each explained with Le Chatelier and the equation (energy direction; numbers of gas molecules); Level 2 (3–4) correct predictions for both with partial explanation, or one fully explained; Level 1 (1–2) a correct prediction for one change with little or no explanation.] Indicative points: Le Chatelier — the system responds to counteract a change; forward reaction is exothermic; lowering the temperature shifts equilibrium in the exothermic direction / to the right, so more ammonia; raising the temperature shifts it in the endothermic direction / to the left, so less ammonia; there are 4 molecules of gas on the left and 2 on the right; increasing the pressure shifts equilibrium to the side with fewer molecules / right, so more ammonia; decreasing the pressure shifts it left, so less ammonia; (a catalyst would not change the amount at equilibrium). Mark total check: 1+1+2+3+2+2+2+1+2+6 = 22.')

prs.save(OUT)
# report any leftover Foundation wording
for i, sl in enumerate(prs.slides, 1):
    for sh in sl.shapes:
        if sh.has_text_frame and re.search('Foundation|FOUNDATION|not on your paper', sh.text_frame.text):
            print('LEFTOVER', i, sh.text_frame.text[:120].replace('\n', ' | '))
print('slides', len(prs.slides))
