# Graphify Full Ignore Design

**Approved**: 2026-07-22

## Goal

Keep every Graphify output local and outside Git while preserving game development files.

## Design

Use one root ignore rule for `graphify-out/`. Remove only Graphify paths from Git tracking. Do not delete local Graphify output, game code, assets, specifications or skills.

## Validation

Representative Graphify files must be ignored, no Graphify path may be tracked, and production build must succeed.
