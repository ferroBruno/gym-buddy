# Gym Buddy Scripts

Esta pasta contem automacoes locais pequenas e revisaveis.

Scripts apoiam as skills em `.context/skills/` sem substituir revisao humana quando houver decisao de produto, seguranca ou runtime.

## Scripts atuais

- `Validate-WorkflowExports.ps1`: valida exports JSON de workflows n8n.
- `Test-KnowledgeBoundaries.ps1`: checa se Raw Knowledge nao entrou em artefatos de runtime.
- `Run-LocalSmokeTests.ps1`: valida Compose, n8n local e webhooks smoke opcionais.
- `Test-DocLinks.ps1`: valida links markdown locais.
- `Test-RuntimeEnv.ps1`: checa variaveis obrigatorias e readiness de tunnel quando solicitado.
- `Test-Workflow030Regression.ps1`: valida regressões conhecidas do workflow MVP Telegram, incluindo fallback antigo, atribuição n8n, macro-intent, classificador restrito e versão ativa opcional do n8n.

## Regra atual

Nao adicionar scripts destrutivos ou que alterem segredos locais sem decisao explicita.
