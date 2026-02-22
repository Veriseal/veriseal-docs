---
id: cryptography
title: Kryptographie
slug: /technical/cryptography
sidebar_position: 1
---

# Kryptographie

VeriSeal verwendet konservative, weit verbreitete Primitive, um Beweise unabhängig verifizierbar zu machen.

## Hashing (SHA-256)

SHA-256 Fingerabdrücke:
- Dateien (Video, Bild, PDFs),
- kanonische JSON-Nutzlasten,
- Bündel-Manifeste,
- Ledger-Einträge.

Hashes werden als Kleinbuchstaben-Hex dargestellt.

## Kanonisierung

Für strukturierte Daten (JSON/Nachrichten) wendet VeriSeal deterministische Kanonisierung an, sodass unabhängige Parteien denselben Digest reproduzieren können.

## Merkle-Verpflichtungen

Wenn mehrere Komponenten verpflichtet werden müssen (Medien-Hash, UX-Log-Hash, Metadaten-Hash), erstellt VeriSeal einen Merkle-Baum:
- Blätter sind Komponentendigesten,
- interne Knoten sind SHA-256(left || right),
- die Merkle-Wurzel ist der öffentliche Beweisidentifikator.

## Nur-anhängende Ledger-Verkettung

Jeder Eintrag enthält entry_hash, prev_hash und created_at_utc (UTC). Jede Änderung bricht die Kette.

## Signaturen (optional)

- PDF-Beweise können signiert werden (RSA-3072).
- JSON-Exporte können für die Offline-Verifizierung signiert werden.

PDF ist nur zur Darstellung; die Verifizierung muss immer gegen öffentliches JSON validiert werden.

## OpenTimestamps (optional)

OpenTimestamps verankert einen Digest extern und kann auf der Bitcoin-Blockchain VERIFIZIERT werden.

## Bedrohungsmodell (Zusammenfassung)

Mildert: nachträgliche Modifikation, Beweissubstitution, anfechtbare Zeitstempel, Interessenkonflikt der Plattform.  
Nicht im Umfang: kompromittiertes Erfassungsgerät, Malware vor der Erfassung, Zwang/Imitation ohne Identitätsflüsse.