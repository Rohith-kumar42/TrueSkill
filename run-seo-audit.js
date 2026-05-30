#!/usr/bin/env node

/**
 * Next.js SEO Codebase Diagnostic
 * Usage: node run-seo-audit.js /path/to/your/nextjs-project
 * Output: seo-audit-report.md in the same directory you run this from
 */

const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
if (!projectRoot) {
    console.error("Usage: node run-seo-audit.js /path/to/your/nextjs-project");
    process.exit(1);
}

const abs = (...parts) => path.join(projectRoot, ...parts);

// ── helpers ──────────────────────────────────────────────────────────────────

function exists(p) {
    try { return fs.existsSync(abs(p)); } catch { return false; }
}

function read(p) {
    try { return fs.readFileSync(abs(p), "utf8"); } catch { return null; }
}

function findFiles(dir, exts, results = []) {
    const full = abs(dir);
    if (!fs.existsSync(full)) return results;
    for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
        if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
        const child = path.join(dir, entry.name);
        if (entry.isDirectory()) findFiles(child, exts, results);
        else if (exts.some(e => entry.name.endsWith(e))) results.push(child);
    }
    return results;
}

function grepAll(files, pattern) {
    const re = typeof pattern === "string" ? new RegExp(pattern) : pattern;
    return files.filter(f => { const c = read(f); return c && re.test(c); });
}

function countMatches(content, pattern) {
    const re = typeof pattern === "string" ? new RegExp(pattern, "g") : pattern;
    return (content.match(re) || []).length;
}

function badge(ok) { return ok ? "✅ Pass" : "❌ Fail"; }
function warn(ok) { return ok ? "✅ Pass" : "⚠️  Warn"; }

// ── collect source files ──────────────────────────────────────────────────────

const CODE_EXTS = [".tsx", ".ts", ".jsx", ".js"];
const appDir = exists("app") ? "app" : null;
const pagesDir = exists("pages") ? "pages" : null;
const srcApp = exists("src/app") ? "src/app" : null;
const srcPages = exists("src/pages") ? "src/pages" : null;

const routerRoot = appDir || srcApp || pagesDir || srcPages || "src";
const allFiles = findFiles(".", CODE_EXTS);
const pageFiles = findFiles(routerRoot, CODE_EXTS);

// ── findings store ────────────────────────────────────────────────────────────

const findings = [];

function row(section, item, state, detail, priority) {
    findings.push({ section, item, state, detail, priority });
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Rendering Strategy
// ─────────────────────────────────────────────────────────────────────────────

const nextConfig = read("next.config.js") || read("next.config.ts") || read("next.config.mjs") || "";

const hasSSG = grepAll(pageFiles, /getStaticProps|generateStaticParams/).length;
const hasSSR = grepAll(pageFiles, /getServerSideProps/).length;
const hasISR = grepAll(pageFiles, /revalidate/).length;
const hasCSR = grepAll(pageFiles, /'use client'|"use client"/).length;
const hasOutput = /output\s*:\s*['"]export['"]/.test(nextConfig);

row("Rendering", "SSG pages detected", hasSSG ? "Pass" : "Info", `${hasSSG} file(s) use getStaticProps / generateStaticParams`, "High");
row("Rendering", "SSR pages detected", hasSSR ? "Pass" : "Info", `${hasSSR} file(s) use getServerSideProps`, "High");
row("Rendering", "ISR revalidate used", hasISR ? "Pass" : "Fail", `${hasISR} file(s) set revalidate`, "High");
row("Rendering", "Client components count", "Info", `${hasCSR} file(s) marked 'use client'`, "Medium");
row("Rendering", "Static export mode", hasOutput ? "Warn" : "Pass", hasOutput ? "output:'export' disables SSR/ISR" : "Not static export", "High");

// ─────────────────────────────────────────────────────────────────────────────
// 2. Metadata
// ─────────────────────────────────────────────────────────────────────────────

const metaFiles = grepAll(pageFiles, /generateMetadata|metadata\s*=/);
const canonicalFiles = grepAll(allFiles, /canonical/);
const ogFiles = grepAll(allFiles, /og:image|openGraph/);
const titleFiles = grepAll(pageFiles, /title\s*:/);
const descFiles = grepAll(pageFiles, /description\s*:/);

row("Metadata", "generateMetadata / metadata export", metaFiles.length ? "Pass" : "Fail", `${metaFiles.length} file(s) export metadata`, "High");
row("Metadata", "Canonical tag", canonicalFiles.length ? "Pass" : "Fail", `${canonicalFiles.length} file(s) set canonical`, "High");
row("Metadata", "OG image configured", ogFiles.length ? "Pass" : "Fail", `${ogFiles.length} file(s) set OG image`, "High");
row("Metadata", "Title defined", titleFiles.length ? "Pass" : "Fail", `${titleFiles.length} file(s) define title`, "High");
row("Metadata", "Description defined", descFiles.length ? "Pass" : "Fail", `${descFiles.length} file(s) define description`, "Medium");

// ─────────────────────────────────────────────────────────────────────────────
// 3. Schema / Structured Data
// ─────────────────────────────────────────────────────────────────────────────

const schemaFiles = grepAll(allFiles, /application\/ld\+json/);
const orgSchema = grepAll(allFiles, /Organization|WebSite/);
const articleSchema = grepAll(allFiles, /"Article"|"BlogPosting"/);
const breadcrumb = grepAll(allFiles, /BreadcrumbList|breadcrumb/i);
const localBiz = grepAll(allFiles, /LocalBusiness/);

row("Schema", "JSON-LD schema present", schemaFiles.length ? "Pass" : "Fail", `${schemaFiles.length} file(s) inject JSON-LD`, "High");
row("Schema", "Organization / WebSite", orgSchema.length ? "Pass" : "Warn", `${orgSchema.length} file(s)`, "High");
row("Schema", "Article / BlogPosting", articleSchema.length ? "Pass" : "Warn", `${articleSchema.length} file(s)`, "Medium");
row("Schema", "BreadcrumbList schema", breadcrumb.length ? "Pass" : "Warn", `${breadcrumb.length} file(s)`, "Medium");
row("Schema", "LocalBusiness schema", localBiz.length ? "Pass" : "Info", `${localBiz.length} file(s) — only needed for local SEO`, "Low");

// ─────────────────────────────────────────────────────────────────────────────
// 4. URL Structure & Routing
// ─────────────────────────────────────────────────────────────────────────────

const dynamicRoutes = pageFiles.filter(f => /\[/.test(f));
const idRoutes = dynamicRoutes.filter(f => /\[id\]/.test(f));
const slugRoutes = dynamicRoutes.filter(f => /\[slug\]/.test(f));
const hasRedirects = /redirects\s*\(/.test(nextConfig);
const hasRewrites = /rewrites\s*\(/.test(nextConfig);
const trailingSlash = /trailingSlash\s*:\s*(true|false)/.test(nextConfig);

row("URL Structure", "Dynamic routes using [slug]", slugRoutes.length ? "Pass" : "Warn", `${slugRoutes.length} slug-based route(s)`, "High");
row("URL Structure", "Dynamic routes using [id]", idRoutes.length ? "Warn" : "Pass", idRoutes.length ? `${idRoutes.length} ID-based route(s) found — consider slug instead` : "None found", "High");
row("URL Structure", "Redirects configured", hasRedirects ? "Pass" : "Warn", hasRedirects ? "redirects() found in next.config" : "No redirects() in next.config", "Medium");
row("URL Structure", "Rewrites configured", hasRewrites ? "Pass" : "Info", hasRewrites ? "rewrites() found" : "No rewrites()", "Low");
row("URL Structure", "Trailing slash consistent", trailingSlash ? "Pass" : "Warn", trailingSlash ? "trailingSlash explicitly set" : "trailingSlash not set — may cause inconsistency", "Medium");

// ─────────────────────────────────────────────────────────────────────────────
// 5. Sitemap & Robots
// ─────────────────────────────────────────────────────────────────────────────

const hasSitemapApp = exists("app/sitemap.ts") || exists("app/sitemap.js") || exists("src/app/sitemap.ts");
const hasSitemapPages = exists("pages/sitemap.xml.ts") || exists("pages/sitemap.xml.js");
const hasStaticSitemap = exists("public/sitemap.xml");
const hasRobotsFile = exists("public/robots.txt");
const hasRobotsApp = exists("app/robots.ts") || exists("app/robots.js") || exists("src/app/robots.ts");
const robotsContent = read("public/robots.txt") || "";
const hasDisallowAll = /Disallow:\s*\/\s*$/.test(robotsContent);

row("Sitemap", "Dynamic sitemap (app router)", hasSitemapApp ? "Pass" : "Info", hasSitemapApp ? "app/sitemap.ts found" : "Not found", "High");
row("Sitemap", "Dynamic sitemap (pages router)", hasSitemapPages ? "Pass" : "Info", hasSitemapPages ? "pages/sitemap.xml found" : "Not found", "High");
row("Sitemap", "Static sitemap.xml", hasStaticSitemap ? "Warn" : "Pass", hasStaticSitemap ? "Static sitemap — won't auto-update" : "No static sitemap", "High");
row("Sitemap", "robots.txt present", hasRobotsFile || hasRobotsApp ? "Pass" : "Fail", hasRobotsFile ? "public/robots.txt found" : hasRobotsApp ? "app/robots.ts found" : "Missing", "High");
row("Sitemap", "robots.txt blocks all", !hasDisallowAll ? "Pass" : "Fail", hasDisallowAll ? "Disallow: / found — blocks all crawlers!" : "No blanket block", "High");

// ─────────────────────────────────────────────────────────────────────────────
// 6. Internal Linking
// ─────────────────────────────────────────────────────────────────────────────

const bareATags = grepAll(allFiles, /<a\s+href=["']\//);
const linkComponents = grepAll(allFiles, /from ['"]next\/link['"]/);
const breadcrumbComp = grepAll(allFiles, /[Bb]readcrumb/);

row("Internal Linking", "next/link usage", linkComponents.length ? "Pass" : "Fail", `${linkComponents.length} file(s) import next/link`, "High");
row("Internal Linking", "Bare <a href='/> found", bareATags.length ? "Warn" : "Pass", bareATags.length ? `${bareATags.length} file(s) use bare <a> for internal links` : "None found", "Medium");
row("Internal Linking", "Breadcrumb component", breadcrumbComp.length ? "Pass" : "Warn", `${breadcrumbComp.length} file(s) reference breadcrumb`, "Medium");

// ─────────────────────────────────────────────────────────────────────────────
// 7. Image Optimization
// ─────────────────────────────────────────────────────────────────────────────

const nextImageFiles = grepAll(allFiles, /from ['"]next\/image['"]/);
const bareImgFiles = grepAll(allFiles, /<img\s/);
const priorityImages = grepAll(allFiles, /priority/);
const altMissing = grepAll(allFiles, /<Image[^>]+(?!alt=)[^>]*\/>/);

row("Images", "next/image used", nextImageFiles.length ? "Pass" : "Fail", `${nextImageFiles.length} file(s) import next/image`, "High");
row("Images", "Bare <img> tags found", bareImgFiles.length ? "Warn" : "Pass", bareImgFiles.length ? `${bareImgFiles.length} file(s) use raw <img>` : "None found", "High");
row("Images", "priority on hero images", priorityImages.length ? "Pass" : "Warn", `${priorityImages.length} file(s) use priority prop`, "High");

// ─────────────────────────────────────────────────────────────────────────────
// 8. Core Web Vitals
// ─────────────────────────────────────────────────────────────────────────────

const nextScriptFiles = grepAll(allFiles, /from ['"]next\/script['"]/);
const nextFontFiles = grepAll(allFiles, /from ['"]next\/font/);
const rawFontImports = grepAll(allFiles, /@import.*fonts\.googleapis/);
const dynamicImports = grepAll(allFiles, /dynamic\s*\(/);
const heavyGlobal = grepAll(allFiles, /import.*['"]chart\.js['"]|import.*['"]three['"]|import.*['"]framer-motion['"]/);

row("Core Web Vitals", "next/script for third-party", nextScriptFiles.length ? "Pass" : "Warn", `${nextScriptFiles.length} file(s) use next/script`, "High");
row("Core Web Vitals", "next/font for fonts", nextFontFiles.length ? "Pass" : "Warn", `${nextFontFiles.length} file(s) use next/font`, "High");
row("Core Web Vitals", "Raw @import font URLs", rawFontImports.length ? "Fail" : "Pass", rawFontImports.length ? `${rawFontImports.length} file(s) use raw CSS font import` : "None", "High");
row("Core Web Vitals", "Dynamic imports used", dynamicImports.length ? "Pass" : "Warn", `${dynamicImports.length} file(s) use dynamic()`, "Medium");
row("Core Web Vitals", "Heavy libs imported globally", heavyGlobal.length ? "Warn" : "Pass", heavyGlobal.length ? `${heavyGlobal.length} file(s) — check if these need dynamic import` : "None found", "Medium");

// ─────────────────────────────────────────────────────────────────────────────
// 9. Indexability & Noindex
// ─────────────────────────────────────────────────────────────────────────────

const noindexFiles = grepAll(allFiles, /noindex/);
const envNoindex = grepAll(allFiles, /process\.env.*noindex|noindex.*process\.env/i);
const layoutNoindex = grepAll(
    allFiles.filter(f => /layout\.(tsx|ts|jsx|js)$/.test(f)),
    /noindex/
);

row("Indexability", "noindex usage found", noindexFiles.length ? "Warn" : "Pass", `${noindexFiles.length} file(s) contain noindex`, "High");
row("Indexability", "noindex in layout files", layoutNoindex.length ? "Fail" : "Pass", layoutNoindex.length ? `${layoutNoindex.length} layout(s) set noindex — may block all pages` : "None", "High");
row("Indexability", "Env-conditional noindex", envNoindex.length ? "Warn" : "Pass", envNoindex.length ? `${envNoindex.length} file(s) — confirm not leaking to production` : "None", "High");

// ─────────────────────────────────────────────────────────────────────────────
// 10. Caching
// ─────────────────────────────────────────────────────────────────────────────

const hasCacheHeaders = /Cache-Control/.test(nextConfig);
const fetchRevalidate = grepAll(allFiles, /fetch\(.*next.*revalidate|revalidate.*fetch/);
const fetchNoCache = grepAll(allFiles, /cache\s*:\s*['"]no-store['"]/);
const hasVercelConfig = exists("vercel.json");

row("Caching", "Cache-Control in next.config", hasCacheHeaders ? "Pass" : "Warn", hasCacheHeaders ? "Cache-Control headers configured" : "No explicit Cache-Control in next.config", "High");
row("Caching", "fetch() with revalidate", fetchRevalidate.length ? "Pass" : "Warn", `${fetchRevalidate.length} fetch call(s) use revalidate`, "High");
row("Caching", "fetch() with no-store", fetchNoCache.length ? "Warn" : "Pass", fetchNoCache.length ? `${fetchNoCache.length} fetch call(s) explicitly disable cache` : "None", "Medium");
row("Caching", "vercel.json present", hasVercelConfig ? "Pass" : "Info", hasVercelConfig ? "vercel.json found" : "No vercel.json — platform defaults apply", "Low");

// ─────────────────────────────────────────────────────────────────────────────
// Build report
// ─────────────────────────────────────────────────────────────────────────────

const now = new Date().toISOString().split("T")[0];
const total = findings.length;
const passed = findings.filter(f => f.state === "Pass").length;
const failed = findings.filter(f => f.state === "Fail").length;
const warned = findings.filter(f => f.state === "Warn").length;
const infos = findings.filter(f => f.state === "Info").length;

const stateIcon = s => ({ Pass: "✅", Fail: "❌", Warn: "⚠️", Info: "ℹ️" }[s] || s);
const sections = [...new Set(findings.map(f => f.section))];

let md = `# SEO Audit Report

**Project:** \`${path.resolve(projectRoot)}\`
**Date:** ${now}
**Router:** ${appDir || srcApp ? "App Router" : pagesDir || srcPages ? "Pages Router" : "Unknown"}

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Pass | ${passed} |
| ❌ Fail | ${failed} |
| ⚠️  Warn | ${warned} |
| ℹ️  Info | ${infos} |
| **Total checks** | **${total}** |

---

`;

for (const section of sections) {
    const rows = findings.filter(f => f.section === section);
    md += `## ${section}\n\n`;
    md += `| Item | Status | Detail | Priority |\n`;
    md += `|------|--------|--------|----------|\n`;
    for (const r of rows) {
        md += `| ${r.item} | ${stateIcon(r.state)} ${r.state} | ${r.detail} | ${r.priority} |\n`;
    }
    md += `\n`;
}

// Action items
const failures = findings.filter(f => f.state === "Fail");
const warnings = findings.filter(f => f.state === "Warn");

if (failures.length || warnings.length) {
    md += `---\n\n## Action Items\n\n`;

    if (failures.length) {
        md += `### ❌ Fix First (Failures)\n\n`;
        for (const f of failures) {
            md += `- **[${f.section}] ${f.item}** — ${f.detail}\n`;
        }
        md += `\n`;
    }

    if (warnings.length) {
        md += `### ⚠️ Review (Warnings)\n\n`;
        for (const w of warnings) {
            md += `- **[${w.section}] ${w.item}** — ${w.detail}\n`;
        }
        md += `\n`;
    }
}

md += `---\n\n## 👁 Manual Review Required\n\n`;
md += `These checks cannot be automated — they require human judgment. Go through each one after fixing the automated failures above.\n\n`;

const manualChecks = [
    {
        section: "Rendering",
        item: "Are content-heavy pages (blog, landing, product) actually rendering content in View Source?",
        how: "Open page in browser → View Page Source (Ctrl+U) → search for a paragraph of real content. If it's not there, the page is CSR.",
    },
    {
        section: "Metadata",
        item: "Are page titles unique and keyword-relevant across all pages?",
        how: "Open 5–10 different pages → check the browser tab title. If they all look similar or generic, fix generateMetadata().",
    },
    {
        section: "Metadata",
        item: "Are meta descriptions between 50–160 characters and actually descriptive?",
        how: "Inspect page source for <meta name='description'>. Paste into a character counter. Generic descriptions ('Welcome to our site') are as bad as missing ones.",
    },
    {
        section: "Metadata",
        item: "Does the OG image load correctly when URL is pasted into social media?",
        how: "Paste your URL into https://opengraph.xyz and verify image loads, title and description are correct.",
    },
    {
        section: "Schema",
        item: "Is schema valid and error-free?",
        how: "Copy the JSON-LD from page source → paste into https://validator.schema.org. Fix any errors before warnings.",
    },
    {
        section: "Schema",
        item: "Is schema server-rendered (in raw HTML) not injected by JS?",
        how: "View Page Source (not DevTools) → search for 'application/ld+json'. If it's not there but appears in DevTools, it's client-injected — unreliable for crawlers.",
    },
    {
        section: "URL Structure",
        item: "Are URLs human-readable and keyword-relevant?",
        how: "List 10 dynamic page URLs. Ask: does the URL describe the page content? '/blog/how-to-fix-lcp' is good. '/blog/48291' is not.",
    },
    {
        section: "URL Structure",
        item: "Are there any broken redirect chains (A→B→C instead of A→C)?",
        how: "Use https://httpstatus.io to check your main redirects. Chains add latency and dilute link equity.",
    },
    {
        section: "Sitemap",
        item: "Does the sitemap include all indexable pages and exclude noindex pages?",
        how: "Visit /sitemap.xml → count URLs → cross-check against your known page count. Noindex pages in sitemap confuse crawlers.",
    },
    {
        section: "Sitemap",
        item: "Is the sitemap submitted to Google Search Console?",
        how: "Go to Google Search Console → Sitemaps → confirm your sitemap URL is submitted and shows no errors.",
    },
    {
        section: "Internal Linking",
        item: "Do internal links use descriptive anchor text (not 'click here' or 'read more')?",
        how: "Pick 5 content pages → inspect every link. Anchor text should describe the destination page's topic.",
    },
    {
        section: "Internal Linking",
        item: "Are there orphan pages with zero internal links pointing to them?",
        how: "Use Screaming Frog (free up to 500 URLs) or Ahrefs Site Audit → filter pages with 0 inlinks.",
    },
    {
        section: "Images",
        item: "Do all images have meaningful alt text (not empty, not 'image', not filename)?",
        how: "DevTools → Elements → search for <img or <Image → check alt attribute on each. Decorative images get alt='' (empty, not missing).",
    },
    {
        section: "Core Web Vitals",
        item: "What are the real CWV scores for the homepage and top landing pages?",
        how: "Run https://pagespeed.web.dev on your top 5 pages. Record LCP, CLS, INP. Anything below 'Good' threshold needs fixing before other SEO work.",
    },
    {
        section: "Core Web Vitals",
        item: "Is the LCP element the hero image or headline — and is it loading fast?",
        how: "PageSpeed Insights shows the LCP element. If it's an image, confirm priority prop is set. If TTFB > 600ms, caching is the problem.",
    },
    {
        section: "Indexability",
        item: "Are all public content pages actually indexed by Google?",
        how: "Search Google for site:yourdomain.com — count results. Then compare to your sitemap URL count. Large gaps mean indexing problems.",
    },
    {
        section: "Indexability",
        item: "Are private pages (login, dashboard, checkout, thank-you) confirmed noindex?",
        how: "Visit each private page → View Source → check for <meta name='robots' content='noindex'>. Also check X-Robots-Tag in response headers via DevTools → Network.",
    },
    {
        section: "Caching",
        item: "What is the TTFB for the homepage and key landing pages?",
        how: "DevTools → Network → reload page → click the HTML document → check 'Waiting for server response' time. Under 200ms is good. Over 600ms needs fixing.",
    },
    {
        section: "Caching",
        item: "Are static assets (JS, CSS, images) served with long-lived cache headers?",
        how: "DevTools → Network → filter by JS/CSS/Img → check Cache-Control header on each. Should be 'max-age=31536000, immutable' for hashed assets.",
    },
];

for (const check of manualChecks) {
    md += `### [${check.section}] ${check.item}\n\n`;
    md += `**How to check:** ${check.how}\n\n`;
    md += `- [ ] Checked\n`;
    md += `- **Finding:**\n`;
    md += `- **Action:**\n\n`;
}

md += `---\n\n*Generated by SEO Codebase Diagnostic — Next.js*\n`;

// ── write output ──────────────────────────────────────────────────────────────

const outPath = path.join(process.cwd(), "seo-audit-report.md");
fs.writeFileSync(outPath, md, "utf8");

console.log(`\n✅ Audit complete → ${outPath}`);
console.log(`   ${passed} passed · ${failed} failed · ${warned} warnings · ${infos} info\n`);