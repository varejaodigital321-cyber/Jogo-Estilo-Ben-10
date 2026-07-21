# Quickstart de validação: Governança automática do gstack-game

Execute no diretório-raiz do projeto após a emenda.

## 1. Inventário das skills

```powershell
$skills = Get-ChildItem .agents\skills\gstack-game\skills -Directory |
  Where-Object { $_.Name -ne 'shared' } |
  Select-Object -ExpandProperty Name
if ($skills.Count -ne 29) { throw "Esperadas 29 skills; encontradas $($skills.Count)" }
$skills
```

**Resultado esperado:** 29 nomes de skills invocáveis, sem `shared`.

## 2. Validação do mapa de política

```powershell
@'
import yaml
from pathlib import Path
policy = yaml.safe_load(Path('.specify/skill-policy.yaml').read_text(encoding='utf-8'))
assert policy['authority'] == 'github/spec-kit'
assert policy['execution_discipline'] == 'obra/superpowers'
assert policy['game_specialization'] == 'fagemx/gstack-game'
assert len(policy['game_workflow']['stages']) == 12
print('GSTACK_POLICY_OK')
'@ | python -
```

**Resultado esperado:** `GSTACK_POLICY_OK`.

## 3. Convergência das referências

```powershell
rg -n "gstack-game|três camadas|triage" AGENTS.md `
  .specify\memory\constitution.md .specify\skill-policy.yaml `
  GSTACK_GAME_GOVERNANCE.md SUPERPOWERS_GOVERNANCE.md `
  SPEC_KIT_GOVERNANCE.md MEMORY_GOVERNANCE.md README.md ESTADO_DO_PROJETO.md
```

**Resultado esperado:** Todas as superfícies listadas possuem referências
coerentes ao roteamento gstack e à precedência.

## 4. Integridade dos artefatos

```powershell
git diff --check
Get-Content -Raw .specify\feature.json | ConvertFrom-Json |
  Select-Object -ExpandProperty feature_directory
```

**Resultado esperado:** Nenhum erro de whitespace; a feature ativa aponta para
`specs/004-gstack-game-governance` durante a execução desta emenda.

## 5. Memória de governança

Use a skill `mem0:peek` ou `mem0:tour` para confirmar uma memória de
governança que mencione Spec Kit, Superpowers e gstack-game. A consulta não
deve expor segredos.
