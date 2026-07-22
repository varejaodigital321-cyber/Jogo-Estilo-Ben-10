# Governança operacional

`.specify/memory/constitution.md` define princípios. Este arquivo define execução.

Antes de alterar o projeto: ler constituição, `skill-policy.yaml`, spec, plano, tarefas e análise da feature ativa. Implementar somente após aprovação registrada. Verificar build/testes antes de concluir.

Usar skills disponíveis no ambiente Codex por aderência: planejamento para trabalho multi-etapa, worktree para isolamento, TDD para código de produção, depuração para falhas e verificação antes de conclusão. Skills e hooks externos não são vendorizados pelo repositório.

Stack: Phaser 4.2.1, TypeScript, Vite e Playwright. APIs exclusivas do Phaser 3 são proibidas.

`graphify-out/` é saída local ignorada. Quando Graphify estiver disponível, consultar o grafo antes de perguntas sobre código e atualizar após mudanças de código.
