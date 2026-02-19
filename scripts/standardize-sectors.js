import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required for ESM __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECTORS_DIR = path.join(__dirname, "../docs/sectors");

const SECTION_TITLE = "## Contribution to the Global Evidence Standard";

const SECTION_CONTENT = `

## Contribution to the Global Evidence Standard

VeriSeal deployment in this sector contributes to the emergence of a globally interoperable evidence format.

Each verified proof strengthens:

- Cross-border evidentiary alignment  
- Deterministic verification standards  
- Interoperable cryptographic audit trails  
- Institutional-grade integrity frameworks  

Sector adoption accelerates standardization.

Standardization accelerates inevitability.
`;

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  if (content.includes(SECTION_TITLE)) {
    console.log(`Skipping (already standardized): ${filePath}`);
    return;
  }

  const updatedContent = content.trimEnd() + SECTION_CONTENT;

  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log(`Standardized: ${filePath}`);
}

function main() {
  if (!fs.existsSync(SECTORS_DIR)) {
    console.error("Sectors directory not found.");
    return;
  }

  const files = fs.readdirSync(SECTORS_DIR);

  files.forEach(file => {
    const filePath = path.join(SECTORS_DIR, file);

    if (
      fs.statSync(filePath).isFile() &&
      file.endsWith(".md") &&
      !file.startsWith("_")
    ) {
      processFile(filePath);
    }
  });

  console.log("\nSector standardization complete.");
}

main();
