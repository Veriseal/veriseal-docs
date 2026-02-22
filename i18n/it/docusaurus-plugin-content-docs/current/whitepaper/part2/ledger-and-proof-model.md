---
title: Modello di Registro e Prova
sidebar_label: 2.2 Modello di Registro e Prova
slug: /whitepaper/part2/ledger-and-proof-model
sidebar_position: 2.2
---

# 2.2 Modello di Registro e Prova

Il registro è la spina dorsale strutturale di VeriSeal.

Non è una blockchain.
È un diario di integrità deterministico a sola aggiunta.

---

## Struttura della Voce di Prova

Ogni voce di prova contiene:

- identificatore_prova (hash o merkle_root)
- riferimento ai metadati
- timestamp (UTC)
- hash della voce precedente

Questo crea continuità nella catena.

---

## Principio di Immutabilità

Il registro è:

- A sola aggiunta  
- Collegato tramite hash  
- Deterministico  

Qualsiasi alterazione storica invalida la continuità futura.

---

## Stabilità dell'Identificatore Pubblico

L'identificatore di prova:

`{merkle_root}`

Funziona come:

- Riferimento pubblico permanente
- Ancora di integrità tra sistemi
- Identificatore stabile per audit

Deve rimanere stabile nel tempo.

---

## Vantaggio Istituzionale

A differenza dei sistemi basati su blockchain:

- Nessun consenso probabilistico
- Nessuna instabilità da fork
- Nessuna dipendenza da miner esterni

L'integrità è matematica.
Non politica.