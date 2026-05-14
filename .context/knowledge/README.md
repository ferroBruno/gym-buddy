# Gym Buddy Knowledge Area

Esta pasta registra artefatos documentais da base de conhecimento do Gym Buddy.

## Regra central

Raw Knowledge nunca deve ser usado diretamente pelo agente durante atendimento ao usuario. Qualquer material bruto precisa passar por inventario, auditoria, revisao humana e conversao para uma camada curada antes de influenciar comportamento operacional.

## Estrutura atual

- `curated/`: primeiros cards curados e compactos para uso controlado pelo runtime MVP.
- `inventory/`: inventarios manuais da base de conhecimento local ou de lotes recebidos.
- `raw-sample/`: amostra local bruta para analise. Esta pasta deve permanecer ignorada pelo Git e nao entra em runtime.

## Inventarios

- `inventory/inventory-001-initial.md`: primeiro inventario local da amostra em `raw-sample/`.
- `inventory/inventory-001-initial.json`: versao estruturada do mesmo inventario.

## Runtime MVP

O workflow MVP pode usar cards compactos de `curated/` por intent. Nesta fase, o conteudo curado e injetado de forma controlada no prompt, sem RAG, embeddings, banco vetorial ou leitura de Raw Knowledge.

## Limites desta etapa

Este diretorio nao contem RAG, embeddings, scripts permanentes, tabelas Postgres ou integracao com Google Drive.
