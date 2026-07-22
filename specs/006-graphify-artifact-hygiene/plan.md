# Implementation Plan: Graphify Artifact Hygiene

**Branch**: `codex/006-graphify-artifact-hygiene` | **Date**: 2026-07-22 | **Spec**: [spec.md](spec.md)

## Summary

Stop versioning Graphify caches and derived local files while keeping the shared graph, report and manifest in Git.

## Technical Context

**Language/Version**: Git ignore rules; no production-code change
**Primary Dependencies**: Graphify CLI, Git
**Storage**: Repository working tree
**Testing**: Git ignore checks; existing production build
**Target Platform**: Windows development checkout
**Project Type**: Repository hygiene
**Constraints**: Preserve gameplay, assets, specs, skills and user changes; remove index entries only inside `graphify-out/`.

## Constitution Check

- Spec, clarification, plan, tasks and consistency analysis completed before implementation.
- No Phaser or production-code behavior changes.
- Original assets and narrative data untouched.
- Verification includes Git index checks and existing production build.

## Design

Use a root-level allowlist: ignore all content under `graphify-out/`, then unignore exactly `graph.json`, `GRAPH_REPORT.md` and `manifest.json`. Remove currently tracked Graphify paths from the index, then re-add only allowlisted artifacts. This retains shared navigation data while making caches, backups, temporary metadata and HTML visualization local.

## Files

- Modify: `.gitignore` — Graphify allowlist.
- Modify: Git index for `graphify-out/` — remove generated entries; retain allowlisted files.
- Create: `specs/006-graphify-artifact-hygiene/quickstart.md` — repeatable validation.

## Verification

1. `git check-ignore` reports cache, backup and HTML paths ignored.
2. `git check-ignore` reports allowlisted shared paths not ignored.
3. `git ls-files` lists exactly three Graphify root artifacts and zero cache paths.
4. `npm.cmd run build` succeeds unchanged.
