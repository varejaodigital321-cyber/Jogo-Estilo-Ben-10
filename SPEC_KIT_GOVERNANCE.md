# Governança Spec Kit + Superpowers

O GitHub Spec Kit governa o que este projeto fará: escopo, aprovação e ordem de
trabalho. Antes de qualquer ação, o agente deve ler [AGENTS.md](AGENTS.md), a
[constituição](.specify/memory/constitution.md) e a
[política de skills](.specify/skill-policy.yaml).

```text
CONSTITUIÇÃO
    ↓
ESPECIFICAÇÃO
    ↓
ESCLARECIMENTO
    ↓
PLANO TÉCNICO
    ↓
TAREFAS
    ↓
ANÁLISE DE CONSISTÊNCIA
    ↓
IMPLEMENTAÇÃO
    ↓
CONVERGÊNCIA + TESTES
```

O obra/superpowers governa como cada etapa permitida é executada. Suas skills
relevantes são automáticas e não dispensam nenhum gate acima. Em conflito real,
o Spec Kit preserva a autoridade de escopo e aprovação; o agente deve parar e
registrar o conflito.

Consulte [SUPERPOWERS_GOVERNANCE.md](SUPERPOWERS_GOVERNANCE.md) para o mapa de
skills e limites de capability. Não existe autorização implícita para pular
etapas nem para ignorar uma workflow skill aplicável.
