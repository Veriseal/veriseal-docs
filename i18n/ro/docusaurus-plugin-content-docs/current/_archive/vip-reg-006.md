---
title: VIP-REG-006 - Cadru pentru Registrul Cheilor Publice Instituționale
sidebar_label: VIP-REG-006
---

# VIP-REG-006 - Cadru pentru Registrul Cheilor Publice Instituționale

Versiune: 1.0
Stare: Proiect Public
Clasificare: Cadru de Infrastructură de Încredere Publică

---

## 1. Domeniu de aplicare

VIP-REG-006 definește cadrul pentru publicarea, descoperirea și validarea cheilor publice de verificare instituționale.

Acesta completează:

- VIP-STD-001 (Nucleul Integrității)
- VIP-STD-002 (Stratul de Semnătură)
- VIP-STF-005 (Cadru pentru Semnătura Documentelor Instituționale)

Acest cadru stabilește un model de registru neutru care permite:

- Transparența cheilor publice
- Verificare inter-instituțională
- Accesul autorităților de reglementare
- Validare independentă

VIP-REG-006 nu definește verificarea identității.
Definește structura de descoperire și validare a cheilor publice.

---

## 2. Obiective

Cadrul registrului asigură:

- Verificabilitatea publică a cheilor instituționale
- Descoperirea deterministă a încrederii
- Transparența ciclului de viață al cheilor
- Limitarea compromiterii
- Continuitatea verificării istorice

Registrul previne dependența de acorduri bilaterale API.

Verificarea trebuie să rămână neutră față de infrastructură.

---

## 3. Modele de Registru

VIP-REG-006 suportă multiple arhitecturi de registru.

## 3.1 Registru Centralizat

O autoritate centrală menține:

- Identificator instituțional
- Cheie publică de verificare
- Tipul algoritmului
- Data efectivă
- Data expirării
- Starea de revocare

Potrivit pentru:

- Ecosisteme bancare naționale
- Medii supravegheate de reglementare
- Consorții industriale

---

## 3.2 Registru Federat

Multiple registre de încredere interacționează prin:

- Semnare încrucișată
- Ancorarea registrului
- Recunoaștere reciprocă

Potrivit pentru:

- Medii transfrontaliere
- Cadre interbancare
- Sisteme de comerț internațional

---

## 3.3 Registru de Transparență Distribuit

Cheile publice sunt ancorate prin:

- Angajamente blockchain publice
- Jurnale de transparență Merkle tree
- Registre publice doar pentru adăugare

Potrivit pentru:

- Ecosisteme deschise
- Neutralitate trans-jurisdicțională
- Independența infrastructurii

---

## 4. Cerințe de Înregistrare Instituțională

Pentru a se înregistra sub VIP-REG-006, o instituție TREBUIE să furnizeze:

- Identificatorul entității legale
- Numele instituțional
- Jurisdicția
- Cheia publică de verificare
- Algoritmul de semnătură
- Data efectivă
- Referința de contact pentru guvernanță

Opțional:

- Referință de reglementare
- Declarație de certificare
- Legătură între registre

---

## 5. Gestionarea Ciclului de Viață al Cheilor

## 5.1 Activarea Cheii

La publicare:

- Cheia devine verificabilă public
- Data efectivă TREBUIE să fie înregistrată
- Intrarea în registru TREBUIE să fie imuabilă

---

## 5.2 Rotirea Cheii

Registrul TREBUIE să suporte:

- Perioade de chei suprapuse
- Păstrarea cheilor vechi
- Căutare istorică

Semnăturile istorice TREBUIE să rămână verificabile.

---

## 5.3 Revocarea Cheii

Dacă apare o compromitere:

- Timpul de revocare TREBUIE să fie publicat
- Starea TREBUIE să fie vizibilă public
- Valabilitatea istorică înainte de revocare TREBUIE să rămână demonstrabilă

Revocarea nu invalidează semnăturile anterioare decât dacă este declarată legal.

---

## 6. Fluxul de Verificare

Verificarea independentă TREBUIE să permită:

1. Recuperarea identificatorului instituției
2. Recuperarea cheii curente sau istorice
3. Recalcularea hash-ului (VIP-STD-001)
4. Validarea semnăturii (VIP-STD-002)
5. Confirmarea valabilității cheii la momentul emiterii

Verificarea NU TREBUIE să necesite acces privilegiat la sistem.

---

## 7. Model de Încredere

VIP-REG-006 separă:

- Verificarea criptografică
- Responsabilitatea instituțională
- Supravegherea de reglementare

Registrul nu:

- Garantează onestitatea instituțională
- Garantează veridicitatea documentelor
- Înlocuiește aplicarea legală

Acesta garantează transparența structurală a cheilor de verificare.

---

## 8. Considerații de Securitate

Riscurile includ:

- Compromiterea registrului
- Inserarea neautorizată a cheilor
- Imitarea cheilor
- Eșecul guvernanței

Măsurile de atenuare pot include:

- Guvernanța registrului multi-parte
- Jurnale de transparență
- Ancorare externă
- Mecanisme de audit public

---

## 9. Implicații Transsectoriale

Când este combinat cu VIP-STF-005:

- Băncile pot verifica alte bănci
- Notarii pot verifica instituțiile
- Regulatorii pot valida independent semnăturile
- Autenticitatea documentelor transfrontaliere devine deterministă

Interoperabilitatea registrului reduce:

- Verificarea manuală
- Acordurile de validare bilaterale
- Frauda prin modificare
- Fricțiunea de încredere inter-instituțională

---

## 10. Impact Strategic

Adoptarea pe scară largă permite:

- Infrastructură neutră de verificare a documentelor
- Reducerea fraudei documentare prin falsificare
- Reducerea verificărilor manuale de autenticitate
- Ecosistem standardizat de dovadă instituțională
- Interoperabilitate transsectorială

VIP-REG-006 transformă publicarea cheilor publice dintr-o practică ad-hoc
într-o infrastructură instituțională structurată.

---

## 11. Cerințe de Conformitate

Pentru a revendica conformitatea cu VIP-REG-006, un registru TREBUIE să:

- Mențină transparența doar pentru adăugare
- Publice evenimentele de revocare
- Păstreze stările istorice ale cheilor
- Permită căutarea publică independentă
- Documenteze modelul de guvernanță

Nerespectarea acestor cerințe invalidează revendicările de conformitate.

---

## 12. Concluzie

VIP-REG-006 definește stratul de registru al cheilor publice instituționale
necesar pentru interoperabilitatea globală a verificării documentelor.

Întărește:

- Transparența
- Determinismul
- Încrederea inter-instituțională
- Neutralitatea structurală

Nu centralizează încrederea.

Face verificarea reproductibilă.

Când este combinat cu VIP-STF-005,
permite o rețea globală de autenticitate a documentelor instituționale.