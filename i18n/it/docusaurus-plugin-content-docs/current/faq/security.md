File: security.md

---
id: security
title: Sicurezza
---

﻿---
title: Domande Frequenti su Sicurezza e Integrità
sidebar_label: Sicurezza e Integrità
---

# Domande Frequenti su Sicurezza e Integrità

Questa sezione affronta considerazioni tecniche sulla sicurezza e scenari di rischio di integrità relativi a VeriSeal.

VeriSeal è uno strato di rinforzo dell'integrità.

Non sostituisce l'infrastruttura di cybersicurezza.

Rafforza la rilevabilità delle manomissioni strutturali.

---

## 1. VeriSeal previene la modifica dei dati?

No.

VeriSeal non previene la modifica.

Garantisce che qualsiasi modifica diventi rilevabile.

Se i dati sottostanti cambiano:

- L'hash ricalcolato sarà diverso
- La prova di integrità fallirà
- La manomissione diventa visibile

È un modello di rilevamento, non un modello di prevenzione.

---

## 2. Un amministratore privilegiato può alterare i record senza essere rilevato?

Se un record protetto da VeriSeal viene alterato:

- Il suo hash cambia
- La validazione dell'integrità fallisce
- La continuità della catena si interrompe (se il chaining è abilitato)

Anche gli utenti privilegiati non possono modificare il contenuto sigillato senza lasciare prove rilevabili.

Il potere amministrativo non prevale sulla coerenza crittografica.

---

## 3. Le prove possono essere retrodatate?

La retrodatazione è rilevabile quando:

- I campi di timestamp sono inclusi negli oggetti canonici
- Il chaining degli eventi è abilitato
- Sono utilizzati meccanismi di ancoraggio esterni (opzionale)

VeriSeal rafforza la difendibilità cronologica.

Non crea un'autorità temporale assoluta.

---

## 4. Cosa succede se il registro interno viene eliminato?

Le prove di integrità possono ancora essere verificate se:

- Esistono oggetti di prova canonici
- L'algoritmo di hash è noto (SHA-256)
- Le regole del protocollo sono documentate

L'eliminazione del registro influisce sulla validazione della continuità.

Non invalida il ricalcolo delle singole prove.

La resilienza del registro dipende dall'architettura di distribuzione.

---

## 5. Qual è la superficie di attacco?

VeriSeal non introduce:

- Networking peer-to-peer aperto
- Validatori di consenso
- Meccanismi tokenizzati
- Governance di nodi distribuiti

Opera:

- In modo neutrale rispetto all'infrastruttura
- Senza livello di consenso
- Senza requisito di trasmissione pubblica

La sua principale esposizione è:

La qualità dell'implementazione.

La sicurezza dipende dall'architettura di distribuzione.

---

## 6. VeriSeal è vulnerabile alle collisioni di hash?

VeriSeal si basa su SHA-256.

SHA-256 è ampiamente accettato come resistente alle collisioni secondo l'attuale comprensione crittografica.

Non è noto alcun attacco pratico di collisione al momento.

L'evoluzione crittografica futura potrebbe richiedere agilità algoritmica.

I meccanismi di evoluzione del protocollo possono supportare aggiornamenti di hash.

---

## 7. Cosa succede se SHA-256 diventa debole?

Il versionamento del protocollo consente:

- Introduzione futura di algoritmi di hash
- Supporto multi-hash (se implementato)
- Strategie di migrazione in avanti

Le prove esistenti rimangono verificabili nel loro contesto di hash originale.

L'evoluzione crittografica può essere gestita senza ridisegno strutturale.

---

## 8. VeriSeal richiede connettività internet?

No.

La verifica delle prove canoniche richiede:

- L'oggetto di prova
- L'algoritmo di hash
- Le regole documentate

La marcatura temporale esterna (se utilizzata) può richiedere connettività.

L'integrità di base no.

---

## 9. VeriSeal può funzionare completamente on-premise?

Sì.

VeriSeal può operare:

- On-premise
- In cloud privato
- In architetture ibride
- In ambienti isolati

Il modello di distribuzione è neutrale rispetto all'infrastruttura.

---

## 10. VeriSeal espone dati riservati?

No.

VeriSeal opera su hash di oggetti canonici.

Gli hash:

- Non rivelano il contenuto sottostante
- Non espongono campi sensibili
- Non trasmettono dati pubblicamente

La riservatezza rimane controllata dall'istituzione.

---

## 11. Le prove di integrità possono essere falsificate?

Per falsificare una prova valida senza il contenuto originale, un attaccante dovrebbe:

- Produrre un oggetto canonico diverso
- Che risulti nello stesso identico hash SHA-256

Ciò richiederebbe una collisione crittografica.

Nessun attacco pratico attualmente lo consente.

La falsificazione è computazionalmente infattibile secondo le attuali ipotesi.

---

## 12. VeriSeal crea punti di fallimento singoli?

Non viene introdotta alcuna nuova dipendenza da consenso o rete.

La resilienza operativa dipende da:

- Architettura di hosting
- Progettazione della ridondanza
- Strategie di backup
- Processi di governance

VeriSeal non impone la custodia centralizzata.

---

## 13. Cosa succede se il fornitore scompare?

La verifica delle prove richiede:

- Oggetto canonico
- Funzione di hash (SHA-256)
- Protocollo documentato

La verifica non dipende dall'infrastruttura del fornitore.

La scomparsa del fornitore non invalida le prove esistenti.

---

## 14. VeriSeal può essere utilizzato per la rilevazione di frodi interne?

Sì.

Rafforza:

- Rilevamento delle manomissioni
- Ricostruzione cronologica (se il chaining è utilizzato)
- Validazione dello stato dei record

Non sostituisce:

- Analisi delle frodi
- Sistemi di monitoraggio
- Controlli di accesso

Rafforza la tracciabilità strutturale.

---

## 15. VeriSeal aumenta la complessità operativa?

La distribuzione può iniziare in modo incrementale.

Non richiede:

- Sostituzione del sistema
- Revisione architettonica
- Infrastruttura di consenso
- Sistemi di token

La complessità dipende dall'ambito di integrazione.

La distribuzione iniziale può mirare a:

- Flussi di lavoro ad alto rischio
- Processi sensibili agli audit
- Record di alto valore

---

## 16. VeriSeal è in conflitto con i sistemi di logging esistenti?

No.

Si integra con:

- Audit logging
- Sistemi SIEM
- Flussi di lavoro di governance
- Sistemi di gestione degli accessi

Rafforza la dimostrabilità dell'integrità.

Non sostituisce gli strumenti di monitoraggio.

---

## 17. Le prove possono essere sottoposte a audit indipendente?

Sì.

Gli auditor indipendenti possono:

- Ricalcolare gli hash
- Validare la struttura canonica
- Validare la continuità della catena (se abilitata)
- Validare il vincolo della firma (se utilizzato)

Non è richiesto alcun meccanismo di verifica proprietario.

---

## 18. VeriSeal protegge contro il ransomware?

VeriSeal non previene il ransomware.

Può aiutare a rilevare:

- Manomissioni post-evento
- Alterazione dei record
- Manipolazione cronologica

Rafforza la difendibilità forense.

Non sostituisce la protezione della cybersicurezza.

---

## 19. VeriSeal crea nuovi obblighi di cybersicurezza?

Non viene introdotta alcuna nuova categoria regolatoria.

Gli obblighi di sicurezza rimangono governati da:

- Regolamentazione specifica del settore
- Governance interna
- Quadri di protezione dei dati

VeriSeal rafforza le prove di integrità.

---

## 20. Qual è il modello di sicurezza di VeriSeal in una frase?

VeriSeal garantisce che se i record digitali vengono alterati,
l'alterazione diventa rilevabile crittograficamente.

È un protocollo di rilevamento delle manomissioni.

Non un meccanismo di prevenzione.