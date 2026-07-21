# Governança automática do gstack-game — desenho

**Data:** 2026-07-20  
**Status:** Aprovado pelo proprietário

## Objetivo

Tornar o `fagemx/gstack-game` uma terceira camada fixa de governança: ela
garante que o trabalho seja avaliado também como jogo, sem substituir a decisão
de escopo do Spec Kit ou a disciplina de execução do Superpowers.

## Modelo de três camadas

| Camada | Responsabilidade exclusiva |
|---|---|
| GitHub Spec Kit | O que será feito, escopo, aprovação e gates |
| obra/superpowers | Como cada passo autorizado será executado |
| fagemx/gstack-game | Qual especialidade de design, experiência e produção de jogo é obrigatória na fase atual |

## Ativação automática por fase

As 29 skills ficam instaladas e elegíveis de forma permanente. A IA deve
identificar a fase antes de trabalho de jogo e invocar, sem comando manual, a
skill ou combinação correspondente. Quando a fase não puder ser determinada,
`triage` é obrigatório; a incerteza não autoriza ignorar o gstack.

| Fase | Roteamento obrigatório principal |
|---|---|
| Spark | `spark-lens` |
| Think | `game-import`, `game-ideation`, `game-direction`, `pitch-review` |
| Plan | `game-review`, `game-eng-review`, `balance-review`, `player-experience`, `plan-design-review` |
| Review | `game-review`, `game-codex`, `asset-review` ou a revisão especializada pertinente |
| Slice | `prototype-slice-plan` |
| Handoff | `implementation-handoff` |
| Build | `gameplay-implementation-review`, além da skill de engine pertinente |
| Feel | `feel-pass`, `game-feel` quando instalada e pertinente |
| Playability | `build-playability-review`, `game-ux-review`, `game-visual-qa`, `playtest` |
| Test | `game-qa`, `game-debug` quando houver falha, `careful`/`guard` para proteção de escopo |
| Ship | `game-ship`, `game-docs` e skill de publicação aplicável |
| Reflect | `game-retro` |

`unfreeze` só pode remover uma proteção criada por `guard` mediante a regra
aplicável. Skills de engine, áudio, IA, input, salvamento, arte e publicação
continuam a ser selecionadas automaticamente quando a especificação requer a
especialidade.

## Limites obrigatórios

- Não executar todas as skills simultaneamente: a obrigatoriedade é de
  roteamento correto e de execução da especialidade pertinente.
- Uma skill gstack não cria escopo novo, não pula gates nem substitui o
  Superpowers.
- Uma skill obrigatória indisponível, incompatível ou bloqueada deve ser
  registrada. O agente para antes da ação dependente e pede decisão quando não
  houver fallback seguro.
- A fase e as skills aplicadas ficam registradas nos artefatos da feature.

## Superfícies sincronizadas

A emenda atualizará a constituição, `AGENTS.md`, `.specify/skill-policy.yaml`,
`SUPERPOWERS_GOVERNANCE.md`, uma referência raiz do gstack, referências de
processo e memória local/remota.
