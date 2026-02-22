File: deployment-model.md

---
id: deployment-model
title: Modello di Distribuzione
sidebar_position: 4.2
---

# Modello di Distribuzione

## Stack di Riferimento

L'architettura tipica può includere:

- Livello applicativo (ad es., FastAPI)
- Generazione di prove deterministiche
- Database di registro solo aggiuntivo
- Output JSON canonico
- Ancoraggio temporale opzionale
- Livello gateway sicuro TLS

Lo stack specifico può evolversi.

Il modello di prova deterministica deve rimanere stabile.

---

## Configurazioni Sovrane

Le istituzioni possono richiedere:

- Garanzie di residenza dei dati
- Infrastruttura isolata
- Endpoint di verifica privati
- Controlli di governance interna

La logica di verifica deve rimanere interoperabile tra le distribuzioni.

---

## Separazione della Verifica Pubblica

Gli endpoint di verifica possono operare indipendentemente da:

- Sistemi di autenticazione
- Logica aziendale
- Archiviazione dei dati

Ciò garantisce la verificabilità a lungo termine anche in caso di cambiamenti organizzativi.