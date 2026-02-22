---
id: vip-std-001
title: VIP-STD-001 — Kernintegritätsstandard
sidebar_position: 3
---

# VIP-STD-001  
## Kernintegritätsstandard

---

# 1. Anwendungsbereich

Dieses Dokument definiert das obligatorische Kernintegritätsmodell des VeriSeal Integrity Protocol (VIP).

Es legt die deterministischen Regeln fest für:

- Datenkanonisierung
- Hash-Berechnung
- Beweisobjektbildung
- Deterministische Verifikation

Dieser Standard definiert nicht das Verhalten des Ledgers, digitale Signaturen oder Verankerungsmechanismen.  
Solche Elemente sind in separaten Erweiterungsprofilen spezifiziert.

---

# 2. Normative Sprache

Die Schlüsselwörter:

- MUSS
- DARF NICHT
- SOLLTE
- KANN

sind gemäß RFC 2119 zu interpretieren.

---

# 3. Definitionen

**Kanonische Daten**  
Eine normalisierte Byte-Darstellung von strukturierten Eingabedaten.

**Integritätshash**  
Ein SHA-256-Digest, der über kanonisierte Daten berechnet wird.

**Beweisobjekt**  
Ein strukturiertes JSON-Objekt, das kanonisierte Daten und deren Integritätshash enthält.

**Verifikationsereignis**  
Die deterministische Neuberechnung des Integritätshashs aus kanonischen Daten.

---

# 4. Kanonisierungsregeln

4.1 Datenformat  
Eingabedaten MÜSSEN strukturiertes JSON sein.

4.2 Feldreihenfolge  
Alle Objektschlüssel MÜSSEN lexikographisch geordnet sein.

4.3 Leerzeichen  
Leerzeichen MÜSSEN entfernt werden, außer wo sie durch die JSON-Syntax erforderlich sind.

4.4 Kodierung  
UTF-8-Kodierung MUSS verwendet werden.

4.5 Determinismus  
Kanonisierung MUSS identische Byte-Ausgaben für identische logische Eingaben erzeugen.

---

# 5. Hash-Algorithmus

5.1 Algorithmus  
Der Integritätshash MUSS SHA-256 verwenden.

5.2 Eingabe  
Der Hash MUSS über die kanonisierte Byte-Sequenz berechnet werden.

5.3 Ausgabe  
Der Hash MUSS als Kleinbuchstaben-Hexadezimal kodiert werden.

---

# 6. Struktur des Beweisobjekts

Ein konformes Beweisobjekt MUSS enthalten:

```json
{
  "v": 1,
  "type": "PROOF",
  "data": { ... },
  "hash": "<sha256-hex>"
}

Wo:

- `v` = Protokollversion  
- `type` = fester String "PROOF"  
- `data` = kanonisierbare JSON-Nutzlast  
- `hash` = SHA-256-Digest der kanonisierten `data`

Zusätzliche Felder DÜRFEN die Kanonisierung von `data` NICHT verändern.

---

# 7. Deterministische Verifikation

Die Verifikation MUSS folgende Schritte befolgen:

1. `data` extrahieren
2. `data` kanonisieren
3. SHA-256-Hash berechnen
4. Berechneten Hash mit gespeichertem `hash` vergleichen
5. GÜLTIG zurückgeben, wenn gleich; andernfalls UNGÜLTIG

Die Verifikation DARF NICHT abhängen von:

- Externem Zustand
- Netzwerkzugang
- Ledger-Präsenz
- Signatur-Präsenz
- Verankerungsstatus

Die Kernverifikation ist eigenständig.

---

# 8. Unabhängigkeitsprinzip

VIP-STD-001 definiert nur Integrität.

Es garantiert nicht:

- Datenauthentizität
- Identitätsverifikation
- Rechtliche Zulässigkeit
- Zeitstempel-Gültigkeit

Es garantiert deterministische Integrität unter definierten kryptografischen Annahmen.

---

# 9. Abwärtskompatibilität

Zukünftige kleinere Revisionen MÜSSEN bewahren:

- Kanonisierungsdeterminismus
- SHA-256-Kompatibilität
- Verifikationsreproduzierbarkeit

Änderungen, die Kompatibilität brechen, erfordern eine Versionsinkrementierung.

---

# 10. Konformität

Ein System ist konform mit VIP-STD-001, wenn es:

1. Kanonisierung gemäß Abschnitt 4 implementiert  
2. SHA-256 gemäß Abschnitt 5 berechnet  
3. Beweisobjekte gemäß Abschnitt 6 erzeugt  
4. Deterministisch gemäß Abschnitt 7 verifiziert  

Die Konformität mit Erweiterungsprofilen ist optional.

---

# 11. Sicherheitsüberlegungen

Die Sicherheit von VIP-STD-001 hängt ab von:

- Der kryptografischen Stärke von SHA-256
- Der korrekten Implementierung der Kanonisierung
- Schutz gegen Hash-Kollisionsanfälligkeiten

Bedrohungsannahmen sind in VIP-THREAT-001 definiert.

---

# 12. Schlussfolgerung

VIP-STD-001 definiert das obligatorische Kernintegritätsmodell des VeriSeal Integrity Protocol.

Es bietet deterministische, reproduzierbare und implementierungsunabhängige digitale Integritätsverifikation.