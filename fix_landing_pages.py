"""
VeriSeal — Correction des landing pages (code.json)
====================================================
Applique toutes les corrections identifiées sur les 6 langues en une seule passe.
Lance depuis la racine du projet : python fix_landing_pages.py
"""

import json
from pathlib import Path

I18N_DIR = Path("i18n")

# ============================================================
# CORRECTIONS PAR LANGUE
# Chaque entrée : ("clé homepage", "valeur corrigée")
# ============================================================

CORRECTIONS = {

    "fr": {
        "homepage.positioning.card1.item3": "Déploiement multisectoriel",
        # "Scalabilité multi-secteurs" → anglicisme supprimé
    },

    "de": {
        "homepage.positioning.card1.item2": "Unternehmenstauglich",
        # "Unternehmensbereitstellung bereit" → maladroit
    },

    "es": {
        "homepage.how.step2.desc": (
            "Generar un hash criptográfico y una entrada de registro inmutable, "
            "creando una estructura de prueba inalterable en todas las jurisdicciones."
        ),
        # "libro mayor solo de adición" → trop littéral
        "homepage.final.claim": (
            "No es un SaaS de flujo de trabajo. No es una herramienta de firma. "
            "No es una capa adicional sobre blockchain."
        ),
        # "envoltorio" → "capa adicional" plus élégant
    },

    "it": {
        "homepage.positioning.card1.item2": "Pronta per l'implementazione aziendale",
        # "Pronta per il deployment aziendale" → mélange IT/EN
        "homepage.sectors.item6": "Filiera & Piattaforme",
        # "Supply Chain & Piattaforme" → non traduit
        "homepage.how.step2.desc": (
            "Generare un hash crittografico e una voce di registro immutabile, "
            "creando una struttura di prova non alterabile nel tempo."
        ),
        # "solo in aggiunta" → tournure plus naturelle
    },

    "ro": {
        "homepage.cta.primary": "Citește Teza Centrală",
        # "Citeşte" → "Citește" (ș correct, pas ş)
        "homepage.cta.secondary": "Explorează Cazurile de Utilizare",
        # harmonisation accent ă
    },

    "nl": {
        "homepage.hero.punchline": "De ontbrekende integriteitslaag van de digitale economie",
        # "integriteitlaag" → "integriteitslaag" (trait d'union + s de liaison)
        "homepage.gap.title": "De Structurele Integriteitslacune",
        # "Integriteitkloof" → "Integriteitslacune" plus naturel
        "homepage.cta.secondary": "Verken Toepassingen",
        # "Ontdek Gebruiksscenario's" → plus élégant
        "homepage.final.claim": (
            "Geen workflow-SaaS. Geen handtekeningtool. Geen blockchain-wrapper."
        ),
        # Traits d'union manquants
        "homepage.how.step2.desc": (
            "Een cryptografische hash en een onveranderlijk registeritem genereren, "
            "waarmee een niet-wijzigbare bewijsstructuur wordt gecreëerd."
        ),
        # "alleen-toevoegen-ledgervermelding" → trop lourd
        "homepage.title": "VeriSeal — Wereldwijde Integriteitsinfrastructuur",
        # "Integriteitinfrastructuur" → "Integriteitsinfrastructuur"
    },
}

# ============================================================
# APPLICATION
# ============================================================

def fix_language(lang: str, corrections: dict) -> int:
    """Apply corrections to a language's code.json. Returns number of fixes."""
    path = I18N_DIR / lang / "code.json"

    if not path.exists():
        print(f"  ⚠️  Fichier introuvable : {path}")
        return 0

    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    fixed = 0
    for key, new_value in corrections.items():
        if key in data:
            old_value = data[key].get("message", "")
            if old_value != new_value:
                data[key]["message"] = new_value
                print(f"  ✅ [{key}]")
                print(f"     ← {old_value}")
                print(f"     → {new_value}")
                fixed += 1
        else:
            print(f"  ⚠️  Clé absente : {key}")

    if fixed > 0:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    return fixed


def main():
    print("=" * 60)
    print("VeriSeal — Correction des landing pages (code.json)")
    print("=" * 60)

    total = 0
    for lang, corrections in CORRECTIONS.items():
        print(f"\n🌍 {lang.upper()}")
        n = fix_language(lang, corrections)
        total += n
        if n == 0:
            print("  ✔️  Rien à corriger")

    print(f"\n{'='*60}")
    print(f"✅ Total corrections appliquées : {total}")
    print("\nRelance npm run start pour vérifier le résultat.")


if __name__ == "__main__":
    main()