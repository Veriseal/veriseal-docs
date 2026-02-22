import re
from pathlib import Path

BASE = Path("i18n/fr/docusaurus-plugin-content-docs/current")

replacements = [
    # (pattern, replacement, use_regex)
    (r'\bimmutabilité\b', 'immuabilité', True),
    (r'\bimmuabilité\b', 'immuabilité', True),  # harmonise les deux formes
    (r'\nFin du Document\s*$', '', True),
    (r'\bFin du Document\b', '', True),
    (r'\brecomputation\b', 'recalcul', True),
    (r'\brecomputé\b', 'recalculé', True),
    (r'\brecomputés\b', 'recalculés', True),
    (r'\brecomputée\b', 'recalculée', True),
    (r'\brecomputées\b', 'recalculées', True),
    (r'\brecomputer\b', 'recalculer', True),
    (r'\brecomputons\b', 'recalculons', True),
    (r'\brecompute\b', 'recalcule', True),
    (r'\bMismatch\b', 'Discordance', True),
    (r'\bmismatch\b', 'discordance', True),
    (r' - pas ', ' — et non ', False),
    (r'charges utiles JSON', 'données JSON', False),
    (r'charges utiles', 'données', False),
    (r'Hors du périmètre', 'Hors périmètre', False),
    (r'\bappend-only\b', 'en ajout seul', True),
]

fixed_files = 0
fixed_total = 0

for path in sorted(BASE.rglob("*.md")):
    content = path.read_text(encoding="utf-8")
    original = content
    count = 0
    for pattern, replacement, is_regex in replacements:
        if is_regex:
            new = re.sub(pattern, replacement, content)
        else:
            new = content.replace(pattern, replacement)
        if new != content:
            count += content.count(pattern) if not is_regex else len(re.findall(pattern, content))
            content = new
    if content != original:
        path.write_text(content, encoding="utf-8")
        fixed_files += 1
        fixed_total += count
        rel = path.relative_to(BASE)
        print(f"  ✅ {rel}")

print(f"\n✅ {fixed_files} fichiers corrigés, ~{fixed_total} remplacements")