# Tasks: Governança automática do gstack-game

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md),
[data-model.md](data-model.md) e [quickstart.md](quickstart.md)

**Prerequisites**: Especificação aprovada, plano técnico e checklist de
requisitos completos.

**Tests**: Esta feature não altera código de produção. As tarefas usam as
verificações de inventário, YAML/JSON, busca de convergência e memória definidas
em `quickstart.md`.

## Phase 1: Setup

**Purpose**: Fixar a feature ativa e a base de evidências antes da emenda.

- [ ] T001 Confirmar o inventário de 29 skills em `.agents/skills/gstack-game/skills/` e registrar os nomes usados pela política em `specs/004-gstack-game-governance/research.md`.
- [ ] T002 Confirmar que `specs/004-gstack-game-governance/spec.md`, `plan.md`, `research.md`, `data-model.md` e `quickstart.md` estão completos antes de alterar fontes normativas.

---

## Phase 2: Foundational

**Purpose**: Criar o mapa operacional e o contrato de precedência que bloqueiam
qualquer omissão de especialidade de jogo.

- [ ] T003 Atualizar `.specify/skill-policy.yaml` com `game_specialization: fagemx/gstack-game`, os 12 estágios, o roteamento de todas as 29 skills e `triage` obrigatório para fase incerta.
- [ ] T004 Criar `GSTACK_GAME_GOVERNANCE.md` com a tabela de fluxo, seleção automática por especialidade, proibições de execução fora de fase e regra de capability.
- [ ] T005 Executar as seções 1 e 2 de `specs/004-gstack-game-governance/quickstart.md` e corrigir o mapa até inventário e YAML convergirem.

**Checkpoint**: O roteamento gstack está definido e verificável; as histórias
de usuário podem usar a mesma fonte de verdade.

---

## Phase 3: User Story 1 - Especialidade automática (Priority: P1) 🎯 MVP

**Goal**: Fazer toda tarefa de jogo identificar a fase e invocar a skill gstack
pertinente sem comando manual.

**Independent Test**: Ler `AGENTS.md` e `.specify/skill-policy.yaml`, confirmar
as regras de fase, `triage`, combinação pertinente e registro obrigatório.

- [ ] T006 [US1] Atualizar `AGENTS.md` para exigir classificação automática da fase de jogo, `triage` para incerteza, skill gstack pertinente e registro de fase/skills/limitações em artefatos Spec Kit.
- [ ] T007 [US1] Atualizar `SUPERPOWERS_GOVERNANCE.md` para explicar a combinação obrigatória de Superpowers com gstack sem ativação manual nem execução simultânea incompatível.
- [ ] T008 [US1] Executar a seção 3 de `specs/004-gstack-game-governance/quickstart.md` contra `AGENTS.md`, `.specify/skill-policy.yaml`, `GSTACK_GAME_GOVERNANCE.md` e `SUPERPOWERS_GOVERNANCE.md`.

**Checkpoint**: A especialidade de jogo pode ser validada de forma independente
no contrato operacional e no mapa YAML.

---

## Phase 4: User Story 2 - Precedência sem conflito (Priority: P2)

**Goal**: Preservar Spec Kit como autoridade de escopo e Superpowers como
disciplina de execução quando uma skill gstack for aplicável.

**Independent Test**: Comparar a constituição e os documentos de governança e
confirmar a mesma frase de precedência e os mesmos bloqueios de escopo.

- [ ] T009 [US2] Emendar `.specify/memory/constitution.md` com incremento MINOR, relatório de impacto e um princípio que estabelece a terceira camada de especialidade gstack subordinada aos gates Spec Kit.
- [ ] T010 [US2] Atualizar `SPEC_KIT_GOVERNANCE.md` para declarar que Spec Kit governa o que, Superpowers governa como e gstack-game governa a especialidade de jogo.
- [ ] T011 [US2] Revisar `SUPERPOWERS_GOVERNANCE.md` e `GSTACK_GAME_GOVERNANCE.md` para garantir que nenhuma delas permite ampliar escopo, pular gate ou substituir a outra camada.
- [ ] T012 [US2] Executar busca por termos conflitantes nos quatro documentos normativos e registrar qualquer limitação de plataforma em `specs/004-gstack-game-governance/tasks.md`.

**Checkpoint**: As três camadas possuem funções complementares e nenhuma pode
autorizar salto de processo.

---

## Phase 5: User Story 3 - Regra persistente e descobrível (Priority: P3)

**Goal**: Tornar a política localizável para futuras sessões e ferramentas.

**Independent Test**: Pesquisar os documentos de referência e a memória por
`gstack-game`, `três camadas` e `triage` e encontrar declarações convergentes.

- [ ] T013 [P] [US3] Atualizar `.specify/README.md` e `README.md` com links para `GSTACK_GAME_GOVERNANCE.md` e a ativação automática por fase.
- [ ] T014 [P] [US3] Atualizar `ESTADO_DO_PROJETO.md` e `MEMORY_GOVERNANCE.md` com a decisão de três camadas e a proibição de omissão silenciosa.
- [ ] T015 [US3] Usar `mem0:remember` para criar ou atualizar a memória de governança com `source: governance`, sem segredos ou credenciais.
- [ ] T016 [US3] Executar as seções 3 e 5 de `specs/004-gstack-game-governance/quickstart.md` e registrar os identificadores/limitações de memória em `specs/004-gstack-game-governance/tasks.md`.

**Checkpoint**: Uma nova sessão encontra a mesma regra na raiz, nos documentos
de processo e na memória.

---

## Phase 6: Polish & Cross-Cutting Validation

**Purpose**: Analisar consistência, obter revisão e guardar evidência antes de
declarar a emenda concluída.

- [ ] T017 Executar `speckit-analyze` sobre `specs/004-gstack-game-governance/` e resolver qualquer inconsistência entre `spec.md`, `plan.md`, `tasks.md` e os documentos normativos.
- [ ] T018 Solicitar revisão com `superpowers:requesting-code-review` para o diff de governança e tratar feedback com `superpowers:receiving-code-review` antes da verificação final.
- [ ] T019 Executar todas as seções de `specs/004-gstack-game-governance/quickstart.md`, `git diff --check` e uma busca por credenciais; registrar resultados reais nesta lista de tarefas.
- [ ] T020 Executar `superpowers:verification-before-completion` e confirmar que os oito requisitos e quatro critérios de sucesso de `spec.md` possuem evidência atual.

## Dependencies & Execution Order

- T001 e T002 confirmam a base de entrada.
- T003 a T005 bloqueiam todas as histórias: o mapa de política é a fonte de
  verdade.
- US1 (T006-T008) deve preceder US2, pois o contrato operacional define a
  ativação que a constituição ratifica.
- US3 (T013-T016) depende de US1 e US2 para não propagar regra incompleta.
- T017 a T020 dependem de todas as tarefas anteriores.

## Parallel Opportunities

- T013 e T014 podem ocorrer em paralelo após T012, pois alteram superfícies de
  referência diferentes.
- Não paralelizar alterações em `AGENTS.md`, `.specify/skill-policy.yaml` ou
  `.specify/memory/constitution.md`, pois são fontes normativas compartilhadas.

## Implementation Strategy

1. Entregar primeiro o MVP de US1: mapa verificável e regra operacional de
   ativação automática.
2. Acrescentar US2 para tornar a precedência constitucionalmente inequívoca.
3. Acrescentar US3 para persistir a regra em todas as sessões.
4. Analisar, revisar e verificar antes de considerar qualquer emenda pronta.
