---
id: cryptography
title: Cryptographie
slug: /technical/cryptography
sidebar_position: 1
---

# Cryptographie

VeriSeal utilise des primitives conservatrices et largement déployées pour rendre les preuves vérifiables de manière indépendante.

## Hachage (SHA-256)

Empreintes SHA-256 :
- fichiers (vidéo, image, PDFs),
- données JSON canoniques,
- manifestes de paquets,
- entrées de registre.

Les hachages sont représentés en hexadécimal minuscule.

## Canonicalisation

Pour les données structurées (JSON/messages), VeriSeal applique une canonicalisation déterministe afin que des parties indépendantes puissent reproduire le même digest.

## Engagements Merkle

Lorsque plusieurs composants doivent être engagés (hachage média, hachage journal UX, hachage métadonnées), VeriSeal construit un arbre de Merkle :
- les feuilles sont des digests de composants,
- les nœuds internes sont SHA-256(gauche || droite),
- la racine Merkle est l'identifiant de preuve public.

## Chaînage de registre en ajout seul

Chaque entrée inclut entry_hash, prev_hash, et created_at_utc (UTC). Toute modification brise la chaîne.

## Signatures (optionnelles)

- Les preuves PDF peuvent être signées (RSA-3072).
- Les exportations JSON peuvent être signées pour une vérification hors ligne.

Le PDF est uniquement rendu ; la vérification doit toujours être validée contre le JSON public.

## OpenTimestamps (optionnel)

OpenTimestamps ancre un digest de manière externe et peut devenir VÉRIFIÉ sur la blockchain Bitcoin.

## Modèle de menace (résumé)

Atténue : modification post-hoc, substitution de preuves, horodatages contestables, conflit d'intérêt de la plateforme.  
Hors périmètre : dispositif de capture compromis, malware avant capture, coercition/usurpation d'identité sans flux d'identité.