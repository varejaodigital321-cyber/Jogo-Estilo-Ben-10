<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0 (MINOR: added a non-negotiable execution-discipline principle)
- Modified principles: Governance expanded; all previous principles retained
- Added sections: Principle 6 — Two-layer execution discipline; explicit amendment procedure
- Removed sections: none
- Templates checked: ✅ .specify/templates/spec-template.md, plan-template.md and tasks-template.md remain compatible
- Runtime guidance synchronized: ✅ AGENTS.md, SUPERPOWERS_GOVERNANCE.md,
  SPEC_KIT_GOVERNANCE.md, .specify/README.md, README.md and ESTADO_DO_PROJETO.md
- Follow-up TODOs: none
-->

# Constituição do projeto

**Versão:** 1.1.0  
**Ratificação:** 2026-07-20  
**Última alteração:** 2026-07-20

## Princípios

### 1. Processo orientado por especificação

Toda implementação nova MUST ser precedida por especificação, esclarecimento
das dúvidas, plano técnico, tarefas e análise de consistência. A implementação
MUST convergir com os artefatos aprovados.

### 2. Stack e compatibilidade explícitas

O jogo MUST usar Phaser 4.2.1, TypeScript, Vite e Playwright. Código novo MUST
evitar APIs exclusivas do Phaser 3.

### 3. Estado verdadeiro testável

Mecânicas de jogo MUST expor estado verificável por testes. A API
`window.GAME_TEST_API` é o contrato interno para testes sem depender de
coordenadas visuais.

### 4. Validação antes de avanço

Cada etapa MUST registrar decisões, limitações e resultados. TypeScript, build
e testes relevantes MUST passar antes da etapa seguinte.

### 5. Dados e conteúdo preservados

Assets originais, narrativas Ink e dados de balanceamento MUST permanecer
rastreáveis. Alterações destrutivas ou processamento de conteúdo MUST ser
evitados sem aprovação explícita.

### 6. Disciplina de execução em duas camadas

O GitHub Spec Kit MUST governar o que será feito: escopo, aprovação e a ordem
do ciclo. O obra/superpowers MUST governar como cada passo autorizado é
executado: seleção automática de skills por área, desenho, planejamento,
isolamento quando disponível, TDD para código, depuração sistemática, revisão e
verificação antes de conclusão. Nenhuma camada pode ser usada para pular a
outra. Em conflito real, a decisão do Spec Kit sobre escopo e gate prevalece e
o agente MUST parar e registrar o conflito. Uma capability indisponível MUST
ser informada; nunca pode ser ocultada como execução bem-sucedida.

## Governança

O Spec Kit é a autoridade do processo e o Superpowers é a disciplina obrigatória
de execução. A política operacional detalhada está em `AGENTS.md` e
`.specify/skill-policy.yaml`; a referência de raiz é
`SUPERPOWERS_GOVERNANCE.md`.

Alterações nesta constituição ou nessa relação de duas camadas exigem pedido
explícito do proprietário, justificativa, atualização dos artefatos afetados,
análise de consistência e verificação. A versão segue semver: MAJOR para
redefinição incompatível, MINOR para princípio ou seção materialmente nova e
PATCH para esclarecimento sem mudança semântica. A revisão de consistência
ocorre antes da implementação; a convergência com a especificação ocorre depois
dos testes e verificações aplicáveis.
