import re
from pathlib import Path

BASE = Path("i18n/ro/docusaurus-plugin-content-docs/current")

fixed_frontmatter = 0
fixed_other = 0

replacements = [
    (r'\bSfârșitul Documentului\b', '', True),
    (r'\bSfarsitul Documentului\b', '', True),
    (r'\brecomputare\b', 'recalcul', True),
    (r'\brecomputat\b', 'recalculat', True),
    (r'\brecomputată\b', 'recalculată', True),
    (r'\brecomputate\b', 'recalculate', True),
    (r'\brecomputate\b', 'recalculate', True),
    (r'\bpot fi recomputate\b', 'pot fi recalculate', True),
    (' - nu ', ' — și nu ', False),
    ('încărcături JSON', 'date JSON', False),
    ('încărcături', 'date', False),
    (r'\bappend-only\b', 'doar adăugare', True),
]

for path in sorted(BASE.rglob("*.md")):
    content = path.read_text(encoding="utf-8")
    original = content

    # FIX DOUBLE FRONTMATTER
    # Pattern: first --- block followed by second --- block
    double_fm = re.match(
        r'^(---\r?\n.*?\r?\n---\r?\n\r?\n)(---\r?\n.*?\r?\n---\r?\n)',
        content,
        re.DOTALL
    )
    if double_fm:
        # Keep only the second frontmatter block
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