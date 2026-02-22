---
id: vip-std-001
title: VIP-STD-001 — Standardul de Integritate de Bază
sidebar_position: 3
---

# VIP-STD-001  
## Standardul de Integritate de Bază

---

# 1. Domeniu de Aplicare

Acest document definește modelul obligatoriu de integritate de bază al Protocolului de Integritate VeriSeal (VIP).

Specifica regulile deterministe pentru:

- Canonicalizarea datelor
- Calculul hash-ului
- Formarea obiectului de dovadă
- Verificarea deterministă

Acest standard nu definește comportamentul registrului, semnăturile digitale sau mecanismele de ancorare.  
Astfel de elemente sunt specificate în profiluri de extensie separate.

---

# 2. Limbaj Normativ

Cuvintele cheie:

- TREBUIE
- NU TREBUIE
- AR TREBUI
- POATE

trebuie interpretate așa cum sunt descrise în RFC 2119.

---

# 3. Definiții

**Date Canonice**  
O reprezentare normalizată în octeți a datelor de intrare structurate.

**Hash de Integritate**  
Un digest SHA-256 calculat peste datele canonicalizate.

**Obiect de Dovadă**  
Un obiect JSON structurat care conține date canonicalizate și hash-ul său de integritate.

**Eveniment de Verificare**  
Recomputația deterministă a hash-ului de integritate din datele canonice.

---

# 4. Reguli de Canonicalizare

4.1 Formatul Datelor  
Datele de intrare TREBUIE să fie JSON structurat.

4.2 Ordinea Câmpurilor  
Toate cheile obiectului TREBUIE să fie ordonate lexicografic.

4.3 Spații Libere  
Spațiile libere TREBUIE eliminate, cu excepția cazurilor în care sunt necesare de sintaxa JSON.

4.4 Codificare  
TREBUIE utilizată codificarea UTF-8.

4.5 Determinism  
Canonicalizarea TREBUIE să producă ieșire identică în octeți pentru intrare logică identică.

---

# 5. Algoritmul de Hash

5.1 Algoritm  
Hash-ul de integritate TREBUIE să utilizeze SHA-256.

5.2 Intrare  
Hash-ul TREBUIE calculat peste secvența de octeți canonicalizată.

5.3 Ieșire  
Hash-ul TREBUIE să fie codificat ca hexazecimal cu litere mici.

---

# 6. Structura Obiectului de Dovadă

Un obiect de dovadă conform TREBUIE să includă:

```json
{
  "v": 1,
  "type": "PROOF",
  "data": { ... },
  "hash": "<sha256-hex>"
}

Unde:

- `v` = versiunea protocolului  
- `type` = șir fix "PROOF"  
- `data` = sarcină JSON canonicalizabilă  
- `hash` = digest SHA-256 al `data` canonicalizat

Câmpurile suplimentare NU TREBUIE să modifice canonicalizarea `data`.

---

# 7. Verificare Deterministă

Verificarea TREBUIE să urmeze acești pași:

1. Extrage `data`
2. Canonicalizează `data`
3. Calculează hash-ul SHA-256
4. Compară hash-ul calculat cu `hash` stocat
5. Returnează VALID dacă sunt egale; INVALID în caz contrar

Verificarea NU TREBUIE să depindă de:

- Stare externă
- Acces la rețea
- Prezența registrului
- Prezența semnăturii
- Starea de ancorare

Verificarea de bază este auto-conținută.

---

# 8. Principiul Independenței

VIP-STD-001 definește doar integritatea.

Nu garantează:

- Autenticitatea datelor
- Verificarea identității
- Admisibilitatea legală
- Valabilitatea marcajului temporal

Garantează integritatea deterministă sub ipoteze criptografice definite.

---

# 9. Compatibilitate Retroactivă

Reviziile minore viitoare TREBUIE să păstreze:

- Determinismul canonicalizării
- Compatibilitatea SHA-256
- Reproductibilitatea verificării

Schimbările majore necesită incrementarea versiunii.

---

# 10. Conformitate

Un sistem este conform cu VIP-STD-001 dacă:

1. Implementează canonicalizarea conform Secțiunii 4  
2. Calculează SHA-256 conform Secțiunii 5  
3. Produce obiecte de dovadă conform Secțiunii 6  
4. Verifică deterministic conform Secțiunii 7  

Conformitatea cu profilurile de extensie este opțională.

---

# 11. Considerații de Securitate

Securitatea VIP-STD-001 depinde de:

- Forța criptografică a SHA-256
- Implementarea corectă a canonicalizării
- Protecția împotriva vulnerabilităților de coliziune a hash-ului

Ipotezele de amenințare sunt definite în VIP-THREAT-001.

---

# 12. Concluzie

VIP-STD-001 definește modelul obligatoriu de integritate de bază al Protocolului de Integritate VeriSeal.

Oferă verificare digitală a integrității care este deterministă, reproductibilă și independentă de implementare.