# Tasks: Graphify Artifact Hygiene

**Input**: [spec.md](spec.md), [plan.md](plan.md)

## Phase 1: Hygiene

- [x] T001 [US1] Add `graphify-out/` allowlist rules to `.gitignore`; ignore cache, backups, metadata and HTML while preserving `graph.json`, `GRAPH_REPORT.md` and `manifest.json`.
- [x] T002 [US1] Remove tracked generated Graphify entries from index and re-add only the three allowlisted shared artifacts.
- [x] T003 [US1] Create `specs/006-graphify-artifact-hygiene/quickstart.md` with repeatable Git validation commands.

## Phase 2: Validation

- [x] T004 [US1] Validate ignore behavior, tracked Graphify inventory and scope of staged deletions.
- [x] T005 [US2] Run the existing production build to confirm hygiene changes did not affect the game.
- [x] T006 [US2] Run final consistency and diff checks; record results in this task list.

## Dependencies

- T001 before T002 and T004.
- T002 and T003 before T004.
- T004 before T006.
- T005 before T006.

## Results

- 2026-07-22: `git check-ignore` accepted cache, dated backup and HTML paths; it rejected all three shared artifacts.
- 2026-07-22: `git ls-files` reports three Graphify artifacts and zero cache paths after `graphify update .`.
- 2026-07-22: `npm.cmd run build` exited 0. Existing bundle-size warning remains non-blocking.
