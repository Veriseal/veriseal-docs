Fișier: timestamping.md

---
id: timestamping
title: Marcarea temporală
---

﻿---
title: Marcarea temporală
sidebar_position: 2
---

# Marcarea temporală

VeriSeal suportă:
1) marcaje temporale interne UTC (ordonare operațională),
2) ancorare externă opțională (OpenTimestamps) pentru independență.

## Marcaje temporale interne

Înregistrate în UTC pentru intrările în registru și pașii de legare. Utile pentru traseele de audit, dar nu reprezintă o garanție externă.

## Ancorarea OpenTimestamps

Flux de lucru:
1) selectați un digest stabil (rădăcină Merkle sau hash de pachet),
2) ots stamp -> creează fișierul .ots,
3) ots upgrade -> colectează atestările,
4) ots verify -> confirmă când este complet (VERIFIED).

Limbajul de stare:
- PENDING: acceptat de calendare, încă nu este pe lanț,
- VERIFIED: ancorat pe Bitcoin (cea mai puternică asigurare).

Cea mai bună practică: marcați un singur digest stabil per dovadă.