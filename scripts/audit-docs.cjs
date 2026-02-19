/* ============================================================
   VeriSeal Docs — Institutional / EU Funding Grade Audit
   - CommonJS (.cjs) to avoid ESM/module issues on Windows
   - Scans /docs and /i18n/<lang>/docusaurus-plugin-content-docs/current
   - Outputs:
       - audit_report.md (human)
       - audit_report.json (machine)
============================================================ */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    return null;
  }
}

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function walkDir(dir, opts = {}, out = []) {
  const {
    includeExt = [".md", ".mdx"],
    excludeDirRegex = /(node_modules|\.docusaurus|build|\.git|\.cache)/i,
  } = opts;

  if (!exists(dir) || !isDir(dir)) return out;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (excludeDirRegex && excludeDirRegex.test(full)) continue;
      walkDir(full, opts, out);
      continue;
    }
    if (ent.isFile()) {
      const ext = path.extname(ent.name).toLowerCase();
      if (includeExt.includes(ext)) out.push(full);
    }
  }
  return out;
}

function sha256(text) {
  return crypto.createHash("sha256").update(text, "utf8").digest("hex");
}

function normalizeNewlines(s) {
  return s.replace(/\r\n/g, "\n");
}

function stripCodeBlocks(md) {
  // remove fenced code blocks (```...```) to avoid false positives in checks
  return md.replace(/```[\s\S]*?```/g, "");
}

function getHeadings(md) {
  const lines = md.split("\n");
  const headings = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+(.+?)\s*$/);
    if (m) {
      headings.push({
        level: m[1].length,
        text: m[2].trim(),
        line: i + 1,
      });
    }
  }
  return headings;
}

function countH1(md) {
  const headings = getHeadings(md);
  return headings.filter((h) => h.level === 1).length;
}

function headingJumps(headings) {
  // detect jumps like H2 -> H4 without H3
  const jumps = [];
  let prev = null;
  for (const h of headings) {
    if (!prev) {
      prev = h;
      continue;
    }
    if (h.level > prev.level + 1) {
      jumps.push({
        from: prev,
        to: h,
      });
    }
    prev = h;
  }
  return jumps;
}

function hasFrontMatter(md) {
  // simplistic YAML frontmatter detection
  const trimmed = md.trimStart();
  if (!trimmed.startsWith("---")) return false;
  const end = trimmed.indexOf("\n---", 3);
  return end !== -1;
}

function extractLinks(md) {
  // Markdown inline links: [text](target)
  // Ignore images ![alt](...)
  const links = [];
  const re = /(?<!!)\[[^\]]*?\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(md)) !== null) {
    const raw = (m[1] || "").trim();
    // ignore mailto, http(s), hash-only anchors
    if (/^(https?:\/\/|mailto:)/i.test(raw)) continue;
    if (raw.startsWith("#")) continue;
    // remove possible title: (path "title")
    const cleaned = raw.split(/\s+"/)[0].trim();
    links.push(cleaned);
  }
  return links;
}

function resolveDocLink(fromFile, target, docsRoot) {
  // Supports:
  // - relative links: ../x.md, ./x, x.md
  // - /docs/... links (best effort): map to docsRoot/<...>.md or .mdx
  // - no extension: assume .md
  const fromDir = path.dirname(fromFile);

  // Strip anchors
  const noAnchor = target.split("#")[0];

  // /docs/...
  if (noAnchor.startsWith("/docs/")) {
    const rel = noAnchor.replace(/^\/docs\//, "");
    const base = path.join(docsRoot, rel);
    const candidates = [
      base,
      base + ".md",
      base + ".mdx",
      path.join(base, "index.md"),
      path.join(base, "index.mdx"),
    ];
    for (const c of candidates) if (exists(c)) return c;
    return null;
  }

  // relative
  const baseRel = path.resolve(fromDir, noAnchor);
  const candidates = [
    baseRel,
    baseRel + ".md",
    baseRel + ".mdx",
    baseRel.replace(/\/$/, "") + ".md",
    baseRel.replace(/\/$/, "") + ".mdx",
    path.join(baseRel, "index.md"),
    path.join(baseRel, "index.mdx"),
  ];
  for (const c of candidates) if (exists(c)) return c;
  return null;
}

function findPlaceholders(mdRaw) {
  const md = stripCodeBlocks(mdRaw);
  const hits = [];
  const patterns = [
    { key: "TODO", re: /\bTODO\b|À faire|A faire|To do/i },
    { key: "TEMPLATE", re: /\btemplate\b|_sector-template|Replace with your content|Remplacer par votre contenu/i },
    { key: "LOREM", re: /\blorem ipsum\b/i },
    { key: "PLACEHOLDER", re: /\bplaceholder\b/i },
    { key: "DUMMY", re: /\bdummy\b/i },
  ];
  for (const p of patterns) {
    if (p.re.test(md)) hits.push(p.key);
  }
  return hits;
}

function institutionalToneHeuristics(mdRaw) {
  // Heuristics only: flags phrases that often reduce “institutional grade”
  const md = stripCodeBlocks(mdRaw);
  const flags = [];

  const tooMarketing = /\b(revolutionary|game-?changer|disrupt|unprecedented|world-?class|best-in-class|magic)\b/i;
  const tooCasual = /\b(awesome|super easy|just|simple as that)\b/i;

  if (tooMarketing.test(md)) flags.push("MARKETING_LANGUAGE");
  if (tooCasual.test(md)) flags.push("CASUAL_LANGUAGE");

  // missing citations/anchors: if document makes many "claims" but no numbers/standards mentions
  // (very rough)
  const claimVerbs = /\b(guarantees|ensures|proves|prevents|eliminates|solves)\b/i;
  const hasStandards = /\b(eidas|etsi|iso|nist|enisa|gdpr|psd2|dora|basel|swift)\b/i;
  const hasNumbers = /\b\d{2,}\b/;

  if (claimVerbs.test(md) && !hasStandards.test(md) && !hasNumbers.test(md)) {
    flags.push("CLAIMS_WEAKLY_SUPPORTED");
  }

  return flags;
}

function fileStats(mdRaw) {
  const md = normalizeNewlines(mdRaw);
  const lines = md.split("\n").length;
  const words = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_\-\[\]\(\)!]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;

  return { lines, words };
}

function compareTranslation(enText, trText) {
  // Heuristics: if identical hash OR very high similarity, likely not translated
  const a = normalizeNewlines(enText).trim();
  const b = normalizeNewlines(trText).trim();

  if (!a || !b) return { status: "EMPTY" };

  if (sha256(a) === sha256(b)) return { status: "IDENTICAL" };

  // quick similarity: ratio of equal characters at same index (rough)
  const n = Math.min(a.length, b.length);
  let same = 0;
  for (let i = 0; i < n; i++) if (a[i] === b[i]) same++;
  const sim = n === 0 ? 0 : same / n;

  if (sim > 0.92) return { status: "NEAR_IDENTICAL", similarity: Number(sim.toFixed(3)) };

  return { status: "OK", similarity: Number(sim.toFixed(3)) };
}

function rel(p, root) {
  return path.relative(root, p).replace(/\\/g, "/");
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFileUtf8(p, content) {
  fs.writeFileSync(p, content, "utf8");
}

function parseArgs(argv) {
  const args = {
    root: process.cwd(),
    docs: "docs",
    i18n: "i18n",
    langs: ["fr", "ro"],
    outMd: "audit_report.md",
    outJson: "audit_report.json",
    failOn: [], // e.g. ["BROKEN_LINKS"]
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];

    if (a === "--root" && next) { args.root = next; i++; continue; }
    if (a === "--docs" && next) { args.docs = next; i++; continue; }
    if (a === "--i18n" && next) { args.i18n = next; i++; continue; }
    if (a === "--langs" && next) { args.langs = next.split(",").map(s => s.trim()).filter(Boolean); i++; continue; }
    if (a === "--out-md" && next) { args.outMd = next; i++; continue; }
    if (a === "--out-json" && next) { args.outJson = next; i++; continue; }
    if (a === "--fail-on" && next) { args.failOn = next.split(",").map(s => s.trim()).filter(Boolean); i++; continue; }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);

  const root = path.resolve(args.root);
  const docsRoot = path.join(root, args.docs);
  const i18nRoot = path.join(root, args.i18n);

  if (!exists(docsRoot)) {
    console.error(`ERROR: docs root not found: ${docsRoot}`);
    process.exit(2);
  }

  const docsFiles = walkDir(docsRoot, { includeExt: [".md", ".mdx"] });

  const report = {
    meta: {
      generated_at: new Date().toISOString(),
      root,
      docsRoot,
      i18nRoot,
      langs: args.langs,
      counts: {
        docs_files: docsFiles.length,
      },
    },
    docs: [],
    i18n: {},
    summary: {
      multiple_h1: 0,
      heading_jumps: 0,
      broken_links: 0,
      placeholder_hits: 0,
      institutional_flags: 0,
      missing_frontmatter: 0,
      very_short_pages: 0,
      i18n_missing_files: 0,
      i18n_identical_to_en: 0,
    },
  };

  // Map EN docs content by relative path
  const enMap = new Map();
  for (const f of docsFiles) {
    const r = rel(f, docsRoot);
    const txt = safeRead(f) ?? "";
    enMap.set(r, txt);
  }

  // --- Scan EN docs ---
  for (const f of docsFiles) {
    const txt = safeRead(f) ?? "";
    const headings = getHeadings(txt);
    const h1 = headings.filter(h => h.level === 1);
    const jumps = headingJumps(headings);
    const links = extractLinks(txt);

    const broken = [];
    for (const l of links) {
      const resolved = resolveDocLink(f, l, docsRoot);
      if (!resolved) broken.push(l);
    }

    const placeholders = findPlaceholders(txt);
    const toneFlags = institutionalToneHeuristics(txt);
    const stats = fileStats(txt);

    const missingFrontMatter = !hasFrontMatter(txt);
    const veryShort = stats.words < 220; // heuristic threshold

    if (h1.length > 1) report.summary.multiple_h1++;
    report.summary.heading_jumps += jumps.length;
    report.summary.broken_links += broken.length;
    report.summary.placeholder_hits += placeholders.length;
    report.summary.institutional_flags += toneFlags.length;
    if (missingFrontMatter) report.summary.missing_frontmatter++;
    if (veryShort) report.summary.very_short_pages++;

    report.docs.push({
      file: rel(f, root),
      rel_to_docs: rel(f, docsRoot),
      stats,
      structure: {
        h1_count: h1.length,
        heading_jumps: jumps.map(j => ({
          from: { level: j.from.level, text: j.from.text, line: j.from.line },
          to: { level: j.to.level, text: j.to.text, line: j.to.line },
        })),
        missing_frontmatter: missingFrontMatter,
      },
      links: {
        total: links.length,
        broken,
      },
      quality: {
        placeholders,
        institutional_flags: toneFlags,
        very_short: veryShort,
      },
    });
  }

  // --- Scan i18n for each language ---
  for (const lang of args.langs) {
    const langRoot = path.join(
      i18nRoot,
      lang,
      "docusaurus-plugin-content-docs",
      "current"
    );

    report.i18n[lang] = {
      root: rel(langRoot, root),
      exists: exists(langRoot),
      missing_files: [],
      identical_to_en: [],
      near_identical_to_en: [],
      files_scanned: 0,
      multiple_h1: 0,
      broken_links: 0,
      placeholder_hits: 0,
    };

    if (!exists(langRoot)) continue;

    // Build list of translated files that exist
    const trFiles = walkDir(langRoot, { includeExt: [".md", ".mdx"] });
    report.i18n[lang].files_scanned = trFiles.length;

    // Check missing translations: any EN doc missing in lang
    for (const r of enMap.keys()) {
      const cand1 = path.join(langRoot, r);
      const cand2 = cand1.replace(/\.mdx?$/i, ".md");
      const cand3 = cand1.replace(/\.mdx?$/i, ".mdx");

      if (!exists(cand1) && !exists(cand2) && !exists(cand3)) {
        report.i18n[lang].missing_files.push(r);
        report.summary.i18n_missing_files++;
      }
    }

    // Check quality + “looks untranslated” (identical/near identical)
    for (const f of trFiles) {
      const r = rel(f, langRoot);
      const trTxt = safeRead(f) ?? "";
      const enTxt = enMap.get(r) ?? "";

      const cmp = compareTranslation(enTxt, trTxt);
      if (cmp.status === "IDENTICAL") {
        report.i18n[lang].identical_to_en.push(r);
        report.summary.i18n_identical_to_en++;
      } else if (cmp.status === "NEAR_IDENTICAL") {
        report.i18n[lang].near_identical_to_en.push({ file: r, similarity: cmp.similarity });
        report.summary.i18n_identical_to_en++;
      }

      // Structure checks
      const h1c = countH1(trTxt);
      if (h1c > 1) report.i18n[lang].multiple_h1++;

      // Link checks (within lang tree, but resolve using docsRoot too)
      const links = extractLinks(trTxt);
      let broken = 0;
      for (const l of links) {
        const resolved =
          resolveDocLink(f, l, docsRoot) ||
          resolveDocLink(f, l, langRoot); // allow relative inside current/
        if (!resolved) broken++;
      }
      report.i18n[lang].broken_links += broken;

      const placeholders = findPlaceholders(trTxt);
      report.i18n[lang].placeholder_hits += placeholders.length;
    }
  }

  // --- Produce Markdown report ---
  const lines = [];

  lines.push(`# VeriSeal Docs — Institutional / EU Funding Grade Audit`);
  lines.push(`Generated: ${report.meta.generated_at}`);
  lines.push(`Root: \`${report.meta.root}\``);
  lines.push(`Docs: \`${report.meta.docsRoot}\``);
  lines.push(`i18n: \`${report.meta.i18nRoot}\``);
  lines.push(`Languages: ${report.meta.langs.join(", ")}`);
  lines.push("");

  lines.push(`## Executive summary`);
  lines.push(`- Docs files scanned: **${report.meta.counts.docs_files}**`);
  lines.push(`- Multiple H1 pages: **${report.summary.multiple_h1}**`);
  lines.push(`- Heading level jumps: **${report.summary.heading_jumps}**`);
  lines.push(`- Broken internal links: **${report.summary.broken_links}**`);
  lines.push(`- Placeholder markers (TODO/template/etc.): **${report.summary.placeholder_hits}**`);
  lines.push(`- “Non-institutional” tone flags (heuristic): **${report.summary.institutional_flags}**`);
  lines.push(`- Missing frontmatter: **${report.summary.missing_frontmatter}**`);
  lines.push(`- Very short pages (<220 words): **${report.summary.very_short_pages}**`);
  lines.push(`- i18n missing files (sum langs): **${report.summary.i18n_missing_files}**`);
  lines.push(`- i18n identical/near-identical to EN: **${report.summary.i18n_identical_to_en}**`);
  lines.push("");

  lines.push(`## Priority fixes (recommended order)`);
  lines.push(`1) **Multiple H1** → keep exactly **one** H1 per page (use H2/H3 for sections).`);
  lines.push(`2) **Broken internal links** → fix or remove; EU-grade docs must be navigable end-to-end.`);
  lines.push(`3) **Placeholders/TODO** → must be eliminated or isolated in clearly labeled draft areas.`);
  lines.push(`4) **i18n parity** → every EN doc should exist in FR/RO (even if some are staged).`);
  lines.push("");

  lines.push(`## i18n status`);
  for (const lang of report.meta.langs) {
    const s = report.i18n[lang];
    lines.push(`### ${lang.toUpperCase()}`);
    if (!s || !s.exists) {
      lines.push(`- Not found: \`${path.join("i18n", lang, "docusaurus-plugin-content-docs", "current")}\``);
      lines.push("");
      continue;
    }
    lines.push(`- Files scanned: **${s.files_scanned}**`);
    lines.push(`- Missing files vs EN: **${s.missing_files.length}**`);
    lines.push(`- Identical to EN: **${s.identical_to_en.length}**`);
    lines.push(`- Near-identical to EN: **${s.near_identical_to_en.length}**`);
    lines.push(`- Multiple H1 (within ${lang}): **${s.multiple_h1}**`);
    lines.push(`- Broken links (within ${lang}): **${s.broken_links}**`);
    lines.push(`- Placeholder hits (within ${lang}): **${s.placeholder_hits}**`);
    lines.push("");

    // show top 20 missing files to keep report short
    if (s.missing_files.length) {
      lines.push(`**Top missing files (first 20):**`);
      for (const f of s.missing_files.slice(0, 20)) lines.push(`- \`${f}\``);
      if (s.missing_files.length > 20) lines.push(`- … (${s.missing_files.length - 20} more)`);
      lines.push("");
    }

    if (s.identical_to_en.length) {
      lines.push(`**Identical to EN (first 20):**`);
      for (const f of s.identical_to_en.slice(0, 20)) lines.push(`- \`${f}\``);
      if (s.identical_to_en.length > 20) lines.push(`- … (${s.identical_to_en.length - 20} more)`);
      lines.push("");
    }
  }

  lines.push(`## Detailed issues (EN docs)`);
  lines.push(`> Tip: search for "H1x" / "BROKEN" / "TODO" in this section.`);
  lines.push("");

  for (const d of report.docs) {
    const issues = [];

    if (d.structure.h1_count > 1) issues.push(`H1x${d.structure.h1_count}`);
    if (d.structure.heading_jumps.length) issues.push(`JUMPSx${d.structure.heading_jumps.length}`);
    if (d.links.broken.length) issues.push(`BROKENx${d.links.broken.length}`);
    if (d.quality.placeholders.length) issues.push(`PLACEHOLDERS:${d.quality.placeholders.join(",")}`);
    if (d.quality.institutional_flags.length) issues.push(`TONE:${d.quality.institutional_flags.join(",")}`);
    if (d.structure.missing_frontmatter) issues.push(`NO_FRONTMATTER`);
    if (d.quality.very_short) issues.push(`VERY_SHORT`);

    if (!issues.length) continue;

    lines.push(`### ${d.rel_to_docs}`);
    lines.push(`- File: \`${d.file}\``);
    lines.push(`- Words: **${d.stats.words}**, Lines: **${d.stats.lines}**`);
    lines.push(`- Issues: **${issues.join(" | ")}**`);

    if (d.structure.heading_jumps.length) {
      lines.push(`- Heading jumps:`);
      for (const j of d.structure.heading_jumps.slice(0, 6)) {
        lines.push(`  - L${j.from.level} → L${j.to.level} (line ${j.to.line}): "${j.from.text}" → "${j.to.text}"`);
      }
      if (d.structure.heading_jumps.length > 6) lines.push(`  - … (${d.structure.heading_jumps.length - 6} more)`);
    }

    if (d.links.broken.length) {
      lines.push(`- Broken links (first 10):`);
      for (const l of d.links.broken.slice(0, 10)) lines.push(`  - \`${l}\``);
      if (d.links.broken.length > 10) lines.push(`  - … (${d.links.broken.length - 10} more)`);
    }

    lines.push("");
  }

  // Write outputs
  ensureDir(path.dirname(path.join(root, args.outMd)));
  writeFileUtf8(path.join(root, args.outMd), lines.join("\n"));
  writeFileUtf8(path.join(root, args.outJson), JSON.stringify(report, null, 2));

  console.log(`OK — audit written to:`);
  console.log(`- ${path.join(root, args.outMd)}`);
  console.log(`- ${path.join(root, args.outJson)}`);

  // Optional fail conditions for CI
  const failSet = new Set(args.failOn.map(s => s.toUpperCase()));
  let shouldFail = false;

  if (failSet.has("MULTIPLE_H1") && report.summary.multiple_h1 > 0) shouldFail = true;
  if (failSet.has("BROKEN_LINKS") && report.summary.broken_links > 0) shouldFail = true;
  if (failSet.has("I18N_MISSING") && report.summary.i18n_missing_files > 0) shouldFail = true;
  if (failSet.has("PLACEHOLDERS") && report.summary.placeholder_hits > 0) shouldFail = true;

  process.exit(shouldFail ? 1 : 0);
}

main();
