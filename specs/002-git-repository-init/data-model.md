# Repository State Model

| State | Required condition |
|---|---|
| Before | `.git` exists but contains no metadata; Git exits 128 |
| After initialization | `.git/HEAD`, `config`, `objects/` and `refs/` exist; work tree is valid |
| Branch | Unborn `main` branch |
| History | No commits and no staged files |
| Remote | None configured |
