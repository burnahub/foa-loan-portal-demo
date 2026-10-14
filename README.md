# foa-loan-portal-demo

Demo scan target for the FoA Architect Agent.

This repository is intentionally flawed demo material. `infra/loan-portal-stack.ts`
provisions a single-availability-zone stack that contradicts the tier-0, 99.99%
multi-AZ availability intent described in `HLD.md`. The design-review agent reads
this repository, flags the intent-vs-infrastructure mismatch, and proposes a
remediation pull request that moves the workload to multiple AZs with failover
enabled.
