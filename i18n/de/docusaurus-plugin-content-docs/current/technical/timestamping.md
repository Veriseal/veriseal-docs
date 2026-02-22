---
id: timestamping
title: Zeitstempelung
---

﻿---
title: Zeitstempelung
sidebar_position: 2
---

# Zeitstempelung

VeriSeal unterstützt:
1) interne UTC-Zeitstempel (betriebliche Reihenfolge),
2) optionale externe Verankerung (OpenTimestamps) für Unabhängigkeit.

## Interne Zeitstempel

In UTC für Hauptbucheinträge und verbindliche Schritte aufgezeichnet. Nützlich für Prüfpfade, aber keine externe Garantie.

## OpenTimestamps-Verankerung

Ablauf:
1) Auswahl eines stabilen Digests (Merkle-Wurzel oder Bündel-Hash),
2) ots stamp -> erstellt .ots-Datei,
3) ots upgrade -> sammelt Bestätigungen,
4) ots verify -> bestätigt bei Abschluss (VERIFIED).

Statussprache:
- PENDING: von Kalendern akzeptiert, noch nicht in der Blockchain,
- VERIFIED: auf Bitcoin verankert (stärkste Sicherheit).

Beste Praxis: Einen stabilen Digest pro Nachweis stempeln.