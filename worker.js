/* ============================================================================
 * DoctoRise edge worker — SEO landing pages for Student Publications.
 * ----------------------------------------------------------------------------
 * The site is otherwise a static SPA served from the ASSETS binding. This worker
 * runs ONLY for paths that aren't static files, and adds three crawlable routes:
 *   /p/<id>        a server-rendered page per publication (title, abstract,
 *                  metadata, link to the PDF) — this is what Google indexes.
 *   /sitemap.xml   every publication's URL, so Google can discover them.
 *   /robots.txt    allows crawling and points at the sitemap.
 * Data comes from the repo file /content/publications.json (served via ASSETS).
 * Anything else falls through to static assets, and ANY error falls through too,
 * so this can never take the main site down.
 * ========================================================================== */

const SITE_NAME = "DoctoRise";

function esc(x) {
  return String(x == null ? "" : x).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function clip(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1).trim() + "…" : s; }

async function loadPubs(origin, env) {
  try {
    const r = await env.ASSETS.fetch(new Request(origin + "/content/publications.json"));
    if (!r.ok) return [];
    const j = await r.json();
    return Array.isArray(j) ? j : [];
  } catch (e) { return []; }
}

function notFound(origin) {
  return new Response(page({
    title: "Not found",
    metaDesc: "This publication could not be found.",
    canonical: origin + "/",
    body: '<h1>Publication not found</h1><p>This page may have been removed, or the link is incorrect.</p><p><a class="btn" href="/">Go to ' + SITE_NAME + "</a></p>",
    noindex: true,
  }), { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });
}

function page(opts) {
  const noindex = opts.noindex ? '<meta name="robots" content="noindex">' : "";
  const jsonld = opts.jsonld ? '<script type="application/ld+json">' + opts.jsonld + "</script>" : "";
  return (
    "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\">" +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    "<title>" + esc(opts.title) + " — " + SITE_NAME + "</title>" +
    '<meta name="description" content="' + esc(opts.metaDesc) + '">' +
    '<link rel="canonical" href="' + esc(opts.canonical) + '">' +
    noindex +
    '<meta property="og:site_name" content="' + SITE_NAME + '">' +
    '<meta property="og:type" content="article">' +
    '<meta property="og:title" content="' + esc(opts.title) + '">' +
    '<meta property="og:description" content="' + esc(opts.metaDesc) + '">' +
    '<meta property="og:url" content="' + esc(opts.canonical) + '">' +
    '<meta name="twitter:card" content="summary">' +
    jsonld +
    "<style>" +
    ":root{--ink:#1E2640;--sub:#5A6480;--acc:#0A6DA0;--line:#E2E6F0;--bg:#F7F8FC;}" +
    "*{box-sizing:border-box;}body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.6;}" +
    ".top{background:#0B1222;padding:14px 20px;}.top a{color:#4FD1C5;font-weight:800;text-decoration:none;font-size:18px;letter-spacing:.02em;}" +
    ".wrap{max-width:720px;margin:0 auto;padding:34px 20px 70px;}" +
    ".type{display:inline-block;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--acc);background:#E7F2FB;border-radius:6px;padding:4px 10px;margin-bottom:14px;}" +
    "h1{font-size:27px;line-height:1.25;margin:0 0 10px;text-wrap:balance;}" +
    ".meta{color:var(--sub);font-size:14px;margin-bottom:22px;}" +
    ".card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px 24px;box-shadow:0 1px 4px rgba(0,0,0,.05);}" +
    ".card h2{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--sub);margin:0 0 8px;}" +
    ".abstract{font-size:15.5px;color:#2C3550;white-space:pre-wrap;}" +
    ".btn{display:inline-block;background:linear-gradient(135deg,#00C2A8,#0EA5E9);color:#fff;font-weight:700;text-decoration:none;border-radius:10px;padding:12px 20px;margin-top:8px;}" +
    ".btn.ghost{background:#fff;color:var(--ink);border:1px solid var(--line);}" +
    ".cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px;}" +
    ".foot{color:var(--sub);font-size:12.5px;margin-top:40px;border-top:1px solid var(--line);padding-top:18px;}" +
    ".article{background:#fff;border:1px solid var(--line);border-radius:14px;padding:26px 30px;box-shadow:0 1px 4px rgba(0,0,0,.05);}" +
    ".article p{margin:0 0 12px;font-size:15.5px;color:#2C3550;}" +
    ".article strong{color:var(--ink);} .article em{font-style:italic;}" +
    ".article img{max-width:100%;height:auto;display:block;margin:16px auto;border:1px solid var(--line);border-radius:8px;}" +
    ".article table{border-collapse:collapse;width:100%;margin:16px 0;font-size:13.5px;display:block;overflow-x:auto;}" +
    ".article td,.article th{border:1px solid var(--line);padding:6px 9px;vertical-align:top;} .article td p{margin:0 0 4px;}" +
    ".article h1,.article h2,.article h3,.article h4{color:var(--ink);line-height:1.3;margin:20px 0 8px;}" +
    ".article h1{font-size:19px;} .article h2{font-size:17px;} .article h3{font-size:15.5px;} .article h4{font-size:14px;}" +
    "a{color:var(--acc);}" +
    "</style></head><body>" +
    '<div class="top"><a href="/">' + SITE_NAME + "</a></div>" +
    '<div class="wrap">' + opts.body + "</div></body></html>"
  );
}

async function pubPage(id, origin, env) {
  const rows = await loadPubs(origin, env);
  const p = rows.find(function (x) { return x && String(x.id) === id; });
  if (!p) return notFound(origin);
  const canonical = origin + "/p/" + p.id;
  const metaBits = [p.authors, p.university, p.year, p.ptype].filter(Boolean).map(String);
  const metaDesc = clip(p.abstract || (p.title + " — " + metaBits.join(", ")), 300);
  const fileUrl = p.file ? origin + "/" + String(p.file).replace(/^\/+/, "") : "";
  // Full article HTML, rendered standalone (like a journal / PubMed page). Falls back to the
  // stored abstract if the article file is missing. This content is generated by us, not user
  // HTML, so it is embedded as-is.
  let articleHtml = "";
  if (p.html) {
    try {
      const r = await env.ASSETS.fetch(new Request(origin + "/" + String(p.html).replace(/^\/+/, "")));
      if (r.ok) articleHtml = await r.text();
    } catch (e) {}
  }
  if (!articleHtml && p.abstract) articleHtml = "<p><strong>Abstract</strong></p><p>" + esc(p.abstract).replace(/\n/g, "<br>") + "</p>";
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: p.title, name: p.title,
    author: String(p.authors || "").split(/\s*,\s*|\s+and\s+/).filter(Boolean).map(function (n) { return { "@type": "Person", name: n }; }),
    abstract: p.abstract || undefined,
    datePublished: p.date || (p.year ? String(p.year) : undefined),
    url: canonical,
    publisher: { "@type": "Organization", name: SITE_NAME, url: origin + "/" },
  });
  const body =
    '<span class="type">' + esc(p.ptype || "Project") + "</span>" +
    "<h1>" + esc(p.title) + "</h1>" +
    '<div class="meta">' + esc(metaBits.join(" · ")) + "</div>" +
    '<article class="article">' + articleHtml + "</article>" +
    '<div class="cta">' +
    (fileUrl ? '<a class="btn ghost" href="' + esc(fileUrl) + '" target="_blank" rel="noopener">Download PDF</a>' : "") +
    '<a class="btn ghost" href="/#publications">Browse more on ' + SITE_NAME + "</a>" +
    "</div>" +
    '<div class="foot">Shared by a medical student on ' + SITE_NAME + ", a free UK medical-education platform. Published work is the author’s own.</div>";
  return new Response(page({ title: p.title, metaDesc: metaDesc, canonical: canonical, body: body, jsonld: jsonld }), {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=60, s-maxage=120" },
  });
}

async function sitemap(origin, env) {
  const rows = await loadPubs(origin, env);
  const urls = ['<url><loc>' + origin + "/</loc></url>"];
  for (const p of rows) {
    if (!p || !p.id) continue;
    const lm = p.date ? "<lastmod>" + String(p.date).slice(0, 10) + "</lastmod>" : "";
    urls.push("<url><loc>" + origin + "/p/" + p.id + "</loc>" + lm + "</url>");
  }
  const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.join("") + "</urlset>";
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=600, s-maxage=1800" } });
}

function robots(origin) {
  return new Response("User-agent: *\nAllow: /\n\nSitemap: " + origin + "/sitemap.xml\n", { headers: { "content-type": "text/plain; charset=utf-8" } });
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      if (path === "/robots.txt") return robots(url.origin);
      if (path === "/sitemap.xml") return await sitemap(url.origin, env);
      const m = path.match(/^\/p\/([a-z0-9][a-z0-9-]{2,})\/?$/i);
      if (m) return await pubPage(m[1], url.origin, env);
      return env.ASSETS.fetch(request);
    } catch (e) {
      try { return env.ASSETS.fetch(request); } catch (_) { return new Response("", { status: 502 }); }
    }
  },
};
