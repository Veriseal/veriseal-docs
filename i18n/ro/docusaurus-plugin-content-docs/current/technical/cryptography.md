---
id: cryptography
title: Criptografie
slug: /technical/cryptography
sidebar_position: 1
---

# Criptografie

VeriSeal utilizează primitive conservatoare, larg răspândite, pentru a face dovezile verificabile independent.

## Hashing (SHA-256)

Amprentele SHA-256:
- fișiere (video, imagine, PDF-uri),
- date JSON canonice,
- manifesturi de pachete,
- înregistrări în registru.

Hash-urile sunt reprezentate ca hexazecimal cu litere mici.

## Canonicalizare

Pentru date structurate (JSON/mesaje), VeriSeal aplică canonicalizare deterministă astfel încât părțile independente să poată reproduce același digest.

## Angajamente Merkle

Când trebuie angajate mai multe componente (hash media, hash jurnal UX, hash metadate), VeriSeal construiește un arbore Merkle:
- frunzele sunt digestele componentelor,
- nodurile interne sunt SHA-256(stânga || dreapta),
- rădăcina Merkle este identificatorul public al dovezii.

## Lanț de registru doar adăugare

Fiecare înregistrare include entry_hash, prev_hash și created_at_utc (UTC). Orice modificare rupe lanțul.

## Semnături (opțional)

- Dovezile PDF pot fi semnate (RSA-3072).
- Exporturile JSON pot fi semnate pentru verificare offline.

PDF-ul este doar pentru redare; verificarea trebuie să valideze întotdeauna împotriva JSON-ului public.

## OpenTimestamps (opțional)

OpenTimestamps ancorează un digest extern și poate deveni VERIFICAT pe blockchain-ul Bitcoin.

## Model de amenințare (rezumat)

Atenuează: modificarea post-factum, substituirea dovezilor, marcaje temporale contestabile, conflict de interese al platformei.  
Nu este în scop: dispozitiv de captură compromis, malware înainte de captură, constrângere/impostură fără fluxuri de identitate.