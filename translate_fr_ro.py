"""
VeriSeal Docs — Script de traduction FR et RO
==============================================
Traduit (en écrasant) tous les fichiers .md et _category_.json
dans i18n/fr/ et i18n/ro/ qui sont encore en anglais.

Usage:
    python translate_fr_ro.py

Prérequis:
    pip install openai python-dotenv langdetect
    (ou sans langdetect : le script traduit tout sans vérifier la langue)
"""

import os
import json
import time
import sys
from pathlib import Path
from dotenv import load_dotenv

try:
    from openai import OpenAI
except ImportError:
    print("❌ OpenAI non installé. Lance : pip install openai python-dotenv")
    sys.exit(1)

# Détection de langue optionnelle
try:
    from langdetect import detect
    HAS_LANGDETECT = True
except ImportError:
    HAS_LANGDETECT = False
    print("ℹ️  langdetect non installé — tous les fichiers seront traduits sans vérification de langue.")
    print("   Pour l'installer : pip install langdetect\n")

# ============================================================
# CONFIGURATION
# ============================================================

load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    print("❌ OPENAI_API_KEY introuvable dans .env")
    sys.exit(1)

client = OpenAI(api_key=API_KEY)

# Langues cibles
TARGET_LANGUAGES = {
    "fr": "French",
    "ro": "Romanian",
}

# Chemins
I18N_DIR = Path("i18n")

# Modèle — changer en "gpt-4o-mini" pour économiser
MODEL = "gpt-4o"

# Délai entre appels API (secondes)
DELAY_BETWEEN_CALLS = 1.0

# Fichiers à ignorer
IGNORE_FILES = {"_sector-template.md"}

# ============================================================
# PROMPTS
# ============================================================

SYSTEM_PROMPT = """You are a professional technical translator specializing in cryptography, 
blockchain, legal, and institutional documentation.

Rules:
- Translate the content accurately and professionally
- Preserve ALL Markdown formatting exactly (headers, bold, italic, lists, code blocks, links)
- Preserve ALL frontmatter (--- blocks) but translate title, description, and sidebar_label values
- Do NOT translate: code blocks, URLs, file paths, technical terms like VeriSeal, VIP, API, hash, etc.
- Do NOT translate: proper nouns, product names, standard identifiers (VIP-STD-001, etc.)
- Maintain the same document structure and length
- Use formal/institutional register appropriate for legal and financial documents
- Return ONLY the translated content, no explanations or comments"""

CATEGORY_SYSTEM_PROMPT = """You are a professional technical translator.
Translate only the "label" and "description" values in this JSON.
Preserve the JSON structure exactly.
Return ONLY valid JSON, no explanations."""


def is_english(content: str) -> bool:
    """Check if content is in English."""
    if not HAS_LANGDETECT:
        return True  # Assume English if can't detect
    try:
        # Use first 500 chars for speed (skip frontmatter)
        sample = content
        if "---" in content:
            parts = content.split("---", 2)
            if len(parts) >= 3:
                sample = parts[2][:500]
        lang = detect(sample[:500])
        return lang == "en"
    except Exception:
        return True  # If detection fails, translate anyway


def translate_markdown(content: str, lang_name: str, filename: str) -> str:
    """Translate a markdown file content."""
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Translate the following Markdown document to {lang_name}.\nFile: {filename}\n\n{content}"}
        ],
        temperature=0.2,
    )
    return response.choices[0].message.content


def translate_category_json(content: str, lang_name: str) -> str:
    """Translate a _category_.json file."""
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": CATEGORY_SYSTEM_PROMPT},
            {"role": "user", "content": f"Translate the label and description values to {lang_name}.\nReturn ONLY valid JSON.\n\n{content}"}
        ],
        temperature=0.1,
    )
    result = response.choices[0].message.content.strip()
    if result.startswith("```"):
        result = result.split("\n", 1)[1]
        result = result.rsplit("```", 1)[0]
    json.loads(result)  # Validate
    return result


def get_all_files(lang: str):
    """Get all translatable files in i18n/{lang}/docusaurus-plugin-content-docs/current/"""
    base = I18N_DIR / lang / "docusaurus-plugin-content-docs" / "current"
    
    if not base.exists():
        print(f"  ⚠️  Dossier introuvable : {base}")
        return []
    
    files = []
    for path in sorted(base.rglob("*")):
        if not path.is_file():
            continue
        if path.name in IGNORE_FILES:
            continue
        if path.name.endswith(".md") or path.name == "_category_.json":
            files.append(path)
    
    return files


def main():
    print("=" * 60)
    print("VeriSeal Docs — Traduction FR & RO (fichiers en anglais)")
    print("=" * 60)
    
    # Count files per language
    all_files = {}
    total = 0
    for lang in TARGET_LANGUAGES:
        files = get_all_files(lang)
        all_files[lang] = files
        print(f"\n📁 [{lang}] {len(files)} fichiers trouvés")
        total += len(files)
    
    print(f"\n📋 Total fichiers à vérifier/traduire : {total}")
    print(f"🤖 Modèle : {MODEL}")
    if HAS_LANGDETECT:
        print("🔍 Détection de langue activée — seuls les fichiers en anglais seront traduits")
    else:
        print("⚠️  Détection de langue désactivée — TOUS les fichiers seront traduits (même si déjà traduits)")
    
    print(f"\n⚠️  Ce script VA ÉCRASER les fichiers existants.")
    response = input("Continuer ? (o/n) : ").strip().lower()
    if response != "o":
        print("Annulé.")
        return

    print()

    done = 0
    skipped = 0
    errors = []

    for lang, lang_name in TARGET_LANGUAGES.items():
        print(f"\n{'='*40}")
        print(f"🌍 Langue : {lang_name} ({lang})")
        print(f"{'='*40}")

        for file_path in all_files[lang]:
            rel = file_path.relative_to(I18N_DIR / lang / "docusaurus-plugin-content-docs" / "current")

            try:
                content = file_path.read_text(encoding="utf-8")
            except Exception as e:
                print(f"  ❌ Lecture : {rel} — {e}")
                errors.append((lang, str(rel), str(e)))
                continue

            # Check if already translated
            if HAS_LANGDETECT and not is_english(content):
                print(f"  ⏭  {rel} (déjà traduit)")
                skipped += 1
                continue

            print(f"  🔄 {rel} ...", end="", flush=True)

            try:
                if file_path.name == "_category_.json":
                    translated = translate_category_json(content, lang_name)
                else:
                    translated = translate_markdown(content, lang_name, file_path.name)

                file_path.write_text(translated, encoding="utf-8")
                done += 1
                print(f" ✅ ({done} traduits)")
                time.sleep(DELAY_BETWEEN_CALLS)

            except json.JSONDecodeError as e:
                print(f" ⚠️  JSON invalide : {e}")
                errors.append((lang, str(rel), f"JSON invalide: {e}"))
            except Exception as e:
                print(f" ❌ {e}")
                errors.append((lang, str(rel), str(e)))
                time.sleep(5)

    # Summary
    print(f"\n{'='*60}")
    print(f"✅ Traduits    : {done}")
    print(f"⏭  Ignorés     : {skipped} (déjà en {', '.join(TARGET_LANGUAGES.keys())})")
    print(f"❌ Erreurs     : {len(errors)}")

    if errors:
        print(f"\n⚠️  Fichiers en erreur :")
        for lang, path, err in errors:
            print(f"  [{lang}] {path} — {err}")
        print("\nRelance le script pour réessayer les fichiers manquants.")
    else:
        print("\n🎉 Tout est traduit !")


if __name__ == "__main__":
    main()
