File: vip-std-001.md

---
id: vip-std-001
title: VIP-STD-001 — Standard di Integrità Core
sidebar_position: 3
---

# VIP-STD-001  
## Standard di Integrità Core

---

# 1. Ambito

Questo documento definisce il modello di integrità core obbligatorio del Protocollo di Integrità VeriSeal (VIP).

Specifica le regole deterministiche per:

- Canonicalizzazione dei dati
- Calcolo dell'hash
- Formazione dell'oggetto di prova
- Verifica deterministica

Questo standard non definisce il comportamento del ledger, le firme digitali o i meccanismi di ancoraggio.  
Tali elementi sono specificati in profili di estensione separati.

---

# 2. Linguaggio Normativo

Le parole chiave:

- DEVE
- NON DEVE
- DOVREBBE
- PUÒ

devono essere interpretate come descritto in RFC 2119.

---

# 3. Definizioni

**Dati Canonici**  
Una rappresentazione byte normalizzata dei dati di input strutturati.

**Hash di Integrità**  
Un digest SHA-256 calcolato sui dati canonicalizzati.

**Oggetto di Prova**  
Un oggetto JSON strutturato contenente dati canonicalizzati e il loro hash di integrità.

**Evento di Verifica**  
La ricomputazione deterministica dell'hash di integrità dai dati canonici.

---

# 4. Regole di Canonicalizzazione

4.1 Formato dei Dati  
I dati di input DEVONO essere JSON strutturato.

4.2 Ordinamento dei Campi  
Tutte le chiavi degli oggetti DEVONO essere ordinate lessicograficamente.

4.3 Spazi Bianchi  
Gli spazi bianchi DEVONO essere rimossi eccetto dove richiesto dalla sintassi JSON.

4.4 Codifica  
Deve essere utilizzata la codifica UTF-8.

4.5 Determinismo  
La canonicalizzazione DEVE produrre un output byte identico per input logici identici.

---

# 5. Algoritmo di Hashing

5.1 Algoritmo  
L'hash di integrità DEVE utilizzare SHA-256.

5.2 Input  
L'hash DEVE essere calcolato sulla sequenza di byte canonicalizzata.

5.3 Output  
L'hash DEVE essere codificato come esadecimale minuscolo.

---

# 6. Struttura dell'Oggetto di Prova

Un oggetto di prova conforme DEVE includere:

```json
{
  "v": 1,
  "type": "PROOF",
  "data": { ... },
  "hash": "<sha256-hex>"
}

Dove:

- `v` = versione del protocollo  
- `type` = stringa fissa "PROOF"  
- `data` = payload JSON canonicalizzabile  
- `hash` = digest SHA-256 dei `data` canonicalizzati

Campi aggiuntivi NON DEVONO alterare la canonicalizzazione dei `data`.

---

# 7. Verifica Deterministica

La verifica DEVE seguire questi passaggi:

1. Estrarre `data`
2. Canonicalizzare `data`
3. Calcolare l'hash SHA-256
4. Confrontare l'hash calcolato con l'`hash` memorizzato
5. Restituire VALIDO se uguale; NON VALIDO altrimenti

La verifica NON DEVE dipendere da:

- Stato esterno
- Accesso alla rete
- Presenza del ledger
- Presenza di firma
- Stato di ancoraggio

La verifica core è autonoma.

---

# 8. Principio di Indipendenza

VIP-STD-001 definisce solo l'integrità.

Non garantisce:

- Autenticità dei dati
- Verifica dell'identità
- Ammissibilità legale
- Validità del timestamp

Garantisce l'integrità deterministica sotto ipotesi crittografiche definite.

---

# 9. Compatibilità Retroattiva

Le future revisioni minori DEVONO preservare:

- Determinismo della canonicalizzazione
- Compatibilità SHA-256
- Riproducibilità della verifica

Le modifiche sostanziali richiedono un incremento di versione.

---

# 10. Conformità

Un sistema è conforme a VIP-STD-001 se:

1. Implementa la canonicalizzazione come da Sezione 4  
2. Calcola SHA-256 come da Sezione 5  
3. Produce oggetti di prova come da Sezione 6  
4. Verifica in modo deterministico come da Sezione 7  

La conformità ai profili di estensione è opzionale.

---

# 11. Considerazioni sulla Sicurezza

La sicurezza di VIP-STD-001 dipende da:

- La forza crittografica di SHA-256
- Corretta implementazione della canonicalizzazione
- Protezione contro le vulnerabilità di collisione dell'hash

Le ipotesi di minaccia sono definite in VIP-THREAT-001.

---

# 12. Conclusione

VIP-STD-001 definisce il modello di integrità core obbligatorio del Protocollo di Integrità VeriSeal.

Fornisce una verifica dell'integrità digitale deterministica, riproducibile e indipendente dall'implementazione.