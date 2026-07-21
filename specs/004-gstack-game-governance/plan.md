# Implementation Plan: Governança automática do gstack-game

**Branch**: `004-gstack-game-governance` | **Date**: 2026-07-20 | **Spec**:
[spec.md](spec.md)

## Summary

Estabelecer o gstack-game como terceira camada de governança: Spec Kit mantém
escopo e gates, Superpowers mantém a disciplina de execução e gstack garante a
especialidade de jogo obrigatória, roteada automaticamente pela fase atual.

## Technical Context

**Language/Version**: Markdown, YAML e JSON de governança

**Primary Dependencies**: GitHub Spec Kit, obra/superpowers, fagemx/gstack-game
e Mem0

**Storage**: Arquivos de governança do repositório e uma memória Mem0 marcada
como `source: governance`

**Testing**: Validações de conteúdo, YAML/JSON, inventário das 29 skills e
checagem cruzada de documentos

**Target Platform**: Codex App e Codex CLI no Windows PowerShell

**Project Type**: Governança de um projeto de jogo Phaser/TypeScript

**Performance Goals**: Roteamento determinável antes da primeira ação de cada
tarefa de jogo

**Constraints**: Não criar escopo, não pular gates, não executar skills de
fases incompatíveis, não expor segredos e não alegar skill indisponível como
executada

**Scale/Scope**: 29 skills gstack, 12 estágios e todas as superfícies de
governança já ratificadas

## Constitution Check

| Gate | Antes do plano | Após o desenho |
|---|---|---|
| Processo orientado por especificação | Passa: especificação aprovada antes de alterar a política | Passa: tarefas e análise precederão implementação |
| Stack e compatibilidade | Passa: nenhum código de jogo ou dependência muda | Passa: skills de engine continuam contextuais |
| Estado verdadeiro testável | Passa: não altera mecânicas | Passa: a política exige registros verificáveis |
| Validação antes de avanço | Passa: há quickstart de verificações | Passa: análise e revisão são tarefas explícitas |
| Dados e conteúdo preservados | Passa: alteração é documental e de memória | Passa: não remove assets nem conteúdo |
| Disciplina em camadas | Passa: o desenho conserva Spec Kit e Superpowers | Passa: adiciona gstack sem inverter a precedência |

## Project Structure

```text
specs/004-gstack-game-governance/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/requirements.md
└── tasks.md

docs/superpowers/
├── specs/2026-07-20-gstack-game-governance-design.md
└── plans/2026-07-20-gstack-game-governance.md

AGENTS.md
.specify/memory/constitution.md
.specify/skill-policy.yaml
GSTACK_GAME_GOVERNANCE.md
SUPERPOWERS_GOVERNANCE.md
SPEC_KIT_GOVERNANCE.md
MEMORY_GOVERNANCE.md
README.md
ESTADO_DO_PROJETO.md
```

**Structure Decision**: Esta é uma feature de governança interna. Não cria
contratos externos nem altera `src/`; os contratos são os documentos e o mapa
YAML verificáveis.

## Execution Tasks

### Task 1: Inventariar e mapear o fluxo gstack

**Files:**
- Modify: `.specify/skill-policy.yaml`
- Create: `GSTACK_GAME_GOVERNANCE.md`
- Test: comandos de inventário de `quickstart.md`

- [ ] Confirmar que `.agents/skills/gstack-game/skills/` contém 29 diretórios
  invocáveis, excluindo somente `shared`.
- [ ] Declarar os doze estágios, o `triage` obrigatório para fase incerta e a
  combinação permitida apenas de especialidades pertinentes.
- [ ] Classificar cada uma das 29 skills como roteamento de fase, revisão
  especializada ou proteção de escopo, sem colocá-las em `deferred`.
- [ ] Validar o YAML e comparar a contagem e os nomes com o inventário local.

### Task 2: Emendar o contrato constitucional e operacional

**Files:**
- Modify: `.specify/memory/constitution.md`
- Modify: `AGENTS.md`
- Modify: `SUPERPOWERS_GOVERNANCE.md`
- Modify: `SPEC_KIT_GOVERNANCE.md`

- [ ] Fazer incremento MINOR da constituição, incluindo relatório de impacto,
  para registrar o modelo de três camadas e sua ordem de precedência.
- [ ] Exigir em `AGENTS.md` a classificação automática da fase, o uso de
  `triage` quando necessário e o registro de fase/skills/limitações nos
  artefatos da feature.
- [ ] Atualizar as referências de Superpowers e Spec Kit para esclarecer que
  ambas as camadas permanecem obrigatórias quando gstack é pertinente.
- [ ] Pesquisar contradições que autorizem ativação manual, omissão de gstack
  ou execução fora de fase; corrigir cada ocorrência encontrada.

### Task 3: Propagar a referência de raiz e a memória

**Files:**
- Create: `GSTACK_GAME_GOVERNANCE.md`
- Modify: `MEMORY_GOVERNANCE.md`
- Modify: `README.md`
- Modify: `ESTADO_DO_PROJETO.md`
- Modify: `.specify/README.md`

- [ ] Criar a referência humana de raiz com o fluxo completo, a tabela de
  roteamento e os limites de capability.
- [ ] Sincronizar os documentos de memória, estado e onboarding sem duplicar
  regras contraditórias.
- [ ] Registrar na memória Mem0 a decisão de três camadas com origem
  `governance`, sem tokens, URLs com credenciais ou conteúdo de usuário não
  necessário.
- [ ] Confirmar que cada referência aponta para as fontes normativas corretas.

### Task 4: Analisar, revisar e verificar a convergência

**Files:**
- Modify: `specs/004-gstack-game-governance/tasks.md`
- Test: `specs/004-gstack-game-governance/quickstart.md`

- [ ] Executar análise Spec Kit de consistência entre especificação, plano,
  tarefas e documentos alterados antes de implementar a emenda.
- [ ] Solicitar revisão de código/documentação quando o canal estiver
  disponível e tratar feedback por `receiving-code-review`.
- [ ] Rodar as verificações de estrutura, inventário, YAML/JSON, busca por
  texto obsoleto e memória Mem0.
- [ ] Registrar os resultados reais, limitações e decisão de convergência nos
  artefatos; não declarar conclusão sem evidência nova.
