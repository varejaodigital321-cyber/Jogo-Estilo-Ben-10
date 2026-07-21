# Governança automática do gstack-game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> `superpowers:subagent-driven-development` when a collaboration policy permits
> delegation; otherwise use `superpowers:executing-plans` task by task.

**Goal:** Tornar a especialidade de jogo do gstack-game automática e obrigatória
por fase, preservando a governança do Spec Kit e do Superpowers.

**Architecture:** A política YAML passa a ser o mapa operacional verificável;
os documentos-raiz e a constituição explicam a precedência e a memória preserva
a decisão entre sessões. Nenhum código de jogo muda.

**Tech Stack:** Markdown, YAML, JSON, PowerShell, Mem0 e o inventário local de
skills.

## Global Constraints

- O Spec Kit mantém autoridade exclusiva sobre escopo, aprovação e gates.
- Superpowers mantém a disciplina de execução de cada passo autorizado.
- Gstack-game é obrigatório por fase e especialidade, sem comando manual.
- Fase incerta exige `triage`; incapacidade exige registro e bloqueio/fallback.
- Não executar todas as skills ao mesmo tempo nem publicar, testar ou revisar
  fora da fase aplicável.

---

### Task 1: Mapear as 29 skills e os 12 estágios

**Files:**
- Create: `GSTACK_GAME_GOVERNANCE.md`
- Modify: `.specify/skill-policy.yaml`
- Test: `specs/004-gstack-game-governance/quickstart.md` seção 1 e 2

- [ ] **Step 1: Confirmar o inventário antes de editar**

Run:

```powershell
(Get-ChildItem .agents\skills\gstack-game\skills -Directory |
  Where-Object Name -ne shared).Count
```

Expected: `29`.

- [ ] **Step 2: Declarar o mapa de fases e skills**

Adicionar ao YAML a chave `game_specialization: fagemx/gstack-game` e um
`game_workflow.stages` com os doze estágios: `spark`, `think`, `plan`,
`review`, `slice`, `handoff`, `build`, `feel`, `playability`, `test`, `ship` e
`reflect`. Cada estágio inclui suas skills obrigatórias e `triage` é a rota de
fase incerta.

- [ ] **Step 3: Criar a referência de raiz**

Criar `GSTACK_GAME_GOVERNANCE.md` com a tabela dos estágios, as 29 skills, a
regra de seleção automática e a proibição de ativação fora de fase.

- [ ] **Step 4: Executar a validação do mapa**

Run: a seção 2 de `quickstart.md`.

Expected: `GSTACK_POLICY_OK`.

### Task 2: Atualizar as fontes normativas

**Files:**
- Modify: `.specify/memory/constitution.md`
- Modify: `AGENTS.md`
- Modify: `SUPERPOWERS_GOVERNANCE.md`
- Modify: `SPEC_KIT_GOVERNANCE.md`

- [ ] **Step 1: Atualizar a constituição com versão MINOR**

Adicionar um princípio que defina a especialidade gstack e incluir no relatório
de impacto a atualização dos documentos afetados. Manter todos os princípios
anteriores.

- [ ] **Step 2: Atualizar o contrato operacional**

Fazer `AGENTS.md` exigir: detectar a fase antes do trabalho de jogo; chamar
`triage` se ela for incerta; aplicar a skill pertinente; registrar fase,
combinação e limitações; e parar se não existir fallback seguro.

- [ ] **Step 3: Sincronizar as referências de precedência**

Atualizar os dois documentos de governança para declarar: Spec Kit define o
que; Superpowers define como; gstack define a especialidade de jogo.

- [ ] **Step 4: Procurar regras conflitantes**

Run:

```powershell
rg -n "manual|ignorar|deferred" AGENTS.md .specify\memory\constitution.md `
  .specify\skill-policy.yaml SUPERPOWERS_GOVERNANCE.md SPEC_KIT_GOVERNANCE.md
```

Expected: nenhum texto autoriza ignorar uma skill gstack pertinente.

### Task 3: Sincronizar memória e referências de usuário

**Files:**
- Modify: `MEMORY_GOVERNANCE.md`
- Modify: `README.md`
- Modify: `ESTADO_DO_PROJETO.md`
- Modify: `.specify/README.md`
- Test: `specs/004-gstack-game-governance/quickstart.md` seção 3 e 5

- [ ] **Step 1: Atualizar referências locais**

Inserir links para `GSTACK_GAME_GOVERNANCE.md` e a regra de três camadas, sem
duplicar mapas divergentes.

- [ ] **Step 2: Registrar a decisão no Mem0**

Usar `mem0:remember` para armazenar a regra com `source: governance`, citando
as três camadas, roteamento por fase e proibição de omissão silenciosa.

- [ ] **Step 3: Verificar convergência e segredo**

Executar as seções 3 e 5 de `quickstart.md`, verificar que não há token,
credencial ou URL autenticada nos arquivos alterados.

### Task 4: Analisar e revisar antes de concluir

**Files:**
- Modify: `specs/004-gstack-game-governance/tasks.md`
- Test: todas as seções de `specs/004-gstack-game-governance/quickstart.md`

- [ ] **Step 1: Gerar tarefas Spec Kit e analisar consistência**

Relacionar cada requisito FR-001 a FR-008 a uma tarefa e executar
`speckit-analyze` antes da implementação documental.

- [ ] **Step 2: Revisar a mudança**

Usar `requesting-code-review`; se houver feedback, usar
`receiving-code-review` antes de repetir as verificações.

- [ ] **Step 3: Executar evidência final**

Run: todas as seções de `quickstart.md` e `git diff --check`.

Expected: 29 skills, 12 estágios, YAML válido, referências convergentes,
memória encontrada e nenhum segredo exposto.
