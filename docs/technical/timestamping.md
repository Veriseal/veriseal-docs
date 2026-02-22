---
title: Timestamping
sidebar_position: 2
---

# Timestamping

VeriSeal supports:
1) internal UTC timestamps (operational ordering),
2) optional external anchoring (OpenTimestamps) for independence.

## Internal timestamps

Recorded in UTC for ledger entries and binding steps. Useful for audit trails, but not an external guarantee.

## OpenTimestamps anchoring

Workflow:
1) select a stable digest (Merkle root or bundle hash),
2) ots stamp -> creates .ots file,
3) ots upgrade -> collects attestations,
4) ots verify -> confirms when complete (VERIFIED).

Status language:
- PENDING: accepted by calendars, not yet on-chain,
- VERIFIED: anchored on Bitcoin (strongest assurance).

Best practice: stamp one stable digest per proof.

