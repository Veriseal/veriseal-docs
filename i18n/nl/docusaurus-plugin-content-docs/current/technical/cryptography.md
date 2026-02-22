---
id: cryptography
title: Cryptografie
slug: /technical/cryptography
sidebar_position: 1
---

# Cryptografie

VeriSeal gebruikt conservatieve, wijdverspreide primitieve methoden om bewijs onafhankelijk verifieerbaar te maken.

## Hashing (SHA-256)

SHA-256 vingerafdrukken:
- bestanden (video, afbeelding, PDF's),
- canonieke JSON-payloads,
- bundelmanifesten,
- grootboekvermeldingen.

Hashes worden weergegeven als kleine letters hex.

## Canonicalisatie

Voor gestructureerde gegevens (JSON/berichten) past VeriSeal deterministische canonicalisatie toe, zodat onafhankelijke partijen dezelfde samenvatting kunnen reproduceren.

## Merkle-verbintenissen

Wanneer meerdere componenten moeten worden vastgelegd (mediahash, UX-loghash, metadatahash), bouwt VeriSeal een Merkle-boom:
- bladeren zijn componentensamenvattingen,
- interne knooppunten zijn SHA-256(left || right),
- de Merkle-wortel is de openbare bewijsidentificator.

## Alleen-toevoegbaar grootboekketening

Elke vermelding bevat entry_hash, prev_hash en created_at_utc (UTC). Elke wijziging verbreekt de keten.

## Handtekeningen (optioneel)

- PDF-bewijs kan worden ondertekend (RSA-3072).
- JSON-exporten kunnen worden ondertekend voor offline verificatie.

PDF is alleen-weergave; verificatie moet altijd valideren tegen openbare JSON.

## OpenTimestamps (optioneel)

OpenTimestamps verankert een samenvatting extern en kan GECERTIFICEERD worden op de Bitcoin-blockchain.

## Bedreigingsmodel (samenvatting)

Mitigeert: post-hoc wijziging, vervanging van bewijs, betwistbare tijdstempels, belangenconflict van het platform.  
Niet in scope: gecompromitteerd opnameapparaat, malware vóór opname, dwang/identiteitsfraude zonder identiteitsstromen.