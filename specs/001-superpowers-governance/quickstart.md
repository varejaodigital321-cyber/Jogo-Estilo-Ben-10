# Governance Validation Quickstart

Run from the project root in PowerShell.

1. Confirm that the requested Superpowers skills are locally discoverable:

   ```powershell
   Get-ChildItem "$env:USERPROFILE\.codex\superpowers\skills" -Directory |
     Select-Object -ExpandProperty Name
   ```

2. Parse the policy syntax and check the automatic skills:

   ```powershell
   Get-Content .specify\skill-policy.yaml
   ```

   Expected: an `execution-discipline` section naming all ten requested skills.

3. Search the local governance surfaces:

   ```powershell
   rg -n "Spec Kit controla|Superpowers controla|obra/superpowers" `
     AGENTS.md SUPERPOWERS_GOVERNANCE.md SPEC_KIT_GOVERNANCE.md `
     .specify\memory\constitution.md .specify\README.md README.md `
     ESTADO_DO_PROJETO.md
   ```

   Expected: each surface identifies the complementary roles or links to the
   canonical contract.

4. Search for stale initialization claims:

   ```powershell
   rg -n "não possui `?\.specify|não foi inicializada" `
     AGENTS.md SUPERPOWERS_GOVERNANCE.md SPEC_KIT_GOVERNANCE.md `
     .specify\README.md README.md ESTADO_DO_PROJETO.md
   ```

   Expected: no matches.
