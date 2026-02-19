import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIRS = [
  path.join(__dirname, "../docs"),
  path.join(__dirname, "../i18n/fr/docusaurus-plugin-content-docs/current"),
  path.join(__dirname, "../i18n/ro/docusaurus-plugin-content-docs/current")
];

const REPORT_DIR = path.join(__dirname, "../reports");
const REPORT_FILE = path.join(REPORT_DIR, "full-doc-audit.txt");

function walkDir(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;

  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkDir(filepath, filelist);
    } else if (file.endsWith(".md")) {
      filelist.push(filepath);
    }
  });

  return filelist;
}

function extractLinks(content) {
  const linkRegex = /\[.*?\]\((.*?)\)/g;
  let match;
  const links = [];
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function auditFile(file, allFiles) {
  const content = fs.readFileSync(file, "utf8");
  const issues = [];

  // Empty file
  if (content.trim().length < 50) {
    issues.push("⚠ File too short or nearly empty");
  }

  // Missing H1
  if (!content.includes("# ")) {
    issues.push("⚠ Missing H1 title");
  }

  // Too many H1
  const h1Count = (content.match(/^# /gm) || []).length;
  if (h1Count > 1) {
    issues.push("⚠ Multiple H1 headings");
  }

  // Broken links
  const links = extractLinks(content);
  links.forEach(link => {
    if (link.startsWith("http")) return;
    if (!link.endsWith(".md") && !link.startsWith("/")) return;

    const resolved = allFiles.find(f =>
      f.endsWith(link.replace("./", "").replace("../", ""))
    );

    if (!resolved) {
      issues.push(`⚠ Possible broken link: ${link}`);
    }
  });

  // Language mix detection
  if (file.includes("/fr/") && content.includes("VeriSeal is")) {
    issues.push("⚠ English text found in FR file");
  }

  if (file.includes("/ro/") && content.includes("VeriSeal is")) {
    issues.push("⚠ English text found in RO file");
  }

  // Header structure depth check
  const headerLines = content.match(/^#+ /gm);
  if (headerLines) {
    headerLines.forEach(line => {
      if (line.length > 6) {
        issues.push("⚠ Header depth too large");
      }
    });
  }

  return issues;
}

function main() {
  let report = "VERISEAL FULL DOCUMENTATION AUDIT\n";
  report += "=================================\n\n";

  let totalIssues = 0;

  ROOT_DIRS.forEach(root => {
    const files = walkDir(root);

    report += `Scanning directory: ${root}\n\n`;

    files.forEach(file => {
      const issues = auditFile(file, files);

      if (issues.length > 0) {
        totalIssues++;
        report += `FILE: ${file}\n`;
        issues.forEach(i => {
          report += `   ${i}\n`;
        });
        report += "\n";
      }
    });

    report += "\n---------------------------------\n\n";
  });

  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR);
  }

  fs.writeFileSync(REPORT_FILE, report, "utf8");

  console.log("Full documentation audit complete.");
  console.log(`Total files with issues: ${totalIssues}`);
  console.log(`Report saved to: ${REPORT_FILE}`);
}

main();
