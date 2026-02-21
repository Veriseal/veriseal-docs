---
id: deployment-model
title: Deployment Model
sidebar_position: 4.2
---

# Deployment Model

## Reference Stack

Typical architecture may include:

- Application layer (e.g., FastAPI)
- Deterministic proof generation
- Append-only ledger database
- Canonical JSON output
- Optional timestamp anchoring
- TLS-secured gateway layer

The specific stack may evolve.

The deterministic proof model must remain stable.

---

## Sovereign Configurations

Institutions may require:

- Data residency guarantees
- Isolated infrastructure
- Private verification endpoints
- Internal governance controls

Verification logic must remain interoperable across deployments.

---

## Public Verification Separation

Verification endpoints can operate independently from:

- Authentication systems
- Business logic
- Data storage

This ensures long-term verifiability even under organizational change.
