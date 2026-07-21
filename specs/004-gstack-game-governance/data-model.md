# Modelo de dados: Governança automática do gstack-game

## Entidades

| Entidade | Campos obrigatórios | Regras de validação |
|---|---|---|
| Fase de jogo | nome, objetivo, estágio anterior/próximo | Deve ser um dos 12 estágios do fluxo fixo |
| Skill gstack | nome, especialidade, tipo de roteamento | Deve pertencer ao inventário de 29 skills invocáveis |
| Registro de aplicação | feature, fase, skills aplicadas, motivo, limitações | Deve existir no plano ou tarefas antes da implementação de jogo |
| Limitação de capability | skill, capability ausente, impacto, fallback ou bloqueio | Não pode ser interpretada como execução bem-sucedida |
| Regra de precedência | camada, responsabilidade, proibição | Deve preservar Spec Kit > gates, Superpowers > método, gstack > especialidade |

## Relações

- Uma **fase de jogo** seleciona uma ou mais **skills gstack** pertinentes.
- Um **registro de aplicação** referencia uma fase, suas skills e possíveis
  limitações.
- Uma **limitação de capability** pertence a um registro de aplicação.
- A **regra de precedência** limita toda seleção de fase e skill.

## Transições válidas

O fluxo nominal é `Spark → Think → Plan → Review → Slice → Handoff → Build →
Feel → Playability → Test → Ship → Reflect`. Retornos a estágios anteriores são
permitidos quando uma revisão encontra problema; avanço sem o gate Spec Kit
correspondente não é permitido.
