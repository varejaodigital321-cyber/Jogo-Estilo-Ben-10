# Graphify Artifact Hygiene Validation

Run from repository root after `graphify update .`.

```powershell
git check-ignore -v graphify-out/cache/probe.json
git check-ignore -v graphify-out/2026-07-22/probe.json
git check-ignore -v graphify-out/graph.html
git check-ignore -v graphify-out/graph.json
git ls-files 'graphify-out/cache/*'
git ls-files 'graphify-out/*'
```

Expected results:

- First three commands print their matching ignore rule.
- `graphify-out/graph.json` is not ignored; `git check-ignore` returns exit code 1.
- Cache listing is empty.
- Root Graphify listing contains only `GRAPH_REPORT.md`, `graph.json` and `manifest.json`.
