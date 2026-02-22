---
title: Modello di Minaccia e Analisi Avversaria
sidebar_label: Modello di Minaccia (Allegato)
---

# Modello di Minaccia e Analisi Avversaria

## 1. Scopo e Ambito

Questo allegato fornisce un'analisi orientata alla sicurezza dell'infrastruttura di prova VeriSeal in condizioni avverse.

Definisce:

- Attori delle minacce e capacità
- Confini di fiducia
- Superfici di attacco
- Assunzioni di sicurezza
- Meccanismi di rilevamento e mitigazione
- Rischi residui e requisiti di governance

Questo allegato è scritto per stakeholder istituzionali (CISO, Rischio, Audit, Conformità).

---

## 2. Beni del Sistema da Proteggere

VeriSeal è progettato per proteggere l'**integrità e la verificabilità** degli artefatti di prova e dei registri di prova.

Beni primari:

1. **Integrità dell'Artefatto**
   L'artefatto sigillato deve rimanere verificabile e a prova di manomissione nel tempo.

2. **Integrità dell'Oggetto di Prova**
   I registri di prova (JSON canonico) non devono essere alterabili senza rilevamento.

3. **Continuità del Registro**
   La catena solo append deve rimanere strutturalmente immutabile e cronologicamente coerente.

4. **Indipendenza della Verifica**
   Terze parti devono poter verificare le prove senza fiducia nell'operatore.

5. **Integrità del Timestamp (ancoraggio esterno opzionale)**
   Quando esiste un ancoraggio esterno, l'ancora deve rafforzare la certezza temporale.

6. **Integrità delle Chiavi (chiavi di firma)**
   Le chiavi private utilizzate per la firma devono rimanere riservate e governate.

---

## 3. Attori delle Minacce

### 3.1 Avversario Esterno
Capacità:
- Tentativi di intercettazione a livello di rete
- Sondaggio degli endpoint pubblici
- Tentativi di sostituzione degli artefatti
- Tentativi di replay per flussi di cattura (quando applicabile)

Vincoli:
- Nessun accesso diretto alle chiavi di firma o all'archiviazione interna (presunto)

### 3.2 Minaccia Interna (Operatore o Amministratore Privilegiato)
Capacità:
- Potenziale accesso all'infrastruttura
- Tentativi di alterare i registri
- Tentativi di eliminare o nascondere selettivamente le prove
- Tentativi di manipolare output PDF o di presentazione

### 3.3 Sottomettitore di Prove Malintenzionato
Capacità:
- Sottomettere contenuti falsi o fuorvianti
- Sottomettere artefatti manipolati
- Tentare di sfruttare l'ambiguità del flusso di lavoro
- Tentare la ripudio dopo la sigillatura ("Non ho mai inviato questo")

### 3.4 Dispositivo Client Compromesso
Capacità:
- Malware modifica l'artefatto prima della sigillatura
- Compromissione delle credenziali
- Intercetta o altera i dati locali prima del caricamento

### 3.5 Avversario della Catena di Fornitura / Dipendenza
Capacità:
- Compromissione della dipendenza
- Compromissione della pipeline di build
- Tentativi di iniezione a runtime

---

## 4. Confini di Fiducia

VeriSeal applica confini di fiducia espliciti:

All'interno del confine di fiducia di VeriSeal:
- Calcolo dell'hash
- Generazione dell'oggetto di prova canonico
- Operazione di aggiunta al registro
- Generazione della firma (dominio chiave controllato)
- Sottomissione dell'ancora opzionale

Fuori dal confine di fiducia:
- Strumenti di creazione degli artefatti
- Sicurezza del dispositivo utente
- Verità semantica del contenuto
- Interpretazione legale
- Intenzione e contesto umano

Principio chiave: **VeriSeal protegge la struttura, non il significato.**

---

## 5. Panoramica della Superficie di Attacco

Superfici di attacco principali:

1. **Ingestione degli artefatti di input** (caricamento / generazione del payload)
2. **Pipeline di generazione delle prove** (hashing + canonizzazione + firma)
3. **Archiviazione del registro** (integrità della catena solo append)
4. **Endpoint di verifica** (JSON pubblico, rendering PDF, pagina di verifica HTML)
5. **Gestione delle chiavi** (riservatezza delle chiavi private e politica d'uso)
6. **Build/CI e catena di dipendenze** (integrità della catena di fornitura)

---

## 6. Scenari di Minaccia e Mitigazioni

### 6.1 Manomissione dell'Artefatto Post-Sigillatura
Attacco: Artefatto modificato dopo la sigillatura.

Rilevamento:
- Il digest SHA-256 ricalcolato differisce.

Mitigazione:
- Hashing deterministico
- La validazione della prova richiede la ricalcolazione

Rischio residuo:
- Nessuno per il rilevamento (l'integrità rileva sempre il cambiamento)
- Le dispute semantiche rimangono possibili

---

### 6.2 Manomissione dell'Oggetto di Prova (JSON)
Attacco: Alterare i campi JSON della prova (timestamp, identificatori, flag).

Rilevamento:
- La verifica della firma fallisce
- Mismatch dell'hash nella ricalcolazione canonica

Mitigazione:
- JSON canonico come fonte di verità
- Firma sul payload canonico

Rischio residuo:
- Se la chiave di firma è compromessa (vedi scenario di compromissione della chiave)

---

### 6.3 Mutazione / Eliminazione del Registro
Attacco: Eliminare una voce o riscrivere la catena storica.

Rilevamento:
- Discontinuità della catena (mismatch del previous_entry_hash)
- Mismatch del recomputazione dell'entry_hash

Mitigazione:
- Architettura solo append
- Dipendenza dall'hash della catena
- Ancoraggio esterno regolare raccomandato per alta sicurezza

Rischio residuo:
- Gli attacchi a livello di archiviazione possono eliminare l'intero registro se la governance è debole
  (rischio di disponibilità; il rilevamento dell'integrità rimane, ma le prove potrebbero mancare)

---

### 6.4 Soppressione Selettiva delle Prove ("Nascondere le Prove")
Attacco: L'operatore nasconde o rifiuta di servire un endpoint di prova.

Rilevamento:
- Riferimento pubblico esiste ma l'endpoint non risponde
- Copie esterne di JSON dimostrano l'esistenza precedente

Mitigazione:
- Incoraggiare l'archiviazione istituzionale dei pacchetti di prova
- L'ancoraggio esterno rafforza le affermazioni di esistenza
- Politiche di governance per la disponibilità

Rischio residuo:
- La disponibilità rimane governata operativamente

---

### 6.5 Manipolazione del Livello di Presentazione (PDF/HTML)
Attacco: Modificare il rendering PDF o la visualizzazione HTML per mostrare uno stato falso.

Rilevamento:
- Il JSON canonico rimane la fonte di verità
- Il verificatore ricalcola gli hash e valida la firma

Mitigazione:
- Regola solo rendering
- La logica di verifica non dipende mai dall'output di presentazione

Rischio residuo:
- Rischio di ingegneria sociale rimane (gli utenti si fidano dei visual senza verificare)

---

### 6.6 Attacchi di Replay (Prove Basate su Cattura)
Attacco: Riprodurre una cattura video/audio precedente per simulare la vivacità.

Rilevamento/Mitigazione (quando esistono flussi di cattura):
- Binding sfida-risposta (prompt dinamici)
- Hashing del log degli eventi runtime
- Binding dei media al payload runtime

Rischio residuo:
- Dipende dalla qualità del flusso di cattura
- Non applicabile ai casi d'uso di sigillatura di artefatti statici

---

### 6.7 Attacco Man-in-the-Middle / Livello di Trasporto
Attacco: Intercettare o alterare il traffico durante il caricamento o la verifica.

Mitigazione:
- TLS applicato (HTTPS)
- Ricalcolo dell'hash e validazione della firma prevengono manomissioni silenziose

Rischio residuo:
- Il furto di credenziali è al di fuori del modello crittografico
- Gli attacchi di downgrade della rete sono mitigati tramite HTTPS rigoroso e HSTS (raccomandato)

---

### 6.8 Compromissione della Chiave Privata
Attacco: Chiave di firma rubata.

Impatto:
- L'attaccante può emettere prove false che sembrano valide
- Le prove storiche rimangono verificabili ma la fiducia nel firmatario è compromessa

Mitigazione:
- Firma supportata da HSM / KMS
- Politica di rotazione delle chiavi
- Log di audit per le operazioni di firma
- Separazione dei compiti (controllo duale)

Rischio residuo:
- Scenario di impatto più elevato; la governance è obbligatoria

---

### 6.9 Indebolimento della Funzione Hash (Scoperta Crittografica)
Attacco: Collisione pratica o secondo preimage contro SHA-256.

Impatto:
- Le assunzioni di integrità si degradano

Mitigazione:
- Agilità dell'algoritmo (campo hash_version)
- Capacità di ri-ancorare le prove utilizzando primitive più forti
- Supporto per strategie a doppio hash nelle versioni future

Rischio residuo:
- Il rischio di evoluzione crittografica a lungo termine esiste per tutti i sistemi

---

### 6.10 Compromissione della Catena di Fornitura
Attacco: Le dipendenze di build iniettano logica malevola.

Mitigazione:
- Fissare le dipendenze
- Build riproducibili
- Firma del codice
- Generazione SBOM
- Controlli di integrità CI

Rischio residuo:
- Richiede una governance del software disciplinata

---

## 7. Assunzioni di Sicurezza

Assunzioni di sicurezza di VeriSeal:

- SHA-256 rimane sicuro (nessuna collisione fattibile)
- Lo schema di firma rimane sicuro (nessuna falsificazione fattibile senza chiave privata)
- La serializzazione canonica è deterministica e controllata
- L'applicazione solo append è protetta operativamente
- Le chiavi private sono protette dalla gestione delle chiavi istituzionale

---

## 8. Garanzie di Sicurezza (Cosa Garantisce Effettivamente VeriSeal)

VeriSeal garantisce:

- Rilevamento di qualsiasi modifica dell'artefatto post-sigillatura
- Riproducibilità della verifica deterministica
- Integrità strutturale e continuità della catena (se il registro è disponibile)
- Prova di manomissione dell'oggetto di prova tramite firma
- Rinforzo opzionale dell'ancoraggio temporale esterno

VeriSeal non garantisce:

- Verità del contenuto
- Legittimità dell'identità per impostazione predefinita
- Protezione contro dispositivi client compromessi
- Disponibilità degli endpoint di prova senza governance

---

## 9. Rischio Residuo e Requisiti di Governance

VeriSeal è più forte quando la governance applica:

- Politica di gestione delle chiavi (HSM/KMS, rotazione, audit)
- Politica di disponibilità (pacchetti di archiviazione, ridondanza)
- Separazione dei ruoli (sigillatura vs verifica vs amministrazione)
- Procedure di risposta agli incidenti
- Politica di ancoraggio esterno per casi d'uso ad alta sicurezza

Senza governance, l'integrità rimane rilevabile, ma la resilienza operativa può degradarsi.

---

## 10. Riepilogo della Posizione di Sicurezza Istituzionale

VeriSeal è progettato come:

- Un protocollo di integrità deterministico
- Un livello di prova compatibile con l'audit
- Un sistema che minimizza la dipendenza dalla fiducia
- Un modello di registro + oggetto di prova a prova di manomissione

Fornisce garanzie di integrità verificabili in condizioni avverse, a condizione che siano applicati controlli di governance e operativi chiave.

---

## 11. Matrice di Classificazione del Rischio

Questa sezione formalizza la gravità delle minacce secondo impatto e probabilità.

Modello di classificazione del rischio:

- Probabilità: Bassa / Media / Alta
- Impatto: Moderato / Significativo / Critico
- Rischio Residuo: Dopo i controlli di mitigazione
- Proprietario del Rischio: Dominio di responsabilità della governance

| Scenario di Minaccia | Probabilità | Impatto | Forza della Mitigazione | Rischio Residuo | Proprietario del Rischio |
|----------------------|-------------|---------|-------------------------|-----------------|--------------------------|
| Manomissione dell'artefatto post-sigillatura | Media | Significativo | Rilevamento crittografico | Basso | Livello di verifica |
| Alterazione del JSON di prova | Bassa | Significativo | Firma + canonizzazione | Basso | Livello crittografico |
| Mutazione del registro | Bassa | Critico | Catena di hash + rilevamento | Basso | Governance dell'infrastruttura |
| Soppressione delle prove | Media | Significativo | Archiviazione + ancoraggio | Medio | Governance operativa |
| Manipolazione della presentazione | Media | Moderato | JSON fonte di verità | Basso | Disciplina di verifica |
| Compromissione della chiave privata | Bassa | Critico | HSM/KMS + rotazione | Medio | Governance delle chiavi |
| Indebolimento dell'algoritmo hash | Molto Bassa | Critico | Agilità dell'algoritmo | Basso | Governance crittografica |
| Compromissione della catena di fornitura | Media | Significativo | Controlli CI + SBOM | Medio | Governance DevSecOps |

Riepilogo della posizione di rischio:

- I rischi di integrità strutturale sono fortemente mitigati.
- La compromissione delle chiavi rimane lo scenario di impatto più elevato.
- La maturità della governance influenza direttamente il rischio residuo.

---

## 12. Modello di Governance e Separazione dei Ruoli

La sicurezza di VeriSeal presume la separazione istituzionale dei compiti.

### 12.1 Ruoli Funzionali

**Operatore di Sigillatura**
- Inizia la generazione delle prove.
- Non può modificare le voci storiche del registro.

**Autorità di Verifica**
- Esegue la validazione indipendente.
- Non ha accesso alle chiavi di firma.

**Custode delle Chiavi**
- Gestisce le chiavi di firma.
- Opera sotto politica di controllo duale.

**Amministratore dell'Infrastruttura**
- Gestisce la disponibilità del sistema.
- Non può alterare i payload di prova firmati.

**Funzione di Audit**
- Rivede i log e la continuità della catena.
- Indipendente dalle operazioni.

---

### 12.2 Panoramica RACI

| Funzione | Sigilla | Verifica | Firma | Mantiene | Audita |
|----------|---------|----------|-------|----------|--------|
| Operatore di Sigillatura | R | C | - | - | - |
| Autorità di Verifica | - | R | - | - | C |
| Custode delle Chiavi | - | - | R | - | C |
| Amministratore dell'Infrastruttura | - | - | - | R | C |
| Audit | - | C | C | C | R |

R = Responsabile
C = Controllo / Supervisione

---

### 12.3 Principio di Governance

L'integrità è applicata dalla crittografia.
La fiducia è applicata dalla separazione della governance.

Le garanzie crittografiche riducono la dipendenza dalla fiducia umana,
ma la governance istituzionale assicura la resilienza.

---

## 13. Procedura di Risposta agli Incidenti e Compromissione delle Chiavi

Questa sezione definisce la postura minima di risposta istituzionale.

### 13.1 Scenario di Compromissione delle Chiavi

Se si sospetta una compromissione della chiave di firma:

1. Revoca immediata della chiave.
2. Interrompere l'emissione di nuove prove.
3. Generare una nuova coppia di chiavi di firma.
4. Pubblicare un avviso pubblico dell'incidente.
5. Ri-ancorare lo stato del sistema (se applicabile).
6. Condurre un audit forense.

Le prove storiche rimangono strutturalmente verificabili.
Il dominio di fiducia si sposta sulla timeline di validità della chiave.

---

### 13.2 Incidente di Integrità della Prova

Se viene rilevata una corruzione del registro:

- Ricalcolare la continuità della catena.
- Identificare il punto di divergenza.
- Ripristinare da un backup validato.
- Pubblicare una dichiarazione di integrità.

---

### 13.3 Principio di Trasparenza Pubblica

Per le implementazioni istituzionali:

- È richiesta una politica di divulgazione degli incidenti.
- Si raccomandano log degli incidenti con timestamp.
- È consigliabile un audit indipendente per domini ad alta sicurezza.

---

### 13.4 Evoluzione Crittografica a Lungo Termine

Se le primitive hash o di firma si indeboliscono:

- Introdurre un campo hash versionato.
- Ri-ancorare le prove esistenti.
- Supportare una strategia a doppio hash durante la migrazione.

L'agilità dell'algoritmo deve essere integrata nella roadmap di governance.