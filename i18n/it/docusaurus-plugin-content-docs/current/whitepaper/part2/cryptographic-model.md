---
id: cryptographic-model
title: Architettura Criptografica e di Prova
sidebar_position: 2.1
---

# 2.1 Architettura Criptografica e di Prova

VeriSeal si basa esclusivamente su primitive crittografiche conservative e collaudate.

Nessun livello di consenso sperimentale.  
Nessun algoritmo di hash proprietario.  
Nessuna costruzione crittografica opaca.

Il modello è deterministico, riproducibile e difendibile a livello istituzionale.

---

## Obiettivi di Progettazione

Il livello crittografico deve garantire:

- Integrità strutturale  
- Riproducibilità deterministica  
- Auditabilità a lungo termine  
- Verificabilità esterna  
- Ancoraggio temporale decentralizzato opzionale  

---

## Canonicalizzazione

I dati di input grezzi devono essere trasformati in una rappresentazione deterministica.

Sia:

E = prova grezza  
C(E) = rappresentazione canonica  

La canonicalizzazione garantisce:

- Codifica JSON stabile  
- Ordinamento deterministico dei campi  
- Normalizzazione UTF-8  
- Nessuna ambiguità negli spazi bianchi  

Il payload canonico:

P = C(E)

---

## Hashing

Principale primitiva di integrità:

H = SHA-256(P)

Proprietà:

- Resistenza alle collisioni (ipotesi crittografiche attuali)
- Output deterministico
- Universalmente riproducibile

L'hash diventa l'identificatore principale della prova quando si tratta di un singolo artefatto.

---

## Aggregazione Merkle

Per prove multi-artefatto:

h1, h2, ..., hn

Viene costruito un albero di Merkle.

Il risultante:

merkle_root

Proprietà:

- Qualsiasi modifica alla foglia invalida la radice
- Possibilità di prove di inclusione efficienti
- Vincolo deterministico multi-artefatto

Il merkle_root diventa il riferimento pubblico canonico.

---

## Registro Append-Only

Ogni prova è inserita in un registro append-only.

Ogni voce contiene:

- identificatore_prova  
- metadati  
- timestamp UTC  
- prev_hash  

Regola di concatenamento:

entry_hash_i = SHA256(entry_data_i || entry_hash_(i-1))

Questo crea immutabilità strutturale.

Modificare voci storiche rompe l'integrità della catena.

---

## Modalità di Vincolo Forte

VeriSeal impone coerenza strutturale tra:

- Log UX  
- Artefatti multimediali  
- JSON canonico  
- Voce del registro  
- PDF opzionale  
- Ancoraggio OTS opzionale  

Il vincolo previene modifiche selettive o sostituzioni di componenti.

---

## Firma PDF (Strato Opzionale)

Il PDF è solo per la visualizzazione.

Quando abilitato:

- Firma RSA-3072  
- Hash del documento incorporato  
- Verificabile indipendentemente  

Importante:

Il PDF non è la fonte di verità.  
La voce del registro e il JSON pubblico lo sono.

---

## OpenTimestamps (Opzionale)

Quando abilitato:

- L'hash della prova è inviato a OTS
- Viene generato un file .ots
- La conferma su Bitcoin ancora l'esistenza nel tempo

OTS rafforza l'ancoraggio temporale ma non è richiesto per la validazione strutturale.

---

## Minimizzazione della Fiducia

La verifica richiede fiducia solo in:

- SHA-256  
- Calcolo deterministico  
- Standard crittografici pubblici  

Non in:

- Server proprietari  
- Dichiarazioni dell'operatore  
- Rappresentazioni visive  

VeriSeal non afferma la verità.  
Garantisce l'integrità strutturale.