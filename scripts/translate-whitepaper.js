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

// ⚠️ UNIQUEMENT WHITEPAPER
const DOCS_DIR = path.join(__dirname, "../docs/whitepaper");
const OUTPUT_DIR = path.join(__dirname, "../i18n");

const TARGET_LANGUAGES = [
  { code: "fr", label: "French" },
  { code: "ro", label: "Romanian" },
];

function walkDir(dir, filelist = []) {
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

async function translateContent(content, targetLanguage) {
  const prompt = `
You are a professional institutional translator.
Translate the following Markdown document into ${targetLanguage}.
Maintain:

- All Markdown structure
- All headings (#, ##, ###)
- All internal links
- All code blocks unchanged
- All technical terms consistent
- Use a business-grade institutional tone suitable for regulators, banks, and EU institutions.
- Do not simplify technical content.
- Do not remove formatting.

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

async function main() {
  const files = walkDir(DOCS_DIR);
  console.log(`Found ${files.length} whitepaper files to translate.`);

  for (const file of files) {
    const relativePath = path.relative(DOCS_DIR, file);
    const content = fs.readFileSync(file, "utf8");

    for (const lang of TARGET_LANGUAGES) {
      console.log(`Translating ${relativePath} → ${lang.code}`);

      const translated = await translateContent(content, lang.label);

      const outputPath = path.join(
        OUTPUT_DIR,
        lang.code,
        "docusaurus-plugin-content-docs",
        "current",
        "whitepaper",
        relativePath
      );

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, translated, "utf8");
    }
  }

  console.log("Whitepaper translation complete.");
}

main();
