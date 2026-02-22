File: verification.md

---
id: verification
title: Verifica
---

﻿---
title: FAQ su Verifica e Audit
sidebar_label: Verifica e Audit
---

# FAQ su Verifica e Audit

Questa sezione spiega come funziona la verifica dell'integrità all'interno del framework VeriSeal.

La verifica è deterministica.

Non dipende dalla fiducia.

---

## 1. Cosa significa verifica in VeriSeal?

Verifica significa:

Ricalcolare l'hash di un oggetto di prova canonico
e confermare che corrisponda al valore di integrità registrato.

Se i valori corrispondono:

Il record non è stato alterato dalla sigillatura.

---

## 2. La verifica richiede infrastrutture proprietarie?

No.

La verifica richiede solo:

- L'oggetto di prova canonico
- L'algoritmo di hash (SHA-256)
- Le regole del protocollo documentate

Non è richiesta alcuna rete proprietaria o permesso del fornitore.

---

## 3. La verifica può essere eseguita indipendentemente?

Sì.

Parti indipendenti possono:

- Ricostruire l'oggetto canonico
- Ricalcolare l'hash SHA-256
- Validare la coerenza dell'integrità
- Validare la continuità della catena opzionale
- Validare il legame della firma opzionale

La verifica è neutrale rispetto al fornitore.

---

## 4. I regolatori possono verificare le prove autonomamente?

Sì.

I regolatori non richiedono:

- Iscrizione alla rete
- Accesso ai token
- Approvazione del fornitore
- Accesso a database centralizzati

La verifica può essere eseguita utilizzando le regole documentate.

---

## 5. Cosa succede se la verifica fallisce?

Se l'hash ricalcolato differisce:

- Il record è cambiato
- La struttura canonica è stata alterata
- L'integrità è compromessa

Il fallimento della verifica indica un'incoerenza strutturale.

Non determina automaticamente l'intento.

---

## 6. La verifica può rilevare manipolazioni parziali dei dati?

Sì.

Qualsiasi cambiamento in:

- Contenuto
- Metadati inclusi nell'oggetto canonico
- Campo timestamp
- Ordinamento strutturale

Produrrà un hash diverso.

Anche i cambiamenti minimi sono rilevabili.

---

## 7. La verifica conferma l'autenticità?

No.

La verifica conferma l'integrità.

L'autenticità (legame d'identità) richiede:

- Firma digitale
- Meccanismi di garanzia dell'identità
- Schemi di firma qualificata (dove applicabile)

Integrità e autenticità sono proprietà distinte.

---

## 8. La verifica può confermare la cronologia?

La cronologia può essere rafforzata quando:

- Sono inclusi i campi timestamp
- È abilitata la concatenazione degli eventi
- Viene utilizzato l'ancoraggio esterno

La verifica può confermare la coerenza strutturale delle affermazioni cronologiche.

Non crea autorità temporale statutaria.

---

## 9. La verifica dipende dai meccanismi di consenso?

No.

La verifica è locale e deterministica.

Non richiede:

- Accordo dei validatori
- Sincronizzazione della rete
- Consenso dei token

L'integrità è matematica, non sociale.

---

## 10. La verifica può essere automatizzata?

Sì.

La verifica può essere:

- Scriptata
- Integrata nei flussi di audit
- Incorporata nei flussi di lavoro di conformità
- Utilizzata in sistemi di riconciliazione automatizzati

Supporta la validazione basata su macchine.

---

## 11. La verifica è scalabile?

Sì.

L'hashing SHA-256 è computazionalmente efficiente.

La verifica può scalare su:

- Sistemi di transazioni ad alto volume
- Registri aziendali
- Implementazioni a livello di settore

La scalabilità dipende dal design dell'integrazione.

---

## 12. La verifica può operare in ambienti isolati?

Sì.

La verifica richiede:

- Oggetto canonico
- Algoritmo di hash
- Regole documentate

Non è richiesta la connettività internet.

---

## 13. Cosa succede se il registro è corrotto?

La verifica delle singole prove rimane possibile.

La corruzione del registro influisce su:

- Validazione della continuità della catena
- Ricostruzione della sequenza degli eventi

Non invalida il ricalcolo degli hash delle singole prove.

---

## 14. Più parti possono verificare la stessa prova?

Sì.

Qualsiasi parte con accesso a:

- L'oggetto canonico
- L'hash della prova

Può verificare l'integrità in modo indipendente.

La verifica è riproducibile in diversi ambienti.

---

## 15. La verifica prova che il contenuto è vero?

No.

La verifica prova:

Che il contenuto non è cambiato dalla sigillatura.

Non prova:

- Correttezza fattuale
- Validità legale
- Autenticità dell'identità (a meno che non sia firmata)

L'integrità non è una validazione della verità.

---

## 16. La verifica può supportare l'analisi giudiziaria esperta?

Sì.

Poiché la verifica è:

- Deterministica
- Riproducibile
- Basata su hash
- Neutrale rispetto alla tecnologia

Gli esperti possono indipendentemente:

- Ricalcolare gli hash
- Validare la struttura
- Confermare la coerenza della catena (se utilizzata)

L'interpretazione giudiziaria rimane dipendente dalla giurisdizione.

---

## 17. La verifica può essere integrata nei processi di audit?

Sì.

La verifica può supportare:

- Revisione interna degli audit
- Validazione della conformità
- Ispezioni regolatorie
- Indagini forensi

Rafforza la difendibilità strutturale dell'audit.

---

## 18. Quali rischi riduce la verifica?

La verifica riduce:

- Rischio di manomissioni non rilevate
- Rischio di manipolazione dei record
- Rischio di dispute cronologiche
- Esposizione ad alterazioni interne
- Fragilità probatoria post-incidente

Rafforza la difendibilità istituzionale.

---

## 19. La verifica richiede accesso a lungo termine al fornitore?

No.

La verifica si basa su:

- Algoritmo di hashing documentato pubblicamente
- Regole di canonicalizzazione documentate
- Ricalcolo matematico

La continuità del fornitore non è richiesta per la validazione.

---

## 20. Cos'è la verifica in una frase?

La verifica conferma che un record digitale rimane
esattamente nello stesso stato strutturale
di quando è stato sigillato.

Niente di più.

Niente di meno.