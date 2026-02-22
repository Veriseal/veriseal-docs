Fișier: threat-model-adversarial-analysis.md

---
title: Model de Amenințare și Analiză Adversarială
sidebar_label: Model de Amenințare (Anexă)
---

# Model de Amenințare și Analiză Adversarială

## 1. Scop și Domeniu de Aplicare

Această anexă oferă o analiză orientată pe securitate a infrastructurii de dovadă VeriSeal în condiții adversariale.

Definește:

- Actorii de amenințare și capabilitățile acestora
- Granițele de încredere
- Suprafața de atac
- Presupunerile de securitate
- Mecanismele de detectare și atenuare
- Riscurile reziduale și cerințele de guvernanță

Această anexă este scrisă pentru părțile interesate instituționale (CISO, Risc, Audit, Conformitate).

---

## 2. Activele Sistemului de Protejat

VeriSeal este proiectat să protejeze **integritatea și verificabilitatea** artefactelor de dovadă și a înregistrărilor de dovadă.

Activele principale:

1. **Integritatea Artefactului**
   Artefactul sigilat trebuie să rămână verificabil și să evidențieze orice tentativă de manipulare în timp.

2. **Integritatea Obiectului de Dovadă**
   Înregistrările de dovadă (JSON canonic) nu trebuie să fie alterabile fără detectare.

3. **Continuitatea Registrului**
   Lanțul de tip doar adăugare trebuie să rămână structural imuabil și cronologic consistent.

4. **Independența Verificării**
   Terții trebuie să poată verifica dovezile fără a avea încredere în operator.

5. **Integritatea Timpului (ancorare externă opțională)**
   Când există ancorare externă, ancora trebuie să întărească certitudinea temporală.

6. **Integritatea Cheilor (chei de semnare)**
   Cheile private utilizate pentru semnare trebuie să rămână confidențiale și guvernate.

---

## 3. Actori de Amenințare

### 3.1 Adversar Extern
Capabilități:
- Încercări de interceptare la nivel de rețea
- Sondarea punctelor finale publice
- Încercări de substituire a artefactelor
- Încercări de redare pentru fluxurile de captură (când este aplicabil)

Constrângeri:
- Fără acces direct la cheile de semnare sau stocarea internă (presupus)

### 3.2 Amenințare Internă (Operator sau Administrator Privilegiat)
Capabilități:
- Acces potențial la infrastructură
- Încercări de a altera înregistrările
- Încercări de a șterge sau ascunde selectiv dovezile
- Încercări de a manipula ieșirile PDF sau de prezentare

### 3.3 Transmițător de Dovezi Malicioase
Capabilități:
- Transmiterea de conținut fals sau înșelător
- Transmiterea de artefacte manipulate
- Încercarea de a exploata ambiguitatea fluxului de lucru
- Încercarea de repudiere după sigilare („Nu am trimis niciodată asta”)

### 3.4 Dispozitiv Client Compromis
Capabilități:
- Malware-ul modifică artefactul înainte de sigilare
- Compromiterea acreditivelor
- Interceptează sau alterează datele locale înainte de încărcare

### 3.5 Adversar din Lanțul de Aprovizionare / Dependențe
Capabilități:
- Compromiterea dependențelor
- Compromiterea fluxului de construire
- Încercări de injectare la runtime

---

## 4. Granițele de Încredere

VeriSeal impune granițe de încredere explicite:

În interiorul graniței de încredere VeriSeal:
- Calculul hash-ului
- Generarea obiectului de dovadă canonic
- Operațiunea de adăugare la registru
- Generarea semnăturii (domeniul cheilor controlat)
- Trimiterea ancorei opțională

În afara graniței de încredere:
- Instrumente de creare a artefactelor
- Securitatea dispozitivului utilizatorului
- Adevărul semantic al conținutului
- Interpretarea legală
- Intenția și contextul uman

Principiu cheie: **VeriSeal securizează structura, nu semnificația.**

---

## 5. Prezentare Generală a Suprafaței de Atac

Suprafețele principale de atac:

1. **Ingestia artefactului de intrare** (încărcare / generare de sarcină utilă)
2. **Fluxul de generare a dovezilor** (hashing + canonicalizare + semnare)
3. **Stocarea în registru** (integritatea lanțului de tip doar adăugare)
4. **Punctele finale de verificare** (JSON public, redare PDF, pagină de verificare HTML)
5. **Gestionarea cheilor** (confidențialitatea cheii private și politica de utilizare)
6. **Lanțul de construire/CI și dependențe** (integritatea lanțului de aprovizionare)

---

## 6. Scenarii de Amenințare și Atenuări

### 6.1 Manipularea Artefactului Post-Sigilare
Atac: Artefact modificat după sigilare.

Detectare:
- Digestul SHA-256 recalculat diferă.

Atenuare:
- Hashing determinist
- Validarea dovezii necesită recalculare

Risc rezidual:
- Niciunul pentru detectare (integritatea detectează întotdeauna schimbarea)
- Disputele semantice rămân posibile

---

### 6.2 Manipularea Obiectului de Dovadă (JSON)
Atac: Alterarea câmpurilor JSON de dovadă (timpuri, identificatori, steaguri).

Detectare:
- Verificarea semnăturii eșuează
- Neconcordanță hash în recalcularea canonică

Atenuare:
- JSON canonic ca sursă de adevăr
- Semnătură peste sarcina utilă canonică

Risc rezidual:
- Dacă cheia de semnare este compromisă (vezi scenariul de compromitere a cheii)

---

### 6.3 Mutarea / Ștergerea Registrului
Atac: Ștergerea unei intrări sau rescrierea lanțului istoric.

Detectare:
- Discontinuitatea lanțului (neconcordanță previous_entry_hash)
- Neconcordanță în recalcularea entry_hash

Atenuare:
- Arhitectură de tip doar adăugare
- Dependența de hash-ul lanțului
- Ancorarea externă regulată recomandată pentru asigurare ridicată

Risc rezidual:
- Atacurile la nivel de stocare pot șterge întregul registru dacă guvernanța este slabă
  (risc de disponibilitate; detectarea integrității rămâne, dar dovezile pot lipsi)

---

### 6.4 Suprimarea Selectivă a Dovezilor („Ascunderea Dovezilor”)
Atac: Operatorul ascunde sau refuză să servească un punct final de dovadă.

Detectare:
- Referința publică există, dar punctul final nu răspunde
- Copiile externe ale JSON dovedesc existența anterioară

Atenuare:
- Încurajarea arhivării instituționale a pachetelor de dovezi
- Ancorarea externă întărește revendicările de existență
- Politici de guvernanță pentru disponibilitate

Risc rezidual:
- Disponibilitatea rămâne guvernată operațional

---

### 6.5 Manipularea Stratului de Prezentare (PDF/HTML)
Atac: Modificarea redării PDF sau a vizualizării HTML pentru a arăta un statut fals.

Detectare:
- JSON canonic rămâne sursa de adevăr
- Verificatorul recalculează hash-urile și validează semnătura

Atenuare:
- Regulă doar pentru redare
- Logica de verificare nu depinde niciodată de ieșirea de prezentare

Risc rezidual:
- Riscul de inginerie socială rămâne (utilizatorii având încredere în vizualuri fără a verifica)

---

### 6.6 Atacuri de Redare (Dovezi Bazate pe Captură)
Atac: Redarea unei capturi video/audio anterioare pentru a simula prezența.

Detectare/Atenuare (când există fluxuri de captură):
- Legare provocare-răspuns (prompturi dinamice)
- Hashing jurnal de evenimente runtime
- Legarea media la sarcina utilă runtime

Risc rezidual:
- Depinde de calitatea fluxului de captură
- Nu se aplică cazurilor de utilizare a sigilării artefactelor statice

---

### 6.7 Atac Man-in-the-Middle / Strat de Transport
Atac: Interceptarea sau alterarea traficului în timpul încărcării sau verificării.

Atenuare:
- TLS impus (HTTPS)
- Recalcularea hash-ului și validarea semnăturii previn manipularea tăcută

Risc rezidual:
- Furtul de acreditive este în afara modelului criptografic
- Atacurile de degradare a rețelei sunt atenuate prin HTTPS strict și HSTS (recomandat)

---

### 6.8 Compromiterea Cheii Private
Atac: Cheia de semnare furată.

Impact:
- Atacatorul poate emite dovezi false care par valide
- Dovezile istorice rămân verificabile, dar încrederea în semnatar este afectată

Atenuare:
- Semnare susținută de HSM / KMS
- Politica de rotație a cheilor
- Jurnale de audit pentru operațiunile de semnare
- Separarea sarcinilor (control dual)

Risc rezidual:
- Scenariul cu cel mai mare impact; guvernanța este obligatorie

---

### 6.9 Slăbirea Funcției Hash (Descoperire Criptografică)
Atac: Coliziune practică sau a doua preimagine împotriva SHA-256.

Impact:
- Presupunerile de integritate se degradează

Atenuare:
- Agilitatea algoritmului (câmpul hash_version)
- Capacitatea de a reancora dovezile folosind primitive mai puternice
- Suport pentru strategii dual-hash în versiunile viitoare

Risc rezidual:
- Riscul evoluției criptografice pe termen lung există pentru toate sistemele

---

### 6.10 Compromiterea Lanțului de Aprovizionare
Atac: Dependențele de construire injectează logică malițioasă.

Atenuare:
- Fixarea dependențelor
- Construcții reproducibile
- Semnarea codului
- Generarea SBOM
- Controale de integritate CI

Risc rezidual:
- Necesită guvernanță disciplinată a software-ului

---

## 7. Presupuneri de Securitate

Presupunerile de securitate ale VeriSeal:

- SHA-256 rămâne sigur (fără coliziuni fezabile)
- Schema de semnătură rămâne sigură (fără falsificare fezabilă fără cheia privată)
- Serializarea canonică este deterministă și controlată
- Aplicarea de tip doar adăugare este protejată operațional
- Cheile private sunt protejate de gestionarea cheilor instituționale

---

## 8. Garanții de Securitate (Ce Garantează de Fapt VeriSeal)

VeriSeal garantează:

- Detectarea oricărei modificări a artefactului post-sigilare
- Reproducibilitatea verificării deterministe
- Integritatea structurală și continuitatea lanțului (dacă registrul este disponibil)
- Dovada de manipulare a obiectului de dovadă prin semnătură
- Întărirea opțională a ancorării temporale externe

VeriSeal nu garantează:

- Adevărul conținutului
- Legitimitatea identității implicit
- Protecția împotriva dispozitivelor client compromise
- Disponibilitatea punctelor finale de dovadă fără guvernanță

---

## 9. Risc Rezidual și Cerințe de Guvernanță

VeriSeal este cel mai puternic atunci când guvernanța impune:

- Politica de gestionare a cheilor (HSM/KMS, rotație, audit)
- Politica de disponibilitate (pachete arhivistice, redundanță)
- Separarea rolurilor (sigilare vs verificare vs administrare)
- Proceduri de răspuns la incidente
- Politica de ancorare externă pentru cazuri de utilizare cu asigurare ridicată

Fără guvernanță, integritatea rămâne detectabilă, dar reziliența operațională poate degrada.

---

## 10. Rezumatul Posturii de Securitate Instituțională

VeriSeal este proiectat ca:

- Un protocol de integritate determinist
- Un strat de dovezi compatibil cu auditul
- Un sistem care minimizează dependența de încredere
- Un model de registru + obiect de dovadă care evidențiază manipularea

Oferă garanții de integritate verificabile în condiții adversariale, cu condiția ca guvernanța cheilor și controalele operaționale să fie impuse.

---

## 11. Matricea de Clasificare a Riscurilor

Această secțiune formalizează severitatea amenințărilor în funcție de impact și probabilitate.

Model de clasificare a riscurilor:

- Probabilitate: Scăzută / Medie / Ridicată
- Impact: Moderat / Semnificativ / Critic
- Risc Rezidual: După controalele de atenuare
- Proprietarul Riscului: Domeniul de responsabilitate al guvernanței

| Scenariu de Amenințare | Probabilitate | Impact | Puterea Atenuării | Risc Rezidual | Proprietarul Riscului |
|------------------------|---------------|--------|-------------------|---------------|-----------------------|
| Manipularea artefactului post-sigilare | Medie | Semnificativ | Detectare criptografică | Scăzut | Strat de verificare |
| Alterarea JSON de dovadă | Scăzută | Semnificativ | Semnătură + canonicalizare | Scăzut | Strat criptografic |
| Mutarea registrului | Scăzută | Critic | Lanț de hash + detectare | Scăzut | Guvernanța infrastructurii |
| Suprimarea dovezilor | Medie | Semnificativ | Arhivare + ancorare | Mediu | Guvernanță operațională |
| Manipularea prezentării | Medie | Moderat | JSON sursă de adevăr | Scăzut | Disciplina verificării |
| Compromiterea cheii private | Scăzută | Critic | HSM/KMS + rotație | Mediu | Guvernanța cheilor |
| Slăbirea algoritmului hash | Foarte Scăzută | Critic | Agilitatea algoritmului | Scăzut | Guvernanța criptografică |
| Compromiterea lanțului de aprovizionare | Medie | Semnificativ | Controale CI + SBOM | Mediu | Guvernanța DevSecOps |

Rezumatul posturii de risc:

- Riscurile de integritate structurală sunt puternic atenuate.
- Compromiterea cheii rămâne scenariul cu cel mai mare impact.
- Maturitatea guvernanței influențează direct riscul rezidual.

---

## 12. Model de Guvernanță și Separarea Rolurilor

Securitatea VeriSeal presupune separarea instituțională a sarcinilor.

### 12.1 Roluri Funcționale

**Operator de Sigilare**
- Inițiază generarea dovezilor.
- Nu poate modifica intrările istorice ale registrului.

**Autoritate de Verificare**
- Efectuează validarea independentă.
- Nu are acces la cheile de semnare.

**Custode al Cheilor**
- Gestionează cheile de semnare.
- Funcționează sub politica de control dual.

**Administrator de Infrastructură**
- Gestionează disponibilitatea sistemului.
- Nu poate altera sarcinile utile de dovadă semnate.

**Funcție de Audit**
- Revizuiește jurnalele și continuitatea lanțului.
- Independent de operațiuni.

---

### 12.2 Prezentare Generală RACI

| Funcție | Sigilare | Verificare | Semnare | Menținere | Audit |
|---------|----------|------------|---------|-----------|-------|
| Operator de Sigilare | R | C | - | - | - |
| Autoritate de Verificare | - | R | - | - | C |
| Custode al Cheilor | - | - | R | - | C |
| Administrator de Infrastructură | - | - | - | R | C |
| Audit | - | C | C | C | R |

R = Responsabil
C = Control / Supraveghere

---

### 12.3 Principiul Guvernanței

Integritatea este impusă de criptografie.
Încrederea este impusă de separarea guvernanței.

Garanțiile criptografice reduc dependența de încrederea umană,
dar guvernanța instituțională asigură reziliența.

---

## 13. Procedura de Răspuns la Incidente și Compromiterea Cheii

Această secțiune definește postura minimă de răspuns instituțional.

### 13.1 Scenariul de Compromitere a Cheii

Dacă se suspectează compromiterea cheii de semnare:

1. Revocarea imediată a cheii.
2. Oprirea emiterii de noi dovezi.
3. Generarea unei noi perechi de chei de semnare.
4. Publicarea unui aviz public de incident.
5. Reancorarea stării sistemului (dacă este aplicabil).
6. Efectuarea unui audit criminalistic.

Dovezile istorice rămân structural verificabile.
Domeniul de încredere se mută la cronologia valabilității cheii.

---

### 13.2 Incident de Integritate a Dovezilor

Dacă se detectează coruperea registrului:

- Recalcularea continuității lanțului.
- Identificarea punctului de divergență.
- Restaurarea dintr-un backup validat.
- Publicarea unei declarații de integritate.

---

### 13.3 Principiul Transparenței Publice

Pentru implementările instituționale:

- Politica de dezvăluire a incidentelor este necesară.
- Jurnalele de incidente cu marcaj temporal sunt recomandate.
- Auditul independent este recomandabil pentru domeniile cu asigurare ridicată.

---

### 13.4 Evoluția Criptografică pe Termen Lung

Dacă primitivele hash sau de semnătură slăbesc:

- Introducerea câmpului de hash versiune.
- Reancorarea dovezilor existente.
- Suport pentru strategia dual-hash în timpul migrației.

Agilitatea algoritmului trebuie să fie integrată în foaia de parcurs a guvernanței.