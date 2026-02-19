---
title: Threat Model & Adversarial Analysis
sidebar_label: Threat Model (Annex)
---

# Threat Model & Adversarial Analysis

## 1. Purpose and Scope

This annex provides a security-oriented analysis of the VeriSeal proof infrastructure under adversarial conditions.

It defines:

- Threat actors and capabilities
- Trust boundaries
- Attack surfaces
- Security assumptions
- Detection and mitigation mechanisms
- Residual risks and governance requirements

This annex is written for institutional stakeholders (CISO, Risk, Audit, Compliance).

---

## 2. System Assets to Protect

VeriSeal is designed to protect **integrity and verifiability** of evidence artifacts and proof records.

Primary assets:

1. **Artifact Integrity**
   The sealed artifact must remain verifiable and tamper-evident over time.

2. **Proof Object Integrity**
   Proof records (canonical JSON) must not be alterable without detection.

3. **Ledger Continuity**
   Append-only chain must remain structurally immutable and chronologically consistent.

4. **Verification Independence**
   Third parties must be able to verify proofs without operator trust.

5. **Timestamp Integrity (optional external anchoring)**
   When external anchoring exists, the anchor must strengthen time certainty.

6. **Key Integrity (signing keys)**
   Private keys used for signing must remain confidential and governed.

---

## 3. Threat Actors

### 3.1 External Adversary
Capabilities:
- Network-level interception attempts
- Public endpoint probing
- Artifact substitution attempts
- Replay attempts for capture flows (when applicable)

Constraints:
- No direct access to signing keys or internal storage (assumed)

### 3.2 Insider Threat (Operator or Privileged Admin)
Capabilities:
- Potential access to infrastructure
- Attempts to alter records
- Attempts to delete or selectively hide evidence
- Attempts to manipulate PDF or presentation outputs

### 3.3 Malicious Evidence Submitter
Capabilities:
- Submit false or misleading content
- Submit manipulated artifacts
- Attempt to exploit workflow ambiguity
- Attempt repudiation after sealing ("I never sent this")

### 3.4 Compromised Client Device
Capabilities:
- Malware modifies artifact before sealing
- Credential compromise
- Intercepts or alters local data before upload

### 3.5 Supply Chain / Dependency Adversary
Capabilities:
- Dependency compromise
- Build pipeline compromise
- Runtime injection attempts

---

## 4. Trust Boundaries

VeriSeal enforces explicit trust boundaries:

Inside VeriSeal trust boundary:
- Hash computation
- Canonical proof object generation
- Ledger append operation
- Signature generation (controlled key domain)
- Optional anchor submission

Outside trust boundary:
- Artifact creation tools
- User device security
- Semantic truth of content
- Legal interpretation
- Human intent and context

Key principle: **VeriSeal secures structure, not meaning.**

---

## 5. Attack Surface Overview

Primary attack surfaces:

1. **Input artifact ingestion** (upload / payload generation)
2. **Proof generation pipeline** (hashing + canonicalization + signing)
3. **Ledger storage** (append-only chain integrity)
4. **Verification endpoints** (public JSON, PDF render, HTML verify page)
5. **Key management** (private key confidentiality and usage policy)
6. **Build/CI and dependency chain** (supply chain integrity)

---

## 6. Threat Scenarios and Mitigations

### 6.1 Post-Sealing Artifact Tampering
Attack: Artifact modified after sealing.

Detection:
- Recomputed SHA-256 digest differs.

Mitigation:
- Deterministic hashing
- Proof validation requires recomputation

Residual risk:
- None for detection (integrity always detects change)
- Semantic disputes remain possible

---

### 6.2 Proof Object Tampering (JSON)
Attack: Alter proof JSON fields (timestamps, identifiers, flags).

Detection:
- Signature verification fails
- Hash mismatch in canonical recomputation

Mitigation:
- Canonical JSON as source-of-truth
- Signature over canonical payload

Residual risk:
- If signing key is compromised (see key compromise scenario)

---

### 6.3 Ledger Mutation / Deletion
Attack: Delete an entry or rewrite historical chain.

Detection:
- Chain discontinuity (previous_entry_hash mismatch)
- entry_hash recomputation mismatch

Mitigation:
- Append-only architecture
- Chain hash dependency
- Regular external anchoring recommended for high assurance

Residual risk:
- Storage-level attacks can delete entire ledger if governance is weak
  (availability risk; integrity detection remains, but evidence may be missing)

---

### 6.4 Selective Evidence Suppression ("Evidence Hiding")
Attack: Operator hides or refuses to serve a proof endpoint.

Detection:
- Public reference exists but endpoint not responding
- External copies of JSON prove prior existence

Mitigation:
- Encourage institutional archiving of proof bundles
- External anchoring strengthens existence claims
- Governance policies for availability

Residual risk:
- Availability remains operationally governed

---

### 6.5 Presentation Layer Manipulation (PDF/HTML)
Attack: Modify PDF rendering or HTML view to show false status.

Detection:
- Canonical JSON remains source-of-truth
- Verifier recomputes hashes and validates signature

Mitigation:
- Render-only rule
- Verification logic never depends on presentation output

Residual risk:
- Social engineering risk remains (users trusting visuals without verifying)

---

### 6.6 Replay Attacks (Capture-Based Proofs)
Attack: Replay a prior video/audio capture to fake liveness.

Detection/Mitigation (when capture flows exist):
- Challenge-response binding (dynamic prompts)
- Runtime event log hashing
- Media binding to runtime payload

Residual risk:
- Dependent on capture workflow quality
- Not applicable to static artifact sealing use cases

---

### 6.7 Man-in-the-Middle / Transport Layer Attack
Attack: Intercept or alter traffic during upload or verification.

Mitigation:
- TLS enforced (HTTPS)
- Hash recomputation and signature validation prevents silent tampering

Residual risk:
- Credential theft is outside cryptographic model
- Network downgrade attacks mitigated via strict HTTPS and HSTS (recommended)

---

### 6.8 Private Key Compromise
Attack: Signing key stolen.

Impact:
- Attacker can issue forged proofs that appear valid
- Historical proofs remain verifiable but trust in signer is impacted

Mitigation:
- HSM / KMS-backed signing
- Key rotation policy
- Audit logs for signing operations
- Separation of duties (dual control)

Residual risk:
- Highest-impact scenario; governance is mandatory

---

### 6.9 Hash Function Weakening (Cryptographic Breakthrough)
Attack: Practical collision or second preimage against SHA-256.

Impact:
- Integrity assumptions degrade

Mitigation:
- Algorithm agility (hash_version field)
- Ability to re-anchor proofs using stronger primitives
- Support for dual-hash strategies in future versions

Residual risk:
- Long-term cryptographic evolution risk exists for all systems

---

### 6.10 Supply Chain Compromise
Attack: Build dependencies inject malicious logic.

Mitigation:
- Pin dependencies
- Reproducible builds
- Code signing
- SBOM generation
- CI integrity controls

Residual risk:
- Requires disciplined software governance

---

## 7. Security Assumptions

VeriSeal security assumptions:

- SHA-256 remains secure (no feasible collisions)
- Signature scheme remains secure (no feasible forgery without private key)
- Canonical serialization is deterministic and controlled
- Append-only enforcement is operationally protected
- Private keys are protected by institutional key management

---

## 8. Security Guarantees (What VeriSeal Actually Guarantees)

VeriSeal guarantees:

- Detection of any post-sealing artifact modification
- Deterministic verification reproducibility
- Structural integrity and chain continuity (if ledger available)
- Proof object tamper-evidence via signature
- Optional external time anchoring reinforcement

VeriSeal does not guarantee:

- Truth of content
- Identity legitimacy by default
- Protection against compromised client devices
- Availability of proof endpoints without governance

---

## 9. Residual Risk and Governance Requirements

VeriSeal is strongest when governance enforces:

- Key management policy (HSM/KMS, rotation, audit)
- Availability policy (archival bundles, redundancy)
- Role segregation (sealing vs verification vs administration)
- Incident response procedures
- External anchoring policy for high assurance use cases

Without governance, integrity remains detectable, but operational resilience may degrade.

---

## 10. Institutional Security Posture Summary

VeriSeal is designed as:

- A deterministic integrity protocol
- An audit-compatible evidence layer
- A system minimizing trust dependency
- A tamper-evident ledger + proof object model

It provides verifiable integrity guarantees under adversarial conditions, provided that key governance and operational controls are enforced.

---

## 11. Risk Classification Matrix

This section formalizes threat severity according to impact and likelihood.

Risk classification model:

- Likelihood: Low / Medium / High
- Impact: Moderate / Significant / Critical
- Residual Risk: After mitigation controls
- Risk Owner: Governance responsibility domain

| Threat Scenario | Likelihood | Impact | Mitigation Strength | Residual Risk | Risk Owner |
|-----------------|------------|--------|--------------------|---------------|------------|
| Artifact tampering post-seal | Medium | Significant | Cryptographic detection | Low | Verification layer |
| Proof JSON alteration | Low | Significant | Signature + canonicalization | Low | Cryptographic layer |
| Ledger mutation | Low | Critical | Hash chaining + detection | Low | Infrastructure governance |
| Evidence suppression | Medium | Significant | Archival + anchoring | Medium | Operational governance |
| Presentation manipulation | Medium | Moderate | JSON source-of-truth | Low | Verification discipline |
| Private key compromise | Low | Critical | HSM/KMS + rotation | Medium | Key governance |
| Hash algorithm weakening | Very Low | Critical | Algorithm agility | Low | Cryptographic governance |
| Supply chain compromise | Medium | Significant | CI controls + SBOM | Medium | DevSecOps governance |

Risk posture summary:

- Structural integrity risks are strongly mitigated.
- Key compromise remains highest-impact scenario.
- Governance maturity directly influences residual risk.

---

## 12. Governance & Role Segregation Model

VeriSeal security assumes institutional separation of duties.

### 12.1 Functional Roles

**Sealing Operator**
- Initiates proof generation.
- Cannot modify historical ledger entries.

**Verification Authority**
- Performs independent validation.
- Has no access to signing keys.

**Key Custodian**
- Manages signing keys.
- Operates under dual control policy.

**Infrastructure Administrator**
- Manages system availability.
- Cannot alter signed proof payloads.

**Audit Function**
- Reviews logs and chain continuity.
- Independent from operations.

---

### 12.2 RACI Overview

| Function | Seal | Verify | Sign | Maintain | Audit |
|----------|------|--------|------|----------|-------|
| Sealing Operator | R | C | - | - | - |
| Verification Authority | - | R | - | - | C |
| Key Custodian | - | - | R | - | C |
| Infrastructure Admin | - | - | - | R | C |
| Audit | - | C | C | C | R |

R = Responsible
C = Control / Oversight

---

### 12.3 Governance Principle

Integrity is enforced by cryptography.
Trust is enforced by governance separation.

Cryptographic guarantees reduce reliance on human trust,
but institutional governance ensures resilience.

---

## 13. Incident Response & Key Compromise Procedure

This section defines minimum institutional response posture.

### 13.1 Key Compromise Scenario

If signing key compromise is suspected:

1. Immediate key revocation.
2. Stop new proof issuance.
3. Generate new signing key pair.
4. Publish public incident notice.
5. Re-anchor system state (if applicable).
6. Conduct forensic audit.

Historical proofs remain structurally verifiable.
Trust domain shifts to key validity timeline.

---

### 13.2 Proof Integrity Incident

If ledger corruption is detected:

- Recompute chain continuity.
- Identify divergence point.
- Restore from validated backup.
- Publish integrity statement.

---

### 13.3 Public Transparency Principle

For institutional deployments:

- Incident disclosure policy required.
- Timestamped incident logs recommended.
- Independent audit advisable for high assurance domains.

---

### 13.4 Long-Term Cryptographic Evolution

If hash or signature primitives weaken:

- Introduce versioned hash field.
- Re-anchor existing proofs.
- Support dual-hash strategy during migration.

Algorithm agility must be built into governance roadmap.

