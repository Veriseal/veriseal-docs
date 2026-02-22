---
title: Model de Verificare
sidebar_label: 2.3 Model de Verificare
slug: /whitepaper/part2/verification-model
sidebar_position: 2.3
---

# 2.3 Model de Verificare

O infrastructură de încredere nu poate depinde de afirmația operatorului.

Verificarea trebuie să fie executabilă independent.

---

## Pașii de Verificare

1. Recalcularea sarcinii utile canonice  
2. Recalcularea digestului SHA-256  
3. Validarea includerii Merkle (dacă este aplicabil)  
4. Validarea înlănțuirii registrului  
5. Validarea ancorării opționale OTS  
6. Validarea semnăturii opționale PDF  

Nu este necesară nicio logică de server proprietară.

---

## Principiul JSON Public

JSON public este sursa adevărului.

PDF-ul este doar pentru redare.

Verificarea trebuie să rămână posibilă chiar dacă:

- Operatorul își încetează activitatea
- Entitatea comercială se schimbă
- Infrastructura migrează

---

## Transparență Fără Scurgere de Date

Verificarea publică expune:

- Angajamente  
- Hash-uri  
- Fapte de integritate  

Nu expune:

- Conținut privat  
- Sarcini utile confidențiale  
- Metadate sensibile  

Această separare este structurală.

---

## Încredere Instituțională

Reproducibilitatea independentă permite:

- Revizuire de reglementare  
- Audit criminalistic  
- Verificare transfrontalieră  
- Validare arhivistică pe termen lung  

VeriSeal minimizează încrederea.
Maximizează reproducibilitatea.