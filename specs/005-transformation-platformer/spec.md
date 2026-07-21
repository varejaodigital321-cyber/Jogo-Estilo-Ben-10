# Feature Specification: Plataforma de Transformação Inicial

**Feature Branch**: `005-transformation-platformer`

**Created**: 2026-07-20

**Status**: Approved — proprietário aprovou em 2026-07-21

**Input**: Criar a primeira fatia jogável de um jogo de plataforma 2D original
focado na sensação de se transformar para vencer inimigos e obstáculos. A
referência externa informa apenas ritmo e estrutura; não autoriza reutilização
de personagens, nomes, arte, narrativa ou código.

## Clarifications

### Session 2026-07-21

- Q: Como a energia de transformação recarrega? → A: Ao derrotar inimigos e ao coletar itens de energia na fase.
- Q: Quando a vida do jogador chega a zero, onde ele reinicia? → A: Do começo da primeira fase, sem pontos de controle neste primeiro teste.
- Q: Os inimigos da primeira fase são obrigatórios? → A: O primeiro deve ser derrotado; o segundo pode ser enfrentado ou evitado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Superar o primeiro percurso (Priority: P1)

Como jogador, quero atravessar uma fase curta com saltos, obstáculos e dois
inimigos, para experimentar o deslocamento, o combate e a saída da fase.

**Why this priority**: Esta é a menor experiência que permite validar se a
base de plataforma e combate é compreensível.

**Independent Test**: Uma pessoa inicia a fase, alcança a saída e confirma que
encontrou os dois inimigos e o obstáculo previsto, sem instrução externa.

**Acceptance Scenarios**:

1. **Given** uma nova partida na primeira fase, **When** o jogador avança,
   salta e usa o ataque normal, **Then** ele consegue ultrapassar obstáculos
   comuns e causar dano aos inimigos.
2. **Given** o primeiro inimigo, **When** o jogador o atinge uma única vez na
   forma normal, **Then** o inimigo permanece ativo e mostra que recebeu dano.
3. **Given** o segundo encontro, **When** o jogador atravessa o percurso
   entre os encontros, **Then** ele encontra novos saltos ou obstáculos antes
   de chegar ao inimigo.
4. **Given** o primeiro inimigo, **When** ele ainda está ativo, **Then** o
   caminho principal permanece bloqueado até que ele seja derrotado.
5. **Given** o segundo inimigo, **When** o jogador encontra uma rota de salto
   alternativa, **Then** ele pode alcançar a saída sem derrotá-lo.

---

### User Story 2 - Transformar-se para vencer um bloqueio (Priority: P1)

Como jogador, quero ativar uma forma temporária de força, para causar mais
dano e romper uma barreira que não pode ser superada na forma normal.

**Why this priority**: A transformação é a promessa central do jogo e deve
alterar tanto o combate quanto a exploração.

**Independent Test**: Uma pessoa chega à barreira, transforma-se, usa o golpe
físico e abre o caminho sem ajuda.

**Acceptance Scenarios**:

1. **Given** energia de transformação disponível, **When** o jogador ativa a
   transformação, **Then** a forma de força fica visualmente distinguível e a
   energia passa a diminuir durante seu uso.
2. **Given** um inimigo ativo, **When** o jogador o atinge transformado,
   **Then** o dano causado é maior do que o golpe equivalente na forma normal.
3. **Given** uma barreira rompível, **When** o jogador a atinge transformado,
   **Then** a barreira deixa de bloquear o percurso.
4. **Given** energia de transformação esgotada, **When** a duração termina,
   **Then** o jogador retorna à forma normal e não pode usar o golpe de força
   até haver energia disponível novamente.
5. **Given** um inimigo derrotado ou um item de energia coletado, **When** o
   evento é concluído, **Then** a energia de transformação do jogador aumenta.

---

### User Story 3 - Avançar pelo mapa-múndi (Priority: P2)

Como jogador, quero ver um mapa de caminhos entre fases, para entender que
concluir uma fase libera a rota da próxima.

**Why this priority**: O mapa cria a estrutura de exploração e expansão do
jogo, sem exigir várias fases completas no primeiro teste.

**Independent Test**: Após concluir a primeira fase, o jogador vê a rota para
a segunda fase como disponível no mapa.

**Acceptance Scenarios**:

1. **Given** a primeira fase ainda não foi concluída, **When** o jogador vê o
   mapa-múndi, **Then** apenas a primeira fase está disponível.
2. **Given** o jogador alcançou a saída da primeira fase, **When** retorna ao
   mapa-múndi, **Then** a rota para a segunda fase está liberada.

### Edge Cases

- Se o jogador sofre dano repetidamente, o estado de vida não pode ficar
  negativo nem permitir continuar após a derrota.
- Quando a vida do jogador chega a zero, a primeira fase reinicia do começo,
  restaurando inimigos, barreira, vida e energia.
- Se a energia se esgota durante um golpe de força, o golpe iniciado conclui
  de modo consistente e a forma normal retorna em seguida.
- Se o jogador tenta romper uma barreira na forma normal, a barreira permanece
  intacta e o feedback deixa claro que outro recurso é necessário.
- Se o jogador evita o segundo inimigo, a saída da fase continua acessível.
- Se a fase é reiniciada, inimigos, barreira, vida e energia retornam ao
  estado inicial da fase.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O jogo MUST apresentar uma primeira fase jogável composta por
  percurso de plataforma, obstáculos, dois encontros de inimigos e uma saída.
- **FR-002**: O jogador MUST poder mover-se, saltar e atacar na forma normal.
- **FR-003**: Inimigos MUST possuir vida e exigir mais de um golpe normal para
  serem derrotados.
- **FR-003a**: O primeiro inimigo MUST bloquear o caminho principal até ser
  derrotado.
- **FR-003b**: O segundo inimigo MUST poder ser evitado por uma rota
  alternativa de plataforma, sem impedir a conclusão da fase.
- **FR-004**: O jogador MUST possuir vida e receber feedback ao sofrer dano.
- **FR-004a**: Ao chegar a zero de vida, o jogador MUST reiniciar do começo da
  primeira fase, sem ponto de controle nesta fatia.
- **FR-005**: O jogo MUST disponibilizar uma única transformação inicial de
  força com golpe físico mais poderoso que o golpe normal.
- **FR-006**: A transformação MUST ser limitada por energia visível e retornar
  automaticamente à forma normal quando a energia se esgotar.
- **FR-006a**: Derrotar inimigos e coletar itens de energia MUST restaurar uma
  quantidade visível de energia de transformação.
- **FR-007**: O golpe da transformação MUST causar mais dano aos inimigos e
  romper barreiras marcadas como rompíveis.
- **FR-008**: Barreiras rompíveis MUST impedir o avanço até serem atingidas
  pela forma de força.
- **FR-009**: Ao alcançar a saída da primeira fase, o jogo MUST registrar sua
  conclusão e liberar a rota para a segunda fase no mapa-múndi.
- **FR-010**: O mapa-múndi MUST representar fases como nós conectados por
  caminhos, com fases indisponíveis distintas das liberadas.
- **FR-011**: O estado de movimentação, combate, vida, transformação, energia,
  barreira e progresso de fase MUST ser observável por testes automatizados.
- **FR-012**: A primeira fatia MUST usar conteúdo visual provisório quando
  necessário; criação ou processamento de sprites e animações finais não faz
  parte deste escopo.

### Key Entities

- **Jogador**: Entidade controlada, com vida, forma atual, energia e ações de
  movimento, salto e ataque.
- **Forma de força**: Estado temporário que aumenta a eficácia do golpe físico
  e permite romper barreiras específicas.
- **Inimigo**: Obstáculo de combate com vida, resposta a golpes e condição de
  derrota.
- **Barreira rompível**: Bloqueio do percurso que só desaparece após o golpe
  da forma de força.
- **Fase**: Percurso com estado de conclusão e rota correspondente no mapa.
- **Mapa-múndi**: Conjunto de fases e caminhos que expressa disponibilidade de
  progresso.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Uma pessoa sem instrução externa conclui a primeira fase e
  libera a rota da segunda em uma sessão de até 10 minutos.
- **SC-002**: Em playtest observado, a pessoa identifica que a barreira exige
  transformação e a rompe sem explicação textual adicional.
- **SC-003**: Os dois inimigos da primeira fase exigem mais de um golpe normal;
  o primeiro é derrotado para liberar o caminho principal e o segundo pode ser
  enfrentado ou evitado sem bloquear a saída.
- **SC-003a**: Ao chegar a zero de vida, o jogador retorna ao estado inicial da
  primeira fase com inimigos, barreira, vida e energia restaurados.
- **SC-004**: O uso da forma de força termina automaticamente ao esgotar a
  energia e deixa o estado do jogador claramente legível.
- **SC-004a**: Derrotar um inimigo ou coletar um item de energia aumenta a
  energia de transformação de forma visível e verificável.
- **SC-005**: Testes automatizados verificam os estados de movimentação,
  combate, vida, transformação, energia, barreira e desbloqueio de fase.

## Assumptions

- O primeiro protótipo terá apenas uma fase jogável completa; a segunda será
  representada no mapa como destino desbloqueado, mas não precisa estar
  implementada nesta fatia.
- A forma normal pode derrotar inimigos, porém é menos eficiente que a forma
  de força.
- A energia começa disponível em quantidade suficiente para demonstrar ao
  menos uma transformação na primeira fase e é recarregada por inimigos
  derrotados e itens de energia; as quantidades serão ajustadas no playtest.
- O jogo permanece original e não usa elementos protegidos das referências
  fornecidas pelo usuário.
- A implementação deverá respeitar Phaser 4.2.1, TypeScript, Vite, Playwright
  e o contrato de teste `window.GAME_TEST_API`, conforme a constituição.
