# Pesquisa técnica — Plataforma de Transformação Inicial

## Decisão 1: Phaser 4 com cenas independentes

**Decisão:** usar `BootScene`, `WorldMapScene`, `LevelOneScene` e `HudScene` com chaves explícitas.

**Motivo:** cenas são a unidade organizacional do Phaser e encapsulam display list, entrada, carregamento e loop. O mapa e a fase têm ciclos de vida diferentes; separá-los evita estados residuais de plataforma quando o jogador retorna ao mapa.

**Alternativas consideradas:**

- Uma única cena com muitos modos: rejeitada porque mistura ciclo de física da fase com a interface do mapa.
- Uma cena por inimigo: rejeitada porque é granularidade excessiva para dois encontros.

## Decisão 2: Arcade Physics para o percurso

**Decisão:** configurar Arcade Physics em Phaser 4 e empregar corpos simples para jogador, plataformas, obstáculos, inimigos e pickup.

**Motivo:** o sistema é leve para colisões 2D e suporta corpos dinâmicos e estáticos, colisores e sobreposições. É suficiente para uma plataforma curta sem criar física própria.

**Alternativa considerada:** Matter Physics. Rejeitada porque não há necessidade de corpos complexos ou simulação física avançada nesta fatia.

## Decisão 3: regras puras como fonte de verdade

**Decisão:** `PlatformerReducer` receberá intenções (`attack`, `transform`, `tick`, `damage`, `collect`, `reachExit`) e devolverá um novo `PlatformerState` validado.

**Motivo:** o estado exigido por FR-011 torna-se verificável diretamente, sem simular frames ou inspecionar objetos Phaser. A cena fica responsável apenas por detectar eventos e refletir o snapshot.

**Alternativa considerada:** guardar toda a regra em callbacks de colisão Phaser. Rejeitada porque acopla mecânica a renderização e torna o teste frágil.

## Decisão 4: dados de conteúdo extensíveis

**Decisão:** definir `LevelDefinition`, `EnemyDefinition`, `EnergyPickupDefinition`, `BarrierDefinition` e `WorldMapNode` em módulos de conteúdo.

**Motivo:** novas fases, inimigos e transformações entram como dados e capacidades, preservando o primeiro recorte pequeno.

**Alternativa considerada:** posições e vida codificadas dentro de `LevelOneScene`. Rejeitada porque torna a expansão planejada mais cara e opaca.

## Decisão 5: persistência só do progresso de mapa

**Decisão:** salvar apenas conclusão/desbloqueio de fase em `localStorage`, na chave `original-platformer-save-v1`; estado transitório da fase não será salvo. O save legado `original-2d-game-save-v1` permanece intacto e será ignorado.

**Motivo:** atende ao registro da conclusão e evita continuar uma fase no meio, o que contradiz a decisão de reiniciar do começo sem checkpoints.

**Alternativa considerada:** sem persistência. Rejeitada porque o mapa perderia o desbloqueio ao recarregar a página; persistência integral foi rejeitada por exceder o escopo.

## Decisão 6: controles mostrados pela HUD

**Decisão:** exibir sempre `A/D ou setas: mover`, `Espaço: pular`, `J: atacar` e `K: transformar` na HUD, inclusive antes de iniciar a primeira fase.

**Motivo:** o playtest deve avaliar se a pessoa entende o uso da transformação, não se ela adivinha teclas. A dica está dentro do produto, portanto não é instrução externa.

**Alternativa considerada:** não mostrar controles. Rejeitada porque confundiria a descoberta do teclado com a clareza do percurso e da barreira.

## Decisão 7: término de energia durante ataque

**Decisão:** cada ataque registra a forma no início. Um golpe iniciado em forma de força mantém dano e capacidade de quebrar barreira até resolver seu impacto, mesmo se o `tick` esgotar a energia no mesmo instante; depois do impacto, o jogador retorna à forma normal.

**Motivo:** elimina resultados dependentes da ordem de atualização entre física, entrada e tempo.

**Alternativa considerada:** cancelar o golpe. Rejeitada porque a resposta visual e mecânica ficaria inconsistente no limite de energia.

## Decisão 8: arte provisória explícita

**Decisão:** renderizar personagens, inimigos, pickups, barreira e nós com primitivas Phaser e paleta original, além de feedback textual e de cor.

**Motivo:** a mecânica é a hipótese atual. Os assets e animações finais serão desenhados após validar a sensação de poder.

**Alternativa considerada:** reutilizar sprites ou materiais das referências. Rejeitada por não ser conteúdo original e não ser necessária ao teste.

## Base externa consultada

- A documentação oficial de [Scenes do Phaser](https://docs.phaser.io/phaser/concepts/scenes) informa que input, physics, objetos e carregamento são plugins da cena e que Arcade pode ser configurado por cena.
- A documentação de [Arcade Physics Sprite](https://docs.phaser.io/api-documentation/4.0.0/class/physics-arcade-sprite) descreve a adequação de AABB para necessidades comuns de jogos 2D.
