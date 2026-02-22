---
title: Modello di Verifica
sidebar_label: 2.3 Modello di Verifica
slug: /whitepaper/part2/verification-model
sidebar_position: 2.3
---

# 2.3 Modello di Verifica

Un'infrastruttura di fiducia non può dipendere dall'affermazione dell'operatore.

La verifica deve essere eseguibile in modo indipendente.

---

## Passaggi di Verifica

1. Ricalcolare il payload canonico  
2. Ricalcolare il digest SHA-256  
3. Validare l'inclusione Merkle (se applicabile)  
4. Validare la concatenazione del registro  
5. Validare l'ancoraggio OTS opzionale  
6. Validare la firma PDF opzionale  

Non è richiesta alcuna logica server proprietaria.

---

## Principio del JSON Pubblico

Il JSON pubblico è la fonte di verità.

Il PDF è solo per la visualizzazione.

La verifica deve rimanere possibile anche se:

- L'operatore cessa l'attività
- L'entità commerciale cambia
- L'infrastruttura migra

---

## Trasparenza Senza Perdita di Dati

La verifica pubblica espone:

- Impegni  
- Hash  
- Fatti di integrità  

Non espone:

- Contenuti privati  
- Payload riservati  
- Metadati sensibili  

Questa separazione è strutturale.

---

## Fiducia Istituzionale

La riproducibilità indipendente consente:

- Revisione normativa  
- Audit forense  
- Verifica transfrontaliera  
- Validazione archivistica a lungo termine  

VeriSeal minimizza la fiducia.
Massimizza la riproducibilità.