---
title: VIP-STD-003 - VeriSeal Signaturprofil
sidebar_label: VIP-STD-003
---

# VIP-STD-003 - Spezifikation des VeriSeal Signaturprofils

Version: 1.0
Status: Öffentlicher Entwurf
Klassifikation: Offener Integritätsstandard

---

## 1. Anwendungsbereich

Dieses Dokument definiert das Signaturprofil für das VeriSeal-Integritätsprotokoll.

VIP-STD-003 spezifiziert:

- Anforderungen an die Signaturabdeckung
- Erlaubte Signaturalgorithmen
- Deterministische Verifizierungsregeln
- Struktur des Signaturobjekts
- Konformitätsbeschränkungen

Diese Spezifikation baut auf VIP-STD-001 und VIP-STD-002 auf.

---

## 2. Übersicht des Signaturmodells

Signaturen sind in VIP-STD-001 OPTIONAL, werden jedoch in diesem Profil formell definiert.

Eine Signatur MUSS kryptografisch binden:

- Das kanonische Beweisobjekt (VIP-STD-001)
- Den Beweishash
- Optional den Ledger-Eintrag (VIP-STD-002)

Die Signaturabdeckung MUSS deterministisch sein.

---

## 3. Regeln zur Signaturabdeckung

Die Signatur MUSS über folgendes berechnet werden:

SHA-256(canonical_proof_object)

Die genaue Byte-Darstellung, die in VIP-STD-001 Anhang C definiert ist, MUSS verwendet werden.

Keine Reserialisierung ist während der Verifizierung erlaubt.

---

## 4. Struktur des Signaturobjekts

Falls vorhanden, MUSS ein Signaturobjekt enthalten:

- signature_algorithm
- public_key
- signature_value

Keine zusätzlichen Felder sind in Version 1.0 erlaubt.

---

## 5. Felddefinitionen

signature_algorithm
MUSS einer der folgenden sein:

- Ed25519
- ECDSA-secp256k1
- RSA-3072

public_key
MUSS in Hexadezimal oder Base64 kodiert sein, abhängig von der Algorithmenspezifikation.

signature_value
MUSS die rohen Signaturbytes in Hexadezimal kodiert darstellen.

---

## 6. Deterministische Verifizierung

Die Verifizierung MUSS:

1. Beweishash neu berechnen
2. Kanonische Byte-Darstellung rekonstruieren
3. Signatur gegen bereitgestellten public_key verifizieren
4. Nicht übereinstimmende Signaturen ablehnen

Die Signaturverifizierung MUSS deterministisch sein.

---

## 7. Algorithmusanforderungen

## 7.1 Ed25519

- Von Natur aus deterministisch
- 64-Byte-Signatur
- Öffentlicher Schlüssel 32 Bytes

## 7.2 ECDSA-secp256k1

- Signatur MUSS low-S normalisiert sein
- Deterministisches RFC 6979 Signieren ERFORDERLICH

## 7.3 RSA-3072

- Padding MUSS PKCS#1 v1.5 oder PSS verwenden
- Minimale Modulusgröße 3072 Bits

---

## 8. Sicherheitsüberlegungen

Implementierungen MÜSSEN schützen gegen:

- Signaturmanipulation
- Signatur-Strip-Angriffe
- Schlüsselersetzungsangriffe
- Schwache Zufälligkeit in ECDSA
- Replay-Angriffe

Wenn eine Signatur vorhanden und ungültig ist, MUSS der Beweis als ungültig betrachtet werden.

---

## 9. Konformitätsanforderungen

Um Konformität mit VIP-STD-003 zu beanspruchen:

- Signaturabdeckung MUSS Abschnitt 3 entsprechen
- Algorithmus MUSS einer der erlaubten Algorithmen sein
- Verifizierung MUSS deterministisch sein
- Ungültige Signaturen MÜSSEN Ablehnung verursachen

Teilweise Signaturvalidierung DARF keine Konformität beanspruchen.

---

## 10. Beziehung zu anderen Standards

VIP-STD-003 erweitert:

- VIP-STD-001 (kanonische Beweisintegrität)
- VIP-STD-002 (Ledger-Integrität)

Volle Konformität erfordert die Einhaltung aller anwendbaren Profile.

---

## 11. Zukünftige Erweiterungen

Zukünftige Versionen KÖNNEN einführen:

- Post-quantum Signaturalgorithmen
- Unterstützung für Multi-Signaturen
- Threshold-Signaturen
- Integration von Zertifikatsketten
- Erweiterungen zur Identitätsbindung

Rückwärtskompatibilität SOLLTE beibehalten werden.

---

## 12. Fazit

VIP-STD-003 definiert die deterministische Signaturschicht von VeriSeal.

Es gewährleistet:

- Kryptografische Authentizität
- Deterministische Verifizierung
- Algorithmusbeschränkungen
- Interoperable Signaturvalidierung

Es vervollständigt den kryptografischen Integritätsstapel von VeriSeal.