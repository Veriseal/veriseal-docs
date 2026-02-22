---
id: cryptographic-model
title: Cryptografische en Bewijsarchitectuur
sidebar_position: 2.1
---

# 2.1 Cryptografische en Bewijsarchitectuur

VeriSeal vertrouwt uitsluitend op conservatieve, beproefde cryptografische primitieve.

Geen experimentele consensuslaag.
Geen eigen hash-algoritme.
Geen ondoorzichtige cryptografische constructie.

Het model is deterministisch, reproduceerbaar en institutioneel verdedigbaar.

---

## Ontwerpdoelstellingen

De cryptografische laag moet waarborgen:

- Structurele integriteit  
- Deterministische reproduceerbaarheid  
- Langetermijn controleerbaarheid  
- Externe verifieerbaarheid  
- Optionele gedecentraliseerde tijdstempelverankering  

---

## Canonicalisatie

Ruwe invoergegevens moeten eerst worden omgezet in een deterministische representatie.

Laat:

E = ruwe bewijsmateriaal  
C(E) = canonieke representatie  

Canonicalisatie garandeert:

- Stabiele JSON-codering  
- Deterministische veldvolgorde  
- UTF-8 normalisatie  
- Geen ambiguïteit in witruimte  

De canonieke payload:

P = C(E)

---

## Hashing

Primaire integriteitsprimitief:

H = SHA-256(P)

Eigenschappen:

- Botsingsbestendigheid (huidige cryptografische aannames)
- Deterministische output
- Universeel reproduceerbaar

De hash wordt de kern bewijsidentificator bij enkelvoudig artefact.

---

## Merkle Aggregatie

Voor bewijzen met meerdere artefacten:

h1, h2, ..., hn

Een Merkle-boom wordt geconstrueerd.

De resulterende:

merkle_root

Eigenschappen:

- Elke wijziging van een blad maakt de root ongeldig
- Efficiënte opnamebewijzen mogelijk
- Deterministische binding van meerdere artefacten

De merkle_root wordt de canonieke openbare referentie.

---

## Append-Only Ledger

Elk bewijs wordt ingevoerd in een alleen-toevoegbare grootboek.

Elke invoer bevat:

- bewijsidentificator  
- metadata  
- UTC-tijdstempel  
- prev_hash  

Ketenregel:

entry_hash_i = SHA256(entry_data_i || entry_hash_(i-1))

Dit creëert structurele onveranderlijkheid.

Het wijzigen van historische invoeren verbreekt de ketenintegriteit.

---

## Sterke Bindingsmodus

VeriSeal handhaaft structurele samenhang tussen:

- UX-logboeken  
- Media-artefacten  
- Canonieke JSON  
- Grootboekinvoer  
- Optionele PDF  
- Optionele OTS-verankering  

Binding voorkomt selectieve wijziging of vervanging van componenten.

---

## PDF-Handtekening (Optionele Laag)

PDF is alleen-weergave.

Wanneer ingeschakeld:

- RSA-3072 handtekening  
- Documenthash ingebed  
- Onafhankelijk verifieerbaar  

Belangrijk:

De PDF is niet de bron van waarheid.  
De grootboekinvoer en openbare JSON zijn dat wel.

---

## OpenTimestamps (Optioneel)

Wanneer ingeschakeld:

- De bewijs hash wordt ingediend bij OTS
- Een .ots-bestand wordt gegenereerd
- Bitcoin-bevestiging verankert bestaan in de tijd

OTS versterkt temporele verankering maar is niet vereist voor structurele validatie.

---

## Vertrouwensminimalisatie

Verificatie vereist alleen vertrouwen in:

- SHA-256  
- Deterministische berekening  
- Openbare cryptografische standaarden  

Niet in:

- Eigen servers  
- Operatorverklaringen  
- Visuele representaties  

VeriSeal beweert geen waarheid.  
Het garandeert structurele integriteit.