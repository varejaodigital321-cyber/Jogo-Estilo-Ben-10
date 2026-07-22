# Estado do projeto — Forma Prisma

**Data:** 2026-07-22
**Etapa:** protótipo técnico de animação idle.

## Produto atual

- Phaser 4.2.1, TypeScript, Vite e Playwright.
- Uma spritesheet RGBA canônica de 1200 × 560 px, dividida em quatro quadros de 300 × 560 px.
- Canvas com fundo claro e escuro para inspeção visual.
- Nenhum mapa, combate, save, inimigo, transformação jogável ou narrativa foi implementado.

## Qualidade atual

- Build e teste de produção são requisitos de entrega.
- Falha de carregamento de asset aparece explicitamente no canvas.
- Painel técnico não anuncia telemetria contínua a tecnologias assistivas.
- Arte pode apresentar sombra residual e variação entre quadros; isso é material artístico pendente, não falha escondida de runtime.

## Repositório

- Saídas Graphify, configurações de agentes e skills de terceiros não são versionadas.
- Somente a spritesheet de runtime é rastreada. Backup pré-limpeza: `C:\Users\nadso\Documents\Forma-Prisma-archives\forma-prisma-pre-cleanup-20260722.zip`.
- `AGENTS.md` é a fonte operacional; `.specify/memory/constitution.md` é a fonte normativa de princípios.

## Próximo produto

A Feature 005 descreve um jogo futuro e continua pendente. Sua implementação requer ciclo Spec Kit próprio e testes antes de código de produção.
