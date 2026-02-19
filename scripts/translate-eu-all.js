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
const I18N_DIR = path.join(__dirname, "../i18n");

/* ===================================
   EU 23 TARGET LANGUAGES
=================================== */

const LOCALES = [
  "fr","de","es","it","pt","nl","pl","ro",
  "bg","cs","da","el","et","fi","ga","hr","hu",
  "lt","lv","mt","sk","sl","sv"
];

/* ===================================
   WALK DOCS RECURSIVELY
=================================== */

function walkDocs(dir, results = []) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);

    if (fs.statSync(filepath).isDirectory()) {
      walkDocs(filepath, results);
    } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
      results.push(path.relative(DOCS_DIR, filepath));
    }
  });

  return results;
}

/* ===================================
   TRANSLATION FUNCTION
=================================== */

async function translateContent(content, locale) {
  const prompt = `
You are a professional institutional translator.

Translate the following Markdown document into ${locale.toUpperCase()}.

Maintain:
- All Markdown structure
- All headings (#, ##, ###)
- All internal links
- All code blocks unchanged
- All formatting
- Institutional, regulatory-grade tone
- Terminology consistency
- Do NOT translate:
  VeriSeal
  Merkle Root
  Ledger
  Proof Bundle
  OpenTimestamps
  SHA-256
  JSON
  Runtime
  Binding Mode
  STRONG
- Do not simplify technical content.

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

/* ===================================
   MAIN
=================================== */

async function main() {

  const files = walkDocs(DOCS_DIR);

  console.log(`Found ${files.length} master documents.\n`);

  for (const locale of LOCALES) {

    console.log(`\n==============================`);
    console.log(`Translating to ${locale}`);
    console.log(`==============================\n`);

    const OUTPUT_DIR = path.join(
      I18N_DIR,
      locale,
      "docusaurus-plugin-content-docs",
      "current"
    );

    if (fs.existsSync(OUTPUT_DIR)) {
      fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }

    for (const relativePath of files) {

      const inputPath = path.join(DOCS_DIR, relativePath);
      const outputPath = path.join(OUTPUT_DIR, relativePath);

      console.log(`→ ${relativePath}`);

      const content = fs.readFileSync(inputPath, "utf8");
      const translated = await translateContent(content, locale);

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, translated, "utf8");

      console.log(`✓ Done`);
    }
  }

  console.log("\nAll EU translations complete.");
}

main();
