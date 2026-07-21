# Tasks: Initialize Local Git Repository

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md)

## Phase 1: Preflight

- [x] T001 Confirm Git is installed and `.git/` is empty in the project root.
- [x] T002 Confirm Git currently rejects the project as a work tree.

## Phase 2: User Story 1 - Valid Local Repository (Priority: P1)

**Goal**: Make the project a valid Git work tree on `main` without changing its files.

**Independent Test**: Run the five commands from `quickstart.md`.

- [x] T003 [US1] Initialize the existing project metadata with `git init -b main`.
- [x] T004 [US1] Verify work-tree recognition, branch, status, empty remotes and unborn HEAD.

## Phase 3: Validation

- [x] T005 Verify no working files were staged, committed, deleted or changed by initialization.

## Dependencies & Execution Order

T001 and T002 must pass before T003. T004 and T005 verify T003. No task is
parallelized because each step depends on the prior repository state.
