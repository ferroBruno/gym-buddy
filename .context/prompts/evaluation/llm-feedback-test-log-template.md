# LLM Feedback Test Log Template

Use este template para registrar execucoes manuais dos casos de avaliacao e transformar observacoes em melhorias rastreaveis.

## Registro

```yaml
case_id:
date:
tester:
channel: telegram
workflow: 030-gym-buddy-mvp-telegram
user_message:
expected_intent:
observed_intent:
expected_macro_intent:
observed_macro_intent:
expected_risk_level:
observed_risk_level:
expected_route:
observed_route:
llm_status:
used_final_fallback:
observed_reply:
passed: false
failure_type:
recommended_change:
decision:
```

## Regras de uso

- Nao registrar dados pessoais reais desnecessarios.
- Nao registrar tokens, URLs privadas ou credenciais.
- Sanitizar qualquer conversa real antes de versionar.
- Se a falha envolver seguranca, corrigir guardrail antes de melhorar estilo.
- Se a falha envolver conteudo tecnico ausente, criar ou revisar card curado antes de ampliar prompt.
