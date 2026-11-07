// graphs.js — coordinate-grid helper for the AQA maths lesson decks (native shapes only).
// graph(D, s, gx, gy, gw, gh, [x0, x1], [y0, y1], opts) draws a grid with axes and returns
// { px, py, seg, line, curve, pt } for plotting in data coordinates.
// opts: gridX / gridY (grid step, default 1), labX / labY (label step, default = grid step),
//       labSize, xTitle, yTitle (axis titles for real-life graphs), axesAtEdge (put axes on the
//       left/bottom edges instead of through the origin).
'use strict';

function graph(D, s, gx, gy, gw, gh, xr, yr, o = {}) {
  const { C, txt, rect } = D;
  const [x0, x1] = xr, [y0, y1] = yr;
  const gX = o.gridX || 1, gY = o.gridY || 1, lX = o.labX || gX, lY = o.labY || gY, lab = o.labSize || 12;
  const px = x => gx + (x - x0) / (x1 - x0) * gw, py = y => gy + (y1 - y) / (y1 - y0) * gh;
  const near = (a, b) => Math.abs(a - b) < 1e-9;
  const fmt = v => String(Math.round(v * 1000) / 1000).replace('-', '−');
  const ax = o.axesAtEdge ? x0 : 0, ay = o.axesAtEdge ? y0 : 0;
  rect(s, gx, gy, gw, gh, C.white, 'D8CDD2', { lw: 1 });
  for (let x = Math.ceil(x0 / gX) * gX; x <= x1 + 1e-9; x += gX) D.vline(s, px(x), gy, gy + gh, near(x, ax) ? '4A3F45' : 'E6DDE1', near(x, ax) ? 1.75 : 0.75);
  for (let y = Math.ceil(y0 / gY) * gY; y <= y1 + 1e-9; y += gY) D.hline(s, gx, py(y), gx + gw, near(y, ay) ? '4A3F45' : 'E6DDE1', near(y, ay) ? 1.75 : 0.75);
  for (let x = Math.ceil(x0 / lX) * lX; x <= x1 + 1e-9; x += lX) if (!near(x, ax) || o.axesAtEdge) txt(s, fmt(x), px(x) - 0.3, py(ay) + 0.04, 0.6, 0.28, { size: lab, color: C.grey, align: 'center' });
  for (let y = Math.ceil(y0 / lY) * lY; y <= y1 + 1e-9; y += lY) if (!near(y, ay) || (o.axesAtEdge && !near(y, y0))) txt(s, fmt(y), px(ax) - 0.55, py(y) - 0.14, 0.5, 0.28, { size: lab, color: C.grey, align: 'right' });
  if (o.xTitle) txt(s, o.xTitle, gx, gy + gh + 0.32, gw, 0.32, { size: 14, bold: true, color: C.ink, align: 'center' });
  else txt(s, 'x', gx + gw - 0.3, py(ay) - 0.4, 0.3, 0.3, { size: 16, bold: true, italic: true });
  if (o.yTitle) txt(s, o.yTitle, gx - 0.1, gy - 0.38, 3.5, 0.32, { size: 14, bold: true, color: C.ink });
  else txt(s, 'y', px(ax) + 0.08, gy + 0.02, 0.3, 0.3, { size: 16, bold: true, italic: true });
  const G = { px, py };
  G.seg = (xa, ya, xb, yb, color, width = 3, dash) => {
    const X1 = px(xa), Y1 = py(ya), X2 = px(xb), Y2 = py(yb);
    s.addShape(D.SH.line, { x: Math.min(X1, X2), y: Math.min(Y1, Y2), w: Math.max(Math.abs(X2 - X1), 0.001), h: Math.max(Math.abs(Y2 - Y1), 0.001), flipV: (X2 - X1) * (Y2 - Y1) < 0, line: { color, width, dashType: dash } });
  };
  G.line = (m, c, color, width = 3) => {
    let pts = [];
    for (const x of [x0, x1]) { const y = m * x + c; if (y >= y0 - 1e-9 && y <= y1 + 1e-9) pts.push([x, y]); }
    if (m !== 0) for (const y of [y0, y1]) { const x = (y - c) / m; if (x > x0 && x < x1) pts.push([x, y]); }
    pts = pts.sort((a, b) => a[0] - b[0]);
    G.seg(pts[0][0], pts[0][1], pts[pts.length - 1][0], pts[pts.length - 1][1], color, width);
  };
  // smooth curve from many short segments; parts outside the window are left out
  G.curve = (fn, a, b, color, width = 3, n = 90) => {
    let prev = null;
    for (let i = 0; i <= n; i++) {
      const x = a + (b - a) * i / n, y = fn(x);
      const ok = Number.isFinite(y) && y >= y0 && y <= y1;
      if (ok && prev) G.seg(prev[0], prev[1], x, y, color, width);
      prev = ok ? [x, y] : null;
    }
  };
  G.pt = (x, y, color = C.maroon, label, dx = 0.12, dy = -0.42) => {
    D.circle(s, px(x), py(y), 0.16, color);
    if (label) txt(s, label, px(x) + dx, py(y) + dy, 2.2, 0.35, { size: 15, bold: true, color });
  };
  return G;
}

module.exports = { graph };
