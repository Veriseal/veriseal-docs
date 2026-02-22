---
id: verification
title: Verificatie
---

﻿---
title: Verificatie
sidebar_position: 3
---

# Verificatie

Verificatie is deterministisch en vertrouwt niet op VeriSeal.

## Bron van waarheid volgorde

1) Grootboekvermelding
2) Openbare JSON
3) PDF (alleen presentatie)

## Procedure

1) Haal canonieke JSON op:
   - /public/verify/`{merkle_root}`/json

2) Verifieer hashes:
   - bereken SHA-256 voor artefacten (of bundel ZIP),
   - vergelijk met hashes in JSON.

3) Herbereken Merkle root:
   - van verklaarde bladeren en regels,
   - bevestig dat het overeenkomt met merkle_root.

4) Verifieer grootboekketening (indien beschikbaar):
   - valideer consistentie van entry_hash en prev_hash.

5) Verifieer handtekeningen (indien aanwezig):
   - PDF-handtekeningverificatie,
   - optionele JSON-handtekeningverificatie.

6) Verifieer OpenTimestamps (indien aanwezig):
   - bevestig dat gestempelde digest gelijk is aan merkle_root/bundel hash,
   - upgrade/verifieer en registreer status.

## Wat te behouden (gereguleerde contexten)

- opgehaalde openbare JSON,
- artefacten (of bundel ZIP),
- berekende hashes,
- uitvoer van handtekeningverificatie,
- .ots-bestand en verificatie-uitvoer (indien gebruikt).