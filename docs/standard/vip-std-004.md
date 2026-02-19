---
title: VIP-STD-003 - VeriSeal Signature Profile
sidebar_label: VIP-STD-003
---

# VIP-STD-003 - VeriSeal Signature Profile Specification

Version: 1.0
Status: Public Draft
Classification: Open Integrity Standard

---

## 1. Scope

This document defines the signature profile for the VeriSeal Integrity Protocol.

VIP-STD-003 specifies:

- Signature coverage requirements
- Permitted signature algorithms
- Deterministic verification rules
- Signature object structure
- Compliance constraints

This specification builds upon VIP-STD-001 and VIP-STD-002.

---

## 2. Signature Model Overview

Signatures are OPTIONAL in VIP-STD-001 but become formally defined in this profile.

A signature MUST cryptographically bind:

- The canonical proof object (VIP-STD-001)
- The proof hash
- Optionally the ledger entry (VIP-STD-002)

Signature coverage MUST be deterministic.

---

## 3. Signature Coverage Rules

The signature MUST be computed over:

SHA-256(canonical_proof_object)

The exact byte representation defined in VIP-STD-001 Appendix C MUST be used.

No reserialization is permitted during verification.

---

## 4. Signature Object Structure

If present, a signature object MUST include:

- signature_algorithm
- public_key
- signature_value

No additional fields are permitted in version 1.0.

---

## 5. Field Definitions

signature_algorithm
MUST be one of:

- Ed25519
- ECDSA-secp256k1
- RSA-3072

public_key
MUST be encoded in hexadecimal or base64, depending on algorithm specification.

signature_value
MUST represent the raw signature bytes encoded in hexadecimal.

---

## 6. Deterministic Verification

Verification MUST:

1. Recompute proof hash
2. Reconstruct canonical byte representation
3. Verify signature against provided public_key
4. Reject non-matching signatures

Signature verification MUST be deterministic.

---

## 7. Algorithm Requirements

## 7.1 Ed25519

- Deterministic by design
- 64-byte signature
- Public key 32 bytes

## 7.2 ECDSA-secp256k1

- Signature MUST be low-S normalized
- Deterministic RFC 6979 signing REQUIRED

## 7.3 RSA-3072

- Padding MUST use PKCS#1 v1.5 or PSS
- Minimum modulus size 3072 bits

---

## 8. Security Considerations

Implementations MUST protect against:

- Signature malleability
- Signature stripping attacks
- Key substitution attacks
- Weak randomness in ECDSA
- Replay attacks

If a signature is present and invalid, the proof MUST be considered invalid.

---

## 9. Compliance Requirements

To claim compliance with VIP-STD-003:

- Signature coverage MUST match Section 3
- Algorithm MUST be one of the permitted algorithms
- Verification MUST be deterministic
- Invalid signatures MUST cause rejection

Partial signature validation MUST NOT claim compliance.

---

## 10. Relationship to Other Standards

VIP-STD-003 extends:

- VIP-STD-001 (canonical proof integrity)
- VIP-STD-002 (ledger integrity)

Full compliance requires adherence to all applicable profiles.

---

## 11. Future Extensions

Future versions MAY introduce:

- Post-quantum signature algorithms
- Multi-signature support
- Threshold signatures
- Certificate chain integration
- Identity binding extensions

Backward compatibility SHOULD be maintained.

---

## 12. Conclusion

VIP-STD-003 defines the deterministic signature layer of VeriSeal.

It ensures:

- Cryptographic authenticity
- Deterministic verification
- Algorithm constraints
- Interoperable signature validation

It completes the cryptographic integrity stack of VeriSeal.
