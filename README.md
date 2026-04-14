# Gym Buddy v1

O **Gym Buddy** é uma experiência de treino guiado por IA, com foco em simplicidade, clareza e uso prático no dia a dia.

Nesta primeira versão, o produto é:

- **gratuito**
- **WhatsApp-first**
- guiado por **IA**
- baseado em orientação **geral e não personalizada**
- conduzido **passo a passo durante a sessão**
- sem memória entre sessões
- apoiado por uma base de conhecimento **curada por especialistas em treinamento**

---

## Objetivo da v1

Validar se uma experiência gratuita, simples e guiada por IA consegue ajudar o usuário a treinar com mais direção e confiança, gerando:

- uso real
- retorno de uso
- confiança
- clareza de proposta
- potencial de alcance

---

## Como funciona

O Gym Buddy v1 **não entrega o treino inteiro de uma vez**.

Em vez disso, ele conduz a sessão de forma progressiva:
- apresenta o próximo passo
- usa apenas o contexto da sessão atual
- não guarda histórico para personalizar sessões futuras

Cada sessão:
1. começa
2. conduz o treino
3. termina nela mesma

---

## Escopo da v1

### Inclui
- entrada via WhatsApp
- fluxo inicial de sessão
- onboarding leve
- condução guiada da sessão
- adaptações simples dentro da sessão
- uso apenas do contexto da sessão atual
- persistência operacional mínima

### Não inclui
- versão premium
- personalização individual
- memória entre sessões
- acompanhamento longitudinal
- monetização
- app próprio
- infraestrutura pensada para escala

---

## Stack atual

- **Node.js 20**
- **TypeScript**
- **Fastify**
- **Meta WhatsApp Cloud API**
- **Redis** para estado temporário da sessão ativa
- **Supabase/Postgres** para dados operacionais
- **LLM hospedado**
- conhecimento curado em **Markdown / YAML / JSON**

---

## Princípios importantes

- o free é **geral**, não personalizado
- a IA usa apenas o **contexto da sessão atual**
- o sistema **não deve criar memória entre sessões**
- a experiência deve parecer uma **sessão guiada**, não uma ficha estática
- a v1 deve continuar **simples e enxuta**

---

## Arquitetura de alto nível

A lógica principal da v1 é dividida assim:

- **WhatsApp** como canal principal de interação
- **Backend** responsável por orquestrar a sessão
- **Redis** para manter apenas o estado temporário da sessão ativa
- **Supabase/Postgres** para persistência operacional
- **LLM** para geração da experiência conversacional guiada
- **Base curada** com regras e conteúdos definidos por especialistas

### Regra importante
Mesmo usando banco de dados, a v1 **não deve usar persistência para criar memória entre sessões** no plano gratuito.

Ou seja:
- **Redis** = estado efêmero da sessão em andamento
- **Supabase/Postgres** = dados operacionais, logs e apoio ao piloto
- **não** = histórico para personalização do usuário no free

---

## Estrutura do projeto

A estrutura pode evoluir, mas a ideia geral do projeto é algo próximo disso:

```text
.
├── src/
│   ├── app/
│   ├── modules/
│   ├── routes/
│   ├── services/
│   ├── integrations/
│   ├── lib/
│   └── index.ts
├── tests/
├── .context/
│   ├── docs/
│   ├── plans/
│   └── ...
├── .env.example
├── package.json
└── README.md
