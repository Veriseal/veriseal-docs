---
title: VIP-STD-003 - Profilo di Firma VeriSeal
sidebar_label: VIP-STD-003
---

# VIP-STD-003 - Specifica del Profilo di Firma VeriSeal

Versione: 1.0
Stato: Bozza Pubblica
Classificazione: Standard di Integrità Aperto

---

## 1. Scopo

Questo documento definisce il profilo di firma per il Protocollo di Integrità VeriSeal.

VIP-STD-003 specifica:

- Requisiti di copertura della firma
- Algoritmi di firma consentiti
- Regole di verifica deterministica
- Struttura dell'oggetto firma
- Vincoli di conformità

Questa specifica si basa su VIP-STD-001 e VIP-STD-002.

---

## 2. Panoramica del Modello di Firma

Le firme sono OPZIONALI in VIP-STD-001 ma diventano formalmente definite in questo profilo.

Una firma DEVE legare crittograficamente:

- L'oggetto prova canonico (VIP-STD-001)
- L'hash della prova
- Facoltativamente la voce di registro (VIP-STD-002)

La copertura della firma DEVE essere deterministica.

---

## 3. Regole di Copertura della Firma

La firma DEVE essere calcolata su:

SHA-256(canonical_proof_object)

Deve essere utilizzata l'esatta rappresentazione in byte definita nell'Appendice C di VIP-STD-001.

Non è permessa alcuna riserializzazione durante la verifica.

---

## 4. Struttura dell'Oggetto Firma

Se presente, un oggetto firma DEVE includere:

- signature_algorithm
- public_key
- signature_value

Non sono consentiti campi aggiuntivi nella versione 1.0.

---

## 5. Definizioni dei Campi

signature_algorithm
DEVE essere uno dei seguenti:

- Ed25519
- ECDSA-secp256k1
- RSA-3072

public_key
DEVE essere codificato in esadecimale o base64, a seconda della specifica dell'algoritmo.

signature_value
DEVE rappresentare i byte grezzi della firma codificati in esadecimale.

---

## 6. Verifica Deterministica

La verifica DEVE:

1. Ricalcolare l'hash della prova
2. Ricostruire la rappresentazione in byte canonica
3. Verificare la firma rispetto alla public_key fornita
4. Rifiutare firme non corrispondenti

La verifica della firma DEVE essere deterministica.

---

## 7. Requisiti dell'Algoritmo

## 7.1 Ed25519

- Deterministico per progettazione
- Firma di 64 byte
- Chiave pubblica di 32 byte

## 7.2 ECDSA-secp256k1

- La firma DEVE essere normalizzata low-S
- È RICHIESTA la firma deterministica RFC 6979

## 7.3 RSA-3072

- Il padding DEVE utilizzare PKCS#1 v1.5 o PSS
- Dimensione minima del modulo 3072 bit

---

## 8. Considerazioni sulla Sicurezza

Le implementazioni DEVONO proteggere contro:

- Malleabilità della firma
- Attacchi di stripping della firma
- Attacchi di sostituzione della chiave
- Debole casualità in ECDSA
- Attacchi di replay

Se una firma è presente e non valida, la prova DEVE essere considerata non valida.

---

## 9. Requisiti di Conformità

Per dichiarare la conformità con VIP-STD-003:

- La copertura della firma DEVE corrispondere alla Sezione 3
- L'algoritmo DEVE essere uno degli algoritmi consentiti
- La verifica DEVE essere deterministica
- Le firme non valide DEVONO causare il rifiuto

La convalida parziale della firma NON DEVE dichiarare conformità.

---

## 10. Relazione con Altri Standard

VIP-STD-003 estende:

- VIP-STD-001 (integrità della prova canonica)
- VIP-STD-002 (integrità del registro)

La piena conformità richiede l'adesione a tutti i profili applicabili.

---

## 11. Estensioni Future

Le versioni future POTREBBERO introdurre:

- Algoritmi di firma post-quantum
- Supporto multi-firma
- Firme a soglia
- Integrazione della catena di certificati
- Estensioni di legame identitario

La compatibilità retroattiva DOVREBBE essere mantenuta.

---

## 12. Conclusione

VIP-STD-003 definisce il livello di firma deterministica di VeriSeal.

Garantisce:

- Autenticità crittografica
- Verifica deterministica
- Vincoli sugli algoritmi
- Validazione interoperabile della firma

Completa lo stack di integrità crittografica di VeriSeal.