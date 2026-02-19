// scripts/translate_docs.mjs
// Usage:
//   $env:DEEPL_AUTH_KEY="dab7cf77-2293-4e76-992e-4d5531500684:fx"
//   node scripts/translate_docs.mjs fr
//   node scripts/translate_docs.mjs ro
//
// Translates docs/*.md into i18n/<locale>/docusaurus-plugin-content-docs/current/*
// - Preserves frontmatter keys (id, sidebar_label, slug, etc.)
// - Translates frontmatter "title" (optional) + markdown body
// - Protects code blocks, inline code, URLs, and markdown links targets

import fs from "fs";
import path from "path";
import fg from "fast-glob";
import matter from "gray-matter";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "docs");

const locale = process.argv[2];
if (!locale || !["fr", "ro"].includes(locale)) {
  console.error("Usage: node scripts/translate_docs.mjs <fr|ro>");
  process.exit(1);
}

const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY;
if (!DEEPL_AUTH_KEY) {
  console.error("Missing DEEPL_AUTH_KEY env var. Example:");
  console.error('$env:DEEPL_AUTH_KEY="YOUR_DEEPL_KEY"');
  process.exit(1);
}

// DeepL target lang codes
const TARGET_LANG = locale === "fr" ? "FR" : "RO";

// Output path that Docusaurus expects
const OUT_DIR = path.join(
  ROOT,
  "i18n",
  locale,
  "docusaurus-plugin-content-docs",
  "current"
);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFileUtf8(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, { encoding: "utf8" });
}

function readFileUtf8(p) {
  return fs.readFileSync(p, { encoding: "utf8" });
}

/**
 * Protect parts we should NOT translate:
 * - fenced code blocks ```...```
 * - inline code `...`
 * - URLs
 * - markdown link targets (the "(...)" part) while allowing link text to be translated
 */
function protectMarkdown(input) {
  let text = input;
  const vault = [];
  const put = (chunk) => {
    const token = `__VS_PROTECT_${vault.length}__`;
    vault.push(chunk);
    return token;
  };

  // 1) Fenced code blocks
  text = text.replace(/```[\s\S]*?```/g, (m) => put(m));

  // 2) Inline code
  text = text.replace(/`[^`]*`/g, (m) => put(m));

  // 3) Raw URLs
  text = text.replace(
    /\bhttps?:\/\/[^\s)]+/g,
    (m) => put(m)
  );

  // 4) Markdown link targets: [text](target)
  // Protect only "(target)" so that link text can be translated safely.
  text = text.replace(/\[[^\]]*\]\(([^)]+)\)/g, (m, target) => {
    const protectedTarget = put(`(${target})`);
    // rebuild: keep [text] as-is for translation, inject protected (target)
    return m.replace(`(${target})`, protectedTarget);
  });

  return { text, vault };
}

function unprotectMarkdown(input, vault) {
  let text = input;
  for (let i = 0; i < vault.length; i++) {
    const token = `__VS_PROTECT_${i}__`;
    text = text.split(token).join(vault[i]);
  }
  return text;
}

async function deeplTranslate(text) {
  // DeepL API supports large texts but has limits; keep chunks safe
  // We'll chunk by ~4500 chars to be conservative.
  const chunks = [];
  const maxLen = 4500;
  let cursor = 0;
  while (cursor < text.length) {
    chunks.push(text.slice(cursor, cursor + maxLen));
    cursor += maxLen;
  }

  const out = [];
  for (const chunk of chunks) {
    const res = await fetch("https://api-free.deepl.com/v2/translate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `DeepL-Auth-Key ${DEEPL_AUTH_KEY}`
  },
  body: JSON.stringify({
    text: [chunk],
    target_lang: TARGET_LANG
  }),
});

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`DeepL error ${res.status}: ${body}`);
    }

    const data = await res.json();
    const translated = (data?.translations || [])
      .map((t) => t.text)
      .join("\n");
    out.push(translated);
  }

  return out.join("");
}

function shouldTranslateFrontmatterTitle(data) {
  return typeof data?.title === "string" && data.title.trim().length > 0;
}

function rebuildFrontmatter(data) {
  // Keep original keys; do NOT translate ids/slugs/sidebars unless you explicitly want to later.
  // gray-matter will serialize as YAML automatically.
  // We want stable ordering? Not critical; but keep it minimal.
  return matter.stringify("", data).trimEnd();
}

async function translateFile(srcPath) {
  const rel = path.relative(SRC_DIR, srcPath); // e.g. "whitepaper/how-it-works.md"
  const outPath = path.join(OUT_DIR, rel);

  const raw = readFileUtf8(srcPath);
  const parsed = matter(raw);
  const fm = parsed.data || {};
  const body = parsed.content || "";

  // Protect + translate body
  const protectedBody = protectMarkdown(body);
  const translatedBodyProtected = await deeplTranslate(protectedBody.text);
  const translatedBody = unprotectMarkdown(translatedBodyProtected, protectedBody.vault);

  // Translate title if present
  let newFm = { ...fm };
  if (shouldTranslateFrontmatterTitle(fm)) {
    // Protect nothing in title; but keep it short
    const translatedTitle = await deeplTranslate(fm.title);
    newFm.title = translatedTitle.trim();
  }

  // Rebuild file with frontmatter + body
  const fmBlock = rebuildFrontmatter(newFm);
  const final =
    fmBlock.length > 0
      ? `${fmBlock}\n\n${translatedBody.trimStart()}`
      : translatedBody;

  writeFileUtf8(outPath, final);
  return { rel, outPath };
}

async function main() {
  console.log(`Translating docs -> locale: ${locale} (${TARGET_LANG})`);
  console.log(`Source: ${SRC_DIR}`);
  console.log(`Output: ${OUT_DIR}`);

  const files = await fg(["**/*.md", "**/*.mdx"], {
    cwd: SRC_DIR,
    absolute: true,
  });

  if (files.length === 0) {
    console.error("No .md/.mdx files found in /docs");
    process.exit(1);
  }

  ensureDir(OUT_DIR);

  let ok = 0;
  for (const f of files) {
    try {
      const res = await translateFile(f);
      ok++;
      console.log(`OK  ${res.rel}`);
    } catch (e) {
      console.error(`FAIL ${path.relative(SRC_DIR, f)} -> ${e.message}`);
      process.exit(1);
    }
  }

  console.log(`\nDone. Translated ${ok} files to ${OUT_DIR}`);
  console.log(`Now run: npm run build (or npm run start)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
