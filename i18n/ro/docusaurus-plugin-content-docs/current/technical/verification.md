---
id: verification
title: Verificare
---

﻿---
title: Verificare
sidebar_position: 3
---

# Verificare

Verificarea este deterministă și nu se bazează pe încrederea în VeriSeal.

## Ordinea sursei de adevăr

1) Înregistrare în registru
2) JSON public
3) PDF (doar pentru prezentare)

## Procedură

1) Obțineți JSON-ul canonic:
   - /public/verify/`{merkle_root}`/json

2) Verificați hash-urile:
   - calculați SHA-256 pentru artefacte (sau arhiva ZIP),
   - comparați cu hash-urile din JSON.

3) Recalculați rădăcina Merkle:
   - din frunzele și regulile declarate,
   - confirmați că se potrivește cu merkle_root.

4) Verificați înlănțuirea în registru (când este disponibilă):
   - validați consistența entry_hash și prev_hash.

5) Verificați semnăturile (dacă sunt prezente):
   - verificarea semnăturii PDF,
   - verificarea opțională a semnăturii JSON.

6) Verificați OpenTimestamps (dacă sunt prezente):
   - confirmați că digestul ștampilat este egal cu merkle_root/hash-ul pachetului,
   - actualizați/verificați și înregistrați starea.

## Ce să rețineți (în contexte reglementate)

- JSON-ul public obținut,
- artefactele (sau arhiva ZIP),
- hash-urile calculate,
- rezultatele verificării semnăturilor,
- fișierul .ots și rezultatul verificării (dacă este utilizat).