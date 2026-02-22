---
title: De VeriSeal Integriteit Standaard
sidebar_position: 1
---

# De VeriSeal Integriteit Standaard

## Van product naar standaard

VeriSeal is niet gepositioneerd als een softwareproduct.

Het is gestructureerd als een integriteitskader dat kan functioneren als:

- Een propriëtaire engine
- Een open verificatieformaat
- Een sectorale nalevingslaag
- Een toekomstige wereldwijde integriteit standaard

Het langetermijndoel is structurele adoptie - geen softwareafhankelijkheid.

---

## Waarom een standaard noodzakelijk is

Digitale systemen hebben standaarden voor:

- Betalingen
- Identiteit
- Berichten
- Versleuteling

Maar er is geen breed geaccepteerde standaard voor:

> Verifieerbare digitale bewijsintegriteit.

De meeste systemen produceren logs.

Weinig produceren wiskundig verifieerbare gebeurtenissen.

De afwezigheid van een integriteitsstandaard creëert:

- Juridische kwetsbaarheid
- Leveranciersafhankelijkheid
- Regelgevingsinconsistentie
- Bewijsincompatibiliteit tussen sectoren

---

## De structurele lagen

De VeriSeal Standaard is georganiseerd in verschillende lagen:

### 1. Canonicalisatielaag
Deterministische opmaak van digitale gebeurtenissen.

### 2. Hashinglaag
SHA-256 deterministische hashing van payloads.

### 3. Ledgerlaag
Append-only keten met `prev_hash` continuïteit.

### 4. Bewijsbindingslaag
Binding van UX-gebeurtenissen, media, identiteit en ledgerinvoer.

### 5. Publieke verificatielaag
JSON-gebaseerde publieke verificatie-eindpunten.

### 6. Externe verankeringslaag
Optionele Bitcoin verankering via OpenTimestamps.

Elke laag is onafhankelijk verifieerbaar.

---

## Onafhankelijkheid van leveranciers

Het integriteitsmodel is zo ontworpen dat:

- Verificatie geen VeriSeal-servers vereist.
- Bewijsbundels verifieerbaar blijven zonder SaaS-afhankelijkheid.
- Publieke JSON fungeert als canonieke bron van waarheid.
- PDF is alleen voor weergave en niet gezaghebbend.

Het systeem kan institutioneel falen overleven.

---

## Governance model

De standaard kan evolueren naar:

- Open documentatie
- Sectorale adoptiekaders
- Nalevingsmapping
- Certificeringsmodellen
- Conformiteitstesten

VeriSeal als bedrijf bouwt de engine.

VeriSeal als standaard definieert het formaat.

Deze zijn structureel scheidbaar.

---

## Standaard vs. SaaS

SaaS-model:
- Toegangsgecontroleerd
- Platformafhankelijk
- Gesloten verificatielogica

Integriteit standaardmodel:
- Publiek gedocumenteerd
- Onafhankelijk verifieerbaar
- Cryptografisch deterministisch
- Interoperabel tussen sectoren

VeriSeal is ontworpen naar het tweede model.

---

## Pad naar wereldwijde adoptie

Standaardisatie vereist:

1. Interoperabiliteit tussen sectoren
2. Regelgevingscompatibiliteit
3. Documentatie van institutionele kwaliteit
4. Auditbaarheid
5. Langdurige cryptografische duurzaamheid

VeriSeal is gestructureerd om deze vereisten stapsgewijs te vervullen.

---

## Strategische positionering

Op de lange termijn zullen digitale ecosystemen onderscheid maken tussen:

- Systemen die niet-verifieerbare logs genereren
- Systemen die verifieerbare bewijsobjecten produceren

De VeriSeal Integriteit Standaard definieert de tweede categorie.

Dit is geen functie.

Het is infrastructuur.