import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { JSDOM } from "jsdom";

const ORIGIN = "https://gruposequencial.com.br";
const ENTRY_URL = `${ORIGIN}/`;

const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, "public");
const outIndexHtml = path.join(repoRoot, "index.html");
const outPublicIndexHtml = path.join(publicDir, "index.html");

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

function base64Url(input) {
  return Buffer.from(input).toString("base64").replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
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
  if (type === "application/octet-stream") return "";
  return "";
}

function safeFileName(name) {
  return name.replaceAll(/[<>:"/\\|?*\x00-\x1F]/g, "_");
}

function localPathFor(url) {
  const sameOrigin = url.origin === ORIGIN;
  if (sameOrigin) {
    const p = url.pathname.startsWith("/") ? url.pathname : `/${url.pathname}`;
    return p;
  }

  // External assets can have huge querystrings; keep filenames short for Windows path limits.
  const hash = crypto.createHash("sha1").update(url.toString()).digest("hex").slice(0, 16);
  const ext = path.extname(url.pathname) || "";
  const file = `${hash}${ext || ""}`;
  return `/__mirror_external/${url.hostname}/${file}`;
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
      await new Promise((r) => setTimeout(r, 300 * (i + 1)));
    }
  }
  throw lastErr;
}

async function downloadToPublic(url, localPath, seen) {
  const key = url.toString();
  if (seen.has(key)) return;
  seen.add(key);

  const diskPath = path.join(publicDir, localPath.replace(/^\//, ""));
  try {
    await fs.access(diskPath);
    return;
  } catch {
    // continue
  }

  let res;
  try {
    res = await fetchWithRetry(url.toString());
  } catch (e) {
    console.warn(`Skip asset (failed to fetch): ${url.toString()}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  let finalDiskPath = diskPath;

  const ct = res.headers.get("content-type");
  const ext = path.extname(finalDiskPath);
  if (!ext) {
    const guessed = extFromContentType(ct);
    if (guessed) finalDiskPath += guessed;
  }

  await ensureDir(finalDiskPath);
  await fs.writeFile(finalDiskPath, buf);

  if (finalDiskPath !== diskPath) {
    // If we appended an extension, we should also update the localPath mapping for rewrites
    return `/${path.relative(publicDir, finalDiskPath).replaceAll("\\", "/")}`;
  }
  return null;
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

async function main() {
  await fs.mkdir(publicDir, { recursive: true });

  const htmlRes = await fetchWithRetry(ENTRY_URL);
  const html = await htmlRes.text();
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const seen = new Set();
  const urlRewriteMap = new Map(); // original absolute -> local (possibly updated with appended ext)
  const toDownload = [];

  const enqueueAttr = (el, attr, baseUrl = ENTRY_URL) => {
    const raw = el.getAttribute(attr);
    const u = normalizeUrl(raw, baseUrl);
    if (!u || !isHttpUrl(u.toString())) return;
    const local = localPathFor(u);
    toDownload.push({ url: u, local });
    urlRewriteMap.set(u.toString(), local);
  };

  // Stylesheets & icons
  document.querySelectorAll('link[rel="stylesheet"][href], link[rel="icon"][href], link[rel="shortcut icon"][href], link[rel="apple-touch-icon"][href]').forEach((el) => {
    enqueueAttr(el, "href");
  });

  // Scripts
  document.querySelectorAll("script[src]").forEach((el) => {
    enqueueAttr(el, "src");
  });

  // Images / media
  document.querySelectorAll("img[src], source[src], video[src], audio[src], iframe[src]").forEach((el) => {
    enqueueAttr(el, "src");
  });
  document.querySelectorAll("img[srcset], source[srcset]").forEach((el) => {
    const list = parseSrcset(el.getAttribute("srcset"), ENTRY_URL);
    list.forEach((abs) => {
      const u = new URL(abs);
      const local = localPathFor(u);
      toDownload.push({ url: u, local });
      urlRewriteMap.set(u.toString(), local);
    });
  });

  // Inline styles: url(...)
  document.querySelectorAll("[style]").forEach((el) => {
    const style = el.getAttribute("style");
    if (!style) return;
    collectCssUrls(style, ENTRY_URL).forEach((abs) => {
      const u = new URL(abs);
      const local = localPathFor(u);
      toDownload.push({ url: u, local });
      urlRewriteMap.set(u.toString(), local);
    });
  });

  // Inline <style> blocks
  const styleBlocks = [...document.querySelectorAll("style")];
  for (const styleEl of styleBlocks) {
    const cssText = styleEl.textContent || "";
    collectCssUrls(cssText, ENTRY_URL).forEach((abs) => {
      const u = new URL(abs);
      const local = localPathFor(u);
      toDownload.push({ url: u, local });
      urlRewriteMap.set(u.toString(), local);
    });
  }

  // Download + also crawl CSS for nested assets (fonts/images)
  for (let i = 0; i < toDownload.length; i++) {
    const { url, local } = toDownload[i];
    const updatedLocal = await downloadToPublic(url, local, seen);
    if (updatedLocal) urlRewriteMap.set(url.toString(), updatedLocal);

    const localUsed = updatedLocal || local;
    const ext = path.extname(localUsed).toLowerCase();
    if (ext === ".css") {
      const diskPath = path.join(publicDir, localUsed.replace(/^\//, ""));
      let cssText = "";
      try {
        cssText = await fs.readFile(diskPath, "utf8");
      } catch {
        continue;
      }
      const nested = collectCssUrls(cssText, url.toString());
      for (const abs of nested) {
        const u = new URL(abs);
        const nestedLocal = localPathFor(u);
        toDownload.push({ url: u, local: nestedLocal });
        urlRewriteMap.set(u.toString(), nestedLocal);
      }
    }
  }

  // Rewrite DOM attributes based on collected map
  const rewriteAttr = (el, attr) => {
    const raw = el.getAttribute(attr);
    const u = normalizeUrl(raw, ENTRY_URL);
    if (!u || !isHttpUrl(u.toString())) return;
    const mapped = urlRewriteMap.get(u.toString());
    if (mapped) el.setAttribute(attr, mapped);
  };

  document.querySelectorAll('link[href], a[href], script[src], img[src], source[src], video[src], audio[src], iframe[src]').forEach((el) => {
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
        const u = normalizeUrl(u0, ENTRY_URL);
        if (!u || !isHttpUrl(u.toString())) return part;
        const mapped = urlRewriteMap.get(u.toString());
        return mapped ? [mapped, ...rest].join(" ") : part;
      })
      .join(", ");
    el.setAttribute("srcset", rebuilt);
  });

  // Garantir que todos os links internos apontem para o host local (e não para o domínio original)
  document.querySelectorAll("a[href]").forEach((a) => {
    const u = normalizeUrl(a.getAttribute("href"), ENTRY_URL);
    if (!u) return;
    if (u.origin === ORIGIN) {
      a.setAttribute("href", `${u.pathname}${u.search}${u.hash}`);
    }
  });

  // Remove Vite/React root mount if present (we serve the mirrored HTML as-is)
  const viteRoot = document.querySelector("#root");
  if (viteRoot) {
    viteRoot.removeAttribute("id");
  }
  document.querySelectorAll('script[src="/src/main.tsx"], script[src*="/@vite"]').forEach((el) => el.remove());

  // Serialize
  const finalHtml = dom.serialize();
  await fs.writeFile(outIndexHtml, finalHtml, "utf8");
  await fs.writeFile(outPublicIndexHtml, finalHtml, "utf8");

  // Helpful summary
  const total = seen.size;
  console.log(`Mirrored ${total} assets into public/ and updated index.html + public/index.html`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

