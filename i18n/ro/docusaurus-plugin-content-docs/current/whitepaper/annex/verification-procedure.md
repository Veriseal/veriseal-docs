---
id: verification-procedure
title: Procedura de Verificare
---

﻿---
title: Procedura de Verificare Independentă
sidebar_label: Procedura de Verificare
---

# Procedura de Verificare Independentă

Verificarea unei dovezi necesită:

1. Payload-ul JSON canonic
2. Artefactul (dacă este aplicabil)
3. Endpoint-ul de verificare

Pașii de verificare:

1. Recalcularea SHA-256 a artefactului
2. Compararea digestei cu JSON-ul canonic
3. Verificarea semnăturii
4. Confirmarea continuității registrului (previous_entry_hash)
5. Dacă este ancorat, verificarea marcajului temporal extern

Verificarea este reproductibilă și deterministă.