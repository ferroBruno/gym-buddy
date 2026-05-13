---
type: doc
name: knowledge-inventory-schema
description: Manual inventory schema for Gym Buddy knowledge-base files
category: knowledge
generated: 2026-05-13
status: draft
language: pt-BR
---

# Knowledge Inventory Schema - Gym Buddy

## Objetivo

Definir o schema manual para inventariar arquivos da base de conhecimento antes de qualquer auditoria, conversao ou uso operacional.

O inventario registra metadados, classificacao preliminar, risco e recomendacao de tratamento. Ele nao autoriza consulta direta do agente a Raw Knowledge.

## Schema

```json
{
  "fileId": "string",
  "fileName": "string",
  "filePath": "string",
  "fileType": "pdf | docx | md | txt | sheet | image | other",
  "source": "google_drive | local | manual",
  "authorOrSource": "string | unknown",
  "date": "string | unknown",
  "mainTopic": "string",
  "secondaryTopics": ["string"],
  "contentType": "technical_reference | expert_note | user_feedback | workout_example | safety_reference | operational_note | response_example | evaluation_case | other",
  "recommendedLayer": "raw | curated_technical_knowledge | behavioral_safety_guardrails | session_playbooks | response_generation | evaluation",
  "priority": "high | medium | low",
  "directUseRisk": "low | medium | high",
  "sensitiveFlags": [
    "pain",
    "injury",
    "clinical_condition",
    "absolute_load",
    "individual_prescription",
    "rehabilitation",
    "promise_of_results",
    "body_image",
    "supplements_or_medication",
    "none"
  ],
  "conversionRecommendation": "string",
  "reviewRequired": true,
  "traceabilityNotes": "string",
  "agentBehaviorImpact": "string",
  "notes": "string"
}
```

## Campos

| Campo | Obrigatorio | Descricao |
|---|---|---|
| `fileId` | Sim | Identificador estavel do item no lote. Pode ser ID do Drive, hash manual ou codigo interno. |
| `fileName` | Sim | Nome do arquivo. |
| `filePath` | Sim | Caminho local, caminho no Drive ou referencia manual. Nao incluir URL privada sensivel. |
| `fileType` | Sim | Tipo do arquivo conforme enum do schema. |
| `source` | Sim | Origem do arquivo: Google Drive, local ou manual. |
| `authorOrSource` | Sim | Autor, fonte conhecida ou `unknown`. |
| `date` | Sim | Data do arquivo, publicacao, coleta ou `unknown`. |
| `mainTopic` | Sim | Tema principal em texto curto. |
| `secondaryTopics` | Sim | Lista de temas secundarios. Pode ser vazia. |
| `contentType` | Sim | Natureza predominante do conteudo. |
| `recommendedLayer` | Sim | Camada recomendada apos leitura preliminar. |
| `priority` | Sim | Prioridade de revisao ou conversao. |
| `directUseRisk` | Sim | Risco caso o conteudo seja usado diretamente pelo agente. |
| `sensitiveFlags` | Sim | Flags de sensibilidade. Usar `none` apenas quando nenhuma outra flag se aplicar. |
| `conversionRecommendation` | Sim | Recomendacao curta sobre manter, converter, revisar ou descartar do uso operacional. |
| `reviewRequired` | Sim | Deve permanecer `true` para qualquer conteudo que possa influenciar o agente. |
| `traceabilityNotes` | Sim | Notas para rastrear origem, lote e relacao com documentos futuros. |
| `agentBehaviorImpact` | Sim | Impacto esperado no comportamento do agente se convertido. |
| `notes` | Nao | Observacoes adicionais. |

## Valores recomendados

### `recommendedLayer`

- `raw`: manter como material bruto.
- `curated_technical_knowledge`: consolidar como conhecimento tecnico geral.
- `behavioral_safety_guardrails`: transformar em regra de seguranca, escopo ou redirecionamento.
- `session_playbooks`: transformar em fluxo operacional de sessao.
- `response_generation`: transformar em padrao de resposta, tom ou exemplo.
- `evaluation`: transformar em caso de teste ou criterio de qualidade.

### `priority`

- `high`: seguranca, comportamento central, contradicao relevante ou tema recorrente.
- `medium`: utilidade clara, mas sem urgencia de seguranca.
- `low`: material redundante, amplo, futuro ou pouco acionavel.

### `directUseRisk`

- `high`: risco de prescricao individual, diagnostico, reabilitacao, promessa, carga absoluta, dados sensiveis ou memoria longitudinal.
- `medium`: conteudo tecnico util, mas dependente de revisao, contexto ou delimitacao.
- `low`: conteudo geral, operacional e pouco sensivel.

## Regras de preenchimento

- Nao deixar arquivos fora do inventario por parecerem irrelevantes.
- Nao marcar conteudo como pronto para runtime.
- Nao copiar trechos extensos de materiais brutos.
- Nao incluir segredos, tokens, URLs privadas ou dados pessoais reais.
- Nao usar `none` em `sensitiveFlags` junto com outras flags.
- Marcar `reviewRequired` como `true` sempre que houver possibilidade de conversao.
- Registrar contradicoes em `notes` ou no relatorio de auditoria do lote.
- Preservar a premissa de sessao guiada e ausencia de memoria longitudinal em `agentBehaviorImpact`.

## Exemplo

```json
{
  "fileId": "local-001",
  "fileName": "duvidas-substituicao-exercicios.md",
  "filePath": ".context/raw/duvidas-substituicao-exercicios.md",
  "fileType": "md",
  "source": "local",
  "authorOrSource": "unknown",
  "date": "unknown",
  "mainTopic": "substituicao de exercicios",
  "secondaryTopics": ["equipamento indisponivel", "sessao guiada"],
  "contentType": "user_feedback",
  "recommendedLayer": "session_playbooks",
  "priority": "medium",
  "directUseRisk": "medium",
  "sensitiveFlags": ["none"],
  "conversionRecommendation": "Converter em playbook curto para troca simples de exercicio, apos revisao humana.",
  "reviewRequired": true,
  "traceabilityNotes": "Manter referencia ao lote auditado e ao arquivo original.",
  "agentBehaviorImpact": "Pode ajudar o agente a conduzir uma substituicao simples dentro da sessao atual, sem memoria longitudinal.",
  "notes": "Validar se algum exemplo induz prescricao individual."
}
```
