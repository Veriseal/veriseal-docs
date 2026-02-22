---
id: vip-std-001
title: VIP-STD-001 — Norme d'Intégrité de Base
sidebar_position: 3
---

# VIP-STD-001  
## Norme d'Intégrité de Base

---

# 1. Portée

Ce document définit le modèle d'intégrité de base obligatoire du Protocole d'Intégrité VeriSeal (VIP).

Il spécifie les règles déterministes pour :

- Canonicalisation des données
- Calcul de hachage
- Formation d'objet de preuve
- Vérification déterministe

Cette norme ne définit pas le comportement du registre, les signatures numériques ou les mécanismes d'ancrage.  
Ces éléments sont spécifiés dans des profils d'extension séparés.

---

# 2. Langage Normatif

Les mots clés :

- DOIT
- NE DOIT PAS
- DEVRAIT
- PEUT

doivent être interprétés comme décrit dans la RFC 2119.

---

# 3. Définitions

**Données Canoniques**  
Une représentation en octets normalisée des données d'entrée structurées.

**Hachage d'Intégrité**  
Un condensé SHA-256 calculé sur des données canoniques.

**Objet de Preuve**  
Un objet JSON structuré contenant des données canoniques et leur hachage d'intégrité.

**Événement de Vérification**  
Le recalcul déterministe du hachage d'intégrité à partir de données canoniques.

---

# 4. Règles de Canonicalisation

4.1 Format des Données  
Les données d'entrée DOIVENT être du JSON structuré.

4.2 Ordre des Champs  
Toutes les clés d'objet DOIVENT être ordonnées lexicographiquement.

4.3 Espaces Blancs  
Les espaces blancs DOIVENT être supprimés sauf là où requis par la syntaxe JSON.

4.4 Encodage  
L'encodage UTF-8 DOIT être utilisé.

4.5 Déterminisme  
La canonicalisation DOIT produire une sortie en octets identique pour une entrée logique identique.

---

# 5. Algorithme de Hachage

5.1 Algorithme  
Le hachage d'intégrité DOIT utiliser SHA-256.

5.2 Entrée  
Le hachage DOIT être calculé sur la séquence d'octets canoniques.

5.3 Sortie  
Le hachage DOIT être encodé en hexadécimal en minuscules.

---

# 6. Structure de l'Objet de Preuve

Un objet de preuve conforme DOIT inclure :

```json
{
  "v": 1,
  "type": "PROOF",
  "data": { ... },
  "hash": "<sha256-hex>"
}

Où :

- `v` = version du protocole  
- `type` = chaîne fixe "PROOF"  
- `data` = charge utile JSON canonisable  
- `hash` = condensé SHA-256 des `data` canoniques

Les champs supplémentaires NE DOIVENT PAS altérer la canonicalisation des `data`.

---

# 7. Vérification Déterministe

La vérification DOIT suivre ces étapes :

1. Extraire `data`
2. Canonicaliser `data`
3. Calculer le hachage SHA-256
4. Comparer le hachage calculé au `hash` stocké
5. Retourner VALIDE si égal ; INVALIDE sinon

La vérification NE DOIT PAS dépendre de :

- État externe
- Accès réseau
- Présence de registre
- Présence de signature
- Statut d'ancrage

La vérification de base est autonome.

---

# 8. Principe d'Indépendance

VIP-STD-001 définit uniquement l'intégrité.

Il ne garantit pas :

- Authenticité des données
- Vérification d'identité
- Admissibilité légale
- Validité des horodatages

Il garantit une intégrité déterministe sous des hypothèses cryptographiques définies.

---

# 9. Compatibilité Rétroactive

Les futures révisions mineures DOIVENT préserver :

- Déterminisme de canonicalisation
- Compatibilité SHA-256
- Reproductibilité de la vérification

Les changements majeurs nécessitent une augmentation de version.

---

# 10. Conformité

Un système est conforme à VIP-STD-001 s'il :

1. Implémente la canonicalisation selon la Section 4  
2. Calcule SHA-256 selon la Section 5  
3. Produit des objets de preuve selon la Section 6  
4. Vérifie de manière déterministe selon la Section 7  

La conformité aux profils d'extension est optionnelle.

---

# 11. Considérations de Sécurité

La sécurité de VIP-STD-001 dépend de :

- La robustesse cryptographique de SHA-256
- La mise en œuvre correcte de la canonicalisation
- La protection contre les vulnérabilités de collision de hachage

Les hypothèses de menace sont définies dans VIP-THREAT-001.

---

# 12. Conclusion

VIP-STD-001 définit le modèle d'intégrité de base obligatoire du Protocole d'Intégrité VeriSeal.

Il fournit une vérification d'intégrité numérique déterministe, reproductible et indépendante de l'implémentation.