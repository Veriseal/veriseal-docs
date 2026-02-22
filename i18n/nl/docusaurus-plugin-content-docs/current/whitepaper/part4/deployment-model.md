---
id: deployment-model
title: Implementatiemodel
sidebar_position: 4.2
---

# Implementatiemodel

## Referentiestack

Typische architectuur kan omvatten:

- Applicatielaag (bijv. FastAPI)
- Deterministische bewijsvoering
- Alleen-toevoegbare grootboekdatabase
- Canonieke JSON-uitvoer
- Optionele tijdstempelverankering
- TLS-beveiligde gatewaylaag

De specifieke stack kan evolueren.

Het deterministische bewijsmodel moet stabiel blijven.

---

## Soevereine Configuraties

Instellingen kunnen vereisen:

- Garanties voor gegevensresidency
- Geïsoleerde infrastructuur
- Privé-verificatie-eindpunten
- Interne governancecontroles

Verificatielogica moet interoperabel blijven over implementaties heen.

---

## Scheiding van Publieke Verificatie

Verificatie-eindpunten kunnen onafhankelijk opereren van:

- Authenticatiesystemen
- Bedrijfslogica
- Gegevensopslag

Dit verzekert langdurige verifieerbaarheid, zelfs bij organisatorische veranderingen.