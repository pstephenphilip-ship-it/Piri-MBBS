#!/usr/bin/env node
/* =====================================================================
   Re-measure every number the promo reel quotes, straight from the app.

     node promo/count.js

   Prints the counts and diffs them against what reel-data.js currently
   claims, so a content drop cannot quietly leave the video out of date.
   Nothing is written — copy the values into reel-data.js yourself.
   ===================================================================== */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const subnav = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/subnav.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/manifest.json'), 'utf8'));

/* Pull a `const NAME={...}` object literal out of index.html by walking the
   braces, so we do not have to execute the (very large) page script. */
function literal(name) {
  let i = html.indexOf('const ' + name + '=');
  if (i < 0) i = html.indexOf('const ' + name + ' =');
  if (i < 0) throw new Error('not found in index.html: ' + name);
  const start = html.indexOf('{', i);
  let depth = 0, inStr = false, quote = '', esc = false;
  for (let k = start; k < html.length; k++) {
    const c = html[k];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === quote) inStr = false;
      continue;
    }
    if (c === '"' || c === "'") { inStr = true; quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return JSON.parse(html.slice(start, k + 1));
  }
  throw new Error('unbalanced braces reading ' + name);
}

/* Topics, expanded through subnav.json the same way the home page counts them:
   a topic with sub-entries counts as its sub-entries, otherwise as one. */
function topics(obj, expand) {
  let groups = 0, n = 0;
  for (const g of Object.keys(obj)) {
    groups++;
    const list = obj[g].conditions || obj[g].topics || [];
    for (const t of list) {
      const subs = expand ? subnav[g + '__' + t] : null;
      n += (subs && subs.length) ? subs.length : 1;
    }
  }
  return { groups, n };
}

const conditions = topics(literal('CONDITIONS_SYSTEMS'), true);
const anatomy = topics(literal('TAB_ANATOMY'), false);
const histology = topics(literal('TAB_HISTOLOGY'), false);
const signs = topics(literal('TAB_SIGNS'), false);
const investigations = topics(literal('TAB_INVESTIGATIONS'), true);

const pharma = literal('PHARMA_SECTIONS');
let drugClasses = 0;
for (const k of Object.keys(pharma)) {
  const subs = pharma[k].subsections || {};
  for (const s of Object.keys(subs)) drugClasses += (subs[s] || []).length;
}

let flashcards = 0, questions = 0;
for (const s of manifest.systems || []) { flashcards += s.fcards || 0; questions += s.qcards || 0; }

const measured = {
  conditions: conditions.n,
  systems: conditions.groups,
  flashcards, questions,
  anatomy: anatomy.n, anatomyRegions: anatomy.groups,
  histology: histology.n, histologyGroups: histology.groups,
  drugClasses, pharmaSections: Object.keys(pharma).length,
  presentations: signs.n, presentationGroups: signs.groups,
  investigations: investigations.n, investigationGroups: investigations.groups
};

/* What the reel currently claims. */
global.window = {};
require('./reel-data.js');
const claimed = global.window.REEL_DATA.STATS;

let stale = 0;
console.log('\n  measured    in reel    key');
console.log('  --------    -------    ---');
for (const k of Object.keys(measured)) {
  const m = measured[k], c = claimed[k];
  const flag = m === c ? '  ' : '<-';
  if (m !== c) stale++;
  console.log(`  ${String(m).padStart(8)}    ${String(c).padStart(7)} ${flag} ${k}`);
}
console.log(stale
  ? `\n  ${stale} value(s) have drifted — update STATS in promo/reel-data.js and re-render.\n`
  : '\n  reel-data.js matches the app.\n');
process.exit(stale ? 1 : 0);
