# Estado do projeto

**Data:** 20/07/2026  
**Etapa:** Etapa 1 — auditoria e protótipo da animação idle  
**Stack oficial:** Phaser 4.2.1, TypeScript, Vite e Playwright  

## Arquivos encontrados

O diretório continha somente a pasta `Sprites/`:

- `Sprites/idle_sprite_sheet.png` — PNG RGBA, `1200 × 560`, 735.678 bytes;
- `Sprites/idle_preview.gif` — GIF com transparência indexada, `300 × 560`, 4 quadros, 240 ms por quadro;
- `Sprites/frames/idle_01.png` — PNG RGBA, `238 × 527`;
- `Sprites/frames/idle_02.png` — PNG RGBA, `237 × 529`;
- `Sprites/frames/idle_03.png` — PNG RGBA, `228 × 528`;
- `Sprites/frames/idle_04.png` — PNG RGBA, `235 × 528`;
- `Sprites/index.html` — teste CSS simples anterior;
- `Sprites/README.txt` — descrição do pacote e limitações da remoção automática de fundo;
- `Sprites/1869f6bb-f54b-462e-a2b3-a9ed15e3571d.png` — imagem RGB opaca de referência, `1536 × 1024`.

A spritesheet possui 321.895 pixels totalmente transparentes (47,901%), 16.693 semitransparentes (2,484%) e 333.412 opacos. Todo o contorno externo da folha é transparente. Cada uma das quatro células tem conteúdo até a linha `y=549`, confirmando uma linha inferior comum dentro da grade de 560 px.

## Arquivos ausentes

- `idle_sprite_package.zip` não foi encontrado no projeto nem entre os arquivos soltos da pasta Downloads;
- `AGENTS.md` não existia;
- não havia projeto npm, configuração Vite/TypeScript ou código Phaser;
- o diretório não era um repositório Git.

## Divergências entre esperado e encontrado

- A folha corresponde ao esperado: `1200 × 560`, quatro células de `300 × 560` e canal alfa.
- Os quatro PNGs individuais **não** medem `300 × 560`; eles estão recortados e variam entre `228–238 px` de largura e `527–529 px` de altura.
- Os frames individuais têm entre 37 e 56 pixels não transparentes tocando suas bordas. Portanto, não devem ser tratados como células intercambiáveis sem reposicionamento.
- O PNG adicional de referência não possui canal alfa.

## Alterações realizadas

- Preservação integral de `Sprites/` em `assets_original/idle_sprite_package/`.
- Cópia não processada da folha e dos frames em `public/assets/player/idle/`.
- Confirmação de hash SHA-256 idêntico para a folha encontrada, a cópia original e a cópia pública: `273DF530EA5F9C28FFBC54F632EC51BA113C88CA6DDC8F4C9001F26575031B81`.
- Criação do projeto Phaser 4.2.1 + TypeScript estrito + Vite.
- Criação das cenas `BootScene` e `PrototypeScene`, com tratamento explícito de falha de carregamento.
- Configuração da spritesheet com `frameWidth: 300` e `frameHeight: 560`.
- Criação da animação idle de 4 FPS com os quatro quadros em repetição.
- Renderização centralizada sobre fundo de teste dividido em claro e escuro, com escala visual `0,893×` sem alterar o arquivo.
- Criação de painel responsivo com FPS, quadro atual, escala, dimensões e estado do alfa.
- Criação de `scripts/validate-assets.mjs` para validação automática.
- Ajuste dos scripts npm para executar Vite e TypeScript diretamente pelo Node e usar `--configLoader runner`, evitando o erro de permissão do esbuild observado no Windows restrito.
- A dependência foi fixada exatamente em `phaser: 4.2.1`; o protótipo não usa APIs exclusivas do Phaser 3.

## Comandos executados

```text
rg --files -uu
git status --short --branch
python (runtime incluído) — auditoria de dimensões e alfa
npm install
npm run validate:assets
npm run build
npm run dev -- --host 127.0.0.1
```

Também foi feito teste no navegador local em `http://127.0.0.1:5173/`, incluindo viewport estreito de `390 × 844`.

## Testes aprovados

- Spritesheet existente e legível como PNG válido.
- Dimensões reais `1200 × 560`.
- Grade exata de 4 quadros de `300 × 560`.
- Canal alfa RGBA presente.
- TypeScript estrito sem erros.
- Phaser 4.2.1 instalado e confirmado em `node_modules/phaser/package.json` e `package-lock.json`.
- Build Vite concluído; saída gerada em `dist/`.
- Build direto com TypeScript e Vite concluído com `TSC_EXIT=0` e `VITE_EXIT=0` após a migração para Phaser 4.2.1.
- Página carregada com um canvas de `960 × 620`.
- Teste Playwright no navegador após a migração: idle carregada, aproximadamente 58 FPS, quadro atual atualizado e nenhum erro/aviso no console.
- Idle executada e painel alternando quadros de 1 a 4 a aproximadamente 61 FPS no ambiente de teste.
- Nenhum erro ou aviso no console do navegador.
- Layout estreito sem rolagem horizontal: viewport e largura do documento em 390 px; canvas reduzido para aproximadamente `356 × 230` por CSS.
- Estado de carregamento confirmado como `Spritesheet carregada · idle em execução`.

## Testes reprovados ou ocorrências corrigidas

- O primeiro `npm install` dentro do sandbox falhou com `EPERM` ao acessar o cache do npm; repetido com a permissão necessária e concluído sem vulnerabilidades conhecidas.
- O primeiro build apontou o evento Phaser incorreto `LOAD_ERROR`; corrigido para `FILE_LOAD_ERROR`.
- O Vite/esbuild não conseguiu resolver a configuração dentro do sandbox; build e servidor foram executados fora dele com autorização.
- Os scripts foram ajustados depois dessa ocorrência: agora usam o carregador `runner` e caminhos diretos para os binários locais.
- O build final emite apenas um aviso de bundle grande (`~1,49 MB`, `~341 kB` gzip), esperado porque o Phaser inteiro está no protótipo. Não é falha desta etapa.

## Problemas visuais encontrados

- Há uma sombra cinza/escura residual sob os pés em todos os quadros, mais evidente no fundo claro.
- Existe tremor perceptível entre quadros no cabelo, rosto e contorno do corpo.
- O rosto e a expressão mudam substancialmente; o quarto quadro fecha os olhos.
- Mãos, luvas e o dispositivo do pulso variam em desenho, volume e posição.
- Ombros, tronco, pernas e calçados apresentam pequenas mudanças de proporção.
- Os pés compartilham a mesma linha inferior da spritesheet, mas a geometria dos calçados muda, causando oscilação visual mesmo com a base estável.
- O fundo externo é realmente transparente, mas isso não significa que a remoção tenha sido limpa: sombra e pixels semitransparentes pertencentes ao fundo original permanecem misturados ao personagem.

Não foi aplicada limpeza automática porque ela alteraria evidência visual e exigiria julgamento artístico.

## Limitações atuais

- A idle funciona tecnicamente, mas não deve ser descrita como suave ou pronta para produção.
- O painel informa que o arquivo é RGBA com base na auditoria automática; ele não reprocessa pixels em tempo real no navegador.
- O protótipo não contém física, movimentação, combate, inimigos, mapas, controles ou menus.
- Os frames individuais recortados não são usados pela animação; a spritesheet validada é a fonte em execução.

## Próxima etapa recomendada

Fazer uma revisão visual orientada pelo usuário para decidir se a sombra residual deve ser preservada, suavizada ou removida e, somente após essa decisão, gerar **novas cópias processadas** dos quatro quadros com registro das alterações; os originais devem permanecer intactos.
## API interna de teste

`window.GAME_TEST_API` permite que Playwright e o simulador sem grÃ¡ficos testem o estado verdadeiro, sem depender de coordenadas de tela. ExpÃµe `getState`, `startBattle`, `giveItem`, `damagePlayer`, `winBattle`, `saveGame`, `loadGame` e `resetGame`.

O estado inclui vida do jogador, recursos, inventÃ¡rio, contadores de batalhas e batalha ativa (inimigo, vida, turnos e resultado). A persistÃªncia usa `localStorage` com a chave `original-2d-game-save-v1`.

ValidaÃ§Ã£o Playwright concluÃ­da: iniciar batalha, aplicar dano, conceder item, salvar, carregar, vencer e reiniciar retornou `valid: true`. A cena visual de combate ainda nÃ£o foi implementada.
## Fluxo fixo de desenvolvimento

Convenção permanente do projeto: `Constituição → Especificação → Esclarecimento → Plano técnico → Tarefas → Análise de consistência → Implementação → Convergência + testes`.

O obra/superpowers seleciona automaticamente a disciplina aplicável para cada etapa autorizada, sem pular ou substituir gates. As etapas devem ser executadas passo a passo, sem pressa, registrando decisões, limitações e resultados antes de iniciar a etapa seguinte.
## Governo do processo

O `github/spec-kit` foi definido como chefe do processo. Nenhuma implementaÃ§Ã£o nova deve comeÃ§ar antes de concluir, nesta ordem: ConstituiÃ§Ã£o do projeto, EspecificaÃ§Ã£o, Esclarecimento das dÃºvidas, Plano tÃ©cnico, Lista de tarefas, AnÃ¡lise de consistÃªncia, ImplementaÃ§Ã£o e ConvergÃªncia com a especificaÃ§Ã£o.

Situação atual: a estrutura `.specify/` está inicializada. A partir de 2026-07-20, o GitHub Spec Kit controla o que será feito e o obra/superpowers controla como cada etapa autorizada será executada. Consulte `AGENTS.md`, `SUPERPOWERS_GOVERNANCE.md` e `MEMORY_GOVERNANCE.md`.
