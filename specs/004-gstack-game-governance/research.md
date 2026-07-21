# Research: Governança automática do gstack-game

## Decisão: ativar por fase e especialidade, não simultaneamente

**Rationale:** O proprietário exige ativação automática e irrenunciável, mas
skills de lançamento, QA e retrospectiva têm pré-condições incompatíveis entre
si. Roteamento por fase oferece obrigatoriedade sem ação fora de contexto.

**Alternatives considered:** Ativar as 29 em toda tarefa foi rejeitado porque
quebraria o fluxo e confundiria resultados. Acionar somente por comando foi
rejeitado porque permite omissão.

## Decisão: `triage` resolve fase incerta

**Rationale:** `triage` é a skill do gstack dedicada a classificar o estado do
projeto e indicar a próxima rota. Ela evita seleção por conveniência.

**Alternatives considered:** Inferência silenciosa pela IA foi rejeitada porque
não deixa evidência nem trata sinais contraditórios.

## Decisão: preservar a precedência das três camadas

**Rationale:** Spec Kit continua determinando escopo/aprovação; Superpowers
continua governando método de execução; gstack adiciona profundidade própria de
jogo. A regra impede que uma skill de domínio avance implementação sem gate.

**Alternatives considered:** Dar precedência a gstack foi rejeitado por
permitir que recomendações de jogo alterassem escopo aprovado.

## Decisão: excluir `shared` da contagem de skills

**Rationale:** O inventário local contém 30 diretórios, mas `shared` é apoio
interno. Os 29 diretórios restantes são skills invocáveis.

**Alternatives considered:** Contar todos os diretórios produziria uma
validação incorreta e contrariaria o contrato do plugin.

## Decisão: indisponibilidade bloqueia ou usa fallback registrado

**Rationale:** A exigência do proprietário é que a especialidade jamais seja
silenciosamente ignorada. Quando não há skill ou capability, a limitação deve
ser visível antes da ação dependente.

**Alternatives considered:** Prosseguir sem a skill foi rejeitado por violar a
política permanente.
