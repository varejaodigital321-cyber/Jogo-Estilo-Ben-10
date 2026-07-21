# Disciplina fixa de execução: obra/superpowers

## Contrato permanente

Este projeto usa duas camadas obrigatórias de governança:

| Camada | Responsabilidade | Autoridade |
|---|---|---|
| GitHub Spec Kit | Define **o que** será feito, por que, em qual ordem e após qual aprovação | Escopo, aprovação e gates |
| obra/superpowers | Define **como** a IA executa cada passo já autorizado | Disciplina de execução |

O Spec Kit decide o ciclo: Constituição → Especificação → Esclarecimento →
Plano → Tarefas → Análise → Implementação → Convergência e testes.

Superpowers é obrigatório por área de atuação e não requer ativação manual. A
skill aplicável é escolhida automaticamente no início da tarefa e antes de sua
primeira ação. Uma skill não pode pular uma fase Spec Kit. Uma fase Spec Kit não
pode ser executada ignorando a skill Superpowers pertinente.

## Skills automáticas

| Skill | Aplicação obrigatória |
|---|---|
| `using-superpowers` | Início de toda tarefa; descobre skills aplicáveis |
| `brainstorming` | Antes de criação ou mudança de comportamento |
| `writing-plans` | Após especificação aprovada, em trabalho de múltiplas etapas |
| `using-git-worktrees` | Antes de executar plano quando Git e consentimento permitirem |
| `subagent-driven-development` | Implementação delegável autorizada por plataforma e política |
| `dispatching-parallel-agents` | Duas ou mais tarefas independentes autorizadas para delegação |
| `executing-plans` | Execução em linha de plano aprovado |
| `test-driven-development` | Alteração de código de produção |
| `systematic-debugging` | Diagnóstico ou correção de falha/regressão |
| `requesting-code-review` / `receiving-code-review` | Revisão de implementação e tratamento de feedback |
| `verification-before-completion` | Antes de alegar conclusão, correção ou sucesso |
| `finishing-a-development-branch` | Encerramento em repositório Git válido |
| `writing-skills` | Criação ou alteração de skill local |

## Limites obrigatórios

- Se a plataforma não fornecer Git, worktrees, subagentes ou canal de revisão,
  o agente registra a limitação e usa o fallback seguro definido pela skill.
- A limitação de capability não permite fingir que a workflow skill foi
  executada nem permite pular validação.
- Se houver conflito, o trabalho para e a decisão Spec Kit é preservada até o
  proprietário decidir.
- Esta política só muda por solicitação explícita do proprietário e emenda
  registrada da constituição e dos artefatos Spec Kit afetados.

## Fontes de verdade

1. `AGENTS.md` — contrato operacional normativo.
2. `.specify/memory/constitution.md` — princípio constitucional.
3. `.specify/skill-policy.yaml` — mapa automático de ativação.
4. `MEMORY_GOVERNANCE.md` e Mem0 — continuidade entre sessões.
