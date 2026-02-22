---
title: VIP-REG-001 - Cartographie Réglementaire VeriSeal
sidebar_label: VIP-REG-001
---

# VIP-REG-001 - Cartographie Réglementaire VeriSeal

Version : 1.0
Statut : Informatif
Classification : Positionnement Réglementaire

---

## 1. Introduction

Ce document fournit une cartographie réglementaire non contraignante du cadre d'intégrité VeriSeal par rapport à certains instruments réglementaires européens.

Il est destiné à :

- Discussions réglementaires
- Présentations institutionnelles
- Analyse de l'architecture de conformité
- Planification de l'intégration

Ce document ne constitue PAS un avis juridique.

---

## 2. Portée de la Cartographie

La cartographie fait référence à :

- Règlement eIDAS (UE) n° 910/2014
- Évolution du cadre eIDAS 2.0
- ISO/IEC 27001
- ISO/IEC 27002
- Directive NIS2
- Normes ETSI pour les signatures électroniques et l'horodatage

Cette cartographie se concentre sur l'alignement technique, pas sur le statut de certification.

---

## 3. Cartographie eIDAS

## 3.1 Intégrité des Preuves Électroniques

VIP-STD-001 assure :

- Intégrité déterministe
- Détection de falsification
- Immutabilité structurelle

Cela s'aligne avec :

- Article 41 (Intégrité des documents électroniques)
- Principes de préservation des preuves électroniques

VeriSeal ne fournit PAS :

- Statut de signature électronique qualifiée
- Statut de prestataire de services de confiance qualifié

---

## 3.2 Signatures Électroniques

VIP-STD-003 fournit :

- Authenticité cryptographique
- Vérification déterministe

Cependant :

- La vérification d'identité est hors du champ
- La certification de signature qualifiée n'est pas incluse
- La validation de la chaîne de confiance des certificats n'est pas définie dans la version actuelle

---

## 3.3 Horodatage

VIP-STD-004 fournit :

- Ancrage temporel externe
- Vérifiabilité publique
- Liaison déterministe de hachage d'ancrage

Cela s'aligne conceptuellement avec :

- ETSI EN 319 421 (Politique et exigences de sécurité pour l'horodatage)

Il ne revendique PAS le statut d'autorité d'horodatage qualifiée.

---

## 4. Alignement ISO/IEC 27001

Le cadre contribue à :

- A.8 - Intégrité des actifs
- A.12 - Journalisation et surveillance
- A.14 - Contrôles d'intégrité du système
- A.18 - Préservation des preuves de conformité

Le cadre lui-même n'est pas un SGSI.

Il peut servir de composant de contrôle technique au sein d'un SGSI.

---

## 5. Alignement Directive NIS2

VIP-STD-002 et VIP-STD-004 contribuent à :

- Traçabilité des incidents
- Préservation des preuves
- Intégrité déterministe des événements

Cependant, NIS2 exige :

- Gouvernance organisationnelle
- Procédures de gestion des risques
- Cadres de signalement des incidents

Ceux-ci sont externes au protocole.

---

## 6. Positionnement de Souveraineté

Le cadre est :

- Neutre en termes d'infrastructure
- Neutre en termes de fournisseur
- Cryptographiquement déterministe
- Vérifiable ouvertement

Il ne nécessite pas :

- Dépendance au cloud étranger
- Services de validation propriétaires
- Infrastructure de vérification fermée

Cela soutient les objectifs de souveraineté numérique.

---

## 7. Limites de Conformité

Le cadre d'intégrité VeriSeal :

- Fournit des garanties d'intégrité technique
- Ne fournit PAS de certification légale
- Ne fournit PAS d'assurance d'identité
- Ne remplace PAS les prestataires de services de confiance

Il peut compléter les services de confiance réglementés.

---

## 8. Implications Stratégiques Réglementaires

Le cadre peut être positionné comme :

- Infrastructure de preuves cryptographiques
- Couche d'intégrité pour les systèmes réglementés
- Infrastructure de soutien à l'audit
- Complémentaire aux services de confiance qualifiés

Il n'est PAS positionné comme un remplacement pour :

- Prestataires de signatures électroniques qualifiées
- Autorités d'horodatage qualifiées
- Infrastructures PKI nationales

---

## 9. Alignement Réglementaire Futur

Les extensions futures PEUVENT inclure :

- Profil d'horodatage qualifié
- Intégration du portefeuille eIDAS 2.0
- Profil de liaison d'identité
- Alignement de conformité ETSI
- Profil de support de certification

---

## 10. Conclusion

Le cadre d'intégrité VeriSeal s'aligne techniquement avec les principes d'intégrité réglementaire européens.

Il fournit :

- Détection déterministe de falsification
- Intégrité structurelle cryptographique
- Corroboration temporelle externe
- Intégration modulaire de conformité

La certification réglementaire nécessite des couches organisationnelles, juridiques et opérationnelles supplémentaires.