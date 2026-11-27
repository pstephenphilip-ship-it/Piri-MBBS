// Helpers for hand-built anatomy diagrams (inline SVG strings).
//
// Colours come from CSS classes defined in css/app.css (section "Diagrams"),
// so every figure follows the light/dark theme:
//   .bn   bone            .bn-ax  axial bone       .bn-ap appendicular bone
//   .bn-2 bone (2nd tone) .cart   cartilage        .sp    spongy bone
//   .mr   red marrow      .my     yellow marrow    .ln    outline only
//   .hl1 .hl2 .hl3        three highlight colours for grouping
// Labels use label() so the "Hide labels" quiz mode and the enlarge view work.

/** Round to 1 decimal to keep path strings short. */
export const r = n => Math.round(n * 10) / 10;

/** Build a path "d" string from points: [[x,y],...] (straight segments). */
export const poly = (pts, close = true) =>
  'M' + pts.map(([x, y]) => `${r(x)} ${r(y)}`).join(' L') + (close ? ' Z' : '');

/**
 * A label with a leader line.
 * (px,py) = point on the structure; (tx,ty) = where the text sits.
 * The leader runs horizontally into the text, with an optional elbow.
 */
export function label(px, py, tx, ty, text, opts = {}) {
  const anchor = opts.anchor || (tx < px ? 'end' : 'start');
  const gap = anchor === 'end' ? 6 : anchor === 'start' ? -6 : 0;
  const ex = tx + gap; // where the line meets the text
  const pts = opts.straight ? `${r(px)},${r(py)} ${r(ex)},${r(ty)}` : `${r(px)},${r(py)} ${r(opts.elbowX ?? (px + ex) / 2)},${r(ty)} ${r(ex)},${r(ty)}`;
  const lines = String(text).split('\n');
  const tspans = lines.map((l, i) => `<tspan x="${r(tx)}" dy="${i ? '1.15em' : 0}">${l}</tspan>`).join('');
  const dy = -(lines.length - 1) * 0.575; // vertically centre multi-line labels
  return `<g class="lbl"><polyline class="lbl-line" points="${pts}"/><circle class="lbl-dot" cx="${r(px)}" cy="${r(py)}" r="2.6"/><text class="lbl-text" x="${r(tx)}" y="${r(ty)}" dy="${r(dy + 0.35)}em" text-anchor="${anchor}">${tspans}</text></g>`;
}

/** A plain heading/caption inside the drawing (not hidden in quiz mode). */
export const note = (x, y, text, cls = 'dg-note', anchor = 'middle') =>
  `<text class="${cls}" x="${r(x)}" y="${r(y)}" text-anchor="${anchor}">${text}</text>`;

/** A colour key row: [[cssClass, text], ...] drawn at (x,y). */
export function key(x, y, items, step = 150) {
  return `<g class="dg-key">${items.map(([cls, text], i) =>
    `<rect class="${cls}" x="${x + i * step}" y="${y - 10}" width="16" height="12" rx="2"/><text x="${x + i * step + 22}" y="${y}">${text}</text>`).join('')}</g>`;
}

/**
 * Wrap an SVG body in a figure with tools.
 * minWidth: CSS px the drawing keeps on narrow screens (the canvas scrolls sideways).
 */
export function figure({ viewBox, body, title, caption, minWidth = 520 }) {
  return `
<figure class="dg" style="--dg-min:${minWidth}px">
  <div class="dg-tools">
    <strong class="dg-title">${title}</strong>
    <button type="button" class="btn sm" data-dg="quiz" aria-pressed="false">Hide labels</button>
    <button type="button" class="btn sm" data-dg="zoom">Enlarge</button>
  </div>
  <div class="dg-canvas">
    <svg viewBox="${viewBox}" role="img" aria-label="${title}. ${caption.replace(/<[^>]+>/g, '')}" xmlns="http://www.w3.org/2000/svg">${body}</svg>
  </div>
  <figcaption>${caption}</figcaption>
</figure>`;
}

/**
 * Smooth path through points (Catmull-Rom → cubic Bézier).
 * Use for organic bone outlines. tension 0..1 (1 = default roundness).
 */
export function smooth(pts, closed = true, tension = 1) {
  const n = pts.length;
  if (n < 3) return poly(pts, closed);
  const P = i => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
  let d = `M${r(pts[0][0])} ${r(pts[0][1])}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6 * tension, p1[1] + (p2[1] - p0[1]) / 6 * tension];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6 * tension, p2[1] - (p3[1] - p1[1]) / 6 * tension];
    d += ` C${r(c1[0])} ${r(c1[1])} ${r(c2[0])} ${r(c2[1])} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d + (closed ? ' Z' : '');
}

/**
 * A "bone stroke": a thick line or path drawn as an outlined band
 * (dark outline + coloured core). Good for ribs, phalanges, metacarpals.
 * fill: 'ax' | 'ap' | 'bn' | 'cart'
 */
export function band(d, w, fill = 'bn', extra = '') {
  return `<path class="band-o" d="${d}" stroke-width="${w + 2.4}" ${extra}/><path class="band-${fill}" d="${d}" stroke-width="${w}" ${extra}/>`;
}
export const seg = (x1, y1, x2, y2) => `M${r(x1)} ${r(y1)} L${r(x2)} ${r(y2)}`;
