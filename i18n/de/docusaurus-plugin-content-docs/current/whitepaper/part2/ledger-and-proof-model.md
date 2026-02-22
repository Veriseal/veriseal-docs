---
title: Hauptbuch- und Nachweismodell
sidebar_label: 2.2 Hauptbuch- und Nachweismodell
slug: /whitepaper/part2/ledger-and-proof-model
sidebar_position: 2.2
---

# 2.2 Hauptbuch- und Nachweismodell

Das Hauptbuch ist das strukturelle Rückgrat von VeriSeal.

Es ist keine Blockchain.
Es ist ein deterministisches, nur anhängbares Integritätsjournal.

---

## Struktur des Nachweiseintrags

Jeder Nachweiseintrag enthält:

- proof_identifier (Hash oder merkle_root)
- Metadatenreferenz
- Zeitstempel (UTC)
- vorheriger Eintrag-Hash

Dies schafft Kontinuität in der Kette.

---

## Prinzip der Unveränderlichkeit

Das Hauptbuch ist:

- Nur anhängbar  
- Hash-verkettet  
- Deterministisch  

Jede historische Änderung macht die fortlaufende Kontinuität ungültig.

---

## Stabilität des öffentlichen Identifikators

Der Nachweisidentifikator:

`{merkle_root}`

Funktioniert als:

- Permanente öffentliche Referenz
- Integritätsanker über Systeme hinweg
- Audit-stabiler Identifikator

Er muss über die Zeit stabil bleiben.

---

## Institutioneller Vorteil

Im Gegensatz zu blockchain-basierten Systemen:

- Kein probabilistischer Konsens
- Keine Gabelinstabilität
- Keine Abhängigkeit von externen Minern

Integrität ist mathematisch.
Nicht politisch.