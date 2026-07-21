# Tasks: Plataforma de Transformação Inicial

**Input**: documentos de design em `specs/005-transformation-platformer/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/game-test-api.md` e `quickstart.md`

**Tests**: obrigatórios. A constituição exige Phaser 4.2.1, TypeScript, Vite, Playwright e estado real observável por `window.GAME_TEST_API`.

**Organization**: as tarefas são agrupadas por história para permitir validação incremental. Tarefas fundamentais bloqueiam todas as histórias.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode ser executada em paralelo após as dependências declaradas, pois toca arquivos diferentes.
- **[US#]**: história de usuário à qual a tarefa pertence.

## Phase 1: Setup

**Purpose**: preparar o runner de testes exigido pelo projeto sem alterar a experiência jogável.

- [ ] T001 Add `@playwright/test` and the `test:e2e` script in `package.json` and `package-lock.json`, then run `npx.cmd playwright install chromium` before creating browser tests.
- [ ] T002 Configure the local Vite web server, Chromium project and test directory in `playwright.config.ts`.
- [ ] T003 [P] Create the test directory layout and shared reset helper in `tests/unit/platformer-state.spec.ts`, `tests/contract/game-test-api.spec.ts` and `tests/e2e/first-level.spec.ts`.

**Checkpoint**: `npm.cmd run test:e2e` has a configured runner, even before feature tests are implemented.

---

## Phase 2: Foundational

**Purpose**: replace the battle-only state with the shared deterministic platformer domain that all stories use.

**⚠️ CRITICAL**: do not start any user-story scene work until this phase is complete.

- [ ] T004 [P] Write failing state tests for position/velocity/direction/grounded/attack snapshots, normal damage, force damage, enemy defeat reward, single-use pickup, barrier rules, energy expiry, atomic force attack, death restart and map unlock in `tests/unit/platformer-state.spec.ts`.
- [ ] T005 [P] Define the provisional first-level layout, two enemy definitions, energy pickup, breakable barrier, exit and two-node world map in `src/game/content/firstLevel.ts` and `src/game/content/worldMap.ts`.
- [ ] T006 Create `PlayerState` with observable movement fields, `LevelRunState`, `WorldMapState`, cloning and initial-state factories in `src/game/state/PlatformerState.ts`.
- [ ] T007 Implement pure transition functions for level start, attack, force activation, elapsed time, contact damage, pickup, enemy defeat, restart and exit in `src/game/state/PlatformerReducer.ts`.
- [ ] T008 Centralize provisional health, normal/force damage, energy drain, pickup reward, enemy reward and contact damage constants in `src/game/balance/platformerBalance.ts`.
- [ ] T009 Run `npx.cmd playwright test tests/unit/platformer-state.spec.ts` and make all foundational state tests pass before scene integration.
- [ ] T010 Write failing contract tests for immutable snapshots, observable movement fields, invalid transitions, new save-key isolation and legacy-save preservation in `tests/contract/game-test-api.spec.ts`.
- [ ] T011 Replace the battle API with the contracted platformer API in `src/game/testing/GameTestApi.ts`, update the global type in `src/types/window.d.ts`, and attach the real domain store in `src/main.ts`.
- [ ] T012 Run `npx.cmd playwright test tests/contract/game-test-api.spec.ts` and make the contract tests pass.
- [ ] T013 Create compiling shells for `WorldMapScene`, `LevelOneScene` and `HudScene`, make the base world map select available `level-1`, and register Arcade Physics plus scene keys in `src/game/scenes/WorldMapScene.ts`, `src/game/scenes/LevelOneScene.ts`, `src/game/scenes/HudScene.ts`, `src/game/config.ts` and `src/game/scenes/BootScene.ts`.

**Checkpoint**: all mechanics are represented by deterministic state, exposed through the test API, and no battle-only API remains.

---

## Phase 3: User Story 1 - Superar o primeiro percurso (Priority: P1) 🎯 MVP

**Goal**: permitir atravessar uma fase curta, lutar contra dois inimigos e escolher entre enfrentar ou evitar o segundo.

**Independent Test**: a partir da primeira fase, a pessoa move, salta, ataca normalmente, derrota o primeiro inimigo com vários golpes, sofre dano e alcança a barreira pela rota alta sem derrotar o segundo inimigo. A saída final é validada após US2, porque a barreira obrigatória pertence à transformação.

- [ ] T014 [P] [US1] Write browser tests for movement, jump, repeated normal attacks, mandatory first enemy, optional second enemy and death restart in `tests/e2e/first-level.spec.ts`.
- [ ] T015 [US1] Render platforms, the provisional player, both enemies, their health feedback, the main-path blocker, the high alternate route and the exit in `src/game/presentation/LevelOneRenderer.ts`; browser assertions from T014 MUST observe the blocker, alternate route and intact barrier states.
- [ ] T016 [US1] Implement movement with `A/D` and arrows, jumping with `Space`, normal attacks with `J`, Arcade collisions, enemy contact damage, brief invulnerability and phase reconstruction on zero health in `src/game/scenes/LevelOneScene.ts`.
- [ ] T017 [US1] Implement always-visible controls, player health, enemy hit feedback and restart feedback in `src/game/scenes/HudScene.ts` and `src/styles/main.css`.
- [ ] T018 [US1] Make the first enemy block the main route until defeated and make the alternate platform route around the second enemy reach the intact force-only barrier without defeating that enemy in `src/game/scenes/LevelOneScene.ts` and `src/game/content/firstLevel.ts`; cover these outcomes in T014/T019.
- [ ] T019 [US1] Run `npx.cmd playwright test tests/e2e/first-level.spec.ts` and verify the normal-combat traversal through the optional-enemy route until the intact barrier.

**Checkpoint**: the combat and platforming loop works with placeholders, the first enemy is mandatory, the second is optional, and the force-only barrier is the handoff to US2.

---

## Phase 4: User Story 2 - Transformar-se para vencer um bloqueio (Priority: P1)

**Goal**: tornar a forma de força legível, temporária e necessária para superar uma barreira.

**Independent Test**: a pessoa coleta energia, usa `K`, percebe o medidor diminuir, rompe a barreira com golpe físico e retorna à forma normal quando a energia acaba.

- [ ] T020 [P] [US2] Extend the unit and contract assertions for `K`, visible energy changes, force-versus-normal damage, barrier rejection in normal form and atomic force attack expiry in `tests/unit/platformer-state.spec.ts` and `tests/contract/game-test-api.spec.ts`.
- [ ] T021 [US2] Implement the `K` input, force-form visual state, energy drain, enemy/pickup recharge, atomic hit resolution and barrier transition in `src/game/scenes/LevelOneScene.ts` and `src/game/state/PlatformerReducer.ts`.
- [ ] T022 [US2] Render the energy meter, pickup, force-form color treatment, breakable-barrier feedback and broken-barrier state in `src/game/presentation/LevelOneRenderer.ts` and `src/game/scenes/HudScene.ts`.
- [ ] T023 [US2] Add browser coverage for transformation, energy expiry, recharge, stronger damage and barrier breaking in `tests/e2e/first-level.spec.ts`.
- [ ] T024 [US2] Run `npx.cmd playwright test tests/unit/platformer-state.spec.ts tests/contract/game-test-api.spec.ts tests/e2e/first-level.spec.ts` and verify that the first-level tests cover the transformation flow.

**Checkpoint**: transforming changes combat and exploration, is readable from the HUD, and cannot be bypassed by a normal attack.

---

## Phase 5: User Story 3 - Avançar pelo mapa-múndi (Priority: P2)

**Goal**: mostrar a primeira fase como nó inicial e liberar visualmente a rota para a segunda após a saída.

**Independent Test**: uma sessão nova mostra apenas `level-1`; depois da saída válida, o mapa mostra `level-1` concluída e `level-2` disponível, inclusive após recarregar o save novo.

- [ ] T025 [P] [US3] Add unit and contract cases for default map lock, completion unlock, `original-platformer-save-v1` persistence and legacy-key isolation in `tests/unit/platformer-state.spec.ts` and `tests/contract/game-test-api.spec.ts`.
- [ ] T026 [US3] Render the connected level nodes, distinct locked/available/completed states, selection and phase entry in `src/game/scenes/WorldMapScene.ts` and `src/styles/main.css`.
- [ ] T027 [US3] Connect valid exit completion to map return, save only the new map state, load only the new save key and preserve the legacy key in `src/game/state/PlatformerReducer.ts`, `src/game/testing/GameTestApi.ts` and `src/game/scenes/LevelOneScene.ts`.
- [ ] T028 [US3] Add browser coverage for initial map state, level entry, return from exit, unlocked node two and reload persistence in `tests/e2e/first-level.spec.ts`.
- [ ] T029 [US3] Run `npx.cmd playwright test tests/unit/platformer-state.spec.ts tests/contract/game-test-api.spec.ts tests/e2e/first-level.spec.ts` and verify the world-map flow.

**Checkpoint**: the first phase concludes into a persistent, original two-node world map; phase two remains only a visible unlocked destination.

---

## Phase 6: Polish and cross-cutting validation

**Purpose**: enforce technical constraints, protect placeholders and record the first discovery playtest.

- [ ] T030 [P] Remove only obsolete battle/prototype code and imports after replacement tests pass in `src/game/state/GameState.ts`, `src/game/scenes/PrototypeScene.ts`, `src/game/constants/animations.ts` and `src/game/config.ts`; preserve `public/assets/player/idle/idle_sprite_sheet.png` unchanged.
- [ ] T031 [P] Update `specs/005-transformation-platformer/quickstart.md` with the implemented commands and any test-runner prerequisites that differ from the plan.
- [ ] T032 [P] Create FPS and map-to-level transition measurements with thresholds of at least 58 FPS after warmup and at most 1,000 ms per transition in `tests/e2e/performance.spec.ts`.
- [ ] T033 Run `npm.cmd run build` and `npm.cmd run test:e2e`, record the exact test and performance results in `specs/005-transformation-platformer/quickstart.md`, and resolve any TypeScript, asset or browser-test failure before handoff.
- [ ] T034 Run `graphify update .` after code changes, then record the first no-external-instruction playtest observations in `specs/005-transformation-platformer/playtest-results.md` using the success criteria from `spec.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** has no dependency.
- **Phase 2** depends on T001–T003 and blocks every user story.
- **US1** depends on Phase 2 and is the first playable MVP.
- **US2** depends on US1 because it extends the same phase and combat presentation.
- **US3** depends on the exit produced by US1 and the completed-state transition from US2.
- **Polish** depends on all desired user stories.

### User Story Dependencies

```text
Foundational → US1: percurso e combate → US2: transformação e barreira → US3: mapa e desbloqueio → validação
```

### Parallel Opportunities

- T004 and T005 can run together after the test runner exists.
- T010 can begin while T006–T009 establish the state domain.
- T014 can begin after Phase 2 while T015 prepares rendering, but must be kept failing until T016–T018 complete.
- T020 can begin while US1’s renderer is being finalized.
- T025 can begin while the map presentation task T026 is being prepared.
- T030 and T031 can run in parallel after all scenario tests pass.

## Implementation Strategy

### MVP First

1. Complete Setup and Foundational phases.
2. Complete US1 through T019.
3. Stop for a manual check of movement, jump, normal combat, first enemy block, alternate route and death restart.

### Incremental Delivery

1. US1 proves platforming and basic combat.
2. US2 proves the central transformation hypothesis.
3. US3 proves the expandable world-map structure.
4. Phase 6 verifies the complete slice and records the first discovery playtest before new art, enemies, phases or bosses are added.

## Notes

- Every production-code task follows TDD: make the listed test fail first, implement the smallest change, then run the listed test command.
- No task authorizes reuse of reference-game code, assets, characters or names.
- A análise de consistência foi executada e suas correções foram incorporadas; uma reanálise é obrigatória antes da implementação.

## Registro de skills por gate

**Registro em 2026-07-21.** `Executada` indica skill aplicada neste fluxo;
`Auditoria posterior` indica leitura/validação feita depois do gate, sem
reivindicar que ela foi usada para criar o artefato original; `Pendente` não
autoriza avançar o gate.

| Gate Spec Kit | Artefato / resultado | Skills executadas | Estado e skills pendentes |
|---|---|---|---|
| 0. Contexto e referências | memória do projeto e grafo consultados; referências externas usadas apenas como inspiração | `mem0` via recuperação de contexto do plugin; `graphify` | Executada. `graphify` deve ser atualizado após mudanças de código. |
| 1. Constituição | `.specify/memory/constitution.md` e `.specify/skill-policy.yaml` lidos | `superpowers:using-superpowers` | Executada. `speckit-constitution` foi usado em auditoria posterior; não há emenda constitucional neste feature. |
| 2. Especificação | `spec.md` aprovado e checklist de requisitos | `superpowers:brainstorming`, `game-ideation`, `speckit-specify`, `speckit-checklist` | Executada. |
| 3. Esclarecimentos | três decisões registradas em `spec.md` | `speckit-clarify`, `speckit-checklist` | Executada. |
| 4. Plano técnico | `plan.md`, `research.md`, `data-model.md`, contrato e quickstart | `speckit-plan`, `superpowers:writing-plans`, `graphify`, `game-review`, `superpowers:verification-before-completion` | Executada. A revisão corrigiu controles, Playwright, save e energia atômica. |
| 5. Tarefas | este `tasks.md` | `speckit-tasks`, `superpowers:using-superpowers`, `superpowers:verification-before-completion` | Executada. |
| 6. Análise de consistência | relatório cruzando `spec.md`, `plan.md` e `tasks.md` | `speckit-analyze` | Executada em modo somente leitura; as seis correções foram autorizadas e incorporadas. **Pendente:** repetir `speckit-analyze` sobre os artefatos corrigidos antes da implementação. |
| 7. Implementação | código, testes e atualização do grafo | — | **Pendente:** `superpowers:using-git-worktrees` se houver consentimento, `superpowers:executing-plans`, `superpowers:test-driven-development`, `graphify update .`, revisão de código quando disponível. Delegação permanece fora de escopo enquanto a política de colaboração não a autorizar. |
| 8. Convergência e entrega | evidências de testes, revisão contra a especificação e handoff | — | **Pendente:** `speckit-converge`, `superpowers:verification-before-completion`, `superpowers:finishing-a-development-branch` em repositório Git válido e skills de QA aplicáveis. |

Qualquer execução futura deve atualizar esta tabela no mesmo commit ou alteração
de artefato que concluir o gate correspondente.
