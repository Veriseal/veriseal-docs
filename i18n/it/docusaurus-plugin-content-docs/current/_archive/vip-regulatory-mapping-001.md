---
title: VIP-REG-001 - Mappatura Regolamentare VeriSeal
sidebar_label: VIP-REG-001
---

# VIP-REG-001 - Mappatura Regolamentare VeriSeal

Versione: 1.0
Stato: Informativo
Classificazione: Posizionamento Regolamentare

---

## 1. Introduzione

Questo documento fornisce una mappatura regolamentare non vincolante del VeriSeal Integrity Framework rispetto a strumenti normativi europei selezionati.

È destinato a:

- Discussioni regolamentari
- Presentazioni istituzionali
- Analisi dell'architettura di conformità
- Pianificazione dell'integrazione

Questo documento NON costituisce consulenza legale.

---

## 2. Ambito della Mappatura

La mappatura fa riferimento a:

- Regolamento eIDAS (UE) n. 910/2014
- Evoluzione del quadro eIDAS 2.0
- ISO/IEC 27001
- ISO/IEC 27002
- Direttiva NIS2
- Standard ETSI per firme elettroniche e marcatura temporale

Questa mappatura si concentra sull'allineamento tecnico, non sullo stato di certificazione.

---

## 3. Mappatura eIDAS

## 3.1 Integrità delle Prove Elettroniche

VIP-STD-001 garantisce:

- Integrità deterministica
- Rilevamento delle manomissioni
- Immutabilità strutturale

Questo è in linea con:

- Articolo 41 (Integrità dei documenti elettronici)
- Principi di conservazione delle prove elettroniche

VeriSeal NON fornisce:

- Stato di firma elettronica qualificata
- Stato di fornitore di servizi fiduciari qualificati

---

## 3.2 Firme Elettroniche

VIP-STD-003 fornisce:

- Autenticità crittografica
- Verifica deterministica

Tuttavia:

- La verifica dell'identità è fuori ambito
- La certificazione di firma qualificata non è inclusa
- La validazione della catena di fiducia del certificato non è definita nella versione attuale

---

## 3.3 Marcatura Temporale

VIP-STD-004 fornisce:

- Ancoraggio temporale esterno
- Verificabilità pubblica
- Vincolo deterministico dell'hash di ancoraggio

Questo è concettualmente allineato con:

- ETSI EN 319 421 (Politica e Requisiti di Sicurezza per la Marcatura Temporale)

Non rivendica lo stato di autorità di marcatura temporale qualificata.

---

## 4. Allineamento ISO/IEC 27001

Il framework contribuisce a:

- A.8 - Integrità degli Asset
- A.12 - Registrazione e Monitoraggio
- A.14 - Controlli di Integrità del Sistema
- A.18 - Conservazione delle Prove di Conformità

Il framework stesso non è un ISMS.

Può servire come componente di controllo tecnico all'interno di un ISMS.

---

## 5. Allineamento Direttiva NIS2

VIP-STD-002 e VIP-STD-004 contribuiscono a:

- Tracciabilità degli incidenti
- Conservazione delle prove
- Integrità deterministica degli eventi

Tuttavia, NIS2 richiede:

- Governance organizzativa
- Procedure di gestione del rischio
- Quadri di segnalazione degli incidenti

Questi sono esterni al protocollo.

---

## 6. Posizionamento di Sovranità

Il framework è:

- Neutro rispetto all'infrastruttura
- Neutro rispetto al fornitore
- Deterministico crittograficamente
- Verificabile apertamente

Non richiede:

- Dipendenza da cloud esteri
- Servizi di validazione proprietari
- Infrastruttura di verifica chiusa

Questo supporta gli obiettivi di sovranità digitale.

---

## 7. Limiti di Conformità

Il VeriSeal Integrity Framework:

- Fornisce garanzie di integrità tecnica
- NON fornisce certificazione legale
- NON fornisce garanzia di identità
- NON sostituisce i fornitori di servizi fiduciari

Può integrare i servizi fiduciari regolamentati.

---

## 8. Implicazioni della Strategia Regolamentare

Il framework può essere posizionato come:

- Infrastruttura di prove crittografiche
- Strato di integrità per sistemi regolamentati
- Infrastruttura di supporto all'audit
- Complementare ai servizi fiduciari qualificati

NON è posizionato come sostituto per:

- Fornitori di Firme Elettroniche Qualificate
- Autorità di Marcatura Temporale Qualificate
- Infrastrutture PKI nazionali

---

## 9. Allineamento Regolamentare Futuro

Le estensioni future POTREBBERO includere:

- Profilo di marcatura temporale qualificata
- Integrazione del portafoglio eIDAS 2.0
- Profilo di legame dell'identità
- Allineamento alla conformità ETSI
- Profilo di supporto alla certificazione

---

## 10. Conclusione

Il VeriSeal Integrity Framework è tecnicamente allineato con i principi di integrità regolamentare europei.

Fornisce:

- Rilevamento deterministico delle manomissioni
- Integrità strutturale crittografica
- Corroborazione temporale esterna
- Integrazione modulare di conformità

La certificazione regolamentare richiede ulteriori livelli organizzativi, legali e operativi.