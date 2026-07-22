# Implementation Plan: Graphify Artifact Hygiene

**Branch**: `codex/006-graphify-artifact-hygiene` | **Date**: 2026-07-22 | **Spec**: [spec.md](spec.md)

## Summary

Stop versioning every Graphify output, including graph, report, manifest, cache, backup and HTML files.

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

Ignore full `graphify-out/`. Remove every Graphify entry from Git index without deleting local files. This prevents regenerated graph data from entering future commits.

## Files

- Modify: `.gitignore` — ignore full Graphify directory.
- Modify: Git index for `graphify-out/` — remove every generated entry.
- Create: `specs/006-graphify-artifact-hygiene/quickstart.md` — repeatable validation.

## Verification

1. `git check-ignore` reports cache, backup, HTML, graph, report and manifest paths ignored.
2. `git ls-files` lists zero Graphify paths.
4. `npm.cmd run build` succeeds unchanged.
