---
id: vip-std-002
title: VIP-STD-002 — Ledger-Profil
sidebar_position: 4
---

# VIP-STD-002  
## Ledger-Profil (Erweiterung zu VIP-STD-001)

---

# 1. Anwendungsbereich

Dieses Dokument definiert das optionale Ledger-Profil des VeriSeal Integrity Protocol (VIP).

Es spezifiziert die nur anhängbare Aufzeichnungsstruktur für den Nachweis der Persistenz.

Dieses Profil erweitert VIP-STD-001, modifiziert jedoch nicht das Kernintegritätsmodell.

---

# 2. Beziehung zu VIP-STD-001

VIP-STD-002:

- MUSS Nachweisobjekte verwenden, die mit VIP-STD-001 konform sind  
- DARF die Kanonisierung oder Hash-Berechnung NICHT ändern  
- MUSS die deterministische Verifikation beibehalten  

Die Ledger-Schicht zeichnet Nachweise auf; sie definiert sie nicht neu.

---

# 3. Definitionen

**Ledger-Eintrag**  
Ein strukturierter Datensatz, der ein Nachweisobjekt und seine Verkettungsreferenz enthält.

**Vorheriger Hash (prev_hash)**  
Der Integritätshash des vorhergehenden Ledger-Eintrags.

**Kopf der Kette**  
Der zuletzt gültige Ledger-Eintrag in einer Sequenz.

---

# 4. Struktur des Ledger-Eintrags

Ein konformer Ledger-Eintrag MUSS folgendem Format entsprechen:

```json
{
  "v": 1,
  "type": "LEDGER_ENTRY",
  "proof": { ...VIP-STD-001 konformes Objekt... },
  "prev_hash": "<sha256-hex oder null>",
  "entry_hash": "<sha256-hex>"
}

Wobei:

- `proof` MUSS ein gültiges VIP-STD-001 Nachweisobjekt sein  
- `prev_hash` MUSS den vorherigen Eintragshash referenzieren oder null für den ersten Eintrag sein  
- `entry_hash` MUSS der SHA-256-Hash des kanonisierten Ledger-Eintrags sein, ausgenommen `entry_hash` selbst  

---

# 5. Regeln zur Hash-Berechnung

5.1 Kanonisierung  
Ledger-Einträge MÜSSEN unter Verwendung der VIP-STD-001 Regeln kanonisiert werden.

5.2 Eintragshash  
Der `entry_hash` MUSS über folgende Struktur berechnet werden:

{
  "v",
  "type",
  "proof",
  "prev_hash"
}

5.3 Determinismus  
Zwei identische Ledger-Einträge MÜSSEN identische `entry_hash`-Werte erzeugen.

---

# 6. Nur-Anhängungs-Anforderung

6.1 Unveränderlichkeit  
Ledger-Einträge DÜRFEN nach der Einfügung NICHT modifiziert werden.

6.2 Reihenfolge  
Jeder Eintrag MUSS genau einen Vorgänger referenzieren, außer dem Genesis-Eintrag.

6.3 Genesis-Eintrag  
Der erste Ledger-Eintrag MUSS `prev_hash` auf null setzen.

---

# 7. Kettenvalidierung

Ein konformer Ledger-Validierungsprozess MUSS:

1. Jeden eingebetteten Nachweis gemäß VIP-STD-001 validieren  
2. Jeden `entry_hash` neu berechnen  
3. Die Konsistenz der `prev_hash`-Verkettung überprüfen  
4. Das Fehlen von unterbrochenen Verbindungen bestätigen  

Eine Kette ist GÜLTIG, wenn alle Einträge diese Bedingungen erfüllen.

---

# 8. Speicherunabhängigkeit

Das Ledger-Profil:

- Schreibt keinen Speicher-Backend vor
- Schreibt keinen verteilten Konsens vor
- Erfordert keine Blockchain-Implementierung
- Definiert keine Replikationsregeln

Es definiert nur die strukturelle Verkettung.

---

# 9. Konformität

Ein System, das Konformität mit VIP-STD-002 beansprucht, MUSS:

1. VIP-STD-001 Nachweisobjekte akzeptieren  
2. Eine nur-anhängbare Ledger-Struktur implementieren  
3. Die Integrität der Hash-Verkettung durchsetzen  
4. Eine deterministische Kettenvalidierung bereitstellen  

Die Details der Ledger-Implementierung DÜRFEN variieren, vorausgesetzt, die strukturelle Determinismus wird beibehalten.

---

# 10. Sicherheitsüberlegungen

Die Sicherheit dieses Profils hängt ab von:

- Der Integrität der Speicherumgebung  
- Schutz vor unbefugter Modifikation  
- Korrekte Kanonisierung  

Dieses Profil verhindert keine Löschangriffe, es sei denn, es wird mit Verankerungsmechanismen kombiniert, die in VIP-STD-004 definiert sind.

---

# 11. Fazit

VIP-STD-002 definiert die strukturelle Persistenzschicht des VeriSeal Integrity Protocol.

Es gewährleistet eine nur-anhängbare Verkettung und langfristige Nachweiskonsistenz, ohne das Kernintegritätsmodell zu verändern.