---
id: cryptographic-model
title: Architecture Cryptographique et de Preuve
sidebar_position: 2.1
---

# 2.1 Architecture Cryptographique et de Preuve

VeriSeal repose exclusivement sur des primitives cryptographiques conservatrices et éprouvées.

Pas de couche de consensus expérimentale.  
Pas d'algorithme de hachage propriétaire.  
Pas de construction cryptographique opaque.

Le modèle est déterministe, reproductible et défendable institutionnellement.

---

## Objectifs de Conception

La couche cryptographique doit assurer :

- Intégrité structurelle  
- Reproductibilité déterministe  
- Auditabilité à long terme  
- Vérifiabilité externe  
- Ancrage temporel décentralisé optionnel  

---

## Canonicalisation

Les données d'entrée brutes doivent d'abord être transformées en une représentation déterministe.

Soit :

E = preuve brute  
C(E) = représentation canonique  

La canonicalisation garantit :

- Encodage JSON stable  
- Ordre des champs déterministe  
- Normalisation UTF-8  
- Aucune ambiguïté dans les espaces  

La charge utile canonique :

P = C(E)

---

## Hachage

Primitif d'intégrité principal :

H = SHA-256(P)

Propriétés :

- Résistance aux collisions (hypothèses cryptographiques actuelles)
- Sortie déterministe
- Universellement reproductible

Le hachage devient l'identifiant principal de la preuve pour un seul artefact.

---

## Agrégation Merkle

Pour les preuves multi-artefacts :

h1, h2, ..., hn

Un arbre de Merkle est construit.

Le résultat :

merkle_root

Propriétés :

- Toute modification de feuille invalide la racine
- Preuves d'inclusion efficaces possibles
- Liaison multi-artefact déterministe

Le merkle_root devient la référence publique canonique.

---

## Registre Append-Only

Chaque preuve est insérée dans un registre en ajout seul.

Chaque entrée contient :

- identifiant_de_preuve  
- métadonnées  
- horodatage UTC  
- prev_hash  

Règle de chaînage :

entry_hash_i = SHA256(entry_data_i || entry_hash_(i-1))

Cela crée une immuabilité structurelle.

Modifier des entrées historiques brise l'intégrité de la chaîne.

---

## Mode de Liaison Forte

VeriSeal impose une cohérence structurelle entre :

- Journaux UX  
- Artefacts médiatiques  
- JSON canonique  
- Entrée de registre  
- PDF optionnel  
- Ancre OTS optionnelle  

La liaison empêche la modification sélective ou le remplacement de composants.

---

## Signature PDF (Couche Optionnelle)

Le PDF est uniquement rendu.

Lorsqu'elle est activée :

- Signature RSA-3072  
- Hachage du document intégré  
- Vérifiable indépendamment  

Important :

Le PDF n'est pas la source de vérité.  
L'entrée de registre et le JSON public le sont.

---

## OpenTimestamps (Optionnel)

Lorsqu'il est activé :

- Le hachage de la preuve est soumis à OTS
- Un fichier .ots est généré
- La confirmation Bitcoin ancre l'existence dans le temps

OTS renforce l'ancrage temporel mais n'est pas requis pour la validation structurelle.

---

## Minimisation de la Confiance

La vérification nécessite de faire confiance uniquement à :

- SHA-256  
- Calcul déterministe  
- Normes cryptographiques publiques  

Pas à :

- Serveurs propriétaires  
- Déclarations des opérateurs  
- Représentations visuelles  

VeriSeal n'affirme pas la vérité.  
Il garantit l'intégrité structurelle.