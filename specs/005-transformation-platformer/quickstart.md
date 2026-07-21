# Quickstart — validação local

## Pré-requisitos

- Node.js compatível com Vite 6
- Dependências instaladas no diretório do projeto
- Chromium instalado para Playwright

## Executar o jogo

```powershell
npm.cmd install
npm.cmd run dev
```

Abra a URL local mostrada pelo Vite. A HUD mostra os controles dentro do jogo: `A/D` ou setas movem, `Espaço` salta, `J` ataca e `K` transforma. No mapa, selecione a primeira fase.

## Verificações obrigatórias após implementação

```powershell
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd run test:e2e
```

## Roteiro manual mínimo

1. Inicie uma sessão nova: o mapa mostra somente a primeira fase disponível.
2. Entre na fase e derrote o primeiro inimigo com mais de um golpe normal.
3. Colete energia, ative a forma de força e rompa a barreira com golpe físico.
4. Escolha enfrentar ou evitar o segundo inimigo pela rota de plataformas.
5. Chegue à saída e confirme que o nó da fase 2 ficou disponível no mapa.
6. Em nova tentativa, perca toda a vida e confirme que a primeira fase voltou ao estado inicial.

## Playtest de descoberta

Entregue o controle a uma pessoa sem explicar os comandos. Observe se ela identifica ataque, objetivo da barreira, energia e transformação e conclui a fase em até 10 minutos. Registre hesitações e pontos de morte antes de alterar valores de balanceamento.
