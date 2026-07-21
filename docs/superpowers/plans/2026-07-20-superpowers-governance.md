# Superpowers Governance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> `superpowers:subagent-driven-development` when delegation is authorized, or
> `superpowers:executing-plans` to execute this plan task by task.

**Goal:** Make Spec Kit and Superpowers permanent, complementary governance for
this project.

**Architecture:** Keep the canonical operational contract in `AGENTS.md` and
the constitutional contract in `.specify/memory/constitution.md`. Synchronize
the automatic activation list through `.specify/skill-policy.yaml`, then repeat
the same concise policy in all root governance and memory-facing documents.

**Tech Stack:** Markdown, YAML, JSON and Mem0 metadata.

## Global Constraints

- GitHub Spec Kit defines what is authorized and when implementation may begin.
- obra/superpowers defines how an authorized step is performed.
- Neither system may be used to bypass the other.
- Superpowers skills activate by task fit; no manual activation is required.
- Implementation-specific Superpowers skills remain gated by the Spec Kit
  lifecycle and by platform capabilities.

## Files

- Modify: `AGENTS.md`
- Modify: `.specify/memory/constitution.md`
- Modify: `.specify/skill-policy.yaml`
- Create: `SUPERPOWERS_GOVERNANCE.md`
- Modify: `SPEC_KIT_GOVERNANCE.md`, `README.md`, `ESTADO_DO_PROJETO.md`
- Modify: `.specify/README.md`
- Create: an imported Mem0 governance memory

## Tasks

### Task 1: Establish canonical governance

- [ ] Amend the constitution and increment its minor version for a new
  execution-discipline principle.
- [ ] Add the complete two-layer operational contract to `AGENTS.md`.
- [ ] Verify that Spec Kit keeps authority over scope and approval.

### Task 2: Configure automatic skill selection

- [ ] Add an explicit `superpowers` section to `.specify/skill-policy.yaml`.
- [ ] List every required Superpowers skill and its activation boundary.
- [ ] Verify that no Superpowers skill is listed as deferred merely for
  convenience.

### Task 3: Synchronize reference surfaces

- [ ] Create `SUPERPOWERS_GOVERNANCE.md` at repository root.
- [ ] Update Spec Kit, project state and README documentation to remove stale
  statements and point to the canonical contract.
- [ ] Add a durable Mem0 record tagged `source=governance`.

### Task 4: Validate convergence

- [ ] Compare every modified surface against the feature specification.
- [ ] Validate YAML and JSON syntax.
- [ ] Search all governance documents for contradictions and report the result.
