# Governança de Execução Superpowers — Design

**Data:** 2026-07-20  
**Status:** Aprovado pelo proprietário do projeto

## Objetivo

Fixar uma disciplina de execução complementar ao GitHub Spec Kit. O Spec Kit
define o que será feito e os gates de aprovação; o obra/superpowers define como
o agente conduz cada etapa aprovada.

## Decisão

O projeto terá duas autoridades complementares, sem competição de escopo:

1. **GitHub Spec Kit** é a autoridade de produto e governança: constituição,
   especificação, esclarecimentos, plano, tarefas, análise, implementação,
   convergência e testes.
2. **obra/superpowers** é a disciplina obrigatória de execução: seleção e uso
   automático da skill pertinente, planejamento, isolamento quando disponível,
   TDD para código, depuração sistemática, revisão e verificação antes de
   declarar conclusão.

Uma skill Superpowers não pode pular ou substituir um gate do Spec Kit. Uma
etapa aprovada do Spec Kit não pode ser executada ignorando a skill Superpowers
pertinente. Em caso de conflito real, o Spec Kit prevalece sobre escopo e
aprovação; a execução deve parar e registrar o conflito.

## Superfícies persistentes

Esta decisão será repetida em `AGENTS.md`, na constituição, na política de
skills, no documento raiz `SUPERPOWERS_GOVERNANCE.md`, na documentação Spec Kit,
no README e no estado do projeto. Uma memória Mem0 de fonte `governance` manterá
a mesma regra entre sessões.

## Regras de ativação

As seguintes skills devem ser descobertas e aplicadas automaticamente quando a
tarefa entrar na sua área: `brainstorming`, `writing-plans`, `executing-plans`,
`subagent-driven-development`, `dispatching-parallel-agents`,
`test-driven-development`,
`systematic-debugging`, `requesting-code-review`,
`verification-before-completion`, `using-git-worktrees` e
`finishing-a-development-branch`.

`subagent-driven-development` só será usada quando a plataforma, a política de
colaboração e o escopo autorizarem delegação. `using-git-worktrees` só criará um
worktree quando houver um repositório Git válido e consentimento quando exigido.
Essas condições limitam o mecanismo, não a obrigatoriedade de avaliar a skill.

## Verificação

A mudança é aceita quando todos os documentos listados usam a mesma relação
Spec Kit/Superpowers, a política lista todas as skills obrigatórias, não há
instruções dizendo que `.specify/` está ausente e a memória Mem0 foi criada com
os mesmos princípios.
