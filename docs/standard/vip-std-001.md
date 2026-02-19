---
id: vip-std-001
title: VIP-STD-001 — Core Integrity Standard
sidebar_position: 3
---

# VIP-STD-001  
## Core Integrity Standard

---

# 1. Scope

This document defines the mandatory core integrity model of the VeriSeal Integrity Protocol (VIP).

It specifies the deterministic rules for:

- Data canonicalization
- Hash computation
- Proof object formation
- Deterministic verification

This standard does not define ledger behavior, digital signatures, or anchoring mechanisms.  
Such elements are specified in separate extension profiles.

---

# 2. Normative Language

The key words:

- MUST
- MUST NOT
- SHOULD
- MAY

are to be interpreted as described in RFC 2119.

---

# 3. Definitions

**Canonical Data**  
A normalized byte representation of structured input data.

**Integrity Hash**  
A SHA-256 digest computed over canonicalized data.

**Proof Object**  
A structured JSON object containing canonicalized data and its integrity hash.

**Verification Event**  
The deterministic recomputation of the integrity hash from canonical data.

---

# 4. Canonicalization Rules

4.1 Data Format  
Input data MUST be structured JSON.

4.2 Field Ordering  
All object keys MUST be lexicographically ordered.

4.3 Whitespace  
Whitespace MUST be removed except where required by JSON syntax.

4.4 Encoding  
UTF-8 encoding MUST be used.

4.5 Determinism  
Canonicalization MUST produce identical byte output for identical logical input.

---

# 5. Hashing Algorithm

5.1 Algorithm  
The integrity hash MUST use SHA-256.

5.2 Input  
The hash MUST be computed over the canonicalized byte sequence.

5.3 Output  
The hash MUST be encoded as lowercase hexadecimal.

---

# 6. Proof Object Structure

A compliant proof object MUST include:

```json
{
  "v": 1,
  "type": "PROOF",
  "data": { ... },
  "hash": "<sha256-hex>"
}
```

Where:

- `v` = protocol version  
- `type` = fixed string "PROOF"  
- `data` = canonicalizable JSON payload  
- `hash` = SHA-256 digest of canonicalized `data`

Additional fields MUST NOT alter canonicalization of `data`.

---

# 7. Deterministic Verification

Verification MUST follow these steps:

1. Extract `data`
2. Canonicalize `data`
3. Compute SHA-256 hash
4. Compare computed hash to stored `hash`
5. Return VALID if equal; INVALID otherwise

Verification MUST NOT depend on:

- External state
- Network access
- Ledger presence
- Signature presence
- Anchoring status

Core verification is self-contained.

---

# 8. Independence Principle

VIP-STD-001 defines integrity only.

It does not guarantee:

- Data authenticity
- Identity verification
- Legal admissibility
- Timestamp validity

It guarantees deterministic integrity under defined cryptographic assumptions.

---

# 9. Backward Compatibility

Future minor revisions MUST preserve:

- Canonicalization determinism
- SHA-256 compatibility
- Verification reproducibility

Breaking changes require version increment.

---

# 10. Conformance

A system is compliant with VIP-STD-001 if it:

1. Implements canonicalization per Section 4  
2. Computes SHA-256 per Section 5  
3. Produces proof objects per Section 6  
4. Verifies deterministically per Section 7  

Compliance with extension profiles is optional.

---

# 11. Security Considerations

The security of VIP-STD-001 depends on:

- The cryptographic strength of SHA-256
- Correct canonicalization implementation
- Protection against hash collision vulnerabilities

Threat assumptions are defined in VIP-THREAT-001.

---

# 12. Conclusion

VIP-STD-001 defines the mandatory core integrity model of the VeriSeal Integrity Protocol.

It provides deterministic, reproducible, and implementation-agnostic digital integrity verification.
