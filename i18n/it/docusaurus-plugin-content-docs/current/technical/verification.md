---
id: verification
title: Verifica
---

﻿---
title: Verifica
sidebar_position: 3
---

# Verifica

La verifica è deterministica e non si basa sulla fiducia in VeriSeal.

## Ordine della fonte di verità

1) Voce del registro
2) JSON pubblico
3) PDF (solo presentazione)

## Procedura

1) Recupera il JSON canonico:
   - /public/verify/`{merkle_root}`/json

2) Verifica degli hash:
   - calcola SHA-256 per gli artefatti (o bundle ZIP),
   - confronta con gli hash nel JSON.

3) Ricalcola la radice di Merkle:
   - dalle foglie e regole dichiarate,
   - conferma che corrisponda a merkle_root.

4) Verifica concatenazione del registro (quando disponibile):
   - valida la coerenza di entry_hash e prev_hash.

5) Verifica delle firme (se presenti):
   - verifica della firma PDF,
   - verifica opzionale della firma JSON.

6) Verifica OpenTimestamps (se presenti):
   - conferma che il digest timbrato sia uguale a merkle_root/hash del bundle,
   - aggiorna/verifica e registra lo stato.

## Cosa conservare (contesti regolamentati)

- JSON pubblico recuperato,
- artefatti (o bundle ZIP),
- hash calcolati,
- risultati della verifica delle firme,
- file .ots e output di verifica (se utilizzato).