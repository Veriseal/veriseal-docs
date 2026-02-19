import fs from "fs";
import path from "path";
import crypto from "crypto";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "docs");

const EXCLUDE_DIR_RE = /(\\|\/)(node_modules|\.docusaurus|build|i18n)(\\|\/)/i;

const TARGET_SECTOR_DIR = path.join(DOCS_DIR, "sectors");

// ------------------------------------------------------------
// CANONICAL INSERT BLOCKS (C)
// ------------------------------------------------------------
const SCOPE_HEADING = "## Scope Clarification";
const SCOPE_BLOCK = `
## Scope Clarification

The scenarios presented below illustrate representative high-risk situations within this sector where document integrity, timestamp certainty, and verifiable authenticity are critical.

They are not exhaustive.

VeriSeal is not designed to solve a single isolated use case.  
It provides a structural cryptographic integrity layer applicable to any digital document, event record, media capture, or transactional evidence requiring long-term verifiability.

The examples below represent structural risk categories — not functional limits.
`.trim() + "\n";

const APPLICABILITY_HEADING = "## Structural Applicability";
const APPLICABILITY_BLOCK = `
## Structural Applicability

Beyond the examples described above, VeriSeal applies to any digitally generated evidence within this sector, including but not limited to:

- contractual documentation  
- compliance reporting  
- internal audit trails  
- regulatory disclosures  
- transactional attestations  
- cross-institutional exchanges  
- customer-generated digital evidence  
- time-sensitive records  

VeriSeal’s role is infrastructural, not situational.

Its function is to establish verifiable integrity, deterministic timestamping, and independent public verification across all digital evidence categories within the sector.
`.trim() + "\n";

// Optional small “open” sentence (kept short to avoid rewriting tone everywhere)
const OPENING_SENTENCE = `VeriSeal provides a sector-agnostic cryptographic integrity layer for verifiable digital evidence.`;

// ------------------------------------------------------------
// UTIL
// ------------------------------------------------------------
function sha256(s) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex");
}

function isMarkdown(file) {
  return file.endsWith(".md") || file.endsWith(".mdx");
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (EXCLUDE_DIR_RE.test(full)) continue;
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && isMarkdown(full)) out.push(full);
  }
  return out;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function hasHeading(md, heading) {
  return md.includes(`\n${heading}\n`) || md.startsWith(`${heading}\n`) || md.includes(`\r\n${heading}\r\n`);
}

function normalizeNewlines(s) {
  return s.replace(/\r\n/g, "\n");
}

// Insert after the first H1 block (after first "# " header paragraph area)
function insertScopeAfterIntro(md) {
  const n = normalizeNewlines(md);

  if (hasHeading(n, SCOPE_HEADING)) return { changed: false, content: md };

  // Find first H1 line
  const lines = n.split("\n");
  let h1Index = lines.findIndex(l => l.startsWith("# "));
  if (h1Index === -1) {
    // no H1 -> prepend
    const out = `${SCOPE_BLOCK}\n\n${n}`;
    return { changed: true, content: out };
  }

  // Insert after first section intro paragraph block:
  // We insert after the first blank line following H1 + any immediate blank lines + first paragraph chunk.
  // Conservative: insert after first 8–30 lines max, before the first "## " if present.
  let insertAt = -1;

  // Find first "## " after H1
  let firstH2 = lines.findIndex((l, idx) => idx > h1Index && l.startsWith("## "));
  if (firstH2 === -1) firstH2 = lines.length;

  // Insert just before firstH2, but ensure there is at least some intro text;
  // If H1 immediately followed by H2, inject after H1 line.
  if (firstH2 <= h1Index + 2) {
    insertAt = h1Index + 1;
  } else {
    insertAt = firstH2; // before first H2
  }

  const before = lines.slice(0, insertAt).join("\n").trimEnd();
  const after = lines.slice(insertAt).join("\n").trimStart();

  const out = `${before}\n\n${SCOPE_BLOCK}\n\n${after}\n`;
  return { changed: true, content: out };
}

function appendApplicability(md) {
  const n = normalizeNewlines(md);

  if (hasHeading(n, APPLICABILITY_HEADING)) return { changed: false, content: md };

  const trimmed = n.trimEnd();
  const out = `${trimmed}\n\n${APPLICABILITY_BLOCK}\n`;
  return { changed: true, content: out };
}

function ensureOpeningSentence(md) {
  const n = normalizeNewlines(md);

  // Don’t force if already present
  if (n.includes(OPENING_SENTENCE)) return { changed: false, content: md };

  // Place under H1, before first H2 (or after H1 line if no H2)
  const lines = n.split("\n");
  const h1Index = lines.findIndex(l => l.startsWith("# "));
  if (h1Index === -1) return { changed: false, content: md };

  // Find first non-empty after h1
  let cursor = h1Index + 1;
  while (cursor < lines.length && lines[cursor].trim() === "") cursor++;

  // If the immediate next non-empty is already a paragraph, we prepend the opening sentence only if that paragraph doesn’t already define similarly.
  // Keep it simple: insert OPENING_SENTENCE as first paragraph line.
  const insertion = `${OPENING_SENTENCE}\n`;
  const outLines = [
    ...lines.slice(0, h1Index + 1),
    "",
    insertion.trimEnd(),
    "",
    ...lines.slice(h1Index + 1),
  ];

  return { changed: true, content: outLines.join("\n") };
}

// ------------------------------------------------------------
// MAIN — Option C: Idempotent “Final EN freeze”
// ------------------------------------------------------------
function main() {
  const all = walk(DOCS_DIR);
  const sectors = all.filter(f => f.startsWith(TARGET_SECTOR_DIR + path.sep));

  if (sectors.length === 0) {
    console.error("No sector files found under docs/sectors.");
    process.exit(1);
  }

  const report = [];
  let changedCount = 0;

  for (const file of sectors) {
    const original = read(file);
    let md = original;

    // Only apply to EN source docs (docs/ is EN in your setup)
    // Step 1: ensure opening sentence (light touch)
    const r1 = ensureOpeningSentence(md);
    md = r1.content;

    // Step 2: insert scope clarification (if absent)
    const r2 = insertScopeAfterIntro(md);
    md = r2.content;

    // Step 3: append structural applicability (if absent)
    const r3 = appendApplicability(md);
    md = r3.content;

    const changed = (sha256(normalizeNewlines(original)) !== sha256(normalizeNewlines(md)));
    if (changed) {
      write(file, md);
      changedCount++;
      report.push({ file: path.relative(ROOT, file), updated: true });
    } else {
      report.push({ file: path.relative(ROOT, file), updated: false });
    }
  }

  // Write report
  const outPath = path.join(ROOT, "scripts", "finalize-docs-EN.report.json");
  fs.writeFileSync(outPath, JSON.stringify({
    ts: new Date().toISOString(),
    updated_files: report.filter(x => x.updated).length,
    total_sector_files: report.length,
    details: report
  }, null, 2), "utf8");

  console.log(`Done. Updated ${changedCount}/${report.length} sector files.`);
  console.log(`Report: ${outPath}`);
}

main();
