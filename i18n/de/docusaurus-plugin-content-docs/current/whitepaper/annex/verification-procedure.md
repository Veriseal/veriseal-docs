---
id: verification-procedure
title: Verifizierungsverfahren
---

﻿---
title: Unabhängiges Verifizierungsverfahren
sidebar_label: Verifizierungsverfahren
---

# Unabhängiges Verifizierungsverfahren

Die Verifizierung eines Nachweises erfordert:

1. Das kanonische JSON-Payload
2. Das Artefakt (falls zutreffend)
3. Den Verifizierungsendpunkt

Verifizierungsschritte:

1. SHA-256 des Artefakts neu berechnen
2. Digest mit kanonischem JSON vergleichen
3. Signatur verifizieren
4. Kontinuität des Ledgers bestätigen (previous_entry_hash)
5. Falls verankert, externen Zeitstempel verifizieren

Die Verifizierung ist reproduzierbar und deterministisch.