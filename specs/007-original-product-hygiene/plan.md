# Implementation Plan: Original Product Hygiene

**Branch**: `codex/007-original-product-hygiene`
**Spec**: [spec.md](spec.md)

## Summary

Rebrand the repository as Forma Prisma, remove generated and vendored content from Git, reduce duplicate assets, remove dead prototype code, and establish portable production/build/test checks.

## Safety

1. Create a timestamped archive outside the repository before any removal.
2. Verify archive hashes and exact removal targets.
3. Remove only paths listed in this plan.
4. Keep Feature 005 untouched and pending.

## Tasks

1. Archive `.agents`, `.claude`, `Sprites`, `assets_original` and current Graphify output outside Git.
2. Replace local-agent configuration with portable root governance; add ignore and line-ending rules.
3. Rebrand product/docs and request remote GitHub rename.
4. Remove duplicate assets and dead audio/state/test-API production paths.
5. Add production smoke test; repair boot error, diagnostics accessibility and sprite constant use.
6. Normalize npm/TypeScript configuration and documentation.
7. Run inventory, build, browser test, graph update and diff checks; commit and publish.

## Verification

- `git ls-files` inventory excludes removed/generated paths.
- Hash inventory has one runtime sprite copy.
- `npm run build` and `npm run test:e2e` succeed.
- Production browser test confirms `GAME_TEST_API` is absent.
- Case-insensitive brand search has zero tracked-content matches.
