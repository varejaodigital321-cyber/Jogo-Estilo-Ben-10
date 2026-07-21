# Feature Specification: Superpowers Governance

**Feature Branch**: `001-superpowers-governance`  
**Created**: 2026-07-20  
**Status**: Approved  
**Input**: User request to make obra/superpowers an automatic, fixed execution
discipline at project root while GitHub Spec Kit keeps control of what is done.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Receive governed execution automatically (Priority: P1)

As the project owner, I want every agent task to automatically apply the
relevant Superpowers discipline after satisfying the appropriate Spec Kit gate,
so I never need to activate a workflow skill manually.

**Why this priority**: This is the core behavior requested and controls every
future project change.

**Independent Test**: Read `AGENTS.md` and the skill policy; both must state
automatic, task-matched Superpowers activation and Spec Kit precedence.

**Acceptance Scenarios**:

1. **Given** a new project task, **When** an agent begins work,
   **Then** it must follow the Spec Kit lifecycle and invoke the applicable
   Superpowers skill without waiting for a manual request.
2. **Given** a Superpowers workflow that could conflict with a lifecycle gate,
   **When** the conflict is detected, **Then** the agent must stop and retain
   the Spec Kit decision authority.

---

### User Story 2 - Find the rule in every governance surface (Priority: P2)

As the project owner, I want the same policy recorded in root, agent, Spec Kit,
state and memory surfaces so the rule survives new sessions and tooling.

**Why this priority**: Repetition across authoritative surfaces prevents loss of
context or contradictory instructions.

**Independent Test**: Search the named documents and Mem0 for the paired
Spec Kit/Superpowers policy.

**Acceptance Scenarios**:

1. **Given** a developer opens a root governance file,
   **When** they read it, **Then** they can identify the two systems' distinct
   roles and their precedence.
2. **Given** a new Codex session,
   **When** Mem0 context is loaded, **Then** the execution discipline is
   available as a governance memory.

### Edge Cases

- If a required Superpowers skill is unavailable, the agent MUST report the
  missing dependency and must not claim that its workflow was applied.
- If a Superpowers skill requires Git or subagents that the environment lacks,
  the agent MUST record the limitation and use the safe applicable fallback
  without bypassing Spec Kit.
- A change to this policy requires an explicit owner request and a constitution
  amendment; it cannot be silently weakened by a task-level instruction.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `AGENTS.md` MUST define GitHub Spec Kit as the authority for what
  is done and obra/superpowers as the authority for how an authorized step is
  executed.
- **FR-002**: The project constitution MUST add a testable execution-discipline
  principle and document the conflict-resolution rule.
- **FR-003**: `.specify/skill-policy.yaml` MUST list every installed
  Superpowers skill requested by the owner as automatic and task-matched.
- **FR-004**: The root MUST contain a `SUPERPOWERS_GOVERNANCE.md` reference that
  links the two governance systems and names the activation rules.
- **FR-005**: `SPEC_KIT_GOVERNANCE.md`, `.specify/README.md`, `README.md` and
  `ESTADO_DO_PROJETO.md` MUST point to the same policy without claiming that
  `.specify/` is absent.
- **FR-006**: A Mem0 governance memory MUST preserve the policy with source
  metadata `governance`.
- **FR-007**: No document may authorize Superpowers to skip a Spec Kit gate or
  authorize Spec Kit implementation to ignore a matching Superpowers skill.

### Key Entities

- **Governance contract**: The normative instructions in `AGENTS.md` and the
  constitution.
- **Execution skill policy**: The automatic Superpowers activation map in
  `.specify/skill-policy.yaml`.
- **Reference surface**: A root, Spec Kit, state or memory document that repeats
  and links to the governance contract.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All seven named local governance/reference documents contain the
  same Spec Kit/Superpowers precedence statement or a link to its canonical
  source.
- **SC-002**: All fourteen installed Superpowers skills occur in the automatic
  policy map exactly once.
- **SC-003**: A search for stale text claiming `.specify/` is absent returns no
  result in active governance/reference documents.
- **SC-004**: One Mem0 memory tagged `source=governance` records the decision.

## Assumptions

- Superpowers is installed in the Codex discovery location and its skills remain
  available to future Codex sessions.
- This feature governs workflow documentation and memory only; it does not
  modify game code or external collaboration settings.
- Platform capability limitations can prevent a specific Superpowers mechanism
  but cannot justify silently ignoring the applicable workflow.
