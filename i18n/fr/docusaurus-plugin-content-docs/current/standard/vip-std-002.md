---
id: vip-std-002
title: VIP-STD-002 — Ledger Profile
sidebar_position: 4
---

# VIP-STD-002  
## Ledger Profile (Extension to VIP-STD-001)

---

# 1. Scope

This document defines the optional Ledger Profile of the VeriSeal Integrity Protocol (VIP).

It specifies the append-only recording structure for proof persistence.

This profile extends VIP-STD-001 but does not modify the core integrity model.

---

# 2. Relationship to VIP-STD-001

VIP-STD-002:

- MUST use proof objects compliant with VIP-STD-001  
- MUST NOT alter canonicalization or hash computation  
- MUST preserve deterministic verification  

The ledger layer records proofs; it does not redefine them.

---

# 3. Definitions

**Ledger Entry**  
A structured record containing a proof object and its chaining reference.

**Previous Hash (prev_hash)**  
The integrity hash of the preceding ledger entry.

**Chain Head**  
The most recent valid ledger entry in a sequence.

---

# 4. Ledger Entry Structure

A compliant ledger entry MUST follow:

```json
{
  "v": 1,
  "type": "LEDGER_ENTRY",
  "proof": { ...VIP-STD-001 compliant object... },
  "prev_hash": "<sha256-hex or null>",
  "entry_hash": "<sha256-hex>"
}
```

Where:

- `proof` MUST be a valid VIP-STD-001 proof object  
- `prev_hash` MUST reference the previous entry hash or be null for the first entry  
- `entry_hash` MUST be the SHA-256 hash of the canonicalized ledger entry excluding `entry_hash` itself  

---

# 5. Hash Computation Rules

5.1 Canonicalization  
Ledger entries MUST be canonicalized using VIP-STD-001 rules.

5.2 Entry Hash  
The `entry_hash` MUST be computed over:

```
{
  "v",
  "type",
  "proof",
  "prev_hash"
}
```

5.3 Determinism  
Two identical ledger entries MUST produce identical `entry_hash` values.

---

# 6. Append-Only Requirement

6.1 Immutability  
Ledger entries MUST NOT be modified after insertion.

6.2 Ordering  
Each entry MUST reference exactly one predecessor, except the genesis entry.

6.3 Genesis Entry  
The first ledger entry MUST set `prev_hash` to null.

---

# 7. Chain Validation

A compliant ledger validation process MUST:

1. Validate each embedded proof per VIP-STD-001  
2. Recompute each `entry_hash`  
3. Verify `prev_hash` chaining consistency  
4. Confirm absence of broken links  

A chain is VALID if all entries satisfy these conditions.

---

# 8. Storage Independence

The Ledger Profile:

- Does not mandate storage backend
- Does not mandate distributed consensus
- Does not require blockchain implementation
- Does not define replication rules

It defines structural chaining only.

---

# 9. Conformance

A system claiming compliance with VIP-STD-002 MUST:

1. Accept VIP-STD-001 proof objects  
2. Implement append-only ledger structure  
3. Enforce hash chaining integrity  
4. Provide deterministic chain validation  

Ledger implementation details MAY vary provided structural determinism is preserved.

---

# 10. Security Considerations

Security of this profile depends on:

- Integrity of the storage environment  
- Protection against unauthorized modification  
- Correct canonicalization  

This profile does not prevent deletion attacks unless combined with anchoring mechanisms defined in VIP-STD-004.

---

# 11. Conclusion

VIP-STD-002 defines the structural persistence layer of the VeriSeal Integrity Protocol.

It ensures append-only chaining and long-term proof consistency without altering the core integrity model.
