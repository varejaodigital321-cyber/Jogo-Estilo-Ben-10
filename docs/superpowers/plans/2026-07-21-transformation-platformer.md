# Plataforma de Transformação Inicial — plano de execução

> Plano complementar ao Spec Kit. A fonte de escopo é [spec.md](../../../specs/005-transformation-platformer/spec.md); o desenho técnico canônico é [plan.md](../../../specs/005-transformation-platformer/plan.md). Não iniciar implementação até `tasks.md` e a análise de consistência estarem concluídos.

**Objetivo:** entregar a primeira fase jogável e o mapa-múndi mínimo, usando regras puras testáveis e renderização provisória no Phaser 4.2.1.

### Passo 1: substituir domínio de batalha por domínio de plataforma

**Arquivos:** `src/game/state/GameState.ts` (substituir), `src/game/state/PlatformerState.ts`, `src/game/state/PlatformerReducer.ts`, `src/game/balance/platformerBalance.ts`

1. Escrever primeiro testes de domínio para dano normal, dano de força, barreira, pickups, morte/reinício e desbloqueio.
2. Implementar tipos, estado inicial e cópia defensiva. Gravar somente `original-platformer-save-v1` e ignorar, sem apagar, `original-2d-game-save-v1`.
3. Implementar redutor e validações de transição.
4. Rodar os testes de unidade e a checagem TypeScript.

### Passo 2: definir conteúdo e contrato de teste

**Arquivos:** `src/game/content/firstLevel.ts`, `src/game/content/worldMap.ts`, `src/game/testing/GameTestApi.ts`, `src/types/window.d.ts`, `tests/contract/game-test-api.spec.ts`

1. Escrever testes para o contrato de snapshots e pré-condições.
2. Declarar dados de mapa, primeiro inimigo obrigatório, segundo opcional, pickup, barreira e saída.
3. Adaptar `GAME_TEST_API` para chamar o motor real; remover a API de batalha obsoleta no mesmo conjunto de alterações.
4. Rodar testes de contrato isoladamente e com TypeScript, incluindo o golpe iniciado antes de a energia se esgotar.

### Passo 3: construir mapa e fase com placeholders

**Arquivos:** `src/game/config.ts`, `src/game/scenes/BootScene.ts`, `src/game/scenes/WorldMapScene.ts`, `src/game/scenes/LevelOneScene.ts`, `src/game/scenes/HudScene.ts`, `src/game/presentation/LevelOneRenderer.ts`, `src/styles/main.css`

1. Configurar Arcade Physics no Phaser 4 e registrar novas cenas.
2. Construir mapa de dois nós com estado visual bloqueado/disponível.
3. Renderizar terreno, plataformas, entidades e HUD por primitivas e cores originais.
4. Implementar `A/D` ou setas para movimento, `Espaço` para salto, `J` para ataque e `K` para transformação; exibir estes controles na HUD. Implementar contato, pickups, colisões, saída e retorno ao mapa.
5. Fazer teste manual do percurso completo usando somente placeholders.

### Passo 4: testes end-to-end e convergência

**Arquivos:** `playwright.config.ts`, `tests/e2e/first-level.spec.ts`, `package.json`, documentação de verificação se necessário

1. Adicionar `@playwright/test` às dependências de desenvolvimento, criar `playwright.config.ts`, adicionar `test:e2e` a `package.json` e instalar Chromium com `npx.cmd playwright install chromium`.
2. Cobrir via navegador primeiro inimigo, barreira, transformação, morte/reinício, rota opcional e nó 2 liberado.
3. Executar build, testes unitários/contrato/e2e e revisão de requisitos contra a especificação.
4. Atualizar `graphify update .` após mudanças de código.
5. Conduzir playtest sem instruções e registrar resultados antes de mudar balanceamento ou criar arte final.
