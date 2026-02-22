---
id: timestamping
title: Horodatage
---

﻿---
title: Horodatage
sidebar_position: 2
---

# Horodatage

VeriSeal prend en charge :
1) les horodatages UTC internes (ordonnancement opérationnel),
2) l'ancrage externe optionnel (OpenTimestamps) pour l'indépendance.

## Horodatages internes

Enregistrés en UTC pour les entrées du registre et les étapes de liaison. Utiles pour les pistes d'audit, mais pas une garantie externe.

## Ancrage OpenTimestamps

Flux de travail :
1) sélectionner un digest stable (racine Merkle ou hash de l'ensemble),
2) ots stamp -> crée un fichier .ots,
3) ots upgrade -> collecte les attestations,
4) ots verify -> confirme lorsque terminé (VERIFIED).

Langage de statut :
- PENDING : accepté par les calendriers, pas encore sur la chaîne,
- VERIFIED : ancré sur Bitcoin (assurance la plus forte).

Bonne pratique : tamponner un digest stable par preuve.