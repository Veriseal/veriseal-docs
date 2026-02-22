---
title: Model de Certificare și Conformitate
sidebar_label: Model de Certificare și Conformitate
---

# VeriSeal - Model de Certificare și Conformitate

## De ce contează certificarea

Pentru adoptarea instituțională, infrastructura criptografică nu trebuie doar să fie funcțională.

Trebuie să fie:

- Verificabilă
- Reproductibilă
- Auditabilă
- Certificabilă

VeriSeal este conceput pentru a susține un cadru structurat de conformitate și certificare.

Aceasta asigură că implementările:

- Urmează protocolul în mod determinist
- Nu introduc abateri silențioase
- Păstrează validitatea dovezilor pe termen lung

---

## Conformitate vs Certificare

### Conformitate

Conformitatea înseamnă:

O implementare respectă specificația protocolului VeriSeal.

Aceasta include:

- Serializare JSON canonică
- Hashing determinist SHA-256
- Integritatea registrului doar în adăugare
- Lanț corect de `prev_hash`
- Integritatea construcției rădăcinii Merkle
- Reguli de validare a semnăturii
- Format de ancorare a timestamp-ului

Conformitatea este tehnică.

---

### Certificare

Certificarea înseamnă:

O implementare a fost evaluată formal conform unor criterii definite.

Certificarea este instituțională.

Poate include:

- Evaluare de securitate
- Revizuirea proceselor
- Disciplina operațională
- Validarea managementului cheilor
- Integritatea punctului de verificare
- Controale de segregare a infrastructurii

Certificarea oferă asigurare terților.

---

## Niveluri de Conformitate

VeriSeal susține conformitatea pe niveluri.

### Nivel 1 - Conform Protocolului

- Canonicalizare corectă
- Hashing determinist
- Lanț de registru valid
- Punct de verificare funcțional

Potrivit pentru implementări interne în întreprinderi.

---

### Nivel 2 - Conform Verificării Publice

Include Nivelul 1 plus:

- Punct de verificare public
- Reproductibilitatea datei JSON
- Instrucțiuni de verificare independentă
- Teste de reproductibilitate a hash-ului

Potrivit pentru medii reglementate.

---

### Nivel 3 - Grad Instituțional

Include Nivelul 2 plus:

- Ancorare externă a timestamp-ului
- Disciplina managementului operațional al cheilor
- Segregarea atribuțiilor
- Păstrarea traseului de audit
- Revizuire formală de securitate

Proiectat pentru:

- Instituții financiare
- Registre legale
- Autorități publice
- Infrastructură transfrontalieră

---

## Model de Testare a Verificării

Fiecare implementare certificată trebuie să treacă:

### 1) Teste de Reproducere Deterministă

Dat:

- Artefactul original
- JSON public
- Rădăcina Merkle

Procesul de verificare trebuie să producă hash-uri identice.

Nu se tolerează nicio abatere.

---

### 2) Teste de Integritate a Lanțului

Registrul trebuie să demonstreze:

- Legătura corectă `prev_hash`
- Fără întreruperi în secvență
- Fără inserții duplicate

Disciplina doar în adăugare trebuie să fie demonstrabilă.

---

### 3) Teste de Integritate a Semnăturii

- Semnătura trebuie să corespundă cheii publice publicate
- Semnătura trebuie să valideze încărcătura canonică
- Fără învelișuri opace de semnare

---

### 4) Validarea Ancorării Timestamp-ului

Dacă ancorarea este activată:

- Hash-ul ancorei trebuie să corespundă hash-ului registrului
- Dovada OTS trebuie să valideze
- Dovada timestamp-ului trebuie să fie reproductibilă independent

---

## Controale Operaționale (Traseu Instituțional)

Pentru niveluri mai ridicate de certificare:

### Managementul Cheilor

- Chei susținute de hardware recomandate
- Politica de rotație a cheilor definită
- Restricțiile de acces documentate

### Guvernanța Registrului

- Responsabilitate clară a operatorului
- Fără capacitate de mutație retroactivă
- Proceduri de backup și redundanță

### Separarea Rolurilor

- Generarea dovezilor
- Custodia cheilor
- Administrarea infrastructurii

Nu trebuie să se concentreze într-un singur actor necontrolat.

---

## Cerințe de Transparență Publică

Implementările de grad instituțional trebuie să ofere:

- Documentație de verificare
- Dezvăluirea primitivelor criptografice
- Declarația algoritmului de hash
- Identificarea versiunii

Sistemele opace nu pot fi certificate.

---

## Principiul Verificării Independente

O dovadă VeriSeal certificată trebuie să fie:

Verificabilă fără a contacta VeriSeal.

Verificarea trebuie să fie posibilă folosind:

- JSON-ul public
- Specificația protocolului publicată
- Lanțul de hash al registrului
- Cheia publică

Aceasta asigură independența față de furnizor.

---

## Compatibilitate cu Cadrurile Existente

Modelul de conformitate este compatibil cu:

- Cadruri interne de audit
- Revizuirea conformității financiare
- Proceduri de criminalistică digitală
- Evaluarea admisibilității probelor

Nu înlocuiește regimurile de reglementare.

Întărește fundația lor tehnică.

---

## Obiectiv pe Termen Lung

Modelul de Certificare și Conformitate este conceput pentru a:

- Încuraja implementările ecosistemului
- Preveni fragmentarea protocolului
- Permite auditorilor terți
- Construi încrederea instituțională

În timp, certificarea poate evolua către:

- Organisme acreditate independente
- Trasee de conformitate specifice sectorului
- Recunoaștere globală formalizată

---

## Principiul de Bază

Un sistem de dovadă care nu poate fi testat independent
nu este infrastructură.

VeriSeal este conceput pentru a fi testabil, reproductibil și certificabil.