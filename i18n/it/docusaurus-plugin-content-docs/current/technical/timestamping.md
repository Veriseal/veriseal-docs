File: timestamping.md

---
id: timestamping
title: Marcatura temporale
---

﻿---
title: Marcatura temporale
sidebar_position: 2
---

# Marcatura temporale

VeriSeal supporta:
1) marcature temporali interne UTC (ordinamento operativo),
2) ancoraggio esterno opzionale (OpenTimestamps) per indipendenza.

## Marcature temporali interne

Registrate in UTC per le voci del registro e i passaggi vincolanti. Utili per le tracce di audit, ma non una garanzia esterna.

## Ancoraggio OpenTimestamps

Flusso di lavoro:
1) selezionare un digest stabile (radice Merkle o hash del pacchetto),
2) ots stamp -> crea un file .ots,
3) ots upgrade -> raccoglie attestazioni,
4) ots verify -> conferma quando completo (VERIFICATO).

Linguaggio di stato:
- PENDING: accettato dai calendari, non ancora on-chain,
- VERIFIED: ancorato su Bitcoin (massima garanzia).

Migliore pratica: stampare un digest stabile per prova.