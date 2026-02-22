---
id: vip-std-002
title: VIP-STD-002 — Profil Ledger
sidebar_position: 4
---

# VIP-STD-002  
## Profil Ledger (Extensie la VIP-STD-001)

---

# 1. Domeniu de aplicare

Acest document definește Profilul Ledger opțional al Protocolului de Integritate VeriSeal (VIP).

Specifica structura de înregistrare doar în adăugare pentru persistența dovezilor.

Acest profil extinde VIP-STD-001, dar nu modifică modelul de integritate de bază.

---

# 2. Relația cu VIP-STD-001

VIP-STD-002:

- TREBUIE să utilizeze obiecte de dovadă conforme cu VIP-STD-001  
- NU TREBUIE să modifice canonizarea sau calculul hash-ului  
- TREBUIE să păstreze verificarea deterministă  

Stratul ledger înregistrează dovezile; nu le redefinește.

---

# 3. Definiții

**Intrare Ledger**  
Un registru structurat care conține un obiect de dovadă și referința sa de înlănțuire.

**Hash-ul Anterior (prev_hash)**  
Hash-ul de integritate al intrării ledger precedente.

**Capul Lanțului**  
Cea mai recentă intrare ledger validă într-o secvență.

---

# 4. Structura Intrării Ledger

O intrare ledger conformă TREBUIE să urmeze:

```json
{
  "v": 1,
  "type": "LEDGER_ENTRY",
  "proof": { ...obiect conform VIP-STD-001... },
  "prev_hash": "<sha256-hex sau null>",
  "entry_hash": "<sha256-hex>"
}

Unde:

- `proof` TREBUIE să fie un obiect de dovadă valid VIP-STD-001  
- `prev_hash` TREBUIE să facă referire la hash-ul intrării anterioare sau să fie null pentru prima intrare  
- `entry_hash` TREBUIE să fie hash-ul SHA-256 al intrării ledger canonizate, excluzând `entry_hash` în sine  

---

# 5. Reguli de Calcul al Hash-ului

5.1 Canonizare  
Intrările ledger TREBUIE să fie canonizate folosind regulile VIP-STD-001.

5.2 Hash-ul Intrării  
`entry_hash` TREBUIE să fie calculat peste:

{
  "v",
  "type",
  "proof",
  "prev_hash"
}

5.3 Determinism  
Două intrări ledger identice TREBUIE să producă valori `entry_hash` identice.

---

# 6. Cerința de Doar Adăugare

6.1 Imuabilitate  
Intrările ledger NU TREBUIE să fie modificate după inserare.

6.2 Ordine  
Fiecare intrare TREBUIE să facă referire exact la un predecesor, cu excepția intrării genesis.

6.3 Intrarea Genesis  
Prima intrare ledger TREBUIE să seteze `prev_hash` la null.

---

# 7. Validarea Lanțului

Un proces de validare a ledger-ului conform TREBUIE să:

1. Valideze fiecare dovadă încorporată conform VIP-STD-001  
2. Recalculeze fiecare `entry_hash`  
3. Verifice consistența înlănțuirii `prev_hash`  
4. Confirme absența legăturilor rupte  

Un lanț este VALID dacă toate intrările îndeplinesc aceste condiții.

---

# 8. Independența Stocării

Profilul Ledger:

- Nu impune un backend de stocare
- Nu impune consens distribuit
- Nu necesită implementare blockchain
- Nu definește reguli de replicare

Definește doar înlănțuirea structurală.

---

# 9. Conformitate

Un sistem care pretinde conformitatea cu VIP-STD-002 TREBUIE să:

1. Accepte obiecte de dovadă VIP-STD-001  
2. Implementeze structura ledger doar în adăugare  
3. Aplice integritatea înlănțuirii hash-ului  
4. Oferă validare deterministă a lanțului  

Detaliile implementării ledger-ului POT varia, cu condiția să se păstreze determinismul structural.

---

# 10. Considerații de Securitate

Securitatea acestui profil depinde de:

- Integritatea mediului de stocare  
- Protecția împotriva modificărilor neautorizate  
- Canonizarea corectă  

Acest profil nu previne atacurile de ștergere decât dacă este combinat cu mecanisme de ancorare definite în VIP-STD-004.

---

# 11. Concluzie

VIP-STD-002 definește stratul de persistență structurală al Protocolului de Integritate VeriSeal.

Asigură înlănțuirea doar în adăugare și consistența pe termen lung a dovezilor fără a modifica modelul de integritate de bază.