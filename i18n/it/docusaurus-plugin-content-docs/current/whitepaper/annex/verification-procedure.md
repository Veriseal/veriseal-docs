---
id: verification-procedure
title: Procedura di Verifica
---

﻿---
title: Procedura di Verifica Indipendente
sidebar_label: Procedura di Verifica
---

# Procedura di Verifica Indipendente

La verifica di una prova richiede:

1. Il payload JSON canonico
2. L'artifact (se applicabile)
3. Il punto di verifica

Passaggi di verifica:

1. Ricalcolare SHA-256 dell'artifact
2. Confrontare il digest con il JSON canonico
3. Verificare la firma
4. Confermare la continuità del registro (previous_entry_hash)
5. Se ancorato, verificare il timestamp esterno

La verifica è riproducibile e deterministica.