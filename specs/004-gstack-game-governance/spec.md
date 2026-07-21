# Feature Specification: Governança automática do gstack-game

**Feature Branch**: `004-gstack-game-governance`

**Created**: 2026-07-20

**Status**: Approved — proprietário aprovou em 2026-07-20

**Input**: Tornar o `fagemx/gstack-game` uma regra fixa na raiz, com ativação
automática e obrigatória da skill de jogo compatível com a fase e a
especialidade, sem comandos manuais.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Receber especialidade de jogo automaticamente (Priority: P1)

Como proprietário, quero que toda tarefa relacionada ao jogo receba a skill
gstack pertinente automaticamente, para que design, experiência, qualidade e
lançamento nunca sejam ignorados por falta de um comando manual.

**Why this priority**: O gstack cobre aspectos do jogo que não são aprofundados
pelo Spec Kit ou pelo Superpowers.

**Independent Test**: Ler o contrato de agentes e a política de skills e
confirmar que cada fase do fluxo gstack possui roteamento automático,
obrigatório e registrável.

**Acceptance Scenarios**:

1. **Given** uma tarefa de jogo cuja fase é identificável, **When** a IA inicia
   o trabalho, **Then** ela invoca a skill gstack da especialidade pertinente
   sem comando manual do proprietário.
2. **Given** uma tarefa de jogo com fase incerta, **When** a IA não puder
   classificá-la, **Then** ela executa `triage` antes de escolher outra skill.
3. **Given** uma skill gstack requerida, **When** ela estiver indisponível,
   **Then** a IA registra o bloqueio e não finge que a especialidade foi
   aplicada.

### User Story 2 - Manter papéis de governança sem conflito (Priority: P2)

Como proprietário, quero que gstack, Spec Kit e Superpowers trabalhem juntos
sem permitir que uma camada pule as obrigações da outra.

**Why this priority**: A automação só é segura se preservar escopo, aprovação e
disciplina de execução.

**Independent Test**: Comparar os documentos de governança e confirmar a mesma
ordem de precedência e os mesmos limites.

**Acceptance Scenarios**:

1. **Given** uma feature fora dos gates de Spec Kit, **When** uma skill gstack
   for pertinente, **Then** ela não autoriza implementação antecipada.
2. **Given** uma fase e especialidade gstack aplicáveis, **When** um plano for
   executado, **Then** a IA também segue a skill Superpowers correspondente.

### User Story 3 - Localizar a regra na raiz e na memória (Priority: P3)

Como proprietário, quero encontrar a política em todos os documentos de
governança e na memória do projeto, para que novas sessões não a percam.

**Why this priority**: A política precisa sobreviver a mudanças de sessão,
ferramenta ou agente.

**Independent Test**: Pesquisar os documentos de referência e a memória por
uma declaração coerente do modelo de três camadas.

**Acceptance Scenarios**:

1. **Given** uma nova sessão, **When** ela carrega a governança do projeto,
   **Then** encontra a obrigatoriedade do roteamento gstack por fase.

### Edge Cases

- Uma fase de jogo desconhecida exige `triage`; a IA não pode selecionar uma
  skill por conveniência.
- Skills de lançamento, QA ou retrospectiva não executam fora da fase
  correspondente, embora permaneçam automaticamente elegíveis.
- Se mais de uma especialidade for necessária, a IA combina somente as skills
  pertinentes e registra a razão da combinação.
- Limitações de plataforma não permitem omitir a skill; exigem bloqueio ou
  fallback seguro registrado.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A constituição MUST estabelecer o gstack-game como a camada
  obrigatória de especialidade de jogo, subordinada aos gates do Spec Kit.
- **FR-002**: `AGENTS.md` MUST exigir a identificação automática da fase de
  jogo e a invocação da skill gstack pertinente sem comando manual.
- **FR-003**: A política de skills MUST mapear o fluxo completo
  `Spark → Think → Plan → Review → Slice → Handoff → Build → Feel → Playability
  → Test → Ship → Reflect` a skills obrigatórias por especialidade.
- **FR-004**: A política MUST tornar `triage` obrigatório antes de outro
  roteamento gstack quando a fase for incerta.
- **FR-005**: A política MUST declarar que nenhuma skill gstack pode pular um
  gate Spec Kit, substituir uma skill Superpowers pertinente ou ampliar escopo
  aprovado.
- **FR-006**: Os artefatos da feature MUST registrar fase, skills gstack
  aplicadas, combinações e limitações relevantes.
- **FR-007**: A raiz MUST conter uma referência humana do fluxo e de suas
  regras de ativação automática.
- **FR-008**: A memória local e a memória Mem0 de governança MUST registrar o
  modelo de três camadas e sua obrigatoriedade.

### Key Entities

- **Fase de jogo**: Posição atual no fluxo de criação, construção, validação ou
  lançamento do jogo.
- **Roteamento gstack**: Decisão automática que conecta a fase e a necessidade
  à skill de especialidade obrigatória.
- **Registro de aplicação**: Evidência no artefato Spec Kit das skills usadas,
  da fase detectada e de quaisquer limitações.
- **Modelo de três camadas**: Relação entre Spec Kit, Superpowers e gstack-game.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Os doze estágios do fluxo gstack possuem uma regra explícita de
  roteamento na política do projeto.
- **SC-002**: As 29 skills fornecidas pelo gstack-game são classificadas como
  automáticas por fase, especialidade ou proteção de escopo; nenhuma depende de
  solicitação manual.
- **SC-003**: Todas as superfícies de governança nomeadas contêm a mesma
  precedência: Spec Kit define escopo, Superpowers disciplina a execução e
  gstack-game aprofunda o jogo.
- **SC-004**: Toda feature de jogo futura consegue registrar fase, skills
  aplicadas e limitação de capability em seu artefato de plano ou tarefas.

## Assumptions

- As 29 skills gstack-game permanecem instaladas no diretório de skills do
  projeto; o diretório compartilhado não é uma skill invocável.
- A ativação automática por fase não significa executar simultaneamente skills
  incompatíveis.
- A aprovação de escopo e o merge de mudanças continuam sob as regras já
  ratificadas do Spec Kit.
