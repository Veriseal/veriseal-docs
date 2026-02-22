---
id: vip-std-002
title: VIP-STD-002 — Profilo Ledger
sidebar_position: 4
---

# VIP-STD-002  
## Profilo Ledger (Estensione a VIP-STD-001)

---

# 1. Scopo

Questo documento definisce il Profilo Ledger opzionale del Protocollo di Integrità VeriSeal (VIP).

Specifica la struttura di registrazione solo in append per la persistenza delle prove.

Questo profilo estende VIP-STD-001 ma non modifica il modello di integrità di base.

---

# 2. Relazione con VIP-STD-001

VIP-STD-002:

- DEVE utilizzare oggetti prova conformi a VIP-STD-001  
- NON DEVE alterare la canonizzazione o il calcolo dell'hash  
- DEVE preservare la verifica deterministica  

Il livello ledger registra le prove; non le ridefinisce.

---

# 3. Definizioni

**Voce Ledger**  
Un record strutturato contenente un oggetto prova e il suo riferimento di concatenamento.

**Hash Precedente (prev_hash)**  
L'hash di integrità della voce ledger precedente.

**Testa della Catena**  
La voce ledger valida più recente in una sequenza.

---

# 4. Struttura della Voce Ledger

Una voce ledger conforme DEVE seguire:

```json
{
  "v": 1,
  "type": "LEDGER_ENTRY",
  "proof": { ...oggetto conforme a VIP-STD-001... },
  "prev_hash": "<sha256-hex o null>",
  "entry_hash": "<sha256-hex>"
}

Dove:

- `proof` DEVE essere un oggetto prova valido VIP-STD-001  
- `prev_hash` DEVE fare riferimento all'hash della voce precedente o essere null per la prima voce  
- `entry_hash` DEVE essere l'hash SHA-256 della voce ledger canonizzata escludendo `entry_hash` stesso  

---

# 5. Regole di Calcolo dell'Hash

5.1 Canonizzazione  
Le voci ledger DEVONO essere canonizzate utilizzando le regole di VIP-STD-001.

5.2 Hash della Voce  
L'`entry_hash` DEVE essere calcolato su:

{
  "v",
  "type",
  "proof",
  "prev_hash"
}

5.3 Determinismo  
Due voci ledger identiche DEVONO produrre valori `entry_hash` identici.

---

# 6. Requisito di Solo Append

6.1 Immutabilità  
Le voci ledger NON DEVONO essere modificate dopo l'inserimento.

6.2 Ordinamento  
Ogni voce DEVE fare riferimento esattamente a un predecessore, eccetto la voce di genesi.

6.3 Voce di Genesi  
La prima voce ledger DEVE impostare `prev_hash` a null.

---

# 7. Validazione della Catena

Un processo di validazione ledger conforme DEVE:

1. Validare ogni prova incorporata secondo VIP-STD-001  
2. Ricalcolare ogni `entry_hash`  
3. Verificare la coerenza del concatenamento `prev_hash`  
4. Confermare l'assenza di collegamenti interrotti  

Una catena è VALIDA se tutte le voci soddisfano queste condizioni.

---

# 8. Indipendenza dallo Storage

Il Profilo Ledger:

- Non impone un backend di storage
- Non impone un consenso distribuito
- Non richiede l'implementazione di blockchain
- Non definisce regole di replicazione

Definisce solo il concatenamento strutturale.

---

# 9. Conformità

Un sistema che dichiara conformità a VIP-STD-002 DEVE:

1. Accettare oggetti prova VIP-STD-001  
2. Implementare una struttura ledger solo in append  
3. Applicare l'integrità del concatenamento degli hash  
4. Fornire una validazione deterministica della catena  

I dettagli dell'implementazione del ledger POSSONO variare purché il determinismo strutturale sia preservato.

---

# 10. Considerazioni sulla Sicurezza

La sicurezza di questo profilo dipende da:

- Integrità dell'ambiente di storage  
- Protezione contro modifiche non autorizzate  
- Corretta canonizzazione  

Questo profilo non previene attacchi di cancellazione a meno che non sia combinato con meccanismi di ancoraggio definiti in VIP-STD-004.

---

# 11. Conclusione

VIP-STD-002 definisce il livello di persistenza strutturale del Protocollo di Integrità VeriSeal.

Garantisce concatenamento solo in append e coerenza delle prove a lungo termine senza alterare il modello di integrità di base.