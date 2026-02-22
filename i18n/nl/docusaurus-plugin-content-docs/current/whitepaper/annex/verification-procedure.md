---
id: verification-procedure
title: Verificatieprocedure
---

﻿---
title: Onafhankelijke Verificatieprocedure
sidebar_label: Verificatieprocedure
---

# Onafhankelijke Verificatieprocedure

Verificatie van een bewijs vereist:

1. De canonieke JSON-payload
2. Het artefact (indien van toepassing)
3. Het verificatie-eindpunt

Verificatiestappen:

1. Herbereken SHA-256 van het artefact
2. Vergelijk digest met canonieke JSON
3. Verifieer handtekening
4. Bevestig continuïteit van het grootboek (previous_entry_hash)
5. Indien verankerd, verifieer externe tijdstempel

Verificatie is reproduceerbaar en deterministisch.