#!/bin/bash
# Build and render the deck to PDF, slide PNGs and 3x3 contact sheets.
set -e
cd "$(dirname "$0")"
NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_1_B.js
rm -rf render_4_1_B && mkdir -p render_4_1_B
soffice -env:UserInstallation=file://$PWD/lo_4_1_B --headless --norestore --convert-to pdf --outdir render_4_1_B "$PWD/AQA_8461_Bio_4.1_B_CellDivisionBacteria.pptx" >/dev/null 2>&1
python3 - <<'PY'
import pymupdf
from PIL import Image
doc = pymupdf.open('render_4_1_B/AQA_8461_Bio_4.1_B_CellDivisionBacteria.pdf')
files = []
for i, pg in enumerate(doc):
    f = f'render_4_1_B/s{i+1:02d}.png'; pg.get_pixmap(dpi=110).save(f); files.append(f)
print('pages', len(files))
for c in range(0, len(files), 9):
    ims = [Image.open(f) for f in files[c:c+9]]
    w, h = ims[0].size; sw, sh = w//2, h//2
    sheet = Image.new('RGB', (sw*3+20, sh*3+20), 'white')
    for j, im in enumerate(ims):
        sheet.paste(im.resize((sw, sh)), ((j%3)*(sw+10), (j//3)*(sh+10)))
    sheet.save(f'render_4_1_B/c{c//9+1}.png')
PY
