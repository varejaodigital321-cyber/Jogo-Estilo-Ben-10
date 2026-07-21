# Modelo de dados — Plataforma de Transformação Inicial

## Tipos centrais

| Entidade | Campos principais | Invariantes |
|---|---|---|
| `PlatformerSave` | `version`, `worldMap` | gravado em `original-platformer-save-v1`; versão reconhecida; só progresso persistente |
| `WorldMapState` | `selectedNodeId`, `completedNodeIds`, `unlockedNodeIds` | `level-1` sempre disponível; `level-2` só desbloqueia com conclusão de `level-1` |
| `LevelRunState` | `levelId`, `status`, `player`, `enemies`, `barriers`, `pickups`, `exitReached` | só existe durante a fase; recriado em estado `active` na morte |
| `PlayerState` | `position`, `velocity`, `facing`, `isGrounded`, `isAttacking`, `health`, `maxHealth`, `form`, `energy`, `maxEnergy`, `invulnerabilityMs` | `0 ≤ health ≤ maxHealth`; `0 ≤ energy ≤ maxEnergy`; forma de força requer energia positiva; posição e velocidade usam números finitos |
| `EnemyState` | `id`, `health`, `maxHealth`, `status`, `isMandatory` | um inimigo derrotado não recebe dano nem bloqueia passagem |
| `BarrierState` | `id`, `status`, `requiredForm` | só sai de `intact` para `broken` por golpe de forma de força |
| `EnergyPickupState` | `id`, `status`, `energyAmount` | um pickup coletado não restaura energia novamente |

## Formas e estados

```text
PlayerForm: normal | force
RunStatus: active | completed
EnemyStatus: active | defeated
BarrierStatus: intact | broken
PickupStatus: available | collected
MapNodeStatus: available | locked | completed
```

## Ações do domínio

| Ação | Pré-condição | Efeito observável |
|---|---|---|
| `startLevel(levelId)` | nó disponível | cria estado inicial da primeira fase |
| `attack(targetId)` | jogador ativo; alvo ao alcance na cena | captura a forma no início; reduz vida; pode derrotar inimigo ou quebrar barreira |
| `activateForceForm()` | energia acima de zero | muda `form` para `force` e inicia drenagem |
| `tick(elapsedMs)` | fase ativa | reduz invulnerabilidade e energia; retorna para `normal` depois de resolver eventual golpe de força já iniciado |
| `damagePlayer(amount)` | fase ativa | reduz vida; em zero, reconstrói a fase inicial |
| `collectEnergy(id)` | pickup disponível | marca coleta e soma energia até o máximo |
| `defeatEnemy(id)` | inimigo ativo com vida zero | marca derrota e adiciona recompensa de energia |
| `reachExit()` | primeiro inimigo derrotado; caminho alcançado fisicamente | conclui fase, atualiza mapa e libera `level-2` |

## Entrada e transição atômica

| Entrada | Ação de domínio | Feedback obrigatório na HUD |
|---|---|---|
| `A` / `D` ou setas | movimentar à esquerda/direita | rótulo de movimento sempre visível |
| `Espaço` | salto | rótulo de salto sempre visível |
| `J` | `attack(targetId)` quando há alvo ao alcance | rótulo de ataque sempre visível |
| `K` | `activateForceForm()` | rótulo de transformação e medidor de energia visíveis |

Quando ataque e esgotamento de energia ocorrem no mesmo avanço, a resolução é: capturar forma → aplicar impacto → drenar/reverter forma. O snapshot posterior mostra `form: normal` quando a energia chegou a zero.

## Estado observável de movimentação

O snapshot do jogador sempre expõe `position: { x, y }`, `velocity: { x, y }`,
`facing`, `isGrounded` e `isAttacking`. A cena sincroniza esses valores com o
resultado do Arcade Physics; testes não precisam ler sprites ou coordenadas do
canvas para verificar movimento, salto ou janela de ataque.

## Balanceamento inicial (provisório)

Os valores finais não fazem parte da especificação; os nomes abaixo serão constantes para ajuste após playtest:

| Constante | Objetivo |
|---|---|
| `PLAYER_MAX_HEALTH` | número de erros de contato tolerados antes do reinício |
| `NORMAL_ATTACK_DAMAGE` | garantir que todo inimigo sobreviva ao primeiro golpe normal |
| `FORCE_ATTACK_DAMAGE` | diferença claramente perceptível de potência |
| `FORCE_ENERGY_DRAIN_PER_SECOND` | limitar a forma temporária |
| `ENERGY_PICKUP_RESTORE` | recompensar exploração |
| `ENEMY_DEFEAT_ENERGY_REWARD` | recompensar combate |
| `CONTACT_DAMAGE` | comunicar risco sem matar instantaneamente |

## Relações

```text
WorldMapState ── contém ──> MapNode(level-1) ── desbloqueia ──> MapNode(level-2)
LevelRunState ── contém ──> PlayerState
LevelRunState ── contém ──> EnemyState[primeiro obrigatório, segundo opcional]
LevelRunState ── contém ──> BarrierState[forma de força]
LevelRunState ── contém ──> EnergyPickupState
```
