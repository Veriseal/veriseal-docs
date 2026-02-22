"""
Fix GPT translation artifacts — supprime les blocs ```markdown``` 
qui entourent le contenu traduit dans i18n/
"""

import re
from pathlib import Path

I18N_DIR = Path("i18n")
TARGET_LANGS = ["fr", "ro", "de", "es", "it", "nl"]

fixed = 0
clean = 0

for lang in TARGET_LANGS:
    base = I18N_DIR / lang / "docusaurus-plugin-content-docs" / "current"
    if not base.exists():
        continue

    for path in sorted(base.rglob("*.md")):
        content = path.read_text(encoding="utf-8")
        original = content

        # Remove leading ```markdown or ``` code fence
        content = re.sub(r"^```(?:markdown)?\n", "", content, flags=re.MULTILINE)
        # Remove trailing ``` at end of file
        content = re.sub(r"\n```\s*$", "", content, flags=re.MULTILINE)
        # Also fix if the whole file is wrapped
        if content.startswith("```"):
            content = content.lstrip("`markdown\n").rstrip("`\n")

        if content != original:
            path.write_text(content, encoding="utf-8")
            print(f"  ✅ Fixé : {lang}/{path.relative_to(base)}")
            fixed += 1
        else:
            clean += 1

print(f"\n✅ Fichiers corrigés : {fixed}")
print(f"✔️  Fichiers déjà propres : {clean}")