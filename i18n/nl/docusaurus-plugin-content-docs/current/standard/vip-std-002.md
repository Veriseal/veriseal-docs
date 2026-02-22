---
id: vip-std-002
title: VIP-STD-002 — Grootboekprofiel
sidebar_position: 4
---

# VIP-STD-002  
## Grootboekprofiel (Uitbreiding op VIP-STD-001)

---

# 1. Reikwijdte

Dit document definieert het optionele Grootboekprofiel van het VeriSeal Integrity Protocol (VIP).

Het specificeert de alleen-toevoegen-opname structuur voor bewijsbestendigheid.

Dit profiel breidt VIP-STD-001 uit maar wijzigt het kernintegriteitsmodel niet.

---

# 2. Relatie tot VIP-STD-001

VIP-STD-002:

- MOET bewijsobjecten gebruiken die voldoen aan VIP-STD-001  
- MAG de kanonieke vorm of hash-berekening NIET wijzigen  
- MOET deterministische verificatie behouden  

De grootboeklaag registreert bewijzen; het herdefinieert ze niet.

---

# 3. Definities

**Grootboekvermelding**  
Een gestructureerd record dat een bewijsobject en zijn kettingreferentie bevat.

**Vorige Hash (prev_hash)**  
De integriteitshash van de voorgaande grootboekvermelding.

**Ketenhoofd**  
De meest recente geldige grootboekvermelding in een reeks.

---

# 4. Structuur van Grootboekvermelding

Een conforme grootboekvermelding MOET als volgt zijn:

```json
{
  "v": 1,
  "type": "LEDGER_ENTRY",
  "proof": { ...VIP-STD-001 compliant object... },
  "prev_hash": "<sha256-hex of null>",
  "entry_hash": "<sha256-hex>"
}

Waarbij:

- `proof` MOET een geldig VIP-STD-001 bewijsobject zijn  
- `prev_hash` MOET verwijzen naar de vorige vermelding hash of null zijn voor de eerste vermelding  
- `entry_hash` MOET de SHA-256 hash zijn van de gekanoniseerde grootboekvermelding exclusief `entry_hash` zelf  

---

# 5. Regels voor Hash-berekening

5.1 Kanonieke vorm  
Grootboekvermeldingen MOETEN worden gekanoniseerd volgens de regels van VIP-STD-001.

5.2 Vermelding Hash  
De `entry_hash` MOET worden berekend over:

{
  "v",
  "type",
  "proof",
  "prev_hash"
}

5.3 Determinisme  
Twee identieke grootboekvermeldingen MOETEN identieke `entry_hash` waarden produceren.

---

# 6. Alleen-toevoegen Vereiste

6.1 Onveranderlijkheid  
Grootboekvermeldingen MOGEN NIET worden gewijzigd na invoeging.

6.2 Volgorde  
Elke vermelding MOET exact één voorganger refereren, behalve de genesisvermelding.

6.3 Genesisvermelding  
De eerste grootboekvermelding MOET `prev_hash` op null instellen.

---

# 7. Ketenvalidatie

Een conforme grootboekvalidatieproces MOET:

1. Elk ingebed bewijs valideren volgens VIP-STD-001  
2. Elke `entry_hash` herberekenen  
3. `prev_hash` kettingconsistentie verifiëren  
4. Afwezigheid van gebroken links bevestigen  

Een keten is GELDIG als alle vermeldingen aan deze voorwaarden voldoen.

---

# 8. Opslagonafhankelijkheid

Het Grootboekprofiel:

- Verplicht geen opslagbackend
- Verplicht geen gedistribueerde consensus
- Vereist geen blockchain-implementatie
- Definieert geen replicatieregels

Het definieert alleen structurele ketening.

---

# 9. Conformiteit

Een systeem dat beweert te voldoen aan VIP-STD-002 MOET:

1. VIP-STD-001 bewijsobjecten accepteren  
2. Een alleen-toevoegen grootboekstructuur implementeren  
3. Hash-ketenintegriteit afdwingen  
4. Deterministische ketenvalidatie bieden  

Details van grootboekimplementatie MOGEN variëren mits structureel determinisme behouden blijft.

---

# 10. Overwegingen voor Veiligheid

De veiligheid van dit profiel hangt af van:

- Integriteit van de opslagomgeving  
- Bescherming tegen ongeoorloofde wijziging  
- Juiste kanonieke vorm  

Dit profiel voorkomt geen verwijderingsaanvallen tenzij gecombineerd met verankeringsmechanismen gedefinieerd in VIP-STD-004.

---

# 11. Conclusie

VIP-STD-002 definieert de structurele persistentielaag van het VeriSeal Integrity Protocol.

Het verzekert alleen-toevoegen ketening en langdurige bewijsconsistentie zonder het kernintegriteitsmodel te wijzigen.