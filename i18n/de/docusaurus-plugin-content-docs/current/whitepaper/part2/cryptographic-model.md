---
id: cryptographic-model
title: Kryptografische und Beweisarchitektur
sidebar_position: 2.1
---

# 2.1 Kryptografische und Beweisarchitektur

VeriSeal stützt sich ausschließlich auf konservative, bewährte kryptografische Primitive.

Keine experimentelle Konsensschicht.  
Kein proprietärer Hash-Algorithmus.  
Keine undurchsichtige kryptografische Konstruktion.

Das Modell ist deterministisch, reproduzierbar und institutionell verteidigbar.

---

## Designziele

Die kryptografische Schicht muss sicherstellen:

- Strukturelle Integrität  
- Deterministische Reproduzierbarkeit  
- Langfristige Prüfungsfähigkeit  
- Externe Verifizierbarkeit  
- Optionale dezentrale Zeitstempelverankerung  

---

## Kanonisierung

Rohdaten müssen zuerst in eine deterministische Darstellung umgewandelt werden.

Sei:

E = Rohbeweis  
C(E) = kanonische Darstellung  

Kanonisierung garantiert:

- Stabile JSON-Codierung  
- Deterministische Feldreihenfolge  
- UTF-8-Normalisierung  
- Keine Mehrdeutigkeit bei Leerzeichen  

Die kanonische Nutzlast:

P = C(E)

---

## Hashing

Primäre Integritätsprimitive:

H = SHA-256(P)

Eigenschaften:

- Kollisionsresistenz (aktuelle kryptografische Annahmen)
- Deterministische Ausgabe
- Universell reproduzierbar

Der Hash wird zum zentralen Beweisidentifikator bei Einzelartefakten.

---

## Merkle-Aggregation

Für Mehrfachartefakt-Beweise:

h1, h2, ..., hn

Ein Merkle-Baum wird konstruiert.

Das resultierende:

merkle_root

Eigenschaften:

- Jede Blattänderung macht die Wurzel ungültig
- Effiziente Einschlussbeweise möglich
- Deterministische Mehrfachartefaktbindung

Der merkle_root wird zur kanonischen öffentlichen Referenz.

---

## Append-Only Ledger

Jeder Beweis wird in ein nur anhängbares Ledger eingefügt.

Jeder Eintrag enthält:

- proof_identifier  
- Metadaten  
- UTC-Zeitstempel  
- prev_hash  

Verkettungsregel:

entry_hash_i = SHA256(entry_data_i || entry_hash_(i-1))

Dies schafft strukturelle Unveränderlichkeit.

Das Ändern historischer Einträge zerstört die Kettenintegrität.

---

## Starker Bindungsmodus

VeriSeal erzwingt strukturelle Kohärenz zwischen:

- UX-Protokollen  
- Medienartefakten  
- Kanonischem JSON  
- Ledger-Eintrag  
- Optionalem PDF  
- Optionalem OTS-Anker  

Die Bindung verhindert selektive Modifikation oder Komponentenaustausch.

---

## PDF-Signatur (Optionale Schicht)

PDF ist nur zur Anzeige.

Wenn aktiviert:

- RSA-3072-Signatur  
- Dokumenten-Hash eingebettet  
- Unabhängig verifizierbar  

Wichtig:

Das PDF ist nicht die Quelle der Wahrheit.  
Der Ledger-Eintrag und das öffentliche JSON sind es.

---

## OpenTimestamps (Optional)

Wenn aktiviert:

- Der Beweishash wird an OTS übermittelt
- Eine .ots-Datei wird generiert
- Bitcoin-Bestätigung verankert die Existenz in der Zeit

OTS stärkt die zeitliche Verankerung, ist jedoch nicht für die strukturelle Validierung erforderlich.

---

## Vertrauensminimierung

Die Verifizierung erfordert Vertrauen nur in:

- SHA-256  
- Deterministische Berechnung  
- Öffentliche kryptografische Standards  

Nicht in:

- Proprietäre Server  
- Betreibererklärungen  
- Visuelle Darstellungen  

VeriSeal behauptet nicht die Wahrheit.  
Es garantiert strukturelle Integrität.