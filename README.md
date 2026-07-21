# Protótipo da animação idle

Etapa técnica inicial de um jogo 2D original para navegador. Este protótipo usa Phaser **4.2.1**, TypeScript e Vite apenas para carregar, reproduzir e auditar a animação idle existente. Corrida, pulo, combate, mapas e demais mecânicas ainda não fazem parte do escopo.

Playwright é usado para a verificação da aplicação no navegador. O código deve permanecer compatível com Phaser 4.2.1 e não pode introduzir APIs exclusivas do Phaser 3.

## Requisitos

- Node.js 20 ou mais recente
- npm 10 ou mais recente
- navegador moderno

## Instalar e iniciar

No PowerShell, entre primeiro no diretório do projeto:

```bash
cd "C:\Users\nadso\Downloads\Projetos IA\Jogo Estilo Ben 10"
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173/`.

No PowerShell com política que bloqueia `npm.ps1`, use `npm.cmd`:

```powershell
Set-Location "C:\Users\nadso\Downloads\Projetos IA\Jogo Estilo Ben 10"
npm.cmd install
npm.cmd run dev
```

Se o PowerShell não encontrar `npm.cmd`, use o caminho completo instalado pelo Node.js:

```powershell
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## Validar e gerar o build

```bash
npm run validate:assets
npm run build
```

Os scripts usam o carregador `runner` do Vite para evitar o erro de permissão do esbuild ao resolver `vite.config.ts` em alguns ambientes Windows restritos.

O build de produção é gerado em `dist/`. A validação automática confirma a existência da spritesheet, o cabeçalho PNG, as dimensões `1200 × 560`, o canal alfa e a divisão em quatro células de `300 × 560`.

## Localização dos ativos

- Originais preservados: `assets_original/idle_sprite_package/`
- Cópias consumidas pelo jogo: `public/assets/player/idle/`
- Material que já estava no diretório: `Sprites/`

Nenhum ativo original foi redimensionado, limpo ou sobrescrito. A folha pública possui o mesmo hash SHA-256 da folha encontrada.

## Ajustar a velocidade da idle

Edite `PLAYER_IDLE_FRAME_RATE` em `src/game/constants/animations.ts`. O valor inicial auditado é `4` quadros por segundo. Alterar essa constante não modifica as imagens.

## Estrutura principal

```text
src/
├── main.ts
├── game/
│   ├── config.ts
│   ├── constants/animations.ts
│   └── scenes/
│       ├── BootScene.ts
│       └── PrototypeScene.ts
└── styles/main.css
```

Consulte `ESTADO_DO_PROJETO.md` para os resultados da auditoria e as limitações visuais reais.
## API interna de teste

A pÃ¡gina expÃµe `window.GAME_TEST_API` para testes Playwright e simuladores lerem o estado real:

```ts
window.GAME_TEST_API = {
  getState,
  startBattle,
  giveItem,
  damagePlayer,
  winBattle,
  saveGame,
  loadGame,
  resetGame,
};
```

`getState()` devolve uma cÃ³pia do estado. As operaÃ§Ãµes de batalha, itens, dano, vitÃ³ria e persistÃªncia alteram o runtime; `saveGame()` e `loadGame()` usam `localStorage`. A API estÃ¡ pronta para testes de contrato, mas ainda nÃ£o representa uma cena visual de combate.
## Fluxo fixo de desenvolvimento

Toda mudança deve seguir a sequência obrigatória do GitHub Spec Kit:

`Constituição → Especificação → Esclarecimento → Plano técnico → Tarefas → Análise de consistência → Implementação → Convergência + testes`

O obra/superpowers seleciona automaticamente a disciplina aplicável para executar cada etapa já autorizada; ele não pode pular nem substituir um gate. O trabalho é incremental e sem pressa; decisões, limitações e resultados devem ser registrados.
## Governo do processo

O `github/spec-kit` Ã© a autoridade principal para organizar o desenvolvimento. A ordem obrigatÃ³ria Ã©:

`ConstituiÃ§Ã£o do projeto â†’ EspecificaÃ§Ã£o â†’ Esclarecimento das dÃºvidas â†’ Plano tÃ©cnico â†’ Lista de tarefas â†’ AnÃ¡lise de consistÃªncia â†’ ImplementaÃ§Ã£o â†’ ConvergÃªncia com a especificaÃ§Ã£o`

O Spec Kit está inicializado neste repositório. O obra/superpowers executa automaticamente a disciplina adequada dentro de cada etapa aprovada; consulte `AGENTS.md` e `SUPERPOWERS_GOVERNANCE.md` antes de iniciar qualquer mudança.
