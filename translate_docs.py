"""
VeriSeal Docs — Script de traduction automatique via OpenAI
=============================================================
Traduit tous les fichiers .md et _category_.json de docs/
vers les langues cibles dans i18n/{lang}/docusaurus-plugin-content-docs/current/

Usage:
    python translate_docs.py

Prérequis:
    pip install openai python-dotenv
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

# ============================================================
# CONFIGURATION
# ============================================================

load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    print("❌ OPENAI_API_KEY introuvable dans .env")
    sys.exit(1)

client = OpenAI(api_key=API_KEY)

# Langues cibles (fr et ro déjà traduits)
TARGET_LANGUAGES = {
    "de": "German",
    "es": "Spanish",
    "it": "Italian",
    "nl": "Dutch",
}

# Chemins
DOCS_DIR = Path("docs")
I18N_DIR = Path("i18n")

# Modèle OpenAI — gpt-4o pour meilleure qualité, gpt-3.5-turbo pour économiser
MODEL = "gpt-4o"

# Délai entre les appels API (secondes) pour éviter le rate limit
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


def translate_markdown(content: str, target_lang: str, lang_name: str, filename: str) -> str:
    """Translate a markdown file content."""
    
    user_prompt = f"""Translate the following Markdown document to {lang_name}.
File: {filename}

{content}"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.2,
    )
    
    return response.choices[0].message.content


def translate_category_json(content: str, target_lang: str, lang_name: str) -> str:
    """Translate a _category_.json file."""
    
    user_prompt = f"""Translate the label and description values to {lang_name}.
Return ONLY valid JSON.

{content}"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": CATEGORY_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.1,
    )
    
    result = response.choices[0].message.content.strip()
    # Clean potential markdown code fences
    if result.startswith("```"):
        result = result.split("\n", 1)[1]
        result = result.rsplit("```", 1)[0]
    
    # Validate JSON
    json.loads(result)
    return result


def get_all_files():
    """Get all translatable files from docs/."""
    files = []
    
    for path in sorted(DOCS_DIR.rglob("*")):
        if not path.is_file():
            continue
        if path.name in IGNORE_FILES:
            continue
        if path.name.endswith(".md") or path.name == "_category_.json":
            # Get relative path from docs/
            rel_path = path.relative_to(DOCS_DIR)
            files.append(rel_path)
    
    return files


def get_output_path(lang: str, rel_path: Path) -> Path:
    """Get the output path for a translated file."""
    return I18N_DIR / lang / "docusaurus-plugin-content-docs" / "current" / rel_path


def count_pending(files, languages):
    """Count how many files still need translation."""
    pending = 0
    for lang in languages:
        for rel_path in files:
            out_path = get_output_path(lang, rel_path)
            if not out_path.exists():
                pending += 1
    return pending


def main():
    print("=" * 60)
    print("VeriSeal Docs — Traduction automatique OpenAI")
    print("=" * 60)
    
    files = get_all_files()
    print(f"\n📁 Fichiers trouvés dans docs/ : {len(files)}")
    
    total_pending = count_pending(files, TARGET_LANGUAGES)
    print(f"📋 Traductions à effectuer : {total_pending}")
    print(f"🌍 Langues cibles : {', '.join(TARGET_LANGUAGES.keys())}")
    print(f"🤖 Modèle : {MODEL}\n")
    
    if total_pending == 0:
        print("✅ Tout est déjà traduit !")
        return
    
    # Confirm before starting
    print(f"⚠️  Cela va effectuer jusqu'à {total_pending} appels API OpenAI.")
    response = input("Continuer ? (o/n) : ").strip().lower()
    if response != "o":
        print("Annulé.")
        return
    
    print()
    
    done = 0
    errors = []
    
    for lang, lang_name in TARGET_LANGUAGES.items():
        print(f"\n{'='*40}")
        print(f"🌍 Langue : {lang_name} ({lang})")
        print(f"{'='*40}")
        
        for rel_path in files:
            out_path = get_output_path(lang, rel_path)
            
            # Skip if already translated
            if out_path.exists():
                print(f"  ⏭  {rel_path} (déjà traduit)")
                continue
            
            # Read source file
            src_path = DOCS_DIR / rel_path
            try:
                content = src_path.read_text(encoding="utf-8")
            except Exception as e:
                print(f"  ❌ Lecture échouée : {rel_path} — {e}")
                errors.append((lang, str(rel_path), str(e)))
                continue
            
            print(f"  🔄 {rel_path} ...", end="", flush=True)
            
            try:
                # Translate based on file type
                if rel_path.name == "_category_.json":
                    translated = translate_category_json(content, lang, lang_name)
                else:
                    translated = translate_markdown(content, lang, lang_name, rel_path.name)
                
                # Create output directory
                out_path.parent.mkdir(parents=True, exist_ok=True)
                
                # Write translated file
                out_path.write_text(translated, encoding="utf-8")
                
                done += 1
                print(f" ✅ ({done}/{total_pending})")
                
                # Rate limit delay
                time.sleep(DELAY_BETWEEN_CALLS)
                
            except json.JSONDecodeError as e:
                print(f" ⚠️  JSON invalide, réessai...")
                errors.append((lang, str(rel_path), f"JSON invalide: {e}"))
            except Exception as e:
                print(f" ❌ Erreur : {e}")
                errors.append((lang, str(rel_path), str(e)))
                # Wait longer on error (rate limit)
                time.sleep(5)
    
    # Summary
    print(f"\n{'='*60}")
    print(f"✅ Traductions terminées : {done}/{total_pending}")
    
    if errors:
        print(f"\n⚠️  Erreurs ({len(errors)}) :")
        for lang, path, err in errors:
            print(f"  [{lang}] {path} — {err}")
        print("\nRelance le script pour réessayer les fichiers manquants.")
    else:
        print("🎉 Aucune erreur !")
    
    print(f"\n📂 Fichiers générés dans : i18n/{{de,es,it,nl}}/docusaurus-plugin-content-docs/current/")


if __name__ == "__main__":
    main()
