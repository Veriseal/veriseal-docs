---
id: cryptographic-model
title: Arhitectura criptografică și de dovadă
sidebar_position: 2.1
---

# 2.1 Arhitectura criptografică și de dovadă

VeriSeal se bazează exclusiv pe primitive criptografice conservatoare și testate în practică.

Fără strat de consens experimental.  
Fără algoritm de hash proprietar.  
Fără construcție criptografică opacă.

Modelul este determinist, reproductibil și defensibil instituțional.

---

## Obiectivele designului

Stratul criptografic trebuie să asigure:

- Integritatea structurală  
- Reproductibilitatea deterministă  
- Auditabilitatea pe termen lung  
- Verificabilitatea externă  
- Ancorarea opțională a marcajului temporal descentralizat  

---

## Canonicalizare

Datele brute de intrare trebuie mai întâi transformate într-o reprezentare deterministă.

Fie:

E = dovezi brute  
C(E) = reprezentare canonică  

Canonicalizarea garantează:

- Codificare JSON stabilă  
- Ordine deterministă a câmpurilor  
- Normalizare UTF-8  
- Fără ambiguitate în spațiile albe  

Încărcătura canonică:

P = C(E)

---

## Hashing

Primitiva principală de integritate:

H = SHA-256(P)

Proprietăți:

- Rezistență la coliziuni (presupuneri criptografice actuale)
- Ieșire deterministă
- Reproductibilitate universală

Hash-ul devine identificatorul principal al dovezii când este vorba de un singur artefact.

---

## Agregare Merkle

Pentru dovezi cu mai multe artefacte:

h1, h2, ..., hn

Se construiește un arbore Merkle.

Rezultatul:

merkle_root

Proprietăți:

- Orice modificare a unei frunze invalidează rădăcina
- Dovezi de includere eficiente posibile
- Legare deterministă multi-artefact

merkle_root devine referința publică canonică.

---

## Registru doar pentru adăugare

Fiecare dovadă este introdusă într-un registru doar pentru adăugare.

Fiecare intrare conține:

- identificator_dovadă  
- metadate  
- marcaj temporal UTC  
- prev_hash  

Regula de legare:

entry_hash_i = SHA256(entry_data_i || entry_hash_(i-1))

Aceasta creează imuabilitate structurală.

Modificarea intrărilor istorice rupe integritatea lanțului.

---

## Mod de legare puternică

VeriSeal impune coerența structurală între:

- Jurnalele UX  
- Artefacte media  
- JSON canonic  
- Intrare în registru  
- PDF opțional  
- Ancoră OTS opțională  

Legarea previne modificarea selectivă sau înlocuirea componentelor.

---

## Semnătură PDF (Strat opțional)

PDF-ul este doar pentru redare.

Când este activat:

- Semnătură RSA-3072  
- Hash-ul documentului încorporat  
- Verificabil independent  

Important:

PDF-ul nu este sursa adevărului.  
Intrarea în registru și JSON-ul public sunt.

---

## OpenTimestamps (Opțional)

Când este activat:

- Hash-ul dovezii este trimis la OTS
- Se generează un fișier .ots
- Confirmarea Bitcoin ancorează existența în timp

OTS întărește ancorarea temporală, dar nu este necesar pentru validarea structurală.

---

## Minimizarea încrederii

Verificarea necesită încredere doar în:

- SHA-256  
- Calcul determinist  
- Standarde criptografice publice  

Nu în:

- Servere proprietare  
- Declarații ale operatorului  
- Reprezentări vizuale  

VeriSeal nu afirmă adevărul.  
Garantează integritatea structurală.