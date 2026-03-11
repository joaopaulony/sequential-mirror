import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { JSDOM } from "jsdom";

const ORIGIN = "https://gruposequencial.com.br";
const START_URL = `${ORIGIN}/`;

const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, "public");

const MAX_PAGES = Number(process.env.MIRROR_MAX_PAGES || "80");

function isHttpUrl(u) {
  return u && (u.startsWith("http://") || u.startsWith("https://"));
}

function normalizeUrl(raw, baseUrl) {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("data:") || trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) return null;
  if (trimmed.startsWith("#")) return null;
  if (trimmed.startsWith("//")) return new URL(`https:${trimmed}`);
  try {
    return new URL(trimmed, baseUrl);
  } catch {
    return null;
  }
}

function extFromContentType(ct) {
  if (!ct) return "";
  const type = ct.split(";")[0].trim().toLowerCase();
  if (type === "text/css") return ".css";
  if (type === "application/javascript" || type === "text/javascript") return ".js";
  if (type === "application/json") return ".json";
  if (type === "image/png") return ".png";
  if (type === "image/jpeg") return ".jpg";
  if (type === "image/webp") return ".webp";
  if (type === "image/svg+xml") return ".svg";
  if (type === "image/x-icon") return ".ico";
  if (type === "font/woff2") return ".woff2";
  if (type === "font/woff") return ".woff";
  if (type === "application/vnd.ms-fontobject") return ".eot";
  if (type === "font/ttf") return ".ttf";
  return "";
}

function localPathForAsset(url) {
  if (url.origin === ORIGIN) return url.pathname.startsWith("/") ? url.pathname : `/${url.pathname}`;
  const hash = crypto.createHash("sha1").update(url.toString()).digest("hex").slice(0, 16);
  const ext = path.extname(url.pathname) || "";
  return `/__mirror_external/${url.hostname}/${hash}${ext || ""}`;
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function fetchWithRetry(url, { tries = 3 } = {}) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const controller = new AbortController();
      const timeoutMs = 20000;
      const t = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(url, { redirect: "follow", signal: controller.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return res;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 350 * (i + 1)));
    }
  }
  throw lastErr;
}

async function download(url, localPath, seenAssets) {
  const key = url.toString();
  if (seenAssets.has(key)) return localPath;
  seenAssets.add(key);

  const diskPath = path.join(publicDir, localPath.replace(/^\//, ""));
  try {
    await fs.access(diskPath);
    return localPath;
  } catch {
    // continue
  }

  let res;
  try {
    res = await fetchWithRetry(url.toString());
  } catch {
    console.warn(`Skip asset (failed): ${url.toString()}`);
    return localPath;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get("content-type");
  let finalDiskPath = diskPath;

  if (!path.extname(finalDiskPath)) {
    const guessed = extFromContentType(ct);
    if (guessed) finalDiskPath += guessed;
  }

  await ensureDir(finalDiskPath);
  await fs.writeFile(finalDiskPath, buf);

  // If we appended an extension, return the corrected local path.
  if (finalDiskPath !== diskPath) {
    return `/${path.relative(publicDir, finalDiskPath).replaceAll("\\", "/")}`;
  }
  return localPath;
}

function collectCssUrls(cssText, baseUrl) {
  const urls = new Set();
  const re = /url\(\s*(['"]?)([^"')]+)\1\s*\)/gi;
  let m;
  while ((m = re.exec(cssText))) {
    const u = normalizeUrl(m[2], baseUrl);
    if (u && isHttpUrl(u.toString())) urls.add(u.toString());
  }
  return [...urls];
}

function parseSrcset(srcset, baseUrl) {
  if (!srcset) return [];
  return srcset
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.split(/\s+/)[0])
    .map((u) => normalizeUrl(u, baseUrl))
    .filter((u) => u && isHttpUrl(u.toString()))
    .map((u) => u.toString());
}

function pageDiskPathFor(url) {
  const p = url.pathname;
  if (!p || p === "/") return path.join(publicDir, "index.html");
  const clean = p.startsWith("/") ? p.slice(1) : p;
  if (clean.endsWith("/")) return path.join(publicDir, clean, "index.html");
  // WordPress usually uses trailing slashes; still handle no-slash.
  return path.join(publicDir, clean, "index.html");
}

function shouldCrawlLink(url) {
  if (url.origin !== ORIGIN) return false;
  if (url.pathname.startsWith("/wp-admin")) return false;
  if (url.pathname.startsWith("/wp-json")) return false;
  if (url.pathname.startsWith("/cart") || url.pathname.startsWith("/carrinho")) return true;
  // skip obvious assets
  const ext = path.extname(url.pathname).toLowerCase();
  if (ext && ext !== ".html" && ext !== ".htm") return false;
  return true;
}

function canonicalizePageUrl(url) {
  const u = new URL(url.toString());
  u.search = "";
  u.hash = "";
  const ext = path.extname(u.pathname).toLowerCase();
  if (!ext && !u.pathname.endsWith("/")) u.pathname += "/";
  return u;
}

async function mirrorPage(pageUrl, seenAssets) {
  const res = await fetchWithRetry(pageUrl.toString());
  const html = await res.text();
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const urlRewriteMap = new Map(); // abs -> local
  const assetQueue = [];

  const enqueueAttr = (el, attr) => {
    const u = normalizeUrl(el.getAttribute(attr), pageUrl.toString());
    if (!u || !isHttpUrl(u.toString())) return;
    const local = localPathForAsset(u);
    assetQueue.push({ url: u, local });
    urlRewriteMap.set(u.toString(), local);
  };

  document
    .querySelectorAll(
      'link[rel="stylesheet"][href], link[rel="icon"][href], link[rel="shortcut icon"][href], link[rel="apple-touch-icon"][href]'
    )
    .forEach((el) => enqueueAttr(el, "href"));

  document.querySelectorAll("script[src]").forEach((el) => enqueueAttr(el, "src"));
  document.querySelectorAll("img[src], source[src], video[src], audio[src], iframe[src]").forEach((el) => enqueueAttr(el, "src"));

  document.querySelectorAll("img[srcset], source[srcset]").forEach((el) => {
    const list = parseSrcset(el.getAttribute("srcset"), pageUrl.toString());
    list.forEach((abs) => {
      const u = new URL(abs);
      const local = localPathForAsset(u);
      assetQueue.push({ url: u, local });
      urlRewriteMap.set(u.toString(), local);
    });
  });

  document.querySelectorAll("[style]").forEach((el) => {
    const style = el.getAttribute("style") || "";
    collectCssUrls(style, pageUrl.toString()).forEach((abs) => {
      const u = new URL(abs);
      const local = localPathForAsset(u);
      assetQueue.push({ url: u, local });
      urlRewriteMap.set(u.toString(), local);
    });
  });

  for (const styleEl of [...document.querySelectorAll("style")]) {
    const cssText = styleEl.textContent || "";
    collectCssUrls(cssText, pageUrl.toString()).forEach((abs) => {
      const u = new URL(abs);
      const local = localPathForAsset(u);
      assetQueue.push({ url: u, local });
      urlRewriteMap.set(u.toString(), local);
    });
  }

  // Download assets and crawl CSS nested urls
  for (let i = 0; i < assetQueue.length; i++) {
    const { url, local } = assetQueue[i];
    const updatedLocal = await download(url, local, seenAssets);
    if (updatedLocal !== local) urlRewriteMap.set(url.toString(), updatedLocal);

    const localUsed = updatedLocal;
    if (path.extname(localUsed).toLowerCase() === ".css") {
      const disk = path.join(publicDir, localUsed.replace(/^\//, ""));
      let css = "";
      try {
        css = await fs.readFile(disk, "utf8");
      } catch {
        continue;
      }
      collectCssUrls(css, url.toString()).forEach((abs) => {
        const u = new URL(abs);
        const nestedLocal = localPathForAsset(u);
        assetQueue.push({ url: u, local: nestedLocal });
        urlRewriteMap.set(u.toString(), nestedLocal);
      });
    }
  }

  const rewriteAttr = (el, attr) => {
    const u = normalizeUrl(el.getAttribute(attr), pageUrl.toString());
    if (!u || !isHttpUrl(u.toString())) return;
    const mapped = urlRewriteMap.get(u.toString());
    if (mapped) el.setAttribute(attr, mapped);
  };

  // Rewrite internal links for local navigation (keep same path)
  document.querySelectorAll("a[href]").forEach((a) => {
    const u = normalizeUrl(a.getAttribute("href"), pageUrl.toString());
    if (!u) return;
    if (u.origin === ORIGIN) a.setAttribute("href", `${u.pathname}${u.search}${u.hash}`);
  });

  document.querySelectorAll("link[href], script[src], img[src], source[src], video[src], audio[src], iframe[src]").forEach((el) => {
    if (el.hasAttribute("href")) rewriteAttr(el, "href");
    if (el.hasAttribute("src")) rewriteAttr(el, "src");
  });

  document.querySelectorAll("img[srcset], source[srcset]").forEach((el) => {
    const srcset = el.getAttribute("srcset");
    if (!srcset) return;
    const rebuilt = srcset
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [u0, ...rest] = part.split(/\s+/);
        const u = normalizeUrl(u0, pageUrl.toString());
        if (!u || !isHttpUrl(u.toString())) return part;
        const mapped = urlRewriteMap.get(u.toString());
        return mapped ? [mapped, ...rest].join(" ") : part;
      })
      .join(", ");
    el.setAttribute("srcset", rebuilt);
  });

  const outPath = pageDiskPathFor(pageUrl);
  await ensureDir(outPath);
  await fs.writeFile(outPath, dom.serialize(), "utf8");
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });

  const queue = [canonicalizePageUrl(new URL(START_URL))];
  const seenPages = new Set();
  const seenAssets = new Set();

  while (queue.length && seenPages.size < MAX_PAGES) {
    const url = canonicalizePageUrl(queue.shift());
    const key = url.toString();
    if (seenPages.has(key)) continue;
    if (!shouldCrawlLink(url)) continue;
    seenPages.add(key);

    console.log(`Page ${seenPages.size}/${MAX_PAGES}: ${url.pathname || "/"}`);

    let res;
    try {
      res = await fetchWithRetry(key);
    } catch {
      console.warn(`Skip page (failed): ${key}`);
      continue;
    }

    const html = await res.text();
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // Enqueue more internal links
    document.querySelectorAll("a[href]").forEach((a) => {
      const u = normalizeUrl(a.getAttribute("href"), key);
      if (!u) return;
      const cu = canonicalizePageUrl(u);
      if (!shouldCrawlLink(cu)) return;
      queue.push(cu);
    });

    // Mirror this page (re-fetch inside for single codepath)
    await mirrorPage(url, seenAssets);
  }

  console.log(`Done. Mirrored ${seenPages.size} pages and ${seenAssets.size} assets into public/`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

