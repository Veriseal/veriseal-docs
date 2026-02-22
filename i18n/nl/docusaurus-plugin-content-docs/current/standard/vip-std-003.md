---
title: VIP-STD-003 - VeriSeal Handtekeningprofiel
sidebar_label: VIP-STD-003
---

# VIP-STD-003 - Specificatie van het VeriSeal Handtekeningprofiel

Versie: 1.0  
Status: Openbaar Concept  
Classificatie: Open Integriteit Standaard

---

## 1. Reikwijdte

Dit document definieert het handtekeningprofiel voor het VeriSeal Integriteitsprotocol.

VIP-STD-003 specificeert:

- Vereisten voor handtekeningdekking
- Toegestane handtekeningalgoritmen
- Deterministische verificatieregels
- Structuur van het handtekeningobject
- Nalevingsbeperkingen

Deze specificatie bouwt voort op VIP-STD-001 en VIP-STD-002.

---

## 2. Overzicht van het Handtekeningsmodel

Handtekeningen zijn OPTIONEEL in VIP-STD-001 maar worden formeel gedefinieerd in dit profiel.

Een handtekening MOET cryptografisch binden:

- Het canonieke bewijsobject (VIP-STD-001)
- De bewijshash
- Optioneel de grootboekvermelding (VIP-STD-002)

Handtekeningdekking MOET deterministisch zijn.

---

## 3. Regels voor Handtekeningdekking

De handtekening MOET worden berekend over:

SHA-256(canonical_proof_object)

De exacte byte-representatie gedefinieerd in VIP-STD-001 Appendix C MOET worden gebruikt.

Geen herserialisatie is toegestaan tijdens verificatie.

---

## 4. Structuur van het Handtekeningobject

Indien aanwezig, MOET een handtekeningobject bevatten:

- signature_algorithm
- public_key
- signature_value

Geen aanvullende velden zijn toegestaan in versie 1.0.

---

## 5. Velddefinities

signature_algorithm  
MOET een van de volgende zijn:

- Ed25519
- ECDSA-secp256k1
- RSA-3072

public_key  
MOET worden gecodeerd in hexadecimaal of base64, afhankelijk van de algoritmespecificatie.

signature_value  
MOET de ruwe handtekenbytes vertegenwoordigen, gecodeerd in hexadecimaal.

---

## 6. Deterministische Verificatie

Verificatie MOET:

1. Bewijshash opnieuw berekenen
2. Canonieke byte-representatie reconstrueren
3. Handtekening verifiëren tegen de verstrekte public_key
4. Niet-overeenkomende handtekeningen afwijzen

Handtekeningverificatie MOET deterministisch zijn.

---

## 7. Algoritmevereisten

## 7.1 Ed25519

- Deterministisch van ontwerp
- 64-byte handtekening
- Openbare sleutel 32 bytes

## 7.2 ECDSA-secp256k1

- Handtekening MOET low-S genormaliseerd zijn
- Deterministische RFC 6979 ondertekening VEREIST

## 7.3 RSA-3072

- Padding MOET PKCS#1 v1.5 of PSS gebruiken
- Minimale modulusgrootte 3072 bits

---

## 8. Overwegingen voor Beveiliging

Implementaties MOETEN beschermen tegen:

- Handtekeningveranderlijkheid
- Aanvallen met handtekeningverwijdering
- Aanvallen met sleutelvervanging
- Zwakke willekeurigheid in ECDSA
- Herhalingsaanvallen

Indien een handtekening aanwezig en ongeldig is, MOET het bewijs als ongeldig worden beschouwd.

---

## 9. Nalevingsvereisten

Om naleving van VIP-STD-003 te claimen:

- Handtekeningdekking MOET overeenkomen met Sectie 3
- Algoritme MOET een van de toegestane algoritmen zijn
- Verificatie MOET deterministisch zijn
- Ongeldige handtekeningen MOETEN worden afgewezen

Gedeeltelijke handtekeningvalidatie MAG geen naleving claimen.

---

## 10. Relatie tot Andere Standaarden

VIP-STD-003 breidt uit:

- VIP-STD-001 (canonieke bewijsintegriteit)
- VIP-STD-002 (grootboekintegriteit)

Volledige naleving vereist naleving van alle toepasselijke profielen.

---

## 11. Toekomstige Uitbreidingen

Toekomstige versies KUNNEN introduceren:

- Post-kwantum handtekeningalgoritmen
- Ondersteuning voor multi-handtekeningen
- Drempelhandtekeningen
- Integratie van certificaatketens
- Uitbreidingen voor identiteitsbinding

Achterwaartse compatibiliteit MOET worden gehandhaafd.

---

## 12. Conclusie

VIP-STD-003 definieert de deterministische handtekeningslaag van VeriSeal.

Het verzekert:

- Cryptografische authenticiteit
- Deterministische verificatie
- Algoritmebeperkingen
- Interoperabele handtekeningvalidatie

Het voltooit de cryptografische integriteitsstack van VeriSeal.