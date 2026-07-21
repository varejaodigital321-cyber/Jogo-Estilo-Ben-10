# Memória de governança do projeto

## Decisão fixa — 2026-07-20

O GitHub Spec Kit controla **o que será feito**: escopo, aprovação e ciclo de
vida. O obra/superpowers controla **como a IA executará** cada passo autorizado.
As duas camadas são obrigatórias, complementares e não podem ser ignoradas.

As skills Superpowers são automáticas por área, não exigem pedido manual e
nunca autorizam pular um gate do Spec Kit. Se a plataforma impedir uma skill,
o agente registra a limitação e usa apenas o fallback seguro; nunca afirma uma
execução que não ocorreu.

Esta memória local deve permanecer alinhada a `AGENTS.md`,
`.specify/memory/constitution.md`, `.specify/skill-policy.yaml` e à memória
Mem0 marcada com `source: governance`.

## Checkpoint de planejamento — 2026-07-20

- O proprietário aprovou a terceira camada `fagemx/gstack-game`: ela deverá
  selecionar automaticamente, por fase e especialidade, as 29 skills de jogo
  no fluxo `Spark → Think → Plan → Review → Slice → Handoff → Build → Feel →
  Playability → Test → Ship → Reflect`. Fase incerta exige `triage`.
- A emenda está especificada em `specs/004-gstack-game-governance/`, com
  especificação aprovada, plano, pesquisa, modelo, quickstart e 20 tarefas.
  Ela **ainda não está ativa** em `AGENTS.md`, na constituição ou na política
  YAML: a análise apontou duas correções pendentes, validar o mapeamento das 29
  skills e padronizar o registro de fase/skills/limitações nos templates.
- A integração privada do GitHub em `specs/003-github-history-integration/`
  foi aprovada para preservar ambos os históricos em uma branch dedicada e
  abrir um PR em rascunho. O remoto `main` foi confirmado em
  `04d6e519c3f4fd0871a2d19fb7ec23b6e7ce69da`; origin, commit local e push ainda
  não foram criados.
- Mem0: checkpoint `4a0a9e94-7117-4861-a07d-2b9bff3ca858`, tipo `decision`,
  origem `remember_command`, status `checkpoint_pending_implementation`.

## Checkpoint de execucao — 2026-07-21

- Base Git `31700f0`; feature isolada em `codex/005-transformation-platformer`, worktree `C:\wt-ben10`.
- T001/T002 concluidas: `@playwright/test` 1.61.1, Chromium, `test:e2e` e `playwright.config.ts` (Vite `127.0.0.1:4173`, Chromium, descoberta em `tests/`). O erro ESM `bun:` deixou de ocorrer. Proximo: T003 e testes reais.
- `caveman-compress` rejeita UTF-8 invalido, informa o caminho e tem regressao em `.agents/skills/caveman-compress/tests/test_validate.py`.
- Grafo salvo: 5.137 nos, 4.944 relacoes, 99,9% extraidas e 0,1% inferidas; HTML removido por exceder 5.000 nos.
- Commits: `f61ddfe` (Playwright), `05930e4` (runner), `118080a` (UTF-8), `f18e714` (grafo canonico) e `4499008` (artefatos Graphify).
