---
title: Verificatiemodel
sidebar_label: 2.3 Verificatiemodel
slug: /whitepaper/part2/verification-model
sidebar_position: 2.3
---

# 2.3 Verificatiemodel

Een vertrouwensinfrastructuur kan niet afhankelijk zijn van de bewering van de operator.

Verificatie moet onafhankelijk uitvoerbaar zijn.

---

## Verificatiestappen

1. Herbereken canonieke payload  
2. Herbereken SHA-256 digest  
3. Valideer Merkle-inclusie (indien van toepassing)  
4. Valideer grootboekketening  
5. Valideer optionele OTS-verankering  
6. Valideer optionele PDF-handtekening  

Geen eigen serverlogica is vereist.

---

## Openbaar JSON-principe

Openbaar JSON is de bron van waarheid.

PDF is alleen voor weergave.

Verificatie moet mogelijk blijven, zelfs als:

- De operator zijn activiteiten staakt
- De commerciële entiteit verandert
- Infrastructuur migreert

---

## Transparantie Zonder Gegevenslek

Openbare verificatie onthult:

- Verbintenissen  
- Hashes  
- Integriteitsfeiten  

Het onthult niet:

- Privé-inhoud  
- Vertrouwelijke payloads  
- Gevoelige metadata  

Deze scheiding is structureel.

---

## Institutioneel Vertrouwen

Onafhankelijke reproduceerbaarheid maakt mogelijk:

- Regelgevend toezicht  
- Forensische audit  
- Grensoverschrijdende verificatie  
- Langdurige archiefvalidatie  

VeriSeal minimaliseert vertrouwen.
Het maximaliseert reproduceerbaarheid.