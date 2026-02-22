---
id: verification
title: Vérification
---

﻿---
title: Vérification
sidebar_position: 3
---

# Vérification

La vérification est déterministe et ne repose pas sur la confiance en VeriSeal.

## Ordre de la source de vérité

1) Entrée du registre
2) JSON public
3) PDF (présentation uniquement)

## Procédure

1) Récupérer le JSON canonique :
   - /public/verify/`{merkle_root}`/json

2) Vérifier les hachages :
   - calculer SHA-256 pour les artefacts (ou le fichier ZIP),
   - comparer aux hachages dans le JSON.

3) Recalculer la racine Merkle :
   - à partir des feuilles et règles déclarées,
   - confirmer qu'elle correspond à merkle_root.

4) Vérifier le chaînage du registre (lorsqu'il est disponible) :
   - valider la cohérence de entry_hash et prev_hash.

5) Vérifier les signatures (si présentes) :
   - vérification de la signature PDF,
   - vérification optionnelle de la signature JSON.

6) Vérifier OpenTimestamps (si présents) :
   - confirmer que le digest estampillé est égal à merkle_root/hash du bundle,
   - mettre à niveau/vérifier et enregistrer l'état.

## Ce qu'il faut conserver (contextes réglementés)

- JSON public récupéré,
- artefacts (ou fichier ZIP),
- hachages calculés,
- résultats de vérification des signatures,
- fichier .ots et résultat de vérification (si utilisé).