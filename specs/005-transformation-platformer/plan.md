# Implementation Plan: Plataforma de Transformação Inicial

**Branch**: `005-transformation-platformer` | **Date**: 2026-07-21 | **Spec**: [spec.md](./spec.md)

**Input**: especificação aprovada em `specs/005-transformation-platformer/spec.md`, decisão de design registrada com o proprietário e estado atual do protótipo Phaser.

## Summary

Transformar o protótipo visual existente em uma primeira fatia jogável de plataforma 2D: mapa-múndi, uma fase curta, combate físico, uma transformação temporária de força, barreira rompível e desbloqueio visual da segunda fase. A implementação separará regras determinísticas do jogo da renderização Phaser para que `window.GAME_TEST_API` exponha o estado real e permita testar os fluxos sem depender de sprites finais.

## Technical Context

**Language/Version**: TypeScript 5.8.3, ES modules

**Primary Dependencies**: Phaser 4.2.1, Vite 6.3.5 e `@playwright/test` como dependência de desenvolvimento; Playwright Chromium será instalado para testes de interface e contrato de jogo

**Storage**: estado em memória durante a fase; persistência simples em `localStorage` somente para o progresso do mapa, na chave nova `original-platformer-save-v1`. O save de batalha `original-2d-game-save-v1` será ignorado, sem migração e sem exclusão. Não haverá sistema de slots, nuvem ou checkpoints nesta fatia.

**Testing**: verificações TypeScript/Vite existentes; testes unitários determinísticos para regras de estado; Playwright para fluxo de navegação, desempenho e `window.GAME_TEST_API`, incluindo snapshot de posição, velocidade, direção, contato com o chão e ataque em curso

**Target Platform**: navegador desktop moderno, com teclado; canvas responsivo dentro de Vite

**Project Type**: jogo web de página única

**Performance Goals**: 60 FPS no cenário único de 960×620, aceitando média medida de pelo menos 58 FPS após aquecimento; sem alocação contínua de objetos de renderização por quadro; transição mapa↔fase medida por marcas de desempenho em até 1 segundo no ambiente local

**Constraints**: Phaser 4.2.1 exclusivamente (nenhuma API exclusiva de Phaser 3); TypeScript estrito; conteúdo original e visual provisório; estado observável por `window.GAME_TEST_API`; primeira fase sem checkpoints; segunda fase apenas como nó desbloqueado

**Scale/Scope**: um personagem provisório, uma forma de força, dois inimigos, uma barreira, uma fase jogável e dois nós no mapa; arquitetura de dados extensível para futuras formas, inimigos, fases e chefe

## Constitution Check

| Gate constitucional | Resultado antes da pesquisa | Resultado após o desenho |
|---|---|---|
| Especificação aprovada antes do plano | Passou: `spec.md` aprovado pelo proprietário em 2026-07-21 | Passou |
| Stack obrigatório | Passou: Phaser 4.2.1, TypeScript, Vite e Playwright definidos | Passou: plano não introduz stack concorrente |
| APIs Phaser | Passou: a pesquisa usa documentação Phaser 4 | Passou: cenas e Arcade Physics serão configurados em Phaser 4 |
| Estado real testável | Passou: contrato dedicado planejado | Passou: motor de regras será a fonte de verdade de UI e API |
| Escopo incremental | Passou: apenas a primeira fase completa | Passou: ativos e animações finais ficam fora da fatia |
| Ordem Spec Kit | Passou: Constituição → especificação → esclarecimentos → plano | Próximo gate obrigatório: `tasks.md`, análise e só então implementação |

Nenhuma violação requer rastreamento de complexidade.

## Architecture and Design

### Decisões

1. **Motor de regras separado do Phaser.** Um módulo puro manterá a fonte de verdade de posição, velocidade, direção, contato com o chão, ataque, vida, energia, formas, inimigos, barreira e mapa. As cenas traduzem teclado/colisões em intenções e redesenham a partir de snapshots. Isso evita que testes dependam de tempo de animação ou de inspecionar sprites.
2. **Arcade Physics para deslocamento e colisões.** O primeiro percurso usa corpos simples, gravidade, plataformas estáticas, sobreposições de item/saída e colisores de inimigo/barreira. A documentação oficial confirma que as cenas Phaser 4 podem instalar Arcade Physics pelo `physics.default` e que o sistema é próprio para colisão 2D leve.
3. **Fase declarativa.** Layout, inimigos, pickups, barreira, saída e rotas serão definidos em dados estáticos. O conteúdo adicional entra por novas definições, não por condicionais espalhados nas cenas.
4. **Valores de balanceamento centralizados.** Vida, dano, custo/dreno de energia, cura e recompensa ficam em constantes de tuning. Os números iniciais são deliberadamente provisórios e serão ajustados após o primeiro playtest sem instruções.
5. **Progresso persistente, reinício local.** Completar a primeira fase libera o nó 2 e salva o progresso. Morrer reconstrói somente a fase inicial: restaura jogador, inimigos, barreira, pickups e energia, preservando apenas progresso de mapa já concluído.
6. **Controles legíveis dentro do jogo.** A HUD exibirá, desde o mapa e durante a fase: `A/D` ou setas para mover, `Espaço` para pular, `J` para atacar e `K` para transformar. Isso mantém o playtest sem instrução externa, mas não exige que a pessoa adivinhe o teclado.
7. **Golpe de força atômico.** Um ataque captura a forma no instante em que é iniciado. Se a energia chegar a zero no mesmo avanço de tempo, o golpe iniciado com a forma de força aplica seu dano e, só depois, a forma retorna a normal.

### Fluxo de jogo

```text
BootScene → WorldMapScene → LevelOneScene ── saída ──→ WorldMapScene
                         ↑       │                         │
                         └─ morte┘                         └─ nó 2 visível/desbloqueado
```

- O mapa inicia com `level-1` disponível e `level-2` bloqueado.
- O primeiro inimigo guarda o caminho principal; derrotá-lo é condição de passagem.
- Depois de plataformas e uma fonte de energia, a barreira exige forma de força e golpe físico.
- O segundo inimigo ocupa a rota baixa; a rota alta permite evitá-lo e alcançar a saída.
- A forma de força drena energia por tempo, causa dano superior e é a única que quebra a barreira.

### Sequência de implementação proposta

1. Instalar `@playwright/test`, criar `playwright.config.ts`, adicionar o script `test:e2e` ao `package.json` e instalar Chromium; criar primeiro os testes unitários, de contrato e end-to-end que guiarão a implementação.
2. Substituir o estado de batalha isolada por domínio de plataforma versionado, usando a nova chave `original-platformer-save-v1` e ignorando o save de batalha antigo, sem migrar nem apagar seu conteúdo.
3. Criar definições de mapa e primeira fase, constantes de balanceamento e regras puras de transição de estado.
4. Expandir `GAME_TEST_API` conforme o contrato, mantendo snapshots clonados e operações determinísticas para testes.
5. Criar shells compiláveis para `WorldMapScene`, `LevelOneScene` e HUD. O mapa-base já permite selecionar `level-1`; depois converter o protótipo em renderização provisória com formas geométricas/cores originais e adicionar o desbloqueio visual da fase 2.
6. Configurar entrada de teclado com os controles fixos da HUD, Arcade Physics, ataques por janela curta, dano por contato com invulnerabilidade breve, pickup, barreira, saída e reinício por derrota.
7. Fazer revisão de consistência Spec Kit, build, testes, medição de FPS/transição e playtest manual sem instruções; só então avaliar ajuste de balanceamento.

## Project Structure

### Documentation (this feature)

```text
specs/005-transformation-platformer/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── game-test-api.md
└── tasks.md                 # criado na próxima etapa, não neste plano
```

### Source Code (repository root)

```text
src/
├── main.ts
├── types/window.d.ts
├── game/
│   ├── config.ts
│   ├── balance/platformerBalance.ts
│   ├── content/firstLevel.ts
│   ├── content/worldMap.ts
│   ├── state/PlatformerState.ts
│   ├── state/PlatformerReducer.ts
│   ├── testing/GameTestApi.ts
│   ├── scenes/BootScene.ts
│   ├── scenes/WorldMapScene.ts
│   ├── scenes/LevelOneScene.ts
│   ├── scenes/HudScene.ts
│   └── presentation/LevelOneRenderer.ts
└── styles/main.css

playwright.config.ts

tests/
├── unit/platformer-state.spec.ts
├── contract/game-test-api.spec.ts
└── e2e/
    ├── first-level.spec.ts
    └── performance.spec.ts
```

**Structure Decision**: manter um único projeto Vite. `state/` concentra regra pura e serializável; `content/` descreve conteúdo; `scenes/` e `presentation/` integram Phaser. `playwright.config.ts` inicia o Vite durante a suíte e define Chromium como navegador alvo. Os arquivos de código hoje usados apenas pelo protótipo (`PrototypeScene.ts`, constantes de animação e o estado de batalha) serão removidos ou substituídos somente durante a implementação aprovada, após os testes de substituição existirem; o asset `public/assets/player/idle/idle_sprite_sheet.png` será preservado intacto.

## Verification Strategy

- **Unidade**: dano normal versus transformado, drenagem/expiração de energia, barreira, morte/reinício, inimigo obrigatório, rota opcional e desbloqueio do mapa.
- **Contrato**: cada mutação exposta por `GAME_TEST_API` devolve snapshot imutável e respeita as pré-condições descritas em `contracts/game-test-api.md`.
- **Integração**: Phaser inicia no mapa, entra na primeira fase, renderiza HUD e retorna ao mapa ao concluir.
- **Playwright**: é executado por `npm.cmd run test:e2e`, inicia o servidor pelo `playwright.config.ts` e confirma primeiro inimigo obrigatório, segundo evitável, transformação quebra barreira, morte reinicia a fase e saída libera nó 2.
- **Desempenho**: `tests/e2e/performance.spec.ts` mede média de FPS após aquecimento e marcas de transição mapa↔fase; exige ao menos 58 FPS e no máximo 1.000 ms por transição local.
- **Manual**: primeiro playtest sem instrução; observar se ataque, energia, transformação e objetivo da barreira são descobertos em até 10 minutos.

## Complexity Tracking

Não há exceções constitucionais nem complexidade adicional a justificar.
