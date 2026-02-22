---
title: VIP-STD-003 - Profilul de Semnătură VeriSeal
sidebar_label: VIP-STD-003
---

# VIP-STD-003 - Specificația Profilului de Semnătură VeriSeal

Versiune: 1.0
Stare: Proiect Public
Clasificare: Standard de Integritate Deschis

---

## 1. Domeniu de Aplicare

Acest document definește profilul de semnătură pentru Protocolul de Integritate VeriSeal.

VIP-STD-003 specifică:

- Cerințele de acoperire a semnăturii
- Algoritmii de semnătură permiși
- Reguli de verificare deterministice
- Structura obiectului semnăturii
- Constrângeri de conformitate

Această specificație se bazează pe VIP-STD-001 și VIP-STD-002.

---

## 2. Prezentare Generală a Modelului de Semnătură

Semnăturile sunt OPȚIONALE în VIP-STD-001, dar devin definite formal în acest profil.

O semnătură TREBUIE să lege criptografic:

- Obiectul de dovadă canonic (VIP-STD-001)
- Hash-ul dovezii
- Opțional, înregistrarea în registru (VIP-STD-002)

Acoperirea semnăturii TREBUIE să fie deterministă.

---

## 3. Reguli de Acoperire a Semnăturii

Semnătura TREBUIE să fie calculată peste:

SHA-256(canonical_proof_object)

Reprezentarea exactă a octeților definită în Anexa C a VIP-STD-001 TREBUIE utilizată.

Nu este permisă nicio reserializare în timpul verificării.

---

## 4. Structura Obiectului Semnăturii

Dacă este prezent, un obiect de semnătură TREBUIE să includă:

- signature_algorithm
- public_key
- signature_value

Nu sunt permise câmpuri suplimentare în versiunea 1.0.

---

## 5. Definiții ale Câmpurilor

signature_algorithm
TREBUIE să fie unul dintre:

- Ed25519
- ECDSA-secp256k1
- RSA-3072

public_key
TREBUIE să fie codificat în hexazecimal sau base64, în funcție de specificația algoritmului.

signature_value
TREBUIE să reprezinte octeții semnăturii brute codificați în hexazecimal.

---

## 6. Verificare Deterministă

Verificarea TREBUIE să:

1. Recalculeze hash-ul dovezii
2. Reconstruiască reprezentarea canonică a octeților
3. Verifice semnătura în raport cu public_key furnizat
4. Respinge semnăturile care nu corespund

Verificarea semnăturii TREBUIE să fie deterministă.

---

## 7. Cerințe ale Algoritmului

## 7.1 Ed25519

- Determinist prin design
- Semnătură de 64 de octeți
- Cheie publică de 32 de octeți

## 7.2 ECDSA-secp256k1

- Semnătura TREBUIE să fie normalizată low-S
- Semnarea deterministă RFC 6979 ESTE NECESARĂ

## 7.3 RSA-3072

- Padding-ul TREBUIE să utilizeze PKCS#1 v1.5 sau PSS
- Dimensiunea minimă a modulului 3072 biți

---

## 8. Considerații de Securitate

Implementările TREBUIE să protejeze împotriva:

- Maleabilității semnăturii
- Atacurilor de eliminare a semnăturii
- Atacurilor de substituție a cheii
- Randomizării slabe în ECDSA
- Atacurilor de redare

Dacă o semnătură este prezentă și invalidă, dovada TREBUIE considerată invalidă.

---

## 9. Cerințe de Conformitate

Pentru a revendica conformitatea cu VIP-STD-003:

- Acoperirea semnăturii TREBUIE să corespundă Secțiunii 3
- Algoritmul TREBUIE să fie unul dintre algoritmii permiși
- Verificarea TREBUIE să fie deterministă
- Semnăturile invalide TREBUIE să determine respingerea

Validarea parțială a semnăturii NU TREBUIE să revendice conformitatea.

---

## 10. Relația cu Alte Standarde

VIP-STD-003 extinde:

- VIP-STD-001 (integritatea dovezii canonice)
- VIP-STD-002 (integritatea registrului)

Conformitatea completă necesită respectarea tuturor profilurilor aplicabile.

---

## 11. Extensii Viitoare

Versiunile viitoare POT introduce:

- Algoritmi de semnătură post-cuantică
- Suport pentru multi-semnături
- Semnături de prag
- Integrarea lanțului de certificate
- Extensii de legare a identității

Compatibilitatea retroactivă AR TREBUI să fie menținută.

---

## 12. Concluzie

VIP-STD-003 definește stratul de semnătură deterministă al VeriSeal.

Asigură:

- Autenticitate criptografică
- Verificare deterministă
- Constrângeri ale algoritmului
- Validare interoperabilă a semnăturii

Completează stiva de integritate criptografică a VeriSeal.