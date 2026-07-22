# Feature Specification: Graphify Artifact Hygiene

**Feature Branch**: `codex/006-graphify-artifact-hygiene`
**Created**: 2026-07-22
**Status**: Approved
**Input**: User description: "Corrigir arquivos gerados do Graphify versionados sem afetar o desenvolvimento do projeto."

## User Scenarios & Testing

### User Story 1 - Atualizar o grafo sem poluir mudanças (Priority: P1)

Como pessoa desenvolvedora, quero atualizar o grafo sem cache e temporários aparecerem para commit.

**Why this priority**: Caches rastreados geram centenas de mudanças sem relação com produto.

**Independent Test**: Atualizar o grafo e confirmar que caminhos de cache continuam ignorados pelo Git.

**Acceptance Scenarios**:

1. **Given** um clone limpo, **When** o grafo é atualizado, **Then** caches, backups e visualizações locais não aparecem para commit.
2. **Given** um artefato compartilhável do grafo muda, **When** a atualização termina, **Then** ele continua rastreável.

### User Story 2 - Preservar desenvolvimento existente (Priority: P1)

Como pessoa desenvolvedora, quero que a limpeza não remova código, assets, especificações, skills ou trabalho pendente.

**Why this priority**: Higiene de repositório não pode mudar o jogo nem apagar trabalho.

**Independent Test**: Conferir que caminhos removidos do índice pertencem exclusivamente a `graphify-out/` e não estão na lista de artefatos compartilháveis.

**Acceptance Scenarios**:

1. **Given** arquivos fora de `graphify-out`, **When** a limpeza é aplicada, **Then** nenhum deles é removido do índice.
2. **Given** `graph.json`, `GRAPH_REPORT.md` e `manifest.json`, **When** a limpeza é aplicada, **Then** os três continuam rastreados.

### Edge Cases

- Atualização pode trocar versão de cache; versões antigas e novas continuam ignoradas.
- Backup datado e visualização HTML são derivados locais.
- Remoção legítima de artefato compartilhável continua visível ao Git.

## Requirements

- **FR-001**: O repositório MUST ignorar caches, temporários, backups e visualizações gerados pelo Graphify.
- **FR-002**: O repositório MUST manter rastreáveis `graph.json`, `GRAPH_REPORT.md` e `manifest.json`.
- **FR-003**: A limpeza MUST remover do índice somente artefatos Graphify gerados já rastreados.
- **FR-004**: A limpeza MUST preservar código, assets, especificações, skills e alterações fora do escopo Graphify.
- **FR-005**: O projeto MUST documentar comando de validação da regra de ignore.

## Success Criteria

- **SC-001**: Após atualização incremental, o status do Git lista zero caminhos em `graphify-out/cache/`.
- **SC-002**: Arquivos de cache rastreados reduzem de 389 para zero.
- **SC-003**: Nenhum caminho fora de `graphify-out/` é removido do índice.
- **SC-004**: Um comando documentado valida caminhos ignorados e compartilháveis.

## Assumptions

- `graph.json`, `GRAPH_REPORT.md` e `manifest.json` são saídas compartilháveis.
- Outras saídas do Graphify são locais e recriáveis.
- `.agents/`, `specs/`, `.specify/` e código do jogo estão fora do escopo.
