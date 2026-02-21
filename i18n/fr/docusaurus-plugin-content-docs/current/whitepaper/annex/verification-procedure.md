---
id: verification-procedure
title: Verification Procedure
---

﻿---
title: Independent Verification Procedure
sidebar_label: Verification Procedure
---

# Independent Verification Procedure

Verification of a proof requires:

1. The canonical JSON payload
2. The artifact (if applicable)
3. The verification endpoint

Verification steps:

1. Recompute SHA-256 of artifact
2. Compare digest with canonical JSON
3. Verify signature
4. Confirm ledger continuity (previous_entry_hash)
5. If anchored, verify external timestamp

Verification is reproducible and deterministic.
