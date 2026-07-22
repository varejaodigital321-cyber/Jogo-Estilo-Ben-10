# Feature Specification: Graphify Artifact Hygiene

**Feature Branch**: `codex/006-graphify-artifact-hygiene`
**Created**: 2026-07-22
**Status**: Approved — amended 2026-07-22
**Input**: User description: "Corrigir arquivos gerados do Graphify versionados sem afetar o desenvolvimento do projeto."

## User Scenarios & Testing

### User Story 1 - Atualizar o grafo sem poluir mudanças (Priority: P1)

Como pessoa desenvolvedora, quero atualizar o grafo sem nenhuma saída Graphify aparecer para commit.

**Why this priority**: Caches rastreados geram centenas de mudanças sem relação com produto.

**Independent Test**: Atualizar o grafo e confirmar que toda saída Graphify continua ignorada pelo Git.

**Acceptance Scenarios**:

1. **Given** um clone limpo, **When** o grafo é atualizado, **Then** nenhuma saída Graphify aparece para commit.
2. **Given** uma saída Graphify muda, **When** a atualização termina, **Then** ela permanece local.

### User Story 2 - Preservar desenvolvimento existente (Priority: P1)

Como pessoa desenvolvedora, quero que a limpeza não remova código, assets, especificações, skills ou trabalho pendente.

**Why this priority**: Higiene de repositório não pode mudar o jogo nem apagar trabalho.

**Independent Test**: Conferir que caminhos removidos do índice pertencem exclusivamente a `graphify-out/`.

**Acceptance Scenarios**:

1. **Given** arquivos fora de `graphify-out`, **When** a limpeza é aplicada, **Then** nenhum deles é removido do índice.
2. **Given** saídas Graphify locais, **When** a limpeza é aplicada, **Then** elas continuam no disco e deixam de ser rastreadas.

### Edge Cases

- Atualização pode trocar versão de cache; versões antigas e novas continuam ignoradas.
- Backup datado, visualização HTML, grafo, relatório e manifesto são derivados locais.

## Requirements

- **FR-001**: O repositório MUST ignorar toda saída gerada pelo Graphify.
- **FR-002**: O repositório MUST manter zero caminhos rastreados sob `graphify-out/`.
- **FR-003**: A limpeza MUST remover do índice somente artefatos Graphify gerados já rastreados.
- **FR-004**: A limpeza MUST preservar código, assets, especificações, skills e alterações fora do escopo Graphify.
- **FR-005**: O projeto MUST documentar comando de validação da regra de ignore.

## Success Criteria

- **SC-001**: Após atualização incremental, o status do Git lista zero caminhos em `graphify-out/`.
- **SC-002**: Caminhos Graphify rastreados reduzem para zero.
- **SC-003**: Nenhum caminho fora de `graphify-out/` é removido do índice.
- **SC-004**: Um comando documentado valida caminhos ignorados e compartilháveis.

## Assumptions

- Toda saída Graphify é local e recriável.
- A limpeza remove somente entradas Git; arquivos locais existentes não são apagados.
- `.agents/`, `specs/`, `.specify/` e código do jogo estão fora do escopo.
