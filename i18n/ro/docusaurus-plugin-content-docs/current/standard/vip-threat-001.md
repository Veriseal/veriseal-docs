Traducere a documentului Markdown în limba română:

Fișier: vip-threat-001.md

---
title: VIP-THREAT-001 - Model de Amenințare și Adversitate VeriSeal
sidebar_label: VIP-THREAT-001
---

# VIP-THREAT-001  
## Model de Amenințare și Adversitate VeriSeal

Versiune: 2.0  
Stare: Profil de Securitate Normativ  
Clasificare: Specificație de Securitate Publică  

---

# 1. Domeniu de Aplicare

Acest document definește modelul formal de adversitate și amenințare aplicabil pentru:

- VIP-STD-001 (Nucleu de Integritate)
- VIP-STD-002 (Profil Ledger)
- VIP-STD-003 (Profil Semnătură)
- VIP-STD-004 (Profil Ancorare Temporală)
- VIP-STF-005 (Cadru de Verificare și Conformitate)

Acest document definește:

- Obiective de securitate
- Clasificarea activelor
- Capacitățile adversarului
- Suprafața de atac
- Pretenții formale de securitate
- Riscuri reziduale

---

# 2. Obiective de Securitate

Cadrul de Integritate VeriSeal își propune să garanteze:

1. Integritate deterministă
2. Detectarea modificărilor neautorizate
3. Imuabilitate structurală
4. Autenticitate criptografică (dacă se utilizează profilul de semnătură)
5. Continuitatea ledger-ului
6. Coroborare temporală independentă (dacă se utilizează profilul de ancorare)

Cadrul nu garantează în mod explicit:

- Veridicitatea conținutului
- Validarea identității (decât dacă se utilizează un sistem extern)
- Forța juridică
- Corectitudinea semantică
- Legitimitatea conținutului

VeriSeal este un cadru de integritate, nu un sistem de adevăr.

---

# 3. Active

Următoarele active sunt critice pentru securitate:

- Obiectul de dovadă canonic
- proof_hash determinist
- Înregistrare ledger
- Continuitatea previous_entry_hash
- Material de semnătură
- Referință de ancorare
- Metadate de verificare

Integritatea acestor active TREBUIE să fie păstrată.

---

# 4. Clase de Adversari

## 4.1 Observator Pasiv

Capacități:
- Acces complet la citire
- Observarea traficului

Nu poate:
- Modifica datele stocate

---

## 4.2 Modificator Activ

Capacități:
- Încercarea de modificare a înregistrărilor
- Încercarea de substituire a înregistrărilor
- Încercarea de reordonare a ledger-ului

---

## 4.3 Atacator Criptografic

Capacități:
- Încercarea de coliziune hash
- Încercarea de falsificare a semnăturii
- Încercarea de falsificare a ancorei
- Încercarea de reluare

Limitat de presupunerile criptografice clasice.

---

## 4.4 Adversar Intern

Capacități:
- Modificarea înregistrărilor înainte de sigilare
- Compromiterea cheilor private
- Manipularea stratului de stocare

Mitigarea este operațională, nu la nivel de protocol.

---

# 5. Categorii de Amenințări

## 5.1 Atacuri de Serializare

Atac:
Manipularea ordinii câmpurilor sau a codificării pentru a schimba hash-ul.

Mitigare:
- Canonizare strictă (VIP-STD-001)
- Determinism la nivel de byte
- Hashing determinist

---

## 5.2 Substituirea Hash-ului

Atac:
Înlocuirea proof_hash cu o valoare alternativă.

Mitigare:
- Recalculare deterministă
- Legare prin semnătură (VIP-STD-003)

---

## 5.3 Reordonarea Ledger-ului

Atac:
Reordonarea înregistrărilor pentru a manipula cronologia.

Mitigare:
- Înlănțuirea previous_entry_hash
- Verificarea deterministă a ledger-ului

---

## 5.4 Atacuri de Reluare

Atac:
Reutilizarea unei dovezi valide într-un context neintenționat.

Mitigare:
- proof_id unic
- Legare de context
- Ancorare temporală (opțional)

---

## 5.5 Atacuri asupra Semnăturii

Include:
- Falsificare
- Maleabilitate
- Randomizare slabă

Mitigare:
- Semnare deterministă (RFC 6979)
- Normalizare Low-S (ECDSA)
- Ed25519 preferat
- Management securizat al cheilor (cerință de implementare)

---

## 5.6 Falsificarea Ancorei

Atac:
Furnizarea de referințe temporale externe fabricate.

Mitigare:
- Sisteme de ancorare verificabile public
- Recalculare independentă
- Strategii multi-ancoră (opțional)

---

# 6. Limite de Încredere

Limitele de încredere există între:

1. Generarea dovezii
2. Stocarea ledger-ului
3. Autoritatea semnăturii
4. Autoritatea ancorei
5. Actorul de verificare

Protocolul presupune:

- Verificator independent
- Transparența publică a ancorei
- Custodia securizată a cheilor

---

# 7. Pretenții Formale de Securitate

Sub presupunerile criptografice clasice:

Dacă:
- SHA-256 rămâne rezistent la coliziuni
- ECDSA / Ed25519 rămân sigure
- Factorizarea RSA rămâne computațional imposibilă

Atunci:

- Modificările sunt detectabile
- Rescrierea ledger-ului este detectabilă
- Falsificarea semnăturii este imposibilă
- Falsificarea ancorei este detectabilă

Aceste garanții se degradează proporțional dacă presupunerile eșuează.

---

# 8. Riscuri Reziduale

Cadrul nu elimină:

- Compromiterea cheilor private
- Entropia slabă în generarea semnăturii
- Erori de implementare
- Corupția stocării
- Manipularea internă înainte de sigilare
- Atacuri de refuz al serviciului

Acestea sunt în afara garanțiilor protocolului.

---

# 9. Refuzul Serviciului

Protocolul nu oferă:

- Protecție împotriva epuizării stocării
- Garanții de disponibilitate a punctului de ancorare
- Rezistență la inundații de rețea

Este necesară o atenuare operațională.

---

# 10. Considerații Post-Quantum

Versiunea 2.0 nu oferă securitate post-quantum.

Revisii viitoare POT include:

- Agilitate hash
- Algoritmi de semnătură PQ
- Mode de semnătură hibridă

---

# 11. Concluzie

Cadrul VeriSeal oferă detectarea deterministă a modificărilor neautorizate sub presupunerile criptografice clasice.

Garanțiile de securitate depind de:

- Canonizare strictă
- Hashing determinist
- Înlănțuirea corectă a ledger-ului
- Management securizat al cheilor
- Ancorare verificabilă public

Disciplina de implementare este obligatorie.

VeriSeal definește garanții de integritate — nu garanții de încredere.