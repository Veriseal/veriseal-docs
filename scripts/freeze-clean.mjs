import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

const DOC_DIRS = [
  path.join(ROOT, "docs"),
  path.join(ROOT, "i18n/fr/docusaurus-plugin-content-docs/current"),
  path.join(ROOT, "i18n/ro/docusaurus-plugin-content-docs/current")
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (f.endsWith(".md") || f.endsWith(".mdx")) files.push(full);
  });
  return files;
}

function normalizeTypography(content) {
  return content
    .replace(/—/g, "-")
    .replace(/–/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u00A0/g, " ");
}

function ensureFrontmatter(filePath, content) {
  if (content.startsWith("---")) return content;

  const slug = path.basename(filePath)
    .replace(".md", "")
    .replace(".mdx", "");

  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  const fm =
`---
id: ${slug}
title: ${title}
---

`;

  return fm + content;
}

function normalizeH1(content) {
  const lines = content.split("\n");
  let h1Count = 0;

  return lines.map(line => {
    if (line.startsWith("# ")) {
      h1Count++;
      if (h1Count > 1) return "## " + line.substring(2);
    }
    return line;
  }).join("\n");
}

function cleanFile(file) {
  let content = fs.readFileSync(file, "utf8");

  content = normalizeTypography(content);
  content = ensureFrontmatter(file, content);
  content = normalizeH1(content);

  content = content.replace(/[ \t]+$/gm, "");

  fs.writeFileSync(file, content, "utf8");
}

function main() {
  const allFiles = DOC_DIRS.flatMap(dir => walk(dir));

  allFiles.forEach(file => {
    cleanFile(file);
  });

  console.log("Freeze clean completed.");
}

main();
