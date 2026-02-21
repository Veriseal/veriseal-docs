const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TARGET_LOCALES = ["bg", "it", "lt", "mt", "pl"];
const MASTER_PATH = "./i18n/_homepage_master_en.json";

async function translateText(text, locale) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a professional institutional translator. Preserve meaning, tone, structure. Do not alter JSON keys.",
      },
      {
        role: "user",
        content: `Translate into ${locale}:\n\n${text}`,
      },
    ],
    temperature: 0.2,
  });

  return response.choices[0].message.content.trim();
}

async function run() {
  const master = JSON.parse(fs.readFileSync(MASTER_PATH, "utf-8"));

  for (const locale of TARGET_LOCALES) {
    console.log(`\nTranslating locale: ${locale}`);

    const targetPath = `./i18n/${locale}/code.json`;
    const target = JSON.parse(fs.readFileSync(targetPath, "utf-8"));

    for (const key of Object.keys(master)) {
      if (!target[key]) {
        const translated = await translateText(master[key], locale);
        target[key] = translated;
        console.log(`  Added ${key}`);
      }
    }

    fs.writeFileSync(targetPath, JSON.stringify(target, null, 2), "utf-8");
  }

  console.log("\nDone.");
}

run();
