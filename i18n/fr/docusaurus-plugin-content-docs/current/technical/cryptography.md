---
id: cryptography
title: Cryptography
slug: /technical/cryptography
sidebar_position: 1
---

# Cryptography

VeriSeal uses conservative, widely deployed primitives to make evidence independently verifiable.

## Hashing (SHA-256)

SHA-256 fingerprints:
- files (video, image, PDFs),
- canonical JSON payloads,
- bundle manifests,
- ledger entries.

Hashes are represented as lowercase hex.

## Canonicalization

For structured data (JSON/messages), VeriSeal applies deterministic canonicalization so independent parties can reproduce the same digest.

## Merkle commitments

When multiple components must be committed (media hash, UX log hash, metadata hash), VeriSeal builds a Merkle tree:
- leaves are component digests,
- internal nodes are SHA-256(left || right),
- the Merkle root is the public proof identifier.

## Append-only ledger chaining

Each entry includes entry_hash, prev_hash, and created_at_utc (UTC). Any modification breaks the chain.

## Signatures (optional)

- PDF evidence can be signed (RSA-3072).
- JSON exports can be signed for offline verification.

PDF is render-only; verification must always validate against public JSON.

## OpenTimestamps (optional)

OpenTimestamps anchors a digest externally and can become VERIFIED on the Bitcoin blockchain.

## Threat model (summary)

Mitigates: post-hoc modification, evidence substitution, contestable timestamps, platform conflict of interest.  
Not in scope: compromised capture device, malware before capture, coercion/impersonation without identity flows.
