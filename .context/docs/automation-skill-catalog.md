---
type: doc
name: automation-skill-catalog
description: Catalogo inicial de skills de automacao do projeto Gym Buddy
category: automation
generated: 2026-05-15
status: draft
language: pt-BR
---

# Automation Skill Catalog - Gym Buddy

## Objetivo

Centralizar as capacidades operacionais que podem apoiar o desenvolvimento do Gym Buddy sem redefinir a arquitetura atual do projeto.

Nesta fase, estas capacidades devem ser tratadas como skills, nao agents autonomos. Uma skill e um processo estruturado para uma tarefa especifica. Um agent e um sistema autonomo com objetivo, planejamento, uso de ferramentas e criterio proprio de conclusao.

O projeto ainda esta na camada de skills porque:

- os processos precisam ser revisaveis antes de ganhar autonomia;
- as decisoes de produto, seguranca e runtime ainda dependem de revisao humana;
- o n8n continua como orquestrador operacional principal;
- nao ha catalogo estavel de ferramentas, permissoes e criterios de parada para agents autonomos.

Uma skill pode ser promovida para agent apenas quando tiver entradas, saidas, ferramentas permitidas, criterios de sucesso, limites de seguranca e rotina de validacao suficientemente estaveis.

## Skills iniciais

| Skill | Responsabilidade | Arquivo |
|---|---|---|
| `workflow-author` | Criar, revisar e validar exports JSON de workflows n8n. | `../skills/workflow-author/SKILL.md` |
| `knowledge-curator` | Converter inventario e auditoria em artefatos curados, guardrails, playbooks e avaliacoes. | `../skills/knowledge-curator/SKILL.md` |
| `smoke-test-runner` | Executar validacoes locais de stack e workflows smoke. | `../skills/smoke-test-runner/SKILL.md` |
| `doc-maintainer` | Manter indices, README e referencias cruzadas atualizados. | `../skills/doc-maintainer/SKILL.md` |
| `ops-stabilizer` | Validar ambiente local, variaveis obrigatorias, tunnel e runtime n8n. | `../skills/ops-stabilizer/SKILL.md` |

## Separacao de responsabilidades

### Workflow authoring

Responsavel por estrutura de workflow, convencoes de export, nodes minimos, conexoes, ausencia de segredos e criterios de importacao.

Nao decide novas regras de produto, nao cria conhecimento tecnico e nao altera infraestrutura.

### Knowledge conversion

Responsavel por transformar Raw Knowledge auditado em conhecimento operacional revisado.

Nao usa Raw Knowledge diretamente no runtime, nao cria RAG, nao cria embeddings e nao promove conteudo sem rastreabilidade.

### Smoke testing

Responsavel por validar comportamento minimo observavel em ambiente local.

Nao substitui validacao manual do Telegram real quando houver webhook publico e credenciais envolvidas.

### Ops/runtime validation

Responsavel por checar Docker Compose, variaveis, URL publica, n8n, tunnel e logs.

Nao altera segredos locais, nao troca `N8N_ENCRYPTION_KEY` e nao apaga volumes sem decisao explicita.

### Documentation and PR support

Responsavel por manter docs encontraveis e consistentes.

Nao muda arquitetura ou escopo funcional sem documento de decisao ou aprovacao explicita.

## Ordem sugerida de implementacao

1. Estabilizar `workflow-author`.
2. Estabilizar `smoke-test-runner` para checks locais sem Telegram.
3. Estabilizar `knowledge-curator` para conversao rastreavel.
4. Estabilizar `doc-maintainer` para indices e links.
5. Estabilizar `ops-stabilizer` para tunnel e runtime Telegram.

## Scripts de suporte

| Script | Skill primaria |
|---|---|
| `../scripts/Validate-WorkflowExports.ps1` | `workflow-author` |
| `../scripts/Test-KnowledgeBoundaries.ps1` | `knowledge-curator` |
| `../scripts/Run-LocalSmokeTests.ps1` | `smoke-test-runner` |
| `../scripts/Test-DocLinks.ps1` | `doc-maintainer` |
| `../scripts/Test-RuntimeEnv.ps1` | `ops-stabilizer` |

## Pontos de decisao

- Quais checks do `workflow-author` devem ser bloqueantes em PR?
- A importacao de workflows no n8n continuara manual nesta fase?
- A validacao automatica deve ser PowerShell, Node, Python ou outro formato?
- `knowledge/curated` ou `prompts/tech` sera a fonte primaria dos cards runtime?
- Quando uma skill tera maturidade suficiente para virar agent autonomo?
