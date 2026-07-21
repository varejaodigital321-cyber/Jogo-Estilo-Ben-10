# Feature Specification: Integrar histórico do GitHub

**Feature Branch**: `003-github-history-integration`

**Created**: 2026-07-20

**Status**: Approved — proprietário aprovou em 2026-07-20

**Input**: Integrar o histórico remoto privado existente ao projeto local,
preservando-o, e publicar a integração por meio de um PR em rascunho.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Preservar os dois históricos (Priority: P1)

Como proprietário, quero que o histórico já existente no GitHub e os arquivos
atuais do projeto local permaneçam presentes em uma integração revisável.

**Why this priority**: Evita perda de conteúdo e permite continuar o projeto
com uma única linha de evolução.

**Independent Test**: Comparar os ancestrais e os arquivos da branch de
integração com a referência remota e o commit inicial local.

**Acceptance Scenarios**:

1. **Given** um checkout local sem commits e uma `main` remota existente,
   **When** a integração for preparada, **Then** a branch resultante contém
   ambos os históricos como ancestrais.
2. **Given** arquivos locais e remotos sem colisão de caminho, **When** a
   integração for criada, **Then** os dois conjuntos de arquivos continuam
   disponíveis.
3. **Given** uma colisão de arquivo, **When** a mesclagem a detectar, **Then**
   o processo para sem selecionar ou descartar uma versão automaticamente.

### User Story 2 - Revisar a publicação sem alterar a branch padrão (Priority: P2)

Como proprietário, quero revisar a integração no GitHub antes de ela alterar
`main`.

**Why this priority**: Mantém uma etapa humana de aprovação para a primeira
união dos históricos.

**Independent Test**: Verificar que há uma branch remota de integração e um PR
em rascunho direcionado a `main`, sem novo *force push* ou merge automático.

**Acceptance Scenarios**:

1. **Given** uma integração válida, **When** ela for publicada, **Then** apenas
   a branch de integração será enviada.
2. **Given** a branch publicada, **When** o PR for criado, **Then** ele estará
   em rascunho e terá `main` como base.

### Edge Cases

- Se a autenticação GitHub não estiver disponível, o processo para antes de
  configurar ou enviar o remoto.
- Se houver arquivos locais não relacionados ao projeto, eles não são
  adicionados sem confirmação explícita do proprietário.
- Se a branch remota mudar durante a preparação, o processo atualiza a
  referência e repete a verificação antes do push.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O processo MUST associar o checkout ao repositório privado
  informado pelo proprietário somente após confirmar que ele está acessível.
- **FR-002**: O processo MUST preservar o histórico de `main` existente no
  GitHub e criar uma integração que também preserve o commit inicial local.
- **FR-003**: O processo MUST parar para decisão humana caso arquivos com o
  mesmo caminho exijam resolução de conteúdo.
- **FR-004**: O processo MUST evitar sobrescrever histórico remoto, inclusive
  por *force push*.
- **FR-005**: O processo MUST publicar a integração em uma branch dedicada e
  abrir um PR em rascunho contra `main`; ele MUST NOT mesclar o PR.
- **FR-006**: O processo MUST manter segredos de autenticação fora de arquivos,
  URLs de remoto, logs e conversas.

### Key Entities

- **Histórico remoto**: Linha de commits já existente em `main` no GitHub.
- **Commit inicial local**: Registro dos arquivos rastreáveis presentes no
  checkout antes da integração.
- **Branch de integração**: Branch revisável que une os dois históricos.
- **PR em rascunho**: Revisão no GitHub, sem alteração automática de `main`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A branch de integração possui exatamente dois históricos de
  origem preservados no grafo de commits: o remoto pré-existente e o local
  inicial.
- **SC-002**: A branch remota `main` não recebe *force push* nem commit direto
  durante esta feature.
- **SC-003**: Um PR em rascunho da branch de integração para `main` está
  disponível para revisão do proprietário.
- **SC-004**: Nenhum token ou segredo aparece no status Git, configuração do
  remoto, diffs ou documentação criada pela feature.

## Assumptions

- O proprietário possui permissão de escrita no repositório privado.
- O commit remoto atual pode ser preservado como ancestral da integração.
- O proprietário autoriza que todos os arquivos não ignorados do checkout
  sejam avaliados para o commit inicial, sujeito à inspeção de escopo antes do
  stage.
- A aprovação e o merge final do PR continuam sendo uma decisão do
  proprietário.
