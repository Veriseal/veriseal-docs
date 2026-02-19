import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, "../docs");
const OUTPUT_DIR = path.join(
  __dirname,
  "../i18n/ro/docusaurus-plugin-content-docs/current"
);

/* ===============================
   FILES TO TRANSLATE
=============================== */

const TARGET_FILES = [
  "strategy/standard-governance-model.md",
  "strategy/standardization-strategy.md",
  "strategy/why-veriseal-now.md",
];

/* ===============================
   UTILITY FUNCTIONS
=============================== */

function walkTechnicalDir() {
  const techDir = path.join(DOCS_DIR, "technical");
  const results = [];

  function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
      const filepath = path.join(dir, file);
      if (fs.statSync(filepath).isDirectory()) {
        walk(filepath);
      } else if (file.endsWith(".md")) {
        const relative = path.relative(DOCS_DIR, filepath);
        results.push(relative);
      }
    });
  }

  walk(techDir);
  return results;
}

async function translateContent(content) {
  const prompt = `
You are a professional institutional translator.

Translate the following Markdown document into Romanian.

Maintain:
- All Markdown structure
- All headings (#, ##, ###)
- All internal links
- All code blocks unchanged
- All formatting
- Institutional, business-grade tone
- Terminology consistency
- Do not simplify technical content

Return only the translated Markdown.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content }
    ],
    temperature: 0.2,
  });

  return response.choices[0].message.content;
}

/* ===============================
   MAIN
=============================== */

async function main() {
  const technicalFiles = walkTechnicalDir();
  const allFiles = [...TARGET_FILES, ...technicalFiles];

  console.log(`Found ${allFiles.length} files to translate to Romanian.\n`);

  for (const relativePath of allFiles) {
    const inputPath = path.join(DOCS_DIR, relativePath);

    if (!fs.existsSync(inputPath)) {
      console.log(`File not found: ${relativePath}`);
      continue;
    }

    console.log(`Translating ${relativePath} → ro`);

    const content = fs.readFileSync(inputPath, "utf8");
    const translated = await translateContent(content);

    const outputPath = path.join(OUTPUT_DIR, relativePath);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, translated, "utf8");

    console.log(`✓ Done: ${relativePath}\n`);
  }

  console.log("Romanian targeted translation complete.");
}

main();
