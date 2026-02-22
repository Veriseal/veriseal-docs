---
id: verification
title: Verifizierung
---

﻿---
title: Verifizierung
sidebar_position: 3
---

# Verifizierung

Die Verifizierung ist deterministisch und erfordert kein Vertrauen in VeriSeal.

## Reihenfolge der Wahrheitsquellen

1) Ledger-Eintrag
2) Öffentliches JSON
3) PDF (nur zur Präsentation)

## Verfahren

1) Kanonisches JSON abrufen:
   - /public/verify/`{merkle_root}`/json

2) Hashes verifizieren:
   - SHA-256 für Artefakte (oder Bundle-ZIP) berechnen,
   - mit Hashes im JSON vergleichen.

3) Merkle-Root neu berechnen:
   - aus deklarierten Blättern und Regeln,
   - bestätigen, dass es mit merkle_root übereinstimmt.

4) Ledger-Verkettung verifizieren (wenn verfügbar):
   - Konsistenz von entry_hash und prev_hash validieren.

5) Signaturen verifizieren (falls vorhanden):
   - PDF-Signaturverifizierung,
   - optionale JSON-Signaturverifizierung.

6) OpenTimestamps verifizieren (falls vorhanden):
   - bestätigen, dass der gestempelte Digest dem merkle_root/Bundle-Hash entspricht,
   - aktualisieren/verifizieren und Zustand aufzeichnen.

## Was beizubehalten ist (regulierte Kontexte)

- abgerufenes öffentliches JSON,
- Artefakte (oder Bundle-ZIP),
- berechnete Hashes,
- Ausgaben der Signaturverifizierung,
- .ots-Datei und Verifizierungsausgabe (falls verwendet).