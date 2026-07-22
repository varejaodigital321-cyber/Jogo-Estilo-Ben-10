# Tasks: Graphify Artifact Hygiene

**Input**: [spec.md](spec.md), [plan.md](plan.md)

## Phase 1: Original hygiene

- [x] T001 [US1] Add initial Graphify ignore rules.
- [x] T002 [US1] Remove initially selected generated Graphify entries from index.
- [x] T003 [US1] Create `specs/006-graphify-artifact-hygiene/quickstart.md` with repeatable Git validation commands.

## Phase 2: Scope amendment — full Graphify ignore

- [x] T007 [US1] Replace Graphify allowlist with a full `graphify-out/` ignore rule.
- [x] T008 [US1] Confirm no path under `graphify-out/` is tracked or eligible for commit.
- [x] T009 [US2] Update repeatable validation and consistency analysis for full-directory scope.
- [x] T010 [US2] Run production build and final scope checks.

## Original validation

- [x] T004 [US1] Validate ignore behavior, tracked Graphify inventory and scope of staged deletions.
- [x] T005 [US2] Run the existing production build to confirm hygiene changes did not affect the game.
- [x] T006 [US2] Run final consistency and diff checks; record results in this task list.

## Dependencies

- T001 before T002 and T004.
- T002 and T003 before T004.
- T004 before T006.
- T005 before T006.

## Results

- 2026-07-22: Original allowlist verification recorded above; superseded by T007-T010 after owner approval to ignore all Graphify output.
- 2026-07-22: `graphify update .` rebuilt 5,167 nodes; `git status --ignored -- graphify-out` reports only `!! graphify-out/`, and `git ls-files -- 'graphify-out/*'` is empty.
- 2026-07-22: Production build passed in configured worktree; existing bundle-size warning remains non-blocking.
- 2026-07-22: `npm.cmd run build` exited 0. Existing bundle-size warning remains non-blocking.
