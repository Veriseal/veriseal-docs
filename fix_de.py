import re
from pathlib import Path

BASE = Path("i18n/de/docusaurus-plugin-content-docs/current")

fixed_frontmatter = 0
fixed_other = 0

replacements = [
    (r'\bEnde des Dokuments\b', '', True),
    (' - keine ', ' — und keine ', False),
    (' - nicht ', ' — nicht ', False),
    ('Vertragliche Austausche', 'Vertragliche Vereinbarungen', False),
    ('Nur-anhängbare', 'Nur-anhängende', False),
    ('Nur-anhängbaren', 'Nur-anhängenden', False),
    ('Nur-anhängbarer', 'Nur-anhängender', False),
]

for path in sorted(BASE.rglob("*.md")):
    content = path.read_text(encoding="utf-8")
    original = content

    # FIX DOUBLE FRONTMATTER — keep only second block
    double_fm = re.match(
        r'^(---\r?\n.*?\r?\n---\r?\n\r?\n)(---\r?\n.*?\r?\n---\r?\n)',
        content,
        re.DOTALL
    )
    if double_fm:
        content = content[len(double_fm.group(1)):]
        fixed_frontmatter += 1

    # APPLY TEXT REPLACEMENTS
    for pattern, replacement, is_regex in replacements:
        if is_regex:
            content = re.sub(pattern, replacement, content)
        else:
            content = content.replace(pattern, replacement)

    if content != original:
        path.write_text(content, encoding="utf-8")
        rel = path.relative_to(BASE)
        print(f"  ✅ {rel}")
        fixed_other += 1

print(f"\n✅ Double frontmatter corrigé : {fixed_frontmatter} fichiers")
print(f"✅ Autres corrections : {fixed_other} fichiers")