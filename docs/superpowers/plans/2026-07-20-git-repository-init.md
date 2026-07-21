# Git Repository Initialization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> `superpowers:subagent-driven-development` when delegation is authorized, or
> `superpowers:executing-plans` to implement this plan task by task.

**Goal:** Repair the empty `.git` directory into a valid local Git repository
on an unborn `main` branch.

**Architecture:** Use Git's native initialization in place. Treat all existing
project files as immutable input; only Git metadata may be created.

**Tech Stack:** Git and PowerShell.

## Global Constraints

- Do not modify, stage, commit or delete working-tree files.
- Do not configure a remote or user identity.
- Stop if `.git` is no longer empty before initialization.
- Verify each required Git command before declaring success.

### Task 1: Preflight

**Files:**
- Inspect: `.git/`

- [ ] Confirm `git --version` succeeds.
- [ ] Confirm `.git/` contains no entries.
- [ ] Confirm `git rev-parse --is-inside-work-tree` currently exits 128.

### Task 2: Initialize

**Files:**
- Create: `.git/HEAD`, `.git/config`, `.git/objects/`, `.git/refs/`

- [ ] Run `git init -b main` from the project root.
- [ ] Confirm Git reports initialization without altering the working tree.

### Task 3: Verify

**Files:**
- Inspect: `.git/`

- [ ] Confirm work-tree recognition is `true`.
- [ ] Confirm current branch is `main`.
- [ ] Confirm status is readable, remote list is empty and `HEAD` has no commit.
