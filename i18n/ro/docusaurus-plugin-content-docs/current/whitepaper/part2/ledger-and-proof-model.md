---
title: Modelul Registrului și al Dovezilor
sidebar_label: 2.2 Modelul Registrului și al Dovezilor
slug: /whitepaper/part2/ledger-and-proof-model
sidebar_position: 2.2
---

# 2.2 Modelul Registrului și al Dovezilor

Registrul este coloana vertebrală structurală a VeriSeal.

Nu este un blockchain.
Este un jurnal de integritate determinist, doar pentru adăugare.

---

## Structura Înregistrării Dovezilor

Fiecare înregistrare a dovezilor conține:

- identificator_dovadă (hash sau merkle_root)
- referință la metadate
- marcaj temporal (UTC)
- hash-ul înregistrării anterioare

Aceasta creează continuitatea lanțului.

---

## Principiul Imuabilității

Registrul este:

- Doar pentru adăugare  
- Legat prin hash  
- Determinist  

Orice modificare istorică invalidează continuitatea viitoare.

---

## Stabilitatea Identificatorului Public

Identificatorul dovezii:

`{merkle_root}`

Funcționează ca:

- Referință publică permanentă
- Ancoră de integritate între sisteme
- Identificator stabil pentru audit

Trebuie să rămână stabil în timp.

---

## Avantaj Instituțional

Spre deosebire de sistemele bazate pe blockchain:

- Fără consens probabilistic
- Fără instabilitate a bifurcațiilor
- Fără dependență de mineri externi

Integritatea este matematică.
Nu politică.