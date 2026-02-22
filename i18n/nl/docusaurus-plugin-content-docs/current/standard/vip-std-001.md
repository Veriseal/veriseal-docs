---
id: vip-std-001
title: VIP-STD-001 — Kernintegriteitsstandaard
sidebar_position: 3
---

# VIP-STD-001  
## Kernintegriteitsstandaard

---

# 1. Toepassingsgebied

Dit document definieert het verplichte kernintegriteitsmodel van het VeriSeal Integrity Protocol (VIP).

Het specificeert de deterministische regels voor:

- Gegevenskanonisatie
- Hash-berekening
- Bewijsobjectvorming
- Deterministische verificatie

Deze standaard definieert niet het gedrag van het grootboek, digitale handtekeningen of verankeringsmechanismen.  
Dergelijke elementen worden gespecificeerd in afzonderlijke uitbreidingsprofielen.

---

# 2. Normatieve Taal

De sleutelwoorden:

- MOET
- MOET NIET
- ZOU MOETEN
- MAG

moeten worden geïnterpreteerd zoals beschreven in RFC 2119.

---

# 3. Definities

**Kanonieke Gegevens**  
Een genormaliseerde byte-representatie van gestructureerde invoergegevens.

**Integriteitshash**  
Een SHA-256-samenvatting berekend over gekanoniseerde gegevens.

**Bewijsobject**  
Een gestructureerd JSON-object dat gekanoniseerde gegevens en de integriteitshash bevat.

**Verificatiegebeurtenis**  
De deterministische herberekening van de integriteitshash uit kanonieke gegevens.

---

# 4. Kanonisatie Regels

4.1 Gegevensformaat  
Invoergegevens MOETEN gestructureerde JSON zijn.

4.2 Veldvolgorde  
Alle objectsleutels MOETEN lexicografisch geordend zijn.

4.3 Witruimte  
Witruimte MOET worden verwijderd, behalve waar vereist door de JSON-syntaxis.

4.4 Codering  
UTF-8-codering MOET worden gebruikt.

4.5 Determinisme  
Kanonisatie MOET identieke byte-uitvoer produceren voor identieke logische invoer.

---

# 5. Hashing Algoritme

5.1 Algoritme  
De integriteitshash MOET gebruikmaken van SHA-256.

5.2 Invoer  
De hash MOET worden berekend over de gekanoniseerde bytevolgorde.

5.3 Uitvoer  
De hash MOET worden gecodeerd als kleine letters hexadecimaal.

---

# 6. Structuur van Bewijsobject

Een conform bewijsobject MOET bevatten:

```json
{
  "v": 1,
  "type": "PROOF",
  "data": { ... },
  "hash": "<sha256-hex>"
}

Waarbij:

- `v` = protocolversie  
- `type` = vaste string "PROOF"  
- `data` = kanoniseerbare JSON-lading  
- `hash` = SHA-256-samenvatting van gekanoniseerde `data`

Aanvullende velden MOETEN de kanonisatie van `data` niet wijzigen.

---

# 7. Deterministische Verificatie

Verificatie MOET de volgende stappen volgen:

1. Extraheer `data`
2. Kanoniseer `data`
3. Bereken SHA-256 hash
4. Vergelijk berekende hash met opgeslagen `hash`
5. Retourneer GELDIG als gelijk; ONGELDIG anders

Verificatie MOET NIET afhankelijk zijn van:

- Externe toestand
- Netwerktoegang
- Aanwezigheid van grootboek
- Aanwezigheid van handtekening
- Verankeringsstatus

Kernverificatie is zelfvoorzienend.

---

# 8. Onafhankelijkheidsprincipe

VIP-STD-001 definieert alleen integriteit.

Het garandeert niet:

- Gegevensauthenticiteit
- Identiteitsverificatie
- Juridische toelaatbaarheid
- Tijdstempelgeldigheid

Het garandeert deterministische integriteit onder gedefinieerde cryptografische aannames.

---

# 9. Achterwaartse Compatibiliteit

Toekomstige kleine herzieningen MOETEN behouden:

- Kanonisatie determinisme
- SHA-256 compatibiliteit
- Verificatie reproduceerbaarheid

Breukveranderingen vereisen versie-increment.

---

# 10. Conformiteit

Een systeem is conform VIP-STD-001 als het:

1. Kanonisatie implementeert volgens Sectie 4  
2. SHA-256 berekent volgens Sectie 5  
3. Bewijsobjecten produceert volgens Sectie 6  
4. Deterministisch verifieert volgens Sectie 7  

Conformiteit met uitbreidingsprofielen is optioneel.

---

# 11. Veiligheidsoverwegingen

De veiligheid van VIP-STD-001 hangt af van:

- De cryptografische sterkte van SHA-256
- Correcte implementatie van kanonisatie
- Bescherming tegen hash-collisie kwetsbaarheden

Dreigingsaannames worden gedefinieerd in VIP-THREAT-001.

---

# 12. Conclusie

VIP-STD-001 definieert het verplichte kernintegriteitsmodel van het VeriSeal Integrity Protocol.

Het biedt deterministische, reproduceerbare en implementatie-onafhankelijke digitale integriteitsverificatie.