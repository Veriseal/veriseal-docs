import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, "..");

const DOC_DIRS = [
  path.join(PROJECT_ROOT, "docs"),
  path.join(PROJECT_ROOT, "i18n/fr/docusaurus-plugin-content-docs/current"),
  path.join(PROJECT_ROOT, "i18n/ro/docusaurus-plugin-content-docs/current")
];

const SIDEBAR_PATH = path.join(PROJECT_ROOT, "sidebars.js");
const REPORT_DIR = path.join(PROJECT_ROOT, "reports");
const REPORT_FILE = path.join(REPORT_DIR, "full-doc-audit-v2.txt");

function walkDir(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;

  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkDir(filepath, filelist);
    } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
      filelist.push(filepath);
    }
  });

  return filelist;
}

function extractLinks(content) {
  const regex = /\[.*?\]\((.*?)\)/g;
  let match;
  const links = [];
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function extractFrontmatter(content) {
  const match = content.match(/^---([\s\S]*?)---/);
  if (!match) return null;
  return match[1];
}

function extractId(frontmatter) {
  if (!frontmatter) return null;
  const match = frontmatter.match(/^id:\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

function hasNonAscii(content) {
  for (let i = 0; i < content.length; i++) {
    if (content.charCodeAt(i) > 127) return true;
  }
  return false;
}

function auditFile(file, allFiles) {
  const content = fs.readFileSync(file, "utf8");
  const issues = [];

  if (content.trim().length < 100) {
    issues.push("CRITICAL: File too short");
  }

  const h1Matches = content.match(/^# /gm) || [];
  if (h1Matches.length === 0) {
    issues.push("CRITICAL: Missing H1");
  }
  if (h1Matches.length > 1) {
    issues.push("WARNING: Multiple H1 headings");
  }

  const links = extractLinks(content);
  links.forEach(link => {
    if (link.startsWith("http") || link.startsWith("#")) return;
    if (link.startsWith("/")) return;

    const clean = link.replace(".md", "").replace("./", "");
    const match = allFiles.find(f =>
      f.endsWith(clean) ||
      f.endsWith(clean + ".md") ||
      f.endsWith(clean + ".mdx")
    );

    if (!match) {
      issues.push(`WARNING: Possible broken link -> ${link}`);
    }
  });

  if (file.includes("/fr/") && content.includes("VeriSeal provides")) {
    issues.push("WARNING: English text detected in FR file");
  }

  if (file.includes("/ro/") && content.includes("VeriSeal provides")) {
    issues.push("WARNING: English text detected in RO file");
  }

  if (hasNonAscii(content)) {
    issues.push("WARNING: Non-ASCII characters detected");
  }

  const frontmatter = extractFrontmatter(content);
  if (!frontmatter) {
    issues.push("WARNING: Missing frontmatter block");
  }

  return issues;
}

function checkDuplicateIds(files) {
  const idMap = {};
  const duplicates = [];

  files.forEach(file => {
    const content = fs.readFileSync(file, "utf8");
    const fm = extractFrontmatter(content);
    const id = extractId(fm);

    if (id) {
      if (idMap[id]) {
        duplicates.push(`Duplicate id "${id}" in:\n - ${idMap[id]}\n - ${file}`);
      } else {
        idMap[id] = file;
      }
    }
  });

  return duplicates;
}

function checkSidebarIntegrity(files) {
  if (!fs.existsSync(SIDEBAR_PATH)) return [];

  const sidebarContent = fs.readFileSync(SIDEBAR_PATH, "utf8");
  const docIds = sidebarContent.match(/'([^']+)'/g) || [];
  const cleanIds = docIds.map(s => s.replace(/'/g, ""));

  const relativePaths = files.map(f =>
    f.replace(PROJECT_ROOT + path.sep + "docs" + path.sep, "")
     .replace(/\\/g, "/")
     .replace(".md", "")
     .replace(".mdx", "")
  );

  const missing = [];

  cleanIds.forEach(id => {
    if (id.includes("/") && !relativePaths.includes(id)) {
      missing.push(`Sidebar references missing doc: ${id}`);
    }
  });

  return missing;
}

function main() {
  let report = "VERISEAL FULL DOCUMENTATION AUDIT V2\n";
  report += "====================================\n\n";

  let totalIssues = 0;
  let criticalCount = 0;

  const allFiles = DOC_DIRS.flatMap(dir => walkDir(dir));

  DOC_DIRS.forEach(root => {
    report += `Scanning directory: ${root}\n\n`;

    const files = walkDir(root);

    files.forEach(file => {
      const issues = auditFile(file, allFiles);
      if (issues.length > 0) {
        totalIssues++;
        report += `FILE: ${file}\n`;
        issues.forEach(issue => {
          if (issue.startsWith("CRITICAL")) criticalCount++;
          report += `   ${issue}\n`;
        });
        report += "\n";
      }
    });

    report += "-------------------------------------\n\n";
  });

  const dupIds = checkDuplicateIds(allFiles);
  if (dupIds.length > 0) {
    report += "DUPLICATE IDS FOUND\n";
    dupIds.forEach(d => {
      report += d + "\n\n";
      criticalCount++;
    });
  }

  const sidebarIssues = checkSidebarIntegrity(allFiles);
  if (sidebarIssues.length > 0) {
    report += "\nSIDEBAR ISSUES\n";
    sidebarIssues.forEach(s => {
      report += s + "\n";
    });
  }

  report += "\n====================================\n";
  report += `Total files with issues: ${totalIssues}\n`;
  report += `Critical issues: ${criticalCount}\n`;

  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR);
  }

  fs.writeFileSync(REPORT_FILE, report, "utf8");

  console.log("Full documentation audit V2 complete.");
  console.log(`Issues found in ${totalIssues} files.`);
  console.log(`Critical issues: ${criticalCount}`);
  console.log(`Report saved to: ${REPORT_FILE}`);

  if (criticalCount > 0) {
    process.exit(1);
  }
}

main();
