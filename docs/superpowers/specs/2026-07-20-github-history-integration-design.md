# Integração do histórico remoto — desenho

**Data:** 2026-07-20  
**Status:** Aprovado pelo proprietário

## Objetivo

Integrar o histórico existente da branch `main` do repositório privado
`varejaodigital321-cyber/Jogo-Estilo-Ben-10` ao checkout local, preservando os
dois lados, sem *force push* e sem remover dados remotos.

## Alternativas avaliadas

1. Integrar em branch dedicada e abrir PR em rascunho — escolhida. Mantém os
   dois históricos e permite revisão antes de alterar a branch remota padrão.
2. Integrar diretamente em `main` — descartada por publicar sem etapa de
   revisão no GitHub.
3. Recriar o checkout a partir do remoto — descartada porque arquivos locais
   não rastreados poderiam ser ocultados ou entrar em conflito operacional.

## Desenho aprovado

1. Configurar `origin` para o repositório privado já validado.
2. Buscar somente as referências remotas necessárias e criar uma branch de
   integração a partir do histórico local.
3. Registrar intencionalmente os arquivos atuais em um commit inicial local,
   excluindo itens ignorados pelo projeto.
4. Mesclar `origin/main` permitindo históricos independentes, sem substituir
   arquivos automaticamente. Havendo conflito, parar e solicitar decisão do
   proprietário para cada arquivo conflitante.
5. Executar verificações de integridade, enviar somente a branch de integração
   e abrir um PR em rascunho para `main`.

## Limites e segurança

- Não usar `push --force`, rebase que reescreva histórico remoto nem exclusão
  de arquivos.
- Não expor nem salvar tokens em arquivos, URLs ou mensagens.
- O PR não será mesclado automaticamente.
- O primeiro commit local incluirá apenas os arquivos rastreáveis do checkout;
  regras existentes de `.gitignore` permanecem em vigor.
