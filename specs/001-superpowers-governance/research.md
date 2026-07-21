# Research: Superpowers Governance

## Decision: Two complementary governance layers

**Rationale:** The owner explicitly separates outcome governance from execution
discipline. Making one replace the other would contradict that request.

**Alternatives considered:** A single merged policy, rejected because it would
blur the authority that approves scope and the workflow that performs it.

## Decision: Automatic selection, capability-aware execution

**Rationale:** Skills must be assessed automatically by task fit. Worktree and
subagent actions depend on platform support and, where required, consent.

**Alternatives considered:** Mark every Superpowers skill unconditional at every
step, rejected because it would force unavailable tools and conflict with the
existing collaboration policy.

## Decision: Mem0 as a mirrored governance record

**Rationale:** A remote memory is required to carry the rule across sessions;
repository files remain the auditable local source of truth.

**Alternatives considered:** Storing the policy only in Mem0, rejected because
the project must be understandable and enforceable without external state.
