---
title: La Norme d'Intégrité VeriSeal
sidebar_position: 1
---

# La Norme d'Intégrité VeriSeal

## Du produit à la norme

VeriSeal n'est pas positionné comme un produit logiciel.

Il est structuré comme un cadre d'intégrité pouvant fonctionner comme :

- Un moteur propriétaire
- Un format de vérification ouvert
- Une couche de conformité sectorielle
- Une future norme mondiale d'intégrité

L'objectif à long terme est l'adoption structurelle - non la dépendance logicielle.

---

## Pourquoi une norme est nécessaire

Les systèmes numériques ont des normes pour :

- Les paiements
- L'identité
- La messagerie
- Le chiffrement

Mais il n'existe pas de norme largement adoptée pour :

> L'intégrité des preuves numériques vérifiables.

La plupart des systèmes produisent des journaux.

Peu produisent des événements vérifiables mathématiquement.

L'absence d'une norme d'intégrité crée :

- Une fragilité juridictionnelle
- Une dépendance aux fournisseurs
- Une incohérence réglementaire
- Une incompatibilité des preuves entre secteurs

---

## Les couches structurelles

La Norme VeriSeal est organisée en couches distinctes :

### 1. Couche de canonicalisation
Formatage déterministe des événements numériques.

### 2. Couche de hachage
Hachage déterministe SHA-256 des données.

### 3. Couche de registre
Chaîne en ajout seul utilisant la continuité `prev_hash`.

### 4. Couche de liaison de preuve
Liaison des événements UX, médias, identité et entrée de registre.

### 5. Couche de vérification publique
Points de terminaison de vérification publique basés sur JSON.

### 6. Couche d'ancrage externe
Ancrage Bitcoin optionnel via OpenTimestamps.

Chaque couche est vérifiable de manière indépendante.

---

## Indépendance des fournisseurs

Le modèle d'intégrité est conçu de sorte que :

- La vérification ne nécessite pas de serveurs VeriSeal.
- Les ensembles de preuves restent vérifiables sans dépendance SaaS.
- Le JSON public agit comme source canonique de vérité.
- Le PDF est uniquement un rendu et non une autorité.

Le système peut survivre à une défaillance institutionnelle.

---

## Modèle de gouvernance

La norme peut évoluer vers :

- Une documentation ouverte
- Des cadres d'adoption sectorielle
- Une cartographie de conformité
- Des modèles de certification
- Des tests de conformité

VeriSeal en tant qu'entreprise construit le moteur.

VeriSeal en tant que norme définit le format.

Ces éléments sont structurellement séparables.

---

## Norme vs. SaaS

Modèle SaaS :
- Accès contrôlé
- Dépendant de la plateforme
- Logique de vérification fermée

Modèle de norme d'intégrité :
- Documenté publiquement
- Vérifiable de manière indépendante
- Cryptographiquement déterministe
- Interopérable entre secteurs

VeriSeal est architecturé vers le second modèle.

---

## Chemin vers l'adoption mondiale

La standardisation nécessite :

1. Interopérabilité intersectorielle
2. Compatibilité réglementaire
3. Documentation de niveau institutionnel
4. Auditabilité
5. Durabilité cryptographique à long terme

VeriSeal est structuré pour répondre à ces exigences de manière progressive.

---

## Positionnement stratégique

À long terme, les écosystèmes numériques différencieront entre :

- Les systèmes qui génèrent des journaux non vérifiables
- Les systèmes qui produisent des objets de preuve vérifiables

La Norme d'Intégrité VeriSeal définit la seconde catégorie.

Ce n'est pas une fonctionnalité.

C'est une infrastructure.