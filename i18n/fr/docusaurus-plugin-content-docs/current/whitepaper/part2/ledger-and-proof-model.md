---
title: Modèle de Registre & Preuve
sidebar_label: 2.2 Modèle de Registre & Preuve
slug: /whitepaper/part2/ledger-and-proof-model
sidebar_position: 2.2
---

# 2.2 Modèle de Registre & Preuve

Le registre est la colonne vertébrale structurelle de VeriSeal.

Ce n'est pas une blockchain.
C'est un journal d'intégrité déterministe à ajout unique.

---

## Structure d'Entrée de Preuve

Chaque entrée de preuve contient :

- proof_identifier (hash ou merkle_root)
- référence des métadonnées
- horodatage (UTC)
- hash de l'entrée précédente

Cela crée une continuité de chaîne.

---

## Principe d'Immutabilité

Le registre est :

- À ajout unique  
- Lié par hash  
- Déterministe  

Toute altération historique invalide la continuité future.

---

## Stabilité de l'Identifiant Public

L'identifiant de preuve :

`{merkle_root}`

Fonctionne comme :

- Référence publique permanente
- Ancre d'intégrité inter-systèmes
- Identifiant stable pour l'audit

Il doit rester stable dans le temps.

---

## Avantage Institutionnel

Contrairement aux systèmes basés sur la blockchain :

- Pas de consensus probabiliste
- Pas d'instabilité de fork
- Pas de dépendance aux mineurs externes

L'intégrité est mathématique.
Pas politique.