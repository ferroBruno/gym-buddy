# Gym Buddy Skills

Esta pasta descreve processos estruturados e revisaveis para tarefas recorrentes do projeto.

Cada skill vive em uma pasta propria com `SKILL.md`, seguindo o formato usado pelo Codex. Elas continuam versionadas no repositorio para que possam ser alteradas pelo projeto.

## Skills atuais

- `workflow-author/`: criacao, revisao e validacao de workflows n8n versionados.
- `knowledge-curator/`: conversao controlada de inventarios e auditorias em artefatos operacionais.
- `smoke-test-runner/`: smoke tests locais de stack e workflows.
- `doc-maintainer/`: manutencao de indices, README e referencias cruzadas.
- `ops-stabilizer/`: validacao de runtime, tunnel e variaveis de ambiente.

## Regra de evolucao

Uma skill so deve virar agent autonomo quando seus limites, ferramentas, criterios de sucesso, ferramentas permitidas e criterios de parada estiverem estaveis.
