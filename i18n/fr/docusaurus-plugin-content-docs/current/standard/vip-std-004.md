---
title: VIP-STD-003 - Profil de Signature VeriSeal
sidebar_label: VIP-STD-003
---

# VIP-STD-003 - Spécification du Profil de Signature VeriSeal

Version : 1.0
Statut : Brouillon Public
Classification : Standard d'Intégrité Ouvert

---

## 1. Portée

Ce document définit le profil de signature pour le Protocole d'Intégrité VeriSeal.

VIP-STD-003 spécifie :

- Exigences de couverture de signature
- Algorithmes de signature autorisés
- Règles de vérification déterministes
- Structure de l'objet signature
- Contraintes de conformité

Cette spécification s'appuie sur VIP-STD-001 et VIP-STD-002.

---

## 2. Aperçu du Modèle de Signature

Les signatures sont OPTIONNELLES dans VIP-STD-001 mais deviennent formellement définies dans ce profil.

Une signature DOIT lier cryptographiquement :

- L'objet de preuve canonique (VIP-STD-001)
- Le hash de la preuve
- Optionnellement l'entrée du registre (VIP-STD-002)

La couverture de la signature DOIT être déterministe.

---

## 3. Règles de Couverture de Signature

La signature DOIT être calculée sur :

SHA-256(canonical_proof_object)

La représentation exacte des octets définie dans l'Annexe C de VIP-STD-001 DOIT être utilisée.

Aucune resérialisation n'est permise lors de la vérification.

---

## 4. Structure de l'Objet Signature

Si présent, un objet signature DOIT inclure :

- signature_algorithm
- public_key
- signature_value

Aucun champ supplémentaire n'est autorisé dans la version 1.0.

---

## 5. Définitions des Champs

signature_algorithm
DOIT être l'un des suivants :

- Ed25519
- ECDSA-secp256k1
- RSA-3072

public_key
DOIT être encodée en hexadécimal ou base64, selon la spécification de l'algorithme.

signature_value
DOIT représenter les octets bruts de la signature encodés en hexadécimal.

---

## 6. Vérification Déterministe

La vérification DOIT :

1. Recalculer le hash de la preuve
2. Reconstruire la représentation canonique des octets
3. Vérifier la signature par rapport à la public_key fournie
4. Rejeter les signatures non correspondantes

La vérification de la signature DOIT être déterministe.

---

## 7. Exigences de l'Algorithme

## 7.1 Ed25519

- Déterministe par conception
- Signature de 64 octets
- Clé publique de 32 octets

## 7.2 ECDSA-secp256k1

- La signature DOIT être normalisée en low-S
- La signature déterministe RFC 6979 EST REQUISE

## 7.3 RSA-3072

- Le padding DOIT utiliser PKCS#1 v1.5 ou PSS
- Taille minimale du module de 3072 bits

---

## 8. Considérations de Sécurité

Les implémentations DOIVENT se protéger contre :

- La malléabilité des signatures
- Les attaques de suppression de signature
- Les attaques de substitution de clé
- La faible randomisation dans ECDSA
- Les attaques par rejeu

Si une signature est présente et invalide, la preuve DOIT être considérée comme invalide.

---

## 9. Exigences de Conformité

Pour revendiquer la conformité avec VIP-STD-003 :

- La couverture de la signature DOIT correspondre à la Section 3
- L'algorithme DOIT être l'un des algorithmes autorisés
- La vérification DOIT être déterministe
- Les signatures invalides DOIVENT entraîner un rejet

Une validation partielle de la signature NE DOIT PAS revendiquer la conformité.

---

## 10. Relation avec d'Autres Normes

VIP-STD-003 étend :

- VIP-STD-001 (intégrité de la preuve canonique)
- VIP-STD-002 (intégrité du registre)

La conformité complète nécessite l'adhésion à tous les profils applicables.

---

## 11. Extensions Futures

Les futures versions POURRAIENT introduire :

- Algorithmes de signature post-quantiques
- Support multi-signatures
- Signatures seuils
- Intégration de chaînes de certificats
- Extensions de liaison d'identité

La compatibilité rétroactive DEVRAIT être maintenue.

---

## 12. Conclusion

VIP-STD-003 définit la couche de signature déterministe de VeriSeal.

Elle assure :

- L'authenticité cryptographique
- La vérification déterministe
- Les contraintes d'algorithme
- La validation de signature interopérable

Elle complète la pile d'intégrité cryptographique de VeriSeal.