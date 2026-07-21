# Mem0 — exportação do projeto

Projeto: `jogo-estilo-ben-10`  
Usuário: `nadso`  
Exportado em: `2026-07-20`

Este arquivo é um backup portátil das memórias do projeto. Em outro chat, importe-o no projeto `jogo-estilo-ben-10` ou use-o como contexto inicial.

---
id: 28fb270b-9042-4751-a2de-b3080aa6e343
created_at: 2026-07-20T08:14:39-07:00
type: convention
confidence: 1
branch: main
files: .specify/skill-policy.yaml, AGENTS.md
categories: technology, professional_details
---
Ativação automática de skills do projeto: fase atual foundation. Sempre ativar sem pedido as skills Spec Kit (constitution, specify, clarify, plan, tasks, analyze, checklist, converge), router, careful, guard, triage, game-ideation, game-direction, pitch-review, game-review, game-eng-review, plan-design-review, architecture-planner, game-import, game-docs, asset-review e Playwright (dev, devops, triage). Manter deferidas até especificação aprovada as skills de implementação, combate, áudio, narrativa, balanceamento, publicação e engine específica. A política está em `.specify/skill-policy.yaml` e é subordinada ao `AGENTS.md` e ao Spec Kit.

---
id: 2a209196-61b8-40f6-9ba3-4f2822773e05
created_at: 2026-07-20T08:07:20-07:00
type: convention
confidence: 1
branch: main
files: AGENTS.md, .specify/memory/constitution.md
categories: professional_details, technology
---
Regra inviolável: `github/spec-kit` é o chefe de processo do projeto. Antes de qualquer edição, escrita, reescrita, código, instalação ou outra alteração, a IA deve ler a constituição e passar pela sequência Spec Kit: Constituição → Especificação → Esclarecimento → Plano técnico → Tarefas → Análise de consistência → Implementação → Convergência/testes. Se os artefatos necessários não existirem ou não estiverem aprovados, parar; a única exceção é inicializar/corrigir a própria infraestrutura de governança quando solicitado.

---
id: 8cb65594-d34a-4903-93ef-fa9e0b638c3e
created_at: 2026-07-20T07:35:32-07:00
type: decision
confidence: 1
branch: main
files: AGENTS.md, .specify/memory/constitution.md
categories: professional_details, technology
---
Governo principal do projeto: usar `github/spec-kit` como chefe do processo. Ordem obrigatória: Constituição do projeto → Especificação → Esclarecimento das dúvidas → Plano técnico → Lista de tarefas → Análise de consistência → Implementação → Convergência com a especificação. Não iniciar implementação antes das etapas anteriores.

---
id: 855ac8ef-9826-41de-9535-c599251743cd
created_at: 2026-07-20T07:31:10-07:00
type: convention
confidence: 1
branch: main
files: README.md, ESTADO_DO_PROJETO.md
categories: professional_details
---
Fluxo fixo de trabalho do projeto: IDEIAS → ANÁLISE DO JOGO → ESPECIFICAÇÃO → APROVAÇÃO → PLANO → TAREFAS → EXECUÇÃO → REVISÃO → TESTE. As etapas devem ser seguidas passo a passo, sem pressa, antes de avançar.

---
id: 2711ef13-341e-41d3-bfc2-868ad6fc7cd0
created_at: 2026-07-20T17:57:52-07:00
type: task_learning
confidence: 1
branch: main
files: package.json, src/main.ts, src/game/testing/GameTestApi.ts, src/game/audio/AudioMixer.ts, AGENTS.md, .specify/skill-policy.yaml
categories: technology, project_state
---
Snapshot técnico do projeto jogo-estilo-ben-10 (20/07/2026): protótipo web 2D com Phaser 4.2.1, TypeScript estrito, Vite e Playwright; não usar APIs exclusivas do Phaser 3. Assets idle preservados em `assets_original/idle_sprite_package` e consumidos em `public/assets/player/idle`; spritesheet 1200x560 RGBA com 4 quadros de 300x560; protótipo visual idle, sem combate visual, mapas ou controles completos. Dependências: inkjs 2.4.0 para runtime de narrativas Ink, axe-core 4.12.1 e @axe-core/playwright 4.12.1 para acessibilidade, howler 2.2.4 e @types/howler 2.2.13. Mixer `AudioMixer.ts` com canais Master, Música, Efeitos, Interface, Ambiente e Voz, volumes em dB; ainda sem assets de áudio. API interna real `window.GAME_TEST_API` em `src/main.ts`: getState, startBattle, giveItem, damagePlayer, winBattle, saveGame, loadGame, resetGame; estado inclui vida, recursos, itens, progressão e batalha, save em localStorage. API validada no navegador com Playwright e `valid:true`; TypeScript passou `TSC_EXIT=0` e build Vite foi executado. Spec Kit CLI instalado via uv (specify 0.12.12.dev0), integração Codex instalada; `.specify/memory/constitution.md`, `.specify/skill-policy.yaml`, `AGENTS.md` e `SPEC_KIT_GOVERNANCE.md` governam o projeto. Fase atual foundation: skills de Spec Kit, descoberta, arquitetura, assets, Playwright e segurança automáticas; implementação, combate, áudio, narrativa, balanceamento, publicação e engine específica deferidas até especificação aprovada.
