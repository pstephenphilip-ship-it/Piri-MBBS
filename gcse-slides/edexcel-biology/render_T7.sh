#!/bin/bash
# Render EDX_1BI0_T7 deck to PDF, PNGs and 3x3 contact sheets.
set -e
cd "$(dirname "$0")"
NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T7.js
rm -rf render_T7 && mkdir -p render_T7
soffice -env:UserInstallation=file://$PWD/lo_T7 --headless --norestore --convert-to pdf --outdir render_T7 "$PWD/EDX_1BI0_T7_CoordinationHomeostasis.pptx" >/dev/null 2>&1
python3 - <<'PY'
import pymupdf, glob
from PIL import Image
doc = pymupdf.open('render_T7/EDX_1BI0_T7_CoordinationHomeostasis.pdf')
files = []
for i, pg in enumerate(doc):
    f = f'render_T7/s{i+1:02d}.png'; pg.get_pixmap(dpi=110).save(f); files.append(f)
print('pages', len(files))
for c in range(0, len(files), 9):
    ims = [Image.open(f) for f in files[c:c+9]]
    w, h = ims[0].size; sw, sh = w//2, h//2
    sheet = Image.new('RGB', (sw*3+20, sh*3+20), 'white')
    for j, im in enumerate(ims):
        sheet.paste(im.resize((sw, sh)), ((j%3)*(sw+10), (j//3)*(sh+10)))
    sheet.save(f'render_T7/c{c//9+1}.png')
PY
