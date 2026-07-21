# Contrato — `window.GAME_TEST_API`

## Propósito

Este contrato fornece acesso ao **mesmo estado de domínio** usado pelas cenas. É uma ferramenta de teste, não uma segunda implementação de regras. Todos os métodos devolvem uma cópia imutável de `PlatformerState` e lançam erro descritivo para entradas ou transições inválidas.

## Snapshot mínimo

```ts
type PlatformerSnapshot = {
  screen: "world-map" | "level-1";
  player: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    facing: "left" | "right";
    isGrounded: boolean;
    isAttacking: boolean;
    health: number;
    maxHealth: number;
    form: "normal" | "force";
    energy: number;
    maxEnergy: number;
  } | null;
  level: {
    status: "active" | "completed";
    firstEnemyDefeated: boolean;
    secondEnemyDefeated: boolean;
    barrierBroken: boolean;
    collectedEnergyItemIds: string[];
  } | null;
  worldMap: {
    level1: "available" | "completed";
    level2: "locked" | "available";
  };
};
```

## Operações

| Método | Uso em teste | Resultado obrigatório |
|---|---|---|
| `getState()` | ler snapshot | não altera estado |
| `startLevel("level-1")` | entrar pela rota disponível | `screen = "level-1"`, estado novo da fase |
| `attack(targetId)` | testar dano e barreira | reflete dano, derrota ou falha por forma errada |
| `activateForceForm()` | testar transformação | forma `force` se energia disponível |
| `advanceTime(ms)` | testar drenagem | energia reduz e retorno automático à forma normal |
| `collectEnergy(itemId)` | testar pickup | energia aumenta uma única vez |
| `damagePlayer(amount)` | testar vida e morte | saúde não fica negativa; zero reinicia a fase |
| `completeLevel()` | atalho de teste de saída já válida | só conclui se primeiro inimigo foi derrotado e barreira está quebrada; libera nó 2 |
| `resetGame()` | isolamento de teste | limpa save e retorna mapa inicial |
| `saveGame()` / `loadGame()` | persistência de progresso | persiste/recupera somente mapa válido |

## Regras de compatibilidade

- Os métodos de batalha genérica existentes serão removidos junto com o domínio de batalha; os novos testes devem adotar este contrato na mesma mudança.
- A API será anexada antes da criação do jogo, como ocorre hoje em `src/main.ts`.
- A API não pode teleportar o personagem pela fase durante os testes de aceitação. Atalhos só serão usados para isolar regras de domínio, enquanto Playwright cobrirá o fluxo visual e físico.
- `getState()` expõe posição, velocidade, direção, contato com o chão e ataque em curso sincronizados com a cena. Estes campos são a evidência automatizada de movimentação exigida por FR-011.
- `saveGame()` escreve somente em `original-platformer-save-v1`. `loadGame()` ignora `original-2d-game-save-v1`; nenhuma operação desta fatia altera a chave legada.
- Se `attack()` e `advanceTime()` esgotarem a energia no mesmo passo lógico, o teste deve observar o efeito do golpe de força antes do snapshot final retornar `form` para `normal`.
