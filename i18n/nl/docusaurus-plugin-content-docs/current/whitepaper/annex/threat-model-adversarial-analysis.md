---
title: Dreigingsmodel & Adversariële Analyse
sidebar_label: Dreigingsmodel (Bijlage)
---

# Dreigingsmodel & Adversariële Analyse

## 1. Doel en Reikwijdte

Deze bijlage biedt een op veiligheid gerichte analyse van de VeriSeal-bewijsinfrastructuur onder vijandige omstandigheden.

Het definieert:

- Dreigingsactoren en capaciteiten
- Vertrouwensgrenzen
- Aanvalsoppervlakken
- Veiligheidsveronderstellingen
- Detectie- en mitigatiemechanismen
- Restanten risico's en governancevereisten

Deze bijlage is geschreven voor institutionele belanghebbenden (CISO, Risico, Audit, Naleving).

---

## 2. Te Beschermen Systeemactiva

VeriSeal is ontworpen om de **integriteit en verifieerbaarheid** van bewijsmateriaal en bewijsstukken te beschermen.

Primaire activa:

1. **Integriteit van Artefacten**
   Het verzegelde artefact moet in de loop van de tijd verifieerbaar en manipulatieresistent blijven.

2. **Integriteit van Bewijsobjecten**
   Bewijsstukken (canonieke JSON) mogen niet veranderbaar zijn zonder detectie.

3. **Continuïteit van het Grootboek**
   De alleen-toevoegbare keten moet structureel onveranderlijk en chronologisch consistent blijven.

4. **Onafhankelijke Verificatie**
   Derden moeten in staat zijn om bewijzen te verifiëren zonder vertrouwen in de operator.

5. **Tijdstempelintegriteit (optionele externe verankering)**
   Wanneer externe verankering bestaat, moet de verankering de tijdzekerheid versterken.

6. **Sleutelintegriteit (ondertekeningssleutels)**
   Privésleutels die voor ondertekening worden gebruikt, moeten vertrouwelijk en beheerd blijven.

---

## 3. Dreigingsactoren

### 3.1 Externe Tegenstander
Capaciteiten:
- Pogingen tot onderschepping op netwerkniveau
- Onderzoek van openbare eindpunten
- Pogingen tot vervanging van artefacten
- Pogingen tot herhaling van capture-flows (indien van toepassing)

Beperkingen:
- Geen directe toegang tot ondertekeningssleutels of interne opslag (verondersteld)

### 3.2 Insider Bedreiging (Operator of Bevoorrechte Beheerder)
Capaciteiten:
- Potentiële toegang tot infrastructuur
- Pogingen om records te wijzigen
- Pogingen om bewijsmateriaal te verwijderen of selectief te verbergen
- Pogingen om PDF- of presentatie-uitvoer te manipuleren

### 3.3 Kwaadaardige Bewijsmateriaalindiener
Capaciteiten:
- Vals of misleidend materiaal indienen
- Gemanipuleerde artefacten indienen
- Poging om workflow-ambiguïteit uit te buiten
- Poging tot ontkenning na verzegeling ("Ik heb dit nooit verzonden")

### 3.4 Gecompromitteerd Clientapparaat
Capaciteiten:
- Malware wijzigt artefact vóór verzegeling
- Inbreuk op inloggegevens
- Onderschept of wijzigt lokale gegevens vóór upload

### 3.5 Leveringsketen / Afhankelijkheids Tegenstander
Capaciteiten:
- Compromis van afhankelijkheden
- Compromis van de bouwpijplijn
- Pogingen tot runtime-injectie

---

## 4. Vertrouwensgrenzen

VeriSeal handhaaft expliciete vertrouwensgrenzen:

Binnen de VeriSeal-vertrouwensgrens:
- Hash-berekening
- Generatie van canoniek bewijsobject
- Grootboektoevoegingsoperatie
- Handtekeninggeneratie (beheerd sleuteldomein)
- Optionele verankering indiening

Buiten de vertrouwensgrens:
- Artefact creatietools
- Beveiliging van gebruikersapparaten
- Semantische waarheid van inhoud
- Juridische interpretatie
- Menselijke intentie en context

Belangrijk principe: **VeriSeal beveiligt structuur, niet betekenis.**

---

## 5. Overzicht van Aanvalsoppervlakken

Primaire aanvalsoppervlakken:

1. **Invoer van artefacten** (upload / payloadgeneratie)
2. **Bewijsgeneratiepijplijn** (hashing + canonisatie + ondertekening)
3. **Grootboekopslag** (integriteit van alleen-toevoegbare keten)
4. **Verificatie-eindpunten** (openbare JSON, PDF-weergave, HTML-verificatiepagina)
5. **Sleutelbeheer** (vertrouwelijkheid van privésleutels en gebruiksbeleid)
6. **Build/CI en afhankelijkheidsketen** (integriteit van de leveringsketen)

---

## 6. Dreigingsscenario's en Mitigaties

### 6.1 Manipulatie van Artefacten na Verzegeling
Aanval: Artefact gewijzigd na verzegeling.

Detectie:
- Herberekende SHA-256-digest verschilt.

Mitigatie:
- Deterministische hashing
- Bewijsvalidatie vereist herberekening

Restant risico:
- Geen voor detectie (integriteit detecteert altijd verandering)
- Semantische geschillen blijven mogelijk

---

### 6.2 Manipulatie van Bewijsobjecten (JSON)
Aanval: Bewijs JSON-velden wijzigen (tijdstempels, identificatoren, vlaggen).

Detectie:
- Handtekeningverificatie mislukt
- Hash-mismatch in canonieke herberekening

Mitigatie:
- Canonieke JSON als bron van waarheid
- Handtekening over canonieke payload

Restant risico:
- Als ondertekeningssleutel is gecompromitteerd (zie scenario sleutelcompromis)

---

### 6.3 Mutatie / Verwijdering van Grootboek
Aanval: Een invoer verwijderen of historische keten herschrijven.

Detectie:
- Ketendiscontinuïteit (mismatch van previous_entry_hash)
- Mismatch bij herberekening van entry_hash

Mitigatie:
- Alleen-toevoegbare architectuur
- Kettinghash-afhankelijkheid
- Regelmatige externe verankering aanbevolen voor hoge zekerheid

Restant risico:
- Aanvallen op opslagniveau kunnen het hele grootboek verwijderen als governance zwak is
  (beschikbaarheidsrisico; integriteitsdetectie blijft, maar bewijsmateriaal kan ontbreken)

---

### 6.4 Selectieve Onderdrukking van Bewijsmateriaal ("Bewijs Verbergen")
Aanval: Operator verbergt of weigert een bewijs-eindpunt te bedienen.

Detectie:
- Openbare referentie bestaat maar eindpunt reageert niet
- Externe kopieën van JSON bewijzen eerdere aanwezigheid

Mitigatie:
- Aanmoedigen van institutionele archivering van bewijsbundels
- Externe verankering versterkt bestaansclaims
- Governancebeleid voor beschikbaarheid

Restant risico:
- Beschikbaarheid blijft operationeel beheerd

---

### 6.5 Manipulatie van Presentatielaag (PDF/HTML)
Aanval: PDF-weergave of HTML-weergave wijzigen om een valse status te tonen.

Detectie:
- Canonieke JSON blijft bron van waarheid
- Verificator herberekent hashes en valideert handtekening

Mitigatie:
- Alleen-weergave regel
- Verificatielogica is nooit afhankelijk van presentatie-uitvoer

Restant risico:
- Risico op social engineering blijft (gebruikers vertrouwen visuals zonder te verifiëren)

---

### 6.6 Herhalingsaanvallen (Opname-gebaseerde Bewijzen)
Aanval: Een eerdere video/audio-opname herhalen om levendigheid te vervalsen.

Detectie/Mitigatie (wanneer capture-flows bestaan):
- Challenge-response binding (dynamische prompts)
- Hashing van runtime-gebeurtenislog
- Mediabinding aan runtime-payload

Restant risico:
- Afhankelijk van de kwaliteit van de capture-workflow
- Niet van toepassing op statische artefactverzegeling gebruiksscenario's

---

### 6.7 Man-in-the-Middle / Transportlaag Aanval
Aanval: Verkeer onderscheppen of wijzigen tijdens upload of verificatie.

Mitigatie:
- TLS afgedwongen (HTTPS)
- Herberekening van hash en validatie van handtekening voorkomt stille manipulatie

Restant risico:
- Diefstal van inloggegevens valt buiten het cryptografische model
- Netwerkdowngrade-aanvallen worden gemitigeerd via strikte HTTPS en HSTS (aanbevolen)

---

### 6.8 Compromis van Privésleutel
Aanval: Ondertekeningssleutel gestolen.

Impact:
- Aanvaller kan vervalste bewijzen uitgeven die geldig lijken
- Historische bewijzen blijven verifieerbaar maar vertrouwen in ondertekenaar wordt beïnvloed

Mitigatie:
- HSM / KMS-ondersteunde ondertekening
- Sleutelrotatiebeleid
- Auditlogs voor ondertekeningsoperaties
- Scheiding van taken (dubbele controle)

Restant risico:
- Scenario met de hoogste impact; governance is verplicht

---

### 6.9 Verzwakking van Hash-functie (Cryptografische Doorbraak)
Aanval: Praktische botsing of tweede pre-image tegen SHA-256.

Impact:
- Integriteitsveronderstellingen verslechteren

Mitigatie:
- Algoritme flexibiliteit (hash_version veld)
- Mogelijkheid om bewijzen opnieuw te verankeren met sterkere primitieve
- Ondersteuning voor dual-hash strategieën in toekomstige versies

Restant risico:
- Langetermijnrisico van cryptografische evolutie bestaat voor alle systemen

---

### 6.10 Compromis van de Leveringsketen
Aanval: Bouwafhankelijkheden injecteren kwaadaardige logica.

Mitigatie:
- Afhankelijkheden vastpinnen
- Reproduceerbare builds
- Code ondertekening
- SBOM-generatie
- CI-integriteitscontroles

Restant risico:
- Vereist gedisciplineerd softwarebeheer

---

## 7. Veiligheidsveronderstellingen

VeriSeal veiligheidsveronderstellingen:

- SHA-256 blijft veilig (geen haalbare botsingen)
- Handtekeningenschema blijft veilig (geen haalbare vervalsing zonder privésleutel)
- Canonieke serialisatie is deterministisch en gecontroleerd
- Alleen-toevoegbare handhaving is operationeel beschermd
- Privésleutels worden beschermd door institutioneel sleutelbeheer

---

## 8. Veiligheidsgaranties (Wat VeriSeal Eigenlijk Garandeert)

VeriSeal garandeert:

- Detectie van elke wijziging van artefacten na verzegeling
- Deterministische verificatiereproduceerbaarheid
- Structurele integriteit en ketencontinuïteit (indien grootboek beschikbaar)
- Manipulatiebewijs van bewijsobjecten via handtekening
- Optionele externe tijdverankering versterking

VeriSeal garandeert niet:

- Waarheid van inhoud
- Identiteitslegitimiteit standaard
- Bescherming tegen gecompromitteerde clientapparaten
- Beschikbaarheid van bewijseindpunten zonder governance

---

## 9. Restant Risico en Governancevereisten

VeriSeal is het sterkst wanneer governance afdwingt:

- Sleutelbeheerbeleid (HSM/KMS, rotatie, audit)
- Beschikbaarheidsbeleid (archiefbundels, redundantie)
- Rolsegregatie (verzegeling vs verificatie vs administratie)
- Incidentresponsprocedures
- Externe verankeringsbeleid voor gebruiksscenario's met hoge zekerheid

Zonder governance blijft integriteit detecteerbaar, maar kan operationele veerkracht afnemen.

---

## 10. Samenvatting van Institutionele Veiligheidshouding

VeriSeal is ontworpen als:

- Een deterministisch integriteitsprotocol
- Een audit-compatibele bewijslast
- Een systeem dat afhankelijkheid van vertrouwen minimaliseert
- Een manipulatieresistent grootboek + bewijsobjectmodel

Het biedt verifieerbare integriteitsgaranties onder vijandige omstandigheden, mits sleutelgovernance en operationele controles worden gehandhaafd.

---

## 11. Risicoclassificatiematrix

Dit gedeelte formaliseert de ernst van dreigingen op basis van impact en waarschijnlijkheid.

Risicoclassificatiemodel:

- Waarschijnlijkheid: Laag / Medium / Hoog
- Impact: Matig / Significant / Kritiek
- Restant Risico: Na mitigatiecontroles
- Risico-eigenaar: Governance-verantwoordelijkheidsdomein

| Dreigingsscenario | Waarschijnlijkheid | Impact | Mitigatie Sterkte | Restant Risico | Risico-eigenaar |
|-------------------|--------------------|--------|-------------------|----------------|-----------------|
| Manipulatie van artefacten na verzegeling | Medium | Significant | Cryptografische detectie | Laag | Verificatielaag |
| Wijziging van bewijs JSON | Laag | Significant | Handtekening + canonisatie | Laag | Cryptografische laag |
| Grootboekmutatie | Laag | Kritiek | Hash chaining + detectie | Laag | Infrastructuurgovernance |
| Onderdrukking van bewijsmateriaal | Medium | Significant | Archivering + verankering | Medium | Operationele governance |
| Manipulatie van presentatie | Medium | Matig | JSON bron van waarheid | Laag | Verificatiediscipline |
| Compromis van privésleutel | Laag | Kritiek | HSM/KMS + rotatie | Medium | Sleutelgovernance |
| Verzwakking van hash-algoritme | Zeer Laag | Kritiek | Algoritme flexibiliteit | Laag | Cryptografische governance |
| Compromis van de leveringsketen | Medium | Significant | CI-controles + SBOM | Medium | DevSecOps governance |

Samenvatting van risicohouding:

- Structurele integriteitsrisico's worden sterk gemitigeerd.
- Compromis van sleutels blijft het scenario met de hoogste impact.
- Governance-rijpheid beïnvloedt direct het resterende risico.

---

## 12. Governance- & Rolsegregatiemodel

VeriSeal-veiligheid veronderstelt institutionele scheiding van taken.

### 12.1 Functionele Rollen

**Verzegelingsoperator**
- Initieert bewijsgeneratie.
- Kan geen historische grootboekinvoeren wijzigen.

**Verificatieautoriteit**
- Voert onafhankelijke validatie uit.
- Heeft geen toegang tot ondertekeningssleutels.

**Sleutelbeheerder**
- Beheert ondertekeningssleutels.
- Werkt onder een beleid van dubbele controle.

**Infrastructuurbeheerder**
- Beheert systeem beschikbaarheid.
- Kan geen ondertekende bewijslast wijzigen.

**Auditfunctie**
- Beoordeelt logs en ketencontinuïteit.
- Onafhankelijk van operaties.

---

### 12.2 RACI Overzicht

| Functie | Verzegelen | Verifiëren | Ondertekenen | Onderhouden | Auditeren |
|---------|------------|------------|--------------|-------------|-----------|
| Verzegelingsoperator | R | C | - | - | - |
| Verificatieautoriteit | - | R | - | - | C |
| Sleutelbeheerder | - | - | R | - | C |
| Infrastructuurbeheerder | - | - | - | R | C |
| Audit | - | C | C | C | R |

R = Verantwoordelijk
C = Controle / Toezicht

---

### 12.3 Governance Principe

Integriteit wordt afgedwongen door cryptografie.
Vertrouwen wordt afgedwongen door governance-segregatie.

Cryptografische garanties verminderen de afhankelijkheid van menselijk vertrouwen,
maar institutionele governance zorgt voor veerkracht.

---

## 13. Incidentrespons & Sleutelcompromisprocedure

Dit gedeelte definieert de minimale institutionele responspositie.

### 13.1 Sleutelcompromisscenario

Als ondertekeningssleutelcompromis wordt vermoed:

1. Onmiddellijke intrekking van de sleutel.
2. Stop met het uitgeven van nieuwe bewijzen.
3. Genereer een nieuw paar ondertekeningssleutels.
4. Publiceer een openbare incidentmelding.
5. Herveranker de systeemstatus (indien van toepassing).
6. Voer een forensische audit uit.

Historische bewijzen blijven structureel verifieerbaar.
Het vertrouwensdomein verschuift naar de geldigheidstijdlijn van de sleutel.

---

### 13.2 Incident met Bewijsintegriteit

Als grootboekcorruptie wordt gedetecteerd:

- Herbereken ketencontinuïteit.
- Identificeer het divergentiepunt.
- Herstel vanuit gevalideerde back-up.
- Publiceer integriteitsverklaring.

---

### 13.3 Principe van Openbare Transparantie

Voor institutionele implementaties:

- Incident openbaarmakingsbeleid vereist.
- Tijdgestempelde incidentlogs aanbevolen.
- Onafhankelijke audit aanbevolen voor domeinen met hoge zekerheid.

---

### 13.4 Langetermijn Cryptografische Evolutie

Als hash- of handtekeningprimitieven verzwakken:

- Introduceer een versieveld voor hash.
- Herveranker bestaande bewijzen.
- Ondersteun dual-hash strategie tijdens migratie.

Algoritme flexibiliteit moet worden ingebouwd in de governance-roadmap.