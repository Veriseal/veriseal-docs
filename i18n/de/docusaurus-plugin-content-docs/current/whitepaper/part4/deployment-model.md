File: deployment-model.md

---
id: deployment-model
title: Bereitstellungsmodell
sidebar_position: 4.2
---

# Bereitstellungsmodell

## Referenz-Stack

Typische Architektur kann umfassen:

- Anwendungsschicht (z.B. FastAPI)
- Deterministische Beweiserzeugung
- Nur-anhängende Ledger-Datenbank
- Kanonische JSON-Ausgabe
- Optionale Zeitstempel-Verankerung
- TLS-gesicherte Gateway-Schicht

Der spezifische Stack kann sich weiterentwickeln.

Das deterministische Beweismodell muss stabil bleiben.

---

## Souveräne Konfigurationen

Institutionen können benötigen:

- Garantien zur Datenresidenz
- Isolierte Infrastruktur
- Private Verifikationsendpunkte
- Interne Governance-Kontrollen

Die Verifikationslogik muss über Bereitstellungen hinweg interoperabel bleiben.

---

## Trennung der öffentlichen Verifikation

Verifikationsendpunkte können unabhängig von folgenden betrieben werden:

- Authentifizierungssystemen
- Geschäftlogik
- Datenspeicherung

Dies gewährleistet langfristige Verifizierbarkeit auch bei organisatorischen Veränderungen.