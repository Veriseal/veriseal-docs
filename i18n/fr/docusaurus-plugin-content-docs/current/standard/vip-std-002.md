---
id: vip-std-002
title: VIP-STD-002 — Profil de Registre
sidebar_position: 4
---

# VIP-STD-002  
## Profil de Registre (Extension à VIP-STD-001)

---

# 1. Portée

Ce document définit le Profil de Registre optionnel du Protocole d'Intégrité VeriSeal (VIP).

Il spécifie la structure d'enregistrement en ajout uniquement pour la persistance des preuves.

Ce profil étend VIP-STD-001 mais ne modifie pas le modèle d'intégrité de base.

---

# 2. Relation avec VIP-STD-001

VIP-STD-002 :

- DOIT utiliser des objets de preuve conformes à VIP-STD-001  
- NE DOIT PAS altérer la canonicalisation ou le calcul de hachage  
- DOIT préserver la vérification déterministe  

La couche de registre enregistre les preuves ; elle ne les redéfinit pas.

---

# 3. Définitions

**Entrée de Registre**  
Un enregistrement structuré contenant un objet de preuve et sa référence de chaînage.

**Hachage Précédent (prev_hash)**  
Le hachage d'intégrité de l'entrée de registre précédente.

**Tête de Chaîne**  
L'entrée de registre valide la plus récente dans une séquence.

---

# 4. Structure de l'Entrée de Registre

Une entrée de registre conforme DOIT suivre :

```json
{
  "v": 1,
  "type": "LEDGER_ENTRY",
  "proof": { ...objet conforme à VIP-STD-001... },
  "prev_hash": "<sha256-hex ou null>",
  "entry_hash": "<sha256-hex>"
}

Où :

- `proof` DOIT être un objet de preuve valide VIP-STD-001  
- `prev_hash` DOIT référencer le hachage de l'entrée précédente ou être null pour la première entrée  
- `entry_hash` DOIT être le hachage SHA-256 de l'entrée de registre canonicalisée à l'exclusion de `entry_hash` lui-même  

---

# 5. Règles de Calcul de Hachage

5.1 Canonicalisation  
Les entrées de registre DOIVENT être canonicalisées en utilisant les règles de VIP-STD-001.

5.2 Hachage de l'Entrée  
Le `entry_hash` DOIT être calculé sur :

{
  "v",
  "type",
  "proof",
  "prev_hash"
}

5.3 Déterminisme  
Deux entrées de registre identiques DOIVENT produire des valeurs `entry_hash` identiques.

---

# 6. Exigence d'Ajout Uniquement

6.1 Immutabilité  
Les entrées de registre NE DOIVENT PAS être modifiées après insertion.

6.2 Ordonnancement  
Chaque entrée DOIT référencer exactement un prédécesseur, sauf l'entrée génésique.

6.3 Entrée Génésique  
La première entrée de registre DOIT définir `prev_hash` à null.

---

# 7. Validation de Chaîne

Un processus de validation de registre conforme DOIT :

1. Valider chaque preuve intégrée selon VIP-STD-001  
2. Recalculer chaque `entry_hash`  
3. Vérifier la cohérence du chaînage `prev_hash`  
4. Confirmer l'absence de liens rompus  

Une chaîne est VALIDE si toutes les entrées satisfont ces conditions.

---

# 8. Indépendance du Stockage

Le Profil de Registre :

- N'impose pas de backend de stockage
- N'impose pas de consensus distribué
- Ne nécessite pas de mise en œuvre de blockchain
- Ne définit pas de règles de réplication

Il définit uniquement le chaînage structurel.

---

# 9. Conformité

Un système revendiquant la conformité avec VIP-STD-002 DOIT :

1. Accepter des objets de preuve VIP-STD-001  
2. Mettre en œuvre une structure de registre en ajout uniquement  
3. Appliquer l'intégrité du chaînage de hachage  
4. Fournir une validation de chaîne déterministe  

Les détails de mise en œuvre du registre PEUVENT varier à condition que le déterminisme structurel soit préservé.

---

# 10. Considérations de Sécurité

La sécurité de ce profil dépend de :

- L'intégrité de l'environnement de stockage  
- La protection contre les modifications non autorisées  
- La canonicalisation correcte  

Ce profil ne prévient pas les attaques de suppression sauf s'il est combiné avec des mécanismes d'ancrage définis dans VIP-STD-004.

---

# 11. Conclusion

VIP-STD-002 définit la couche de persistance structurelle du Protocole d'Intégrité VeriSeal.

Il assure un chaînage en ajout uniquement et une cohérence des preuves à long terme sans altérer le modèle d'intégrité de base.