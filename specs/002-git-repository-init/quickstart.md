# Local Git Initialization Validation

Run from the project root after the initialization task.

```powershell
git rev-parse --is-inside-work-tree
git branch --show-current
git status --short --branch
git remote
git rev-parse --verify HEAD
```

Expected:

- The first command prints `true`.
- The second command prints `main`.
- Status is readable and shows `## No commits yet on main` followed by untracked
  files.
- `git remote` prints nothing.
- The final command exits nonzero because no initial commit exists.
