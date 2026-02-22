---
id: timestamping
title: Tijdsbestempeling
---

﻿---
title: Tijdsbestempeling
sidebar_position: 2
---

# Tijdsbestempeling

VeriSeal ondersteunt:
1) interne UTC-tijdstempels (operationele volgorde),
2) optionele externe verankering (OpenTimestamps) voor onafhankelijkheid.

## Interne tijdstempels

Opgenomen in UTC voor grootboekvermeldingen en bindstappen. Nuttig voor audit trails, maar geen externe garantie.

## OpenTimestamps verankering

Werkstroom:
1) selecteer een stabiele digest (Merkle root of bundle hash),
2) ots stamp -> creëert .ots-bestand,
3) ots upgrade -> verzamelt attestaties,
4) ots verify -> bevestigt wanneer voltooid (VERIFIED).

Status taal:
- PENDING: geaccepteerd door kalenders, nog niet on-chain,
- VERIFIED: verankerd op Bitcoin (sterkste zekerheid).

Beste praktijk: stempel één stabiele digest per bewijs.