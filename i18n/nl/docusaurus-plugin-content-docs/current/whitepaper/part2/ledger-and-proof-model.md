---
title: Grootboek & Bewijsmodel
sidebar_label: 2.2 Grootboek & Bewijsmodel
slug: /whitepaper/part2/ledger-and-proof-model
sidebar_position: 2.2
---

# 2.2 Grootboek & Bewijsmodel

Het grootboek is de structurele ruggengraat van VeriSeal.

Het is geen blockchain.
Het is een deterministisch alleen-toevoegbaar integriteitsjournaal.

---

## Structuur van Bewijsinvoer

Elke bewijsinvoer bevat:

- proof_identifier (hash of merkle_root)
- metadata referentie
- tijdstempel (UTC)
- vorige invoer hash

Dit creëert ketencontinuïteit.

---

## Principe van Onveranderlijkheid

Het grootboek is:

- Alleen-toevoegbaar  
- Hash-gekoppeld  
- Deterministisch  

Elke historische wijziging maakt de voortgaande continuïteit ongeldig.

---

## Stabiliteit van Publieke Identificator

De bewijsidentificator:

`{merkle_root}`

Functioneert als:

- Permanente publieke referentie
- Systeemoverstijgende integriteitsanker
- Audit-stabiele identificator

Het moet stabiel blijven in de tijd.

---

## Institutioneel Voordeel

In tegenstelling tot op blockchain gebaseerde systemen:

- Geen probabilistische consensus
- Geen fork-instabiliteit
- Geen afhankelijkheid van externe miners

Integriteit is wiskundig.
Niet politiek.