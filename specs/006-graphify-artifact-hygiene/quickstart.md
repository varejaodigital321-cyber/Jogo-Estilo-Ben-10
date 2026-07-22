# Graphify Artifact Hygiene Validation

Run from repository root after `graphify update .`.

```powershell
git check-ignore -v graphify-out/cache/probe.json
git check-ignore -v graphify-out/2026-07-22/probe.json
git check-ignore -v graphify-out/graph.html
git check-ignore -v graphify-out/graph.json
git check-ignore -v graphify-out/GRAPH_REPORT.md
git check-ignore -v graphify-out/manifest.json
git ls-files 'graphify-out/*'
```

Expected results:

- Every `git check-ignore` command prints matching ignore rule.
- Graphify listing is empty.
