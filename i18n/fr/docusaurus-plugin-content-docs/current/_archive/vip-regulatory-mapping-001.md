---
title: VIP-REG-001 - VeriSeal Regulatory Mapping
sidebar_label: VIP-REG-001
---

# VIP-REG-001 - VeriSeal Regulatory Mapping

Version: 1.0
Status: Informational
Classification: Regulatory Positioning

---

## 1. Introduction

This document provides a non-binding regulatory mapping of the VeriSeal Integrity Framework against selected European regulatory instruments.

It is intended for:

- Regulatory discussions
- Institutional presentations
- Compliance architecture analysis
- Integration planning

This document does NOT constitute legal advice.

---

## 2. Scope of Mapping

The mapping references:

- eIDAS Regulation (EU) No 910/2014
- eIDAS 2.0 framework evolution
- ISO/IEC 27001
- ISO/IEC 27002
- NIS2 Directive
- ETSI standards for electronic signatures and timestamping

This mapping focuses on technical alignment, not certification status.

---

## 3. eIDAS Mapping

## 3.1 Electronic Evidence Integrity

VIP-STD-001 ensures:

- Deterministic integrity
- Tamper detection
- Structural immutability

This aligns with:

- Article 41 (Integrity of electronic documents)
- Electronic evidence preservation principles

VeriSeal does NOT provide:

- Qualified electronic signature status
- Qualified trust service provider status

---

## 3.2 Electronic Signatures

VIP-STD-003 provides:

- Cryptographic authenticity
- Deterministic verification

However:

- Identity verification is outside scope
- Qualified signature certification is not included
- Certificate trust chain validation is not defined in current version

---

## 3.3 Timestamping

VIP-STD-004 provides:

- External temporal anchoring
- Public verifiability
- Deterministic anchor hash binding

This aligns conceptually with:

- ETSI EN 319 421 (Time-Stamping Policy and Security Requirements)

It does NOT claim qualified timestamp authority status.

---

## 4. ISO/IEC 27001 Alignment

The framework contributes to:

- A.8 - Asset Integrity
- A.12 - Logging and Monitoring
- A.14 - System Integrity Controls
- A.18 - Compliance Evidence Preservation

The framework itself is not an ISMS.

It may serve as a technical control component within an ISMS.

---

## 5. NIS2 Directive Alignment

VIP-STD-002 and VIP-STD-004 contribute to:

- Incident traceability
- Evidence preservation
- Deterministic event integrity

However, NIS2 requires:

- Organizational governance
- Risk management procedures
- Incident reporting frameworks

These are external to the protocol.

---

## 6. Sovereignty Positioning

The framework is:

- Infrastructure-neutral
- Vendor-neutral
- Cryptographically deterministic
- Openly verifiable

It does not require:

- Foreign cloud dependency
- Proprietary validation services
- Closed verification infrastructure

This supports digital sovereignty objectives.

---

## 7. Compliance Boundaries

The VeriSeal Integrity Framework:

- Provides technical integrity guarantees
- Does NOT provide legal certification
- Does NOT provide identity assurance
- Does NOT replace trust service providers

It may complement regulated trust services.

---

## 8. Regulatory Strategy Implications

The framework may be positioned as:

- Cryptographic evidence infrastructure
- Integrity layer for regulated systems
- Audit-supporting infrastructure
- Complementary to qualified trust services

It is NOT positioned as a replacement for:

- Qualified Electronic Signature Providers
- Qualified Timestamp Authorities
- National PKI infrastructures

---

## 9. Future Regulatory Alignment

Future extensions MAY include:

- Qualified timestamp profile
- eIDAS 2.0 wallet integration
- Identity binding profile
- ETSI conformity alignment
- Certification support profile

---

## 10. Conclusion

The VeriSeal Integrity Framework aligns technically with European regulatory integrity principles.

It provides:

- Deterministic tamper detection
- Cryptographic structural integrity
- External temporal corroboration
- Modular compliance integration

Regulatory certification requires additional organizational, legal, and operational layers.
