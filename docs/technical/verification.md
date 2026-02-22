---
title: Verification
sidebar_position: 3
---

# Verification

Verification is deterministic and does not rely on trusting VeriSeal.

## Source of truth order

1) Ledger entry
2) Public JSON
3) PDF (presentation only)

## Procedure

1) Fetch canonical JSON:
   - /public/verify/`{merkle_root}`/json

2) Verify hashes:
   - compute SHA-256 for artifacts (or bundle ZIP),
   - compare to hashes in JSON.

3) Recompute Merkle root:
   - from declared leaves and rules,
   - confirm it matches merkle_root.

4) Verify ledger chaining (when available):
   - validate entry_hash and prev_hash consistency.

5) Verify signatures (if present):
   - PDF signature verification,
   - optional JSON signature verification.

6) Verify OpenTimestamps (if present):
   - confirm stamped digest equals merkle_root/bundle hash,
   - upgrade/verify and record state.

## What to retain (regulated contexts)

- fetched public JSON,
- artifacts (or bundle ZIP),
- computed hashes,
- signature verification outputs,
- .ots file and verification output (if used).

