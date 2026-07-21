# Governança fixa do projeto: Spec Kit + obra/superpowers

Este arquivo é obrigatório para qualquer agente que opere neste repositório.
Ele estabelece uma disciplina permanente de duas camadas:

- O `github/spec-kit` controla **o que será feito**: escopo, prioridades,
  aprovação e a ordem obrigatória do ciclo de desenvolvimento.
- O `obra/superpowers` controla **como a IA executará** cada passo já
  autorizado: escolha de skill, planejamento, isolamento, TDD, depuração,
  revisão e verificação.

As duas camadas são complementares e não podem ser separadas. Nenhum agente,
skill, plugin, ferramenta ou decisão local pode ignorar uma delas. Esta regra só
pode ser alterada por pedido explícito do proprietário, acompanhado da emenda
da constituição, especificação, plano, tarefas e análise correspondentes.

## Autoridade e precedência

O Spec Kit é a autoridade final sobre escopo, gates e aprovação. Superpowers é
a disciplina obrigatória dentro do gate que o Spec Kit autorizou.

- Uma skill Superpowers nunca autoriza pular Constituição, Especificação,
  Esclarecimento, Plano, Tarefas ou Análise de consistência.
- Uma etapa Spec Kit autorizada nunca permite ignorar uma skill Superpowers que
  corresponda à tarefa.
- Se houver conflito real, o agente MUST parar, registrar o conflito no
  artefato ativo e preservar a decisão do Spec Kit sobre escopo e aprovação.
- Limitação de plataforma (por exemplo, falta de Git, worktree ou subagente)
  MUST ser informada e registrada; ela não permite alegar que a workflow skill
  foi aplicada quando não foi.

## Bloqueio obrigatório do Spec Kit

Antes de editar, escrever, reescrever, codar, instalar, remover, migrar ou
alterar qualquer arquivo do projeto, o agente MUST passar pelos artefatos Spec
Kit na ordem abaixo:

1. Constituição do projeto: `.specify/memory/constitution.md`
2. Especificação: `specs/<feature>/spec.md`
3. Esclarecimento das dúvidas
4. Plano técnico: `specs/<feature>/plan.md`
5. Lista de tarefas: `specs/<feature>/tasks.md`
6. Análise de consistência
7. Implementação
8. Convergência com a especificação e testes

Se a etapa necessária não existir, estiver incompleta ou não estiver aprovada,
PARAR. Não inferir autorização e não implementar como atalho. A única exceção é
a inicialização ou correção desta própria infraestrutura de governança, quando
solicitada pelo proprietário; mesmo nessa exceção, a mudança MUST ser
documentada, analisada e verificada antes de ser declarada concluída.

## Disciplina automática obra/superpowers

Consultar `.specify/skill-policy.yaml` antes de agir. As skills Superpowers
instaladas são automáticas e obrigatórias por aderência de área; o proprietário
nunca precisa solicitá-las manualmente. O agente MUST ler a instrução atual da
skill aplicável antes da primeira ação da área correspondente.

- `using-superpowers`: no início de toda conversa/tarefa para descobrir skills
  aplicáveis.
- `brainstorming`: antes de criar ou mudar comportamento, para desenhar a
  solução e obter a aprovação exigida.
- `writing-plans`: depois de uma especificação aprovada e antes de uma tarefa
  de múltiplas etapas.
- `using-git-worktrees`: antes da execução de um plano quando Git e isolamento
  estiverem disponíveis; requer consentimento quando a skill o exigir.
- `subagent-driven-development`: para planos com tarefas delegáveis, somente
  quando a política de colaboração e a plataforma autorizarem subagentes.
- `dispatching-parallel-agents`: para duas ou mais investigações ou tarefas
  independentes, somente quando a política de colaboração autorizar delegação.
- `executing-plans`: para executar o plano em linha quando a delegação não for
  apropriada ou permitida.
- `test-driven-development`: para toda alteração de código de produção.
- `systematic-debugging`: para diagnóstico e correção de falhas ou regressões.
- `requesting-code-review` e `receiving-code-review`: para revisão de mudanças
  de implementação quando o ambiente e a política permitirem.
- `verification-before-completion`: antes de qualquer alegação de conclusão,
  correção, sucesso de teste ou prontidão para revisão/entrega.
- `finishing-a-development-branch`: ao encerrar uma implementação em um
  repositório Git válido.
- `writing-skills`: ao criar ou alterar uma skill local.

Uma skill não aplicável não deve ser forçada. O agente MUST registrar por que
ela não se aplica ou qual limitação de capacidade impediu sua execução.

## Procedimento automático

- Ler a constituição e a política de skills no início de toda tarefa.
- Identificar a feature e os artefatos Spec Kit correspondentes antes de tocar
  no código.
- Combinar as skills Spec Kit e Superpowers relevantes em cada etapa e
  registrar a combinação no artefato da tarefa.
- Não executar implementação, edição de código ou comando de estado enquanto a
  análise de consistência não estiver concluída.
- Registrar decisões, dúvidas, aprovação, resultados, limitações e desvios nos
  artefatos e na memória de governança quando aplicável.
- Ao concluir, verificar convergência com a especificação e executar os testes
  ou verificações relevantes antes de declarar a tarefa pronta.

## Regras já ratificadas

- Stack: Phaser 4.2.1, TypeScript, Vite e Playwright.
- APIs exclusivas do Phaser 3 são proibidas.
- O estado real deve ser testável por `window.GAME_TEST_API`.
- O trabalho é passo a passo, sem pressa, com revisão antes do teste final.
- A referência humana resumida está em `SUPERPOWERS_GOVERNANCE.md`; a
  constituição e este arquivo são as fontes normativas locais.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
