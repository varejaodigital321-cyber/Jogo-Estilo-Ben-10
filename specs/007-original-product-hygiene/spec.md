# Feature Specification: Original Product Hygiene

**Feature Branch**: `codex/007-original-product-hygiene`
**Created**: 2026-07-22
**Status**: Approved
**Input**: Owner approved a complete original-IP rebrand and definitive cleanup of verified repository debt.

## User Scenarios & Testing

### User Story 1 - Trabalhar em um produto original (Priority: P1)

Como proprietário, quero que produto, documentação e repositório não usem a marca ou personagens de terceiros, para que o projeto possa evoluir como IP original.

**Independent Test**: Busca case-insensitive pela marca anterior no conteúdo versionado retorna zero ocorrências.

**Acceptance Scenarios**:

1. **Given** checkout principal, **When** uma pessoa procura referências à marca anterior, **Then** não encontra nomes, instruções ou descrições dela no conteúdo do produto.
2. **Given** a mecânica central, **When** alguém abre o jogo e a documentação, **Then** encontra somente linguagem genérica de forma, energia e dispositivo original.

### User Story 2 - Manter repositório enxuto e portável (Priority: P1)

Como pessoa desenvolvedora, quero clonar somente código, assets canônicos e documentação necessária, para que ferramentas geradas, skills vendorizadas e cópias não aumentem o projeto.

**Independent Test**: Inventário Git não contém `graphify-out/`, `.agents/`, `.claude/`, assets duplicados nem caminhos pessoais; cada asset de runtime tem um único arquivo canônico.

**Acceptance Scenarios**:

1. **Given** um clone limpo, **When** dependências e ferramentas locais geram arquivos, **Then** Git não oferece esses arquivos para commit.
2. **Given** sprite de runtime, **When** a pessoa verifica seu hash, **Then** há uma única cópia rastreada desse conteúdo.

### User Story 3 - Ter base de jogo segura e testável (Priority: P1)

Como pessoa desenvolvedora, quero que código não utilizado seja removido, APIs de teste não apareçam na produção e exista uma verificação automatizada mínima, para que próxima feature comece de base confiável.

**Independent Test**: Build de produção não expõe `GAME_TEST_API`; teste de navegador abre o jogo, encontra canvas e confirma ausência da API de teste na produção.

**Acceptance Scenarios**:

1. **Given** build de produção, **When** a página é aberta, **Then** jogo inicia ou mostra falha explícita de asset, sem cena vazia silenciosa.
2. **Given** ambiente de desenvolvimento, **When** teste de navegador é executado, **Then** cenário mínimo passa sem anunciar telemetria repetitiva a leitor de tela.

### User Story 4 - Usar documentação consistente (Priority: P2)

Como pessoa desenvolvedora, quero instruções sem mojibake, duplicação ou caminhos pessoais, para que qualquer máquina consiga seguir o mesmo fluxo.

**Independent Test**: README e estado não contêm sequências de mojibake, não repetem títulos de governança e usam caminhos relativos.

## Requirements

- **FR-001**: Conteúdo versionado MUST usar somente a identidade original e conter zero referências à marca anterior.
- **FR-002**: Repositório remoto MUST ser renomeado para uma identidade original; URL remota local MUST acompanhar a renomeação.
- **FR-003**: `graphify-out/`, `.agents/` e `.claude/` MUST ficar fora do índice Git; Graphify e skills externas continuam ferramentas locais, não conteúdo do produto.
- **FR-004**: O repositório MUST conter somente um sprite de runtime canônico; cópias idênticas e pacotes fonte redundantes MUST ser preservados em backup externo antes de sair do índice.
- **FR-005**: Código morto de áudio e estado de combate provisório, suas dependências e suas referências MUST ser removido.
- **FR-006**: `GAME_TEST_API` MUST existir somente em desenvolvimento e MUST estar ausente no build de produção.
- **FR-007**: Falha de asset MUST aparecer como erro explícito; painel de diagnóstico MUST usar dados reais ou linguagem estática honesta e não anunciar atualizações contínuas.
- **FR-008**: Configuração MUST ser portátil: sem hook com caminho pessoal, scripts padrão do npm, finais de linha normalizados e typecheck incluindo testes.
- **FR-009**: Pelo menos um teste Playwright MUST validar carregamento de produção e ausência de API de desenvolvimento.
- **FR-010**: README e estado do projeto MUST ter UTF-8 válido, sem títulos duplicados, sem caminhos pessoais e com uma fonte normativa claramente indicada.

## Success Criteria

- **SC-001**: Busca por marca anterior retorna zero resultados no conteúdo versionado.
- **SC-002**: `git ls-files` retorna zero caminhos em `graphify-out/`, `.agents/`, `.claude/`, `Sprites/` e `assets_original/`.
- **SC-003**: Apenas um arquivo rastreado possui hash SHA-256 do sprite de runtime.
- **SC-004**: `npm run build` e `npm run test:e2e` terminam com código 0.
- **SC-005**: `git diff --check` não reporta erro; `.gitattributes` normaliza textos em LF.

## Assumptions

- Nome de produto original escolhido para esta entrega: **Forma Prisma**.
- Mecânica de transformação por energia será preservada como conceito genérico, sem personagem, marca ou visual de terceiros.
- Backup externo é suficiente para arquivos removidos do índice; não haverá deleção do backup nesta feature.
- Feature 005 permanece um plano futuro; esta feature não a implementa nem marca tarefas dela como concluídas.
