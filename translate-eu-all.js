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

const DOCS_DIR = path.join(__dirname, "docs");
const I18N_DIR = path.join(__dirname, "i18n");

const LOCALES = [
  "fr","de","es","it","pt","nl","pl","ro",
  "bg","cs","da","el","et","fi","ga","hr","hu",
  "lt","lv","mt","sk","sl","sv"
];

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

async function translateChunk(content, locale) {

  const systemPrompt = `
You are a professional institutional translator.

Translate into ${locale.toUpperCase()}.

Maintain:
- Markdown structure
- All headings
- All links
- All code blocks unchanged
- Business/regulatory tone
- Do NOT translate:
  VeriSeal, Merkle Root, Ledger, Proof Bundle,
  OpenTimestamps, SHA-256, JSON, Runtime,
  Binding Mode, STRONG.

Return only translated Markdown.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content }
    ],
    temperature: 0.2,
  });

  return response.choices[0].message.content;
}

async function translateFile(content, locale) {
  const MAX_CHARS = 12000;
  let result = "";

  for (let i = 0; i < content.length; i += MAX_CHARS) {
    const chunk = content.slice(i, i + MAX_CHARS);

    let translated;
    let attempts = 0;

    while (attempts < 3) {
      try {
        translated = await translateChunk(chunk, locale);
        break;
      } catch (err) {
        attempts++;
        console.log(`Retry ${attempts} for ${locale}`);
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    if (!translated) {
      throw new Error(`Translation failed for locale ${locale}`);
    }

    result += translated;
  }

  return result;
}

async function main() {

  const files = walkDocs(DOCS_DIR);
  console.log(`Found ${files.length} master documents.\n`);

  for (const locale of LOCALES) {

    console.log(`\n========== ${locale.toUpperCase()} ==========\n`);

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
      const translated = await translateFile(content, locale);

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, translated, "utf8");

      console.log(`✓ Done`);
    }
  }

  console.log("\nAll EU languages translated successfully.");
}

main();
