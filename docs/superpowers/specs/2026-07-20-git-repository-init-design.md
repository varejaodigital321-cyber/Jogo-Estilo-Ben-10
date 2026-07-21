# Inicialização do repositório Git — Design

**Data:** 2026-07-20  
**Status:** Aprovado conceitualmente pelo proprietário; aguardando revisão deste registro

## Problema

O projeto contém uma pasta `.git` vazia. Ela faz o diretório parecer um
repositório, mas `git rev-parse --is-inside-work-tree` retorna erro 128. Não há
metadados, branch, histórico ou remoto utilizáveis.

## Alternativas consideradas

1. **Inicializar no local com branch `main` (selecionada):** `git init -b main`
   recria os metadados válidos sem tocar nos arquivos de trabalho. É a menor
   alteração capaz de corrigir o problema.
2. Remover a pasta `.git` e inicializar em seguida: rejeitada porque o diretório
   já está vazio; a remoção acrescentaria uma ação destrutiva sem benefício.
3. Inicializar, criar commit e configurar remoto: fora do escopo atual. Um
   commit precisa de identidade Git e um remoto exige URL e autorização
   explícita.

## Desenho aprovado

1. Criar os artefatos Spec Kit para `002-git-repository-init`.
2. Confirmar que a análise de consistência não encontra conflito de escopo.
3. Executar `git init -b main` no diretório do projeto, preservando todos os
   arquivos existentes.
4. Validar que Git reconhece o work tree, a branch atual é `main` e `git status`
   é legível.
5. Não adicionar, remover, commitar, configurar identidade ou publicar arquivos.

## Critérios de aceitação

- `git rev-parse --is-inside-work-tree` retorna `true`.
- `git branch --show-current` retorna `main`.
- `git status --short --branch` é executável e não informa erro de repositório.
- Nenhum remoto é configurado e nenhum commit é criado.

## Limites

Esta mudança só inicializa o repositório local. A decisão de registrar um
snapshot inicial, criar branch de trabalho ou conectar GitHub/GitLab continua
com o proprietário.
