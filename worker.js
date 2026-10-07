/* ============================================================================
 * DoctoRise edge worker — SEO landing pages for Student Publications.
 * ----------------------------------------------------------------------------
 * The site is otherwise a static SPA served from the ASSETS binding. This worker
 * runs ONLY for paths that aren't static files, and adds three crawlable routes:
 *   /p/<id>        a server-rendered page per APPROVED publication (title, abstract,
 *                  metadata, link to the PDF) — this is what Google indexes.
 *   /sitemap.xml   every approved publication's URL, so Google can discover them.
 *   /robots.txt    allows crawling and points at the sitemap.
 * Anything else falls through to the static assets, and ANY error falls through
 * too, so this can never take the main site down.
 * ========================================================================== */

const SB = "https://ynkyqovqlfmnpkdsaonu.supabase.co";
// Public anonymous key (already shipped in the client; RLS limits anon reads to
// approved publications only).
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlua3lxb3ZxbGZtbnBrZHNhb251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzQ4NzAsImV4cCI6MjA5ODMxMDg3MH0.HW3EZ7CY4OgwIXZkPfAoIjJ6l8HJhznUIiBKVz0uRys";

const SITE_NAME = "DoctoRise";

function esc(x) {
  return String(x == null ? "" : x).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function clip(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1).trim() + "…" : s; }

async function sbGet(pathAndQuery) {
  const r = await fetch(SB + "/rest/v1/" + pathAndQuery, {
    headers: { apikey: ANON, Authorization: "Bearer " + ANON, Accept: "application/json" },
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  if (!r.ok) throw new Error("sb " + r.status);
  return r.json();
}
function pdfUrl(filePath) {
  return SB + "/storage/v1/object/public/publications/" + filePath.split("/").map(encodeURIComponent).join("/");
}

function notFound(origin) {
  const html = page({
    title: "Not found",
    metaDesc: "This publication could not be found.",
    canonical: origin + "/",
    body:
      '<h1>Publication not found</h1>' +
      '<p>This page may have been removed, or the link is incorrect.</p>' +
      '<p><a class="btn" href="/">Go to ' + SITE_NAME + "</a></p>",
    noindex: true,
  });
  return new Response(html, { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });
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
    ":root{--ink:#1E2640;--sub:#5A6480;--acc:#0A6DA0;--line:#E2E6F0;--bg:#F4F6FA;}" +
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
    "a{color:var(--acc);}" +
    "@media(prefers-color-scheme:dark){:root{--ink:#E6E9F2;--sub:#9AA3B8;--acc:#5BB3E6;--line:#2A3350;--bg:#0E1424;}body{background:var(--bg);}.card{background:#141C30;}.abstract{color:#CBD3E6;}.type{background:#10263A;}.btn.ghost{background:#141C30;}}" +
    "</style></head><body>" +
    '<div class="top"><a href="/">' + SITE_NAME + "</a></div>" +
    '<div class="wrap">' + opts.body + "</div></body></html>"
  );
}

async function pubPage(id, origin) {
  const rows = await sbGet(
    "publications?id=eq." + encodeURIComponent(id) +
    "&status=eq.approved&select=id,title,authors,university,ptype,year,abstract,file_path,created_at&limit=1"
  );
  const p = rows && rows[0];
  if (!p) return notFound(origin);
  const canonical = origin + "/p/" + p.id;
  const metaBits = [p.authors, p.university, p.year, p.ptype].filter(Boolean).map(String);
  const metaDesc = clip(p.abstract || (p.title + " — " + metaBits.join(", ")), 300);
  const abstractHtml = p.abstract
    ? '<div class="card"><h2>Abstract</h2><div class="abstract">' + esc(p.abstract) + "</div></div>"
    : "";
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: p.title,
    name: p.title,
    author: String(p.authors || "").split(/\s*,\s*|\s+and\s+/).filter(Boolean).map(function (n) { return { "@type": "Person", name: n }; }),
    abstract: p.abstract || undefined,
    datePublished: p.year ? String(p.year) : (p.created_at || undefined),
    url: canonical,
    publisher: { "@type": "Organization", name: SITE_NAME, url: origin + "/" },
  });
  const body =
    '<span class="type">' + esc(p.ptype || "Project") + "</span>" +
    "<h1>" + esc(p.title) + "</h1>" +
    '<div class="meta">' + esc(metaBits.join(" · ")) + "</div>" +
    abstractHtml +
    '<div class="cta">' +
    '<a class="btn" href="' + esc(pdfUrl(p.file_path)) + '" target="_blank" rel="noopener">Read the full PDF</a>' +
    '<a class="btn ghost" href="/#publications">Browse more on ' + SITE_NAME + "</a>" +
    "</div>" +
    '<div class="foot">Shared by a medical student on ' + SITE_NAME +
    ", a free UK medical-education platform. Published work is the author’s own.</div>";
  return new Response(page({ title: p.title, metaDesc: metaDesc, canonical: canonical, body: body, jsonld: jsonld }), {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300, s-maxage=600" },
  });
}

async function sitemap(origin) {
  let rows = [];
  try {
    rows = await sbGet("publications?status=eq.approved&select=id,created_at&order=created_at.desc&limit=5000");
  } catch (e) { rows = []; }
  const urls = ['<url><loc>' + origin + "/</loc></url>"];
  for (const p of rows) {
    const lm = p.created_at ? "<lastmod>" + String(p.created_at).slice(0, 10) + "</lastmod>" : "";
    urls.push("<url><loc>" + origin + "/p/" + p.id + "</loc>" + lm + "</url>");
  }
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.join("") + "</urlset>";
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=600, s-maxage=1800" } });
}

function robots(origin) {
  const txt = "User-agent: *\nAllow: /\n\nSitemap: " + origin + "/sitemap.xml\n";
  return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      if (path === "/robots.txt") return robots(url.origin);
      if (path === "/sitemap.xml") return await sitemap(url.origin);
      const m = path.match(/^\/p\/([0-9a-fA-F-]{8,})\/?$/);
      if (m) return await pubPage(m[1], url.origin);
      return env.ASSETS.fetch(request);
    } catch (e) {
      // Never break the site: fall through to the static asset handler.
      try { return env.ASSETS.fetch(request); } catch (_) { return new Response("", { status: 502 }); }
    }
  },
};
