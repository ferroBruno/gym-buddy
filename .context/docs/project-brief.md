---
type: doc
name: project-brief
description: Brief estratégico do projeto Gym Buddy v1
category: overview
generated: 2026-04-14
status: filled
language: pt-BR
---

# Project Brief — Gym Buddy v1

1. Visão geral

O Gym Buddy é um agente conversacional de IA voltado para apoiar pessoas que treinam musculação em academias, principalmente durante situações práticas do treino.

A proposta é transformar conhecimento técnico confiável sobre treinamento resistido em respostas simples, rápidas e aplicáveis no momento em que o usuário precisa tomar uma decisão.

O Gym Buddy não se posiciona como personal trainer, prescrição individualizada ou substituto de acompanhamento profissional. Seu papel é atuar como um apoio conversacional situacional, ajudando o usuário a resolver dúvidas comuns de treino com mais clareza, segurança e confiança.

A proposta central pode ser resumida assim:

O Gym Buddy ajuda alunos de academia a tomar decisões simples durante o treino, com foco inicial em hipertrofia geral, usando conhecimento técnico curado, respostas práticas e limites claros de segurança.

2. Objetivo da primeira versão

A primeira versão do Gym Buddy busca validar se um agente de IA conversacional consegue gerar valor real para usuários que treinam musculação, especialmente em situações de dúvida durante ou antes do treino.

A v1 não tem como objetivo validar monetização, personalização avançada, acompanhamento contínuo ou infraestrutura escalável.

O objetivo principal é validar:

utilidade percebida;
clareza das respostas;
confiança no agente;
recorrência de uso;
capacidade de resolver dúvidas práticas;
adequação dos limites de segurança;
potencial de evolução para um produto mais robusto.
3. Escopo da primeira versão

A primeira versão deve oferecer suporte para:

dúvidas pontuais sobre treino;
interpretação de treinos escritos;
interpretação de imagens de treinos;
manutenção de contexto durante a sessão;
substituição simples de exercícios;
adaptação de treinos por tempo ou equipamento;
explicações simples sobre conceitos de musculação;
montagem de estruturas gerais de treino para hipertrofia;
identificação e redirecionamento de situações fora de escopo.

A versão inicial não deve oferecer:

prescrição individual profunda;
diagnóstico;
tratamento de lesões;
reabilitação;
periodização individual avançada;
definição de carga exata em quilos;
promessa de resultado;
análise clínica;
substituição de educador físico ou profissional de saúde.
4. Canal inicial

Embora a visão de produto possa evoluir para uma experiência WhatsApp-first, o protótipo inicial será construído no Telegram.

A escolha do Telegram se justifica por:

API gratuita;
maior facilidade de integração com n8n;
menor custo operacional;
suporte nativo a bots;
envio e recebimento de imagens;
menor barreira técnica para prototipação;
melhor aderência à proposta de custo zero.

A nomenclatura recomendada é:

Gym Buddy v0.8 — Protótipo funcional no Telegram
Gym Buddy v1 — Validação em canal final, possivelmente WhatsApp

Essa distinção é importante porque o Telegram valida principalmente o agente, os fluxos e a proposta de valor. Ele não valida completamente a aderência ao canal de massa, especialmente se o WhatsApp continuar sendo o canal desejado no futuro.

5. Público-alvo inicial

O público inicial do Gym Buddy é composto por pessoas que:

frequentam academias convencionais;
treinam sem acompanhamento profissional constante;
têm dúvidas práticas durante o treino;
buscam hipertrofia;
são iniciantes ou intermediárias;
valorizam respostas rápidas, simples e aplicáveis.

Ficam fora do foco inicial:

atletas avançados;
pessoas em reabilitação;
casos clínicos;
lesões específicas;
usuários que precisam de prescrição individual complexa;
pessoas que demandam acompanhamento contínuo personalizado.
6. Premissa de uso

Na primeira versão, o agente deve assumir que o objetivo principal do usuário é hipertrofia geral, exceto quando o próprio usuário declarar outro objetivo.

Essa decisão reduz fricção no onboarding e evita uma experiência inicial longa demais.

O agente não deve começar perguntando uma lista extensa de informações. No início da sessão, deve estimular o usuário a enviar sua dúvida ou compartilhar o treino.

Exemplo de abertura:

Você já tem um treino pronto para hoje?

Se tiver, pode me mandar escrito ou em imagem que eu uso como contexto para te ajudar.

Se não tiver, me diga qual é sua dúvida ou o que você quer treinar hoje.
7. Papel do agente

O Gym Buddy deve atuar como um assistente de apoio prático ao treino.

Ele pode:

responder dúvidas pontuais;
interpretar treinos escritos;
interpretar imagens de treinos;
manter contexto do treino durante a sessão;
sugerir substituições de exercícios;
adaptar uma sessão quando houver pouco tempo;
explicar execução básica;
explicar conceitos simples de treinamento;
montar estruturas gerais de treino;
redirecionar casos fora de escopo.

Ele não deve:

fingir personalização individual;
se apresentar como personal trainer;
fazer diagnóstico;
tratar lesões;
prescrever reabilitação;
definir carga exata em quilos;
prometer resultados;
montar periodização individual avançada;
substituir avaliação presencial.
8. Modos principais de operação
8.1. Usuário com treino pronto

O usuário pode enviar:

treino digitado;
print;
foto de ficha;
imagem de planilha;
lista informal de exercícios.

O agente deve:

interpretar o treino;
identificar exercícios, séries, repetições e grupos musculares;
resumir brevemente o que entendeu;
confirmar com o usuário;
usar o treino como contexto da sessão.

O agente não deve fazer uma análise longa automaticamente, salvo se o usuário pedir.

Exemplo:

Entendi. Seu treino parece focado em peito, ombro e tríceps.

Identifiquei:
1. Supino reto — 4x10
2. Supino inclinado — 3x10-12
3. Crucifixo — 3x12
4. Desenvolvimento — 3x10
5. Tríceps corda — 3x12

Está correto? Se sim, vou usar esse treino como contexto para suas dúvidas de hoje.
8.2. Usuário sem treino pronto

Quando o usuário não tiver treino, o agente pode montar uma estrutura geral de treino para hipertrofia.

A linguagem deve sempre deixar claro que não se trata de prescrição individual.

Usar:

Uma estrutura geral possível seria...

Evitar:

O melhor treino para você é...

A montagem deve se apoiar em templates previamente definidos, como:

treino de peito e tríceps;
treino de costas e bíceps;
treino de pernas;
upper;
lower;
full body;
treino curto de 30 minutos.
8.3. Dúvida avulsa

O usuário pode fazer perguntas sem compartilhar um treino.

Exemplos:

Posso trocar supino por máquina?
Quanto descanso entre séries?
Como sei se cheguei perto da falha?
Qual exercício substitui cadeira extensora?

A resposta deve seguir uma estrutura simples:

resposta direta;
orientação prática;
cuidado relevante;
pergunta curta de continuidade, se útil.

Exemplo:

Sim, pode trocar.

Para hipertrofia, a máquina de supino pode funcionar bem como substituição do supino com barra.

Mantenha controle na descida, boa amplitude e uma carga que permita chegar perto da falha sem perder a execução.

Você está usando essa troca em treino de peito ou em treino de superiores?
8.4. Situação de risco

Quando houver dor, lesão ou sintoma incomum, o agente deve interromper o fluxo comum.

Sinais de alerta:

dor aguda;
fisgada;
tontura;
formigamento;
falta de ar incomum;
dor articular relevante;
cirurgia recente;
lesão diagnosticada;
condição clínica.

Resposta esperada:

Nesse caso, o mais seguro é não continuar esse exercício agora.

Dor aguda, fisgada, tontura ou formigamento não devem ser tratados como uma dúvida comum de treino.

Procure o professor da academia ou um profissional de saúde, especialmente se o sintoma persistir.

Posso te ajudar a reorganizar o treino de hoje de forma geral, evitando esse movimento.
9. Diretrizes de conversa

O agente deve responder com linguagem:

curta;
simples;
prática;
objetiva;
segura;
fácil de aplicar durante o treino.

Deve evitar:

respostas longas;
excesso de teoria;
tom professoral;
motivação exagerada;
tecnicismo desnecessário;
falsa precisão;
personalização implícita.

Formato padrão:

1. Resposta direta
2. Orientação prática
3. Cuidado relevante
4. Próxima pergunta curta, se necessário
10. Arquitetura de conhecimento

A base de conhecimento do Gym Buddy deve ser organizada em camadas.

A estrutura recomendada é:

01_RAW/
02_TECHNICAL_CANON/
03_GUARDRAILS/
04_USER_PLAYBOOKS/
05_EVALUATION/
06_USERS/
10.1. Raw Knowledge

Camada bruta de informação.

Contém:

livros;
artigos;
referências técnicas;
materiais de especialistas;
anotações humanas;
históricos de conversa;
dúvidas reais;
treinos enviados;
feedbacks.

O agente não deve consultar essa camada diretamente durante o atendimento.

Função:

Servir como repositório de aprendizado e insumo para revisão humana.

10.2. Technical Canon

Camada técnica consolidada e revisada.

Contém a visão oficial do Gym Buddy sobre:

hipertrofia;
volume;
intensidade;
frequência;
descanso;
progressão;
proximidade da falha;
seleção de exercícios;
substituições;
execução geral;
montagem de treinos;
sinais de risco.

Função:

Transformar o material bruto em conhecimento técnico confiável, consistente e padronizado.

10.3. Guardrails & Decision Rules

Camada de regras de comportamento, segurança e escopo.

Contém:

o que o agente pode responder;
o que não pode responder;
quando redirecionar;
como lidar com dor;
como lidar com lesões;
como responder sobre carga;
regras de personalização;
tom de voz;
formato das respostas.

Função:

Impedir que o agente extrapole seu papel, finja personalização ou responda casos de risco como se fossem dúvidas comuns.

10.4. User-Facing Playbooks

Camada operacional usada no atendimento.

Contém fluxos e respostas-base para situações recorrentes:

onboarding;
análise de treino escrito;
análise de imagem;
substituição de exercício;
treino curto;
dúvida de execução;
montagem de treino geral;
dor ou desconforto;
explicação de conceitos.

Função:

Transformar conhecimento técnico em respostas conversacionais curtas e úteis.

10.5. Evaluation

Camada de avaliação e melhoria contínua.

Contém:

casos de teste;
respostas boas;
respostas ruins;
checklist de qualidade;
métricas do piloto;
exemplos de falhas;
critérios de revisão humana.

Função:

Verificar se o agente responde com qualidade, segurança e consistência.

11. Estrutura operacional

A arquitetura operacional inicial será:

Telegram
↓
n8n
↓
Agente de IA
↓
Google Drive / Google Sheets
↓
Base de conhecimento estruturada
↓
Histórico e logs

Uso de cada componente:

Telegram: interface conversacional
n8n: orquestração dos fluxos
Google Drive: repositório editorial e base técnica
Google Sheets: logs, usuários, sessões e feedbacks
LLM: interpretação e geração de respostas

No futuro, se necessário, a arquitetura pode evoluir para:

Supabase;
banco vetorial;
WhatsApp;
dashboard administrativo;
sistema de avaliação mais robusto.

Mas esses elementos não devem entrar cedo demais.

12. Memória e histórico

A memória deve ser dividida em três níveis.

12.1. Memória da sessão atual

Usada apenas durante o treino.

Armazena:

treino enviado;
dúvidas feitas;
exercício atual;
substituições realizadas;
contexto relevante;
flags de risco.

Deve expirar após algumas horas sem interação.

12.2. Histórico bruto

Vai para a camada Raw.

Armazena:

conversa completa;
treino enviado;
transcrição do treino;
estrutura extraída;
dúvidas feitas;
feedback;
pedidos fora de escopo;
falhas do agente.

Função:

Melhorar o produto, os playbooks, os guardrails e a base técnica.

12.3. Perfil leve do usuário

Na v1, deve ser mínimo.

Pode armazenar:

ID do usuário;
data do primeiro uso;
número de sessões;
se já enviou treino;
categorias de dúvidas;
feedbacks;
status geral de uso.

Evitar armazenar:

dados clínicos;
dados físicos desnecessários;
histórico de saúde;
inferências sensíveis;
personalização profunda.
13. Tratamento de imagens de treino

O sistema deve ser capaz de interpretar imagens de treino, mas evitar armazenar imagens permanentemente.

Fluxo recomendado:

Usuário envia imagem
↓
Sistema interpreta a imagem
↓
Extrai conteúdo textual
↓
Transforma em estrutura organizada
↓
Mostra resumo ao usuário
↓
Usuário confirma ou corrige
↓
Sistema salva texto + JSON
↓
Imagem é descartada ou mantida apenas temporariamente

Salvar:

transcrição legível;
estrutura em JSON;
data;
usuário;
status de confirmação;
nível de confiança;
correções feitas pelo usuário.

Não salvar permanentemente:

imagem original;
dados visuais irrelevantes;
informações sensíveis visíveis na imagem.
14. Estrutura intermediária de treino

Todo treino enviado deve ser convertido para uma estrutura intermediária.

Exemplo:

{
  "training_type": "peito_ombro_triceps",
  "goal_assumed": "hipertrofia",
  "exercises": [
    {
      "name": "supino reto",
      "sets": 4,
      "reps": "10",
      "muscle_group": "peito",
      "movement_pattern": "empurrar horizontal"
    },
    {
      "name": "supino inclinado",
      "sets": 3,
      "reps": "10-12",
      "muscle_group": "peito",
      "movement_pattern": "empurrar inclinado"
    }
  ],
  "estimated_focus": ["peito", "ombro", "tríceps"],
  "possible_notes": [
    "volume moderado para peito",
    "exercícios compostos antes de isoladores"
  ]
}

Essa estrutura permite:

manter contexto;
responder dúvidas com mais precisão;
salvar aprendizado;
revisar dados posteriormente;
descartar a imagem original.
15. Autonomia do agente

O agente pode ter autonomia alta dentro dos limites definidos.

Pode:

sugerir séries e repetições gerais;
sugerir descanso;
montar treino geral;
substituir exercícios;
adaptar treino por tempo;
explicar execução;
explicar conceitos;
reorganizar treino simples;
manter contexto do treino enviado.

Não pode:

prescrever carga absoluta;
personalizar com base clínica;
diagnosticar dor;
tratar lesão;
montar reabilitação;
fazer periodização individual avançada;
prometer resultados;
ignorar sinais de risco.
16. Matriz de intenções

A matriz de intenções deve ser um dos artefatos centrais do projeto.

Exemplo:

Intenção	Pode responder?	Risco	Resposta esperada
Substituir exercício	Sim	Baixo	Sugere alternativa próxima
Montar treino geral	Sim	Médio	Usa template geral
Dor no exercício	Com restrição	Alto	Interrompe e redireciona
Lesão específica	Não	Alto	Recomenda profissional
Carga exata	Não	Médio	Orienta por esforço
Execução básica	Sim	Baixo	Explica técnica geral
Analisar ficha	Sim	Médio	Resume e usa como contexto
Periodização avançada	Não na v1	Médio	Explica limite
17. Ordem de construção recomendada

A ordem mais segura de construção é:

1. Guardrails

Antes de qualquer automação, definir:

escopo;
limites;
riscos;
autonomia;
redirecionamentos;
regras de resposta.
2. Playbooks de alta frequência

Criar primeiro:

equipamento ocupado;
dúvida de execução;
treino curto;
séries e repetições;
descanso;
falha;
substituição;
dor;
treino de peito;
treino de costas;
treino de pernas;
treino de superiores;
treino full body.
3. Technical Canon

Consolidar a base técnica revisada.

4. Raw Knowledge

Organizar referências e históricos.

5. Evaluation

Criar testes, checklist e exemplos.

6. Automação no n8n

Só depois que os fluxos conceituais estiverem claros.

Análise crítica
1. O caminho está melhor do que o anterior

A nova versão está mais funcional porque desloca o produto de uma ideia ampla de “orientação geral de treino” para um caso de uso mais concreto:

ajudar o usuário em dúvidas práticas durante o treino.

Isso é melhor porque reduz ambiguidade, facilita o design dos fluxos e torna a validação mais objetiva.

O produto agora tem um contexto de uso mais claro:

Usuário está na academia ou se preparando para treinar.
Tem uma dúvida prática.
Quer uma resposta curta.
Não quer estudar teoria.
Precisa decidir o que fazer agora.

Esse recorte é mais forte do que “um chatbot sobre treino”.

2. A decisão de começar pelo Telegram é correta, com uma ressalva

Para prototipação, Telegram é provavelmente o melhor caminho. Ele reduz complexidade técnica, custo e dependência de APIs mais burocráticas.

Mas é importante não confundir duas validações diferentes:

Telegram valida o agente.
WhatsApp validaria o canal de massa.

Então, sim, faz sentido começar pelo Telegram, desde que o projeto trate essa fase como protótipo funcional, não como validação definitiva do canal.

A nomenclatura v0.8 para Telegram e v1 para canal final é boa.

3. A estrutura de conhecimento em camadas é um dos pontos mais fortes

A separação entre:

Raw Knowledge
Technical Canon
Guardrails
User Playbooks
Evaluation

é muito boa.

Principalmente por uma razão: ela impede que o agente responda diretamente a partir de material bruto.

Esse é um risco comum em agentes com RAG/base de conhecimento. Quanto mais material bruto entra, maior a chance de resposta contraditória, longa, técnica demais ou fora do escopo.

O fluxo correto é:

Usuário pergunta
↓
Identifica intenção
↓
Consulta playbook
↓
Usa Technical Canon como suporte
↓
Aplica Guardrails
↓
Responde curto

Esse desenho é mais seguro e mais controlável.

4. O maior risco atual é escopo inflado

A nova versão está boa, mas já começa a acumular muitas capacidades:

interpretação de texto
interpretação de imagem
memória de sessão
JSON estruturado
playbooks
technical canon
guardrails
evaluation
logs
feedback
templates
histórico
n8n
Telegram
Google Drive
Google Sheets

Tudo isso faz sentido, mas não precisa nascer junto.

Minha recomendação crítica: separar em três níveis.

Essencial para o primeiro teste
Telegram
n8n
prompt com guardrails
3 a 5 playbooks
registro em Google Sheets
resposta de dúvida avulsa
substituição de exercício
treino curto
situação de dor
Importante, mas pode vir na segunda rodada
interpretação de treino escrito
memória da sessão
templates de treino geral
feedback estruturado
casos de teste
Deve vir depois
interpretação de imagem
JSON estruturado completo
histórico por usuário
análise recorrente de padrões
Technical Canon extenso
biblioteca grande de exercícios

Eu não começaria pela análise de imagem. Ela é valiosa, mas aumenta bastante a complexidade do piloto.

5. A premissa de hipertrofia está correta

Assumir hipertrofia geral como objetivo inicial é uma boa decisão de produto.

Por quê?

Porque reduz onboarding, evita perguntas demais e bate com o perfil majoritário de usuários de academia recreacional.

Mas eu colocaria uma proteção simples no agente:

Vou assumir hipertrofia geral como foco, a menos que você me diga outro objetivo.

Isso mantém fluidez sem parecer que o agente está ignorando o usuário.

6. Cuidado com “montar treino”

Esse é um ponto delicado.

O projeto diz que o agente pode montar estruturas gerais de treino. Isso faz sentido, mas precisa ser muito bem enquadrado.

A formulação segura é:

estrutura geral de sessão
template geral
exemplo de organização
sugestão não individualizada

Evitar:

seu treino ideal
plano para você
prescrição personalizada
periodização
programa individual

Esse cuidado é importante porque “montar treino” pode ser percebido como prescrição individualizada.

Minha sugestão: internamente, chamem isso de templates gerais de treino, não “prescrição”.

7. O tratamento de imagem é bom, mas precisa ser limitado

A ideia de não armazenar imagem e salvar apenas transcrição + JSON é boa.

Mas, para o primeiro piloto, eu simplificaria:

Primeira fase:

Usuário envia treino digitado.
Agente interpreta e confirma.

Segunda fase:

Usuário envia print/foto.
Agente extrai texto.
Usuário confirma.

Terceira fase:

Sistema estrutura JSON e salva histórico.

Isso evita que o projeto dependa cedo demais da qualidade de OCR/visão, que pode variar bastante dependendo de foto, iluminação, letra, ficha da academia e layout.

8. Falta definir melhor o que será medido

O brief fala em utilidade, clareza, confiança e recorrência, mas ainda precisa transformar isso em critérios objetivos.

Eu recomendaria estes indicadores mínimos:

Ativação:
usuário envia pelo menos uma dúvida real após a abertura.

Utilidade:
usuário marca resposta como útil ou continua a conversa sem reformular a mesma dúvida.

Recorrência:
usuário volta em outro dia.

Clareza:
usuário não insiste em pedir algo fora do escopo após o agente explicar o limite.

Confiança:
usuário envia treino, aceita sugestão geral ou pede nova dúvida relacionada.

Risco:
percentual de conversas com dor, lesão ou pedido sensível corretamente redirecionado.

Sem isso, o piloto pode gerar uma sensação subjetiva de “parece bom”, mas sem aprendizado claro.

9. Falta uma decisão sobre revisão humana

Como o produto lida com treino, segurança e limites profissionais, eu adicionaria um processo simples de revisão.

Nada complexo.

Exemplo:

A cada 30 conversas:
- revisar pedidos fora de escopo;
- revisar respostas com dor ou lesão;
- revisar feedbacks negativos;
- revisar casos em que o agente montou treino;
- atualizar playbooks e guardrails.

Isso conecta o uso real à evolução do agente.

10. Minha recomendação final

O caminho está correto, mas eu faria uma versão ainda mais enxuta para começar.

Gym Buddy v0.8 — Piloto mínimo

Escopo inicial:

1. Abertura de sessão
2. Dúvidas avulsas
3. Substituição de exercício
4. Treino curto
5. Explicação simples de conceitos
6. Situação de dor/risco
7. Registro em planilha
8. Feedback simples

Deixar para depois:

interpretação de imagem
memória sofisticada
JSON completo
histórico detalhado
grande base técnica
muitos templates