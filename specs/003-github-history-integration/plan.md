# Implementation Plan: GitHub History Integration

**Branch**: `codex/003-github-history-integration` | **Date**: 2026-07-22 | **Spec**: [spec.md](spec.md)

## Summary

Connect the verified private GitHub repository, preserve its remote `main` and local initial history in one integration branch, then publish for draft review without force push or direct remote-main writes.

## Technical Context

**Tools**: Git, GitHub HTTPS remote
**Testing**: Git ancestor, branch and remote-ref checks; existing production build
**Constraints**: Never force push; never write remote `main`; stop on content conflict; never log credentials.

## Constitution Check

- Scope preserves all existing histories and assets.
- Execution occurs in isolated worktree.
- Verification checks remote refs and local ancestry before publication.

## Tasks

1. Add `origin` only after verified read access; fetch `origin/main`.
2. Create integration branch from local baseline; merge `origin/main` with unrelated histories allowed. Stop if conflicts exist.
3. Verify local baseline and remote main are both ancestors; commit only merge result if Git does not create it automatically.
4. Push integration, `codex/005-transformation-platformer` and `codex/006-graphify-artifact-hygiene` without force.
5. Create draft PR from integration to remote `main`; verify remote `main` hash remains unchanged.
6. Run production build and record results.
