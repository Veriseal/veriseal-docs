---
id: cryptography
title: Crittografia
slug: /technical/cryptography
sidebar_position: 1
---

# Crittografia

VeriSeal utilizza primitive conservative e ampiamente diffuse per rendere le prove verificabili in modo indipendente.

## Hashing (SHA-256)

Impronte digitali SHA-256:
- file (video, immagini, PDF),
- payload JSON canonici,
- manifesti di bundle,
- voci di registro.

Gli hash sono rappresentati come esadecimali in minuscolo.

## Canonicalizzazione

Per i dati strutturati (JSON/messaggi), VeriSeal applica una canonicalizzazione deterministica affinché le parti indipendenti possano riprodurre lo stesso digest.

## Impegni Merkle

Quando devono essere impegnati più componenti (hash del media, hash del log UX, hash dei metadati), VeriSeal costruisce un albero di Merkle:
- le foglie sono digest dei componenti,
- i nodi interni sono SHA-256(left || right),
- la radice di Merkle è l'identificatore pubblico della prova.

## Collegamento a catena del registro solo append

Ogni voce include entry_hash, prev_hash e created_at_utc (UTC). Qualsiasi modifica interrompe la catena.

## Firme (opzionale)

- Le prove PDF possono essere firmate (RSA-3072).
- Gli esporti JSON possono essere firmati per la verifica offline.

Il PDF è solo per la visualizzazione; la verifica deve sempre essere convalidata rispetto al JSON pubblico.

## OpenTimestamps (opzionale)

OpenTimestamps ancora un digest esternamente e può diventare VERIFIED sulla blockchain di Bitcoin.

## Modello di minaccia (sommario)

Mitiga: modifica post-hoc, sostituzione delle prove, timestamp contestabili, conflitto di interessi della piattaforma.  
Non in ambito: dispositivo di acquisizione compromesso, malware prima dell'acquisizione, coercizione/impersonificazione senza flussi di identità.