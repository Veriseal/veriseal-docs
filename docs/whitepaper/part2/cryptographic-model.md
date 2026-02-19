---
id: cryptographic-model
title: Cryptographic and Proof Architecture
sidebar_position: 2.1
---

# 2.1 Cryptographic and Proof Architecture

VeriSeal relies exclusively on conservative, battle-tested cryptographic primitives.

No experimental consensus layer.
No proprietary hash algorithm.
No opaque cryptographic construction.

The model is deterministic, reproducible, and institutionally defensible.

---

## Design Objectives

The cryptographic layer must ensure:

- Structural integrity  
- Deterministic reproducibility  
- Long-term auditability  
- External verifiability  
- Optional decentralized timestamp anchoring  

---

## Canonicalization

Raw input data must first be transformed into a deterministic representation.

Let:

E = raw evidence  
C(E) = canonical representation  

Canonicalization guarantees:

- Stable JSON encoding  
- Deterministic field ordering  
- UTF-8 normalization  
- No ambiguity in whitespace  

The canonical payload:

P = C(E)

---

## Hashing

Primary integrity primitive:

H = SHA-256(P)

Properties:

- Collision resistance (current cryptographic assumptions)
- Deterministic output
- Universally reproducible

The hash becomes the core proof identifier when single-artifact.

---

## Merkle Aggregation

For multi-artifact proofs:

h1, h2, ..., hn

A Merkle tree is constructed.

The resulting:

merkle_root

Properties:

- Any leaf modification invalidates the root
- Efficient inclusion proofs possible
- Deterministic multi-artifact binding

The merkle_root becomes the canonical public reference.

---

## Append-Only Ledger

Each proof is inserted into an append-only ledger.

Each entry contains:

- proof_identifier  
- metadata  
- UTC timestamp  
- prev_hash  

Chaining rule:

entry_hash_i = SHA256(entry_data_i || entry_hash_(i-1))

This creates structural immutability.

Altering historical entries breaks chain integrity.

---

## Strong Binding Mode

VeriSeal enforces structural coherence between:

- UX logs  
- Media artifacts  
- Canonical JSON  
- Ledger entry  
- Optional PDF  
- Optional OTS anchor  

Binding prevents selective modification or component substitution.

---

## PDF Signature (Optional Layer)

PDF is render-only.

When enabled:

- RSA-3072 signature  
- Document hash embedded  
- Independently verifiable  

Important:

The PDF is not the source of truth.  
The ledger entry and public JSON are.

---

## OpenTimestamps (Optional)

When enabled:

- The proof hash is submitted to OTS
- A .ots file is generated
- Bitcoin confirmation anchors existence in time

OTS strengthens temporal anchoring but is not required for structural validation.

---

## Trust Minimization

Verification requires trust only in:

- SHA-256  
- Deterministic computation  
- Public cryptographic standards  

Not in:

- Proprietary servers  
- Operator statements  
- Visual representations  

VeriSeal does not assert truth.  
It guarantees structural integrity.
