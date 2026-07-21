# Memória do projeto — Feature 005: Plataforma de Transformação Inicial

**Atualizada:** 2026-07-21  
**Branch:** `005-transformation-platformer`  
**Status:** planejamento corrigido; reanálise Spec Kit obrigatória antes de qualquer implementação.

## Visão e limites

- Jogo de plataforma 2D original inspirado apenas pelo ritmo e estrutura das
  referências fornecidas. Não reutilizar personagens, nomes, arte, narrativa,
  código ou identidade visual das referências.
- A primeira fatia tem uma fase jogável, dois inimigos, uma transformação de
  força, uma barreira rompível e mapa-múndi de dois nós. A fase 2 aparece como
  desbloqueada, mas não é jogável ainda.
- Arte, sprites e animações finais estão fora do escopo. Usar placeholders
  originais até o primeiro playtest validar a mecânica.

## Decisões de gameplay

- O primeiro inimigo bloqueia o caminho principal e deve ser derrotado.
- O segundo inimigo pode ser enfrentado ou evitado por uma rota alta de
  plataformas.
- A forma normal usa golpe físico, causa dano, mas inimigos exigem vários
  golpes normais.
- A única transformação inicial é temporária, usa energia visível, causa mais
  dano e rompe a barreira específica.
- Energia recarrega ao derrotar inimigos e coletar itens de energia.
- Morrer reinicia a fase inteira sem checkpoint, restaurando vida, energia,
  inimigos, barreira e pickups.
- Controles internos: `A/D` ou setas movem, `Espaço` salta, `J` ataca e `K`
  transforma. A HUD mostra essas ações sem depender de instrução externa.
- Se a energia termina no mesmo instante de um golpe de força, o golpe resolve
  como força e só depois o jogador retorna à forma normal.

## Arquitetura e testes

- Stack fixa: Phaser 4.2.1, TypeScript, Vite e Playwright. APIs exclusivas de
  Phaser 3 são proibidas.
- Regras de plataforma ficam em estado puro separado da renderização Phaser.
- `window.GAME_TEST_API` expõe o estado real: posição, velocidade, direção,
  contato com o chão, ataque, vida, forma, energia, inimigos, barreira e mapa.
- Progresso do mapa usa somente `original-platformer-save-v1`. O save legado
  `original-2d-game-save-v1` é preservado e ignorado.
- Desempenho planejado: média de pelo menos 58 FPS após aquecimento e transição
  mapa↔fase em até 1.000 ms no ambiente local.
- O asset `public/assets/player/idle/idle_sprite_sheet.png` deve permanecer
  intacto quando o código de protótipo for retirado.

## Governança e estado dos artefatos

- Especificação, esclarecimentos, plano técnico e 34 tarefas existem em
  `specs/005-transformation-platformer/`.
- A análise Spec Kit encontrou seis lacunas e elas foram corrigidas no plano,
  modelo de dados, contrato e tarefas.
- Próximo gate: repetir `speckit-analyze`; implementação permanece bloqueada
  até a reanálise aprovada.
- `tasks.md` contém o registro explícito de skills usadas e pendentes por gate.

## Ferramentas

- O Graphify possui grafo anterior disponível para consulta, mas a reconstrução
  completa falhou porque a instalação local exige credencial de LLM para 404
  documentos/imagens e há divergência de versões entre skill 0.9.8 e pacote
  0.9.22. Não forçar atualização somente de código, pois ela deixaria o grafo
  documental desatualizado.
