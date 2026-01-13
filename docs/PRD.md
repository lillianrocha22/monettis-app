# Product Requirements Document (PRD)
# Monettis App

**Documento de Requisitos do Produto**

**Versão**: 1.0
**Data**: Janeiro 2026
**Status**: Vigente
**Autor**: Equipe Monettis

---

## Sumário Executivo

O **Monettis App** é uma plataforma SaaS de gestão financeira completa, projetada para atender três segmentos distintos do mercado brasileiro:

1. **Indivíduos** - Controle financeiro pessoal
2. **Famílias** - Gestão financeira familiar colaborativa
3. **Empreendedores** - Gestão empresarial para MEI e pequenos negócios

A plataforma utiliza tecnologias modernas (Next.js 14, PostgreSQL, IA) e oferece diferenciais únicos como integração com WhatsApp e relatórios inteligentes com IA.

---

## 1. Visão do Produto

### 1.1 Declaração de Visão

> "Democratizar o controle financeiro no Brasil, oferecendo uma ferramenta intuitiva, inteligente e acessível que transforma a relação das pessoas e empresas com seu dinheiro."

### 1.2 Proposta de Valor

| Segmento | Proposta de Valor |
|----------|-------------------|
| **Individual** | Controle financeiro completo com IA e WhatsApp por menos que um café por dia |
| **Família** | Transparência financeira familiar + educação financeira para filhos |
| **Empresarial** | Gestão que economiza mais do que custa (ROI 4x-13x) |

### 1.3 Objetivos de Negócio

| Métrica | Mês 6 | Mês 12 | Mês 24 |
|---------|-------|--------|--------|
| Usuários Ativos | 500 | 3.000 | 10.500 |
| MRR (Receita Mensal) | R$ 7.000 | R$ 42.000 | R$ 183.850 |
| ARR (Receita Anual) | R$ 84.000 | R$ 504.000 | R$ 2.206.200 |
| Churn Mensal | <8% | <5% | <3% |
| NPS | >40 | >50 | >60 |

---

## 2. Público-Alvo

### 2.1 Personas Primárias

#### Persona 1: Carlos - Profissional Individual
- **Idade**: 28-45 anos
- **Ocupação**: CLT ou autônomo
- **Renda**: R$ 4.000 - R$ 15.000/mês
- **Dores**: Não sabe para onde vai o dinheiro, parcelas descontroladas, sem reserva de emergência
- **Comportamento**: Usa smartphone diariamente, prefere soluções simples
- **Tier**: Premium Individual (R$ 14,00/mês)

#### Persona 2: Ana e Pedro - Casal com Filhos
- **Idade**: 30-50 anos
- **Composição**: Casal + 1-3 filhos
- **Renda Familiar**: R$ 8.000 - R$ 25.000/mês
- **Dores**: Conflitos sobre dinheiro, filhos sem educação financeira, gastos descontrolados
- **Comportamento**: Buscam ferramentas que toda família possa usar
- **Tier**: Família Plus (R$ 23,90/mês)

#### Persona 3: Marcos - Microempreendedor (MEI)
- **Idade**: 25-55 anos
- **Ocupação**: MEI, profissional liberal, freelancer
- **Faturamento**: R$ 5.000 - R$ 50.000/mês
- **Dores**: Mistura contas PJ/PF, não sabe se está lucrando, medo da Receita
- **Comportamento**: Precisa de relatórios para contador, valoriza economia de tempo
- **Tier**: Business Enterprise (R$ 45,90/mês)

### 2.2 Mercado Endereçável

| Segmento | TAM (Brasil) | SAM | SOM (Ano 2) |
|----------|--------------|-----|-------------|
| Indivíduos | 100 milhões | 30 milhões | 9.000 |
| Famílias | 15 milhões | 5 milhões | 500 |
| MEI/Micro | 20 milhões | 8 milhões | 1.000 |

---

## 3. Estrutura de Tiers e Preços

### 3.1 Modelo de Precificação

| Tier | Nome | Preço | Usuários | Módulos |
|------|------|-------|----------|---------|
| **Free** | Gratuito | R$ 0 | 1 | Limitado (10 transações/mês) |
| **Tier 1** | Premium Individual | R$ 14,00/mês | 1 | 12 módulos |
| **Tier 2** | Família Plus | R$ 23,90/mês | 4 | 24 módulos |
| **Tier 3** | Business Enterprise | R$ 45,90/mês | 3 | 40 módulos |

### 3.2 Matriz de Funcionalidades por Tier

#### Tier 1 - Premium Individual (R$ 14,00/mês)

| ID | Módulo | Status |
|----|--------|--------|
| M01 | Gestão de Transações (ilimitadas) | ✅ Implementado |
| M02 | Dashboard Financeiro | ✅ Implementado |
| M03 | Relatórios com IA (GPT-4o-mini) | ✅ Implementado |
| M04 | Sistema de Assinatura (Stripe) | ✅ Implementado |
| M05 | Interface Responsiva (Web/PWA) | ✅ Implementado |
| M06 | Importação de Extratos Bancários | 🔄 Roadmap |
| M07 | Importação de Faturas de Cartão | 🔄 Roadmap |
| M08 | Controle de Cartões de Crédito | 🔄 Roadmap |
| M09 | Integração WhatsApp Básica | 🔄 Roadmap |
| M10 | Contas Bancárias e Saldo | 🔄 Roadmap |
| M11 | Metas Financeiras | 🔄 Roadmap |
| M12 | Contas a Pagar/Receber | 🔄 Roadmap |

#### Tier 2 - Família Plus (R$ 23,90/mês)

Inclui todos os módulos do Tier 1, mais:

| ID | Módulo | Status |
|----|--------|--------|
| M13 | Múltiplos Usuários (até 4) | 📋 Planejado |
| M14 | Perfis Individuais | 📋 Planejado |
| M15 | Gestão de Mesada para Filhos | 📋 Planejado |
| M16 | Divisão Inteligente de Despesas | 📋 Planejado |
| M17 | Controles Parentais | 📋 Planejado |
| M18 | Metas Familiares Compartilhadas | 📋 Planejado |
| M19 | Chat Familiar Interno | 📋 Planejado |
| M20 | Relatórios Familiares com IA | 📋 Planejado |
| M21 | Calendário Financeiro Familiar | 📋 Planejado |
| M22 | Educação Financeira para Filhos | 📋 Planejado |
| M23 | Controle de Cartão Adicional | 📋 Planejado |
| M24 | WhatsApp Familiar | 📋 Planejado |

#### Tier 3 - Business Enterprise (R$ 45,90/mês)

Inclui todos os módulos do Tier 1, mais:

| ID | Módulo | Status |
|----|--------|--------|
| M25 | Perfil Empresarial Separado | 📋 Planejado |
| M26 | DRE Automatizada | 📋 Planejado |
| M27 | Centro de Custos | 📋 Planejado |
| M28 | Cadastro de Clientes | 📋 Planejado |
| M29 | Cadastro de Fornecedores | 📋 Planejado |
| M30 | Gestão de Notas Fiscais | 📋 Planejado |
| M31 | Relatórios Fiscais e Contábeis | 📋 Planejado |
| M32 | Fluxo de Caixa Empresarial | 📋 Planejado |
| M33 | Contas Bancárias PJ | 📋 Planejado |
| M34 | Planejamento Orçamentário | 📋 Planejado |
| M35 | KPIs Empresariais | 📋 Planejado |
| M36 | Múltiplos Usuários Business (até 3) | 📋 Planejado |
| M37 | Integração com Contador | 📋 Planejado |
| M38 | Relatórios IA Empresarial | 📋 Planejado |
| M39 | WhatsApp Business | 📋 Planejado |
| M40 | Importação Empresarial Avançada | 📋 Planejado |

---

## 4. Requisitos Funcionais Detalhados

### 4.1 Módulos Implementados (MVP)

#### RF-001: Autenticação de Usuários
**Prioridade**: P0 (Crítico)
**Status**: ✅ Implementado

| Requisito | Descrição |
|-----------|-----------|
| RF-001.1 | Login com email/senha via Clerk |
| RF-001.2 | Login social (Google, GitHub) |
| RF-001.3 | Recuperação de senha |
| RF-001.4 | Gerenciamento de sessão |
| RF-001.5 | Metadata de tier no perfil |

#### RF-002: Gestão de Transações
**Prioridade**: P0 (Crítico)
**Status**: ✅ Implementado

| Requisito | Descrição |
|-----------|-----------|
| RF-002.1 | Criar transação (nome, valor, tipo, categoria, método, data) |
| RF-002.2 | Editar transação existente |
| RF-002.3 | Excluir transação com confirmação |
| RF-002.4 | Listar transações com paginação |
| RF-002.5 | Filtrar por mês/ano |
| RF-002.6 | Validação de dados (Zod schema) |
| RF-002.7 | Limite de 10 transações/mês para tier Free |

**Tipos de Transação**:
- DEPOSIT (Receita)
- EXPENSE (Despesa)
- INVESTMENT (Investimento)

**Categorias**:
- HOUSING, TRANSPORTATION, FOOD, ENTERTAINMENT
- HEALTH, UTILITY, SALARY, EDUCATION, OTHER

**Métodos de Pagamento**:
- CREDIT_CARD, DEBIT_CARD, BANK_TRANSFER
- BANK_SLIP, CASH, PIX, OTHER

#### RF-003: Dashboard Financeiro
**Prioridade**: P0 (Crítico)
**Status**: ✅ Implementado

| Requisito | Descrição |
|-----------|-----------|
| RF-003.1 | Exibir saldo total do mês |
| RF-003.2 | Exibir total de receitas |
| RF-003.3 | Exibir total de despesas |
| RF-003.4 | Exibir total de investimentos |
| RF-003.5 | Gráfico de pizza por tipo de transação |
| RF-003.6 | Gráfico de despesas por categoria |
| RF-003.7 | Lista das últimas 15 transações |
| RF-003.8 | Seletor de mês/ano |

#### RF-004: Relatórios com IA
**Prioridade**: P1 (Alto)
**Status**: ✅ Implementado

| Requisito | Descrição |
|-----------|-----------|
| RF-004.1 | Gerar relatório financeiro com GPT-4o-mini |
| RF-004.2 | Análise de padrões de gastos |
| RF-004.3 | Sugestões personalizadas de economia |
| RF-004.4 | Identificação de tendências |
| RF-004.5 | Formatação em Markdown |
| RF-004.6 | Rate limit: 5 relatórios/dia |
| RF-004.7 | Disponível apenas para tiers premium |

#### RF-005: Sistema de Assinatura
**Prioridade**: P0 (Crítico)
**Status**: ✅ Implementado

| Requisito | Descrição |
|-----------|-----------|
| RF-005.1 | Exibir planos disponíveis |
| RF-005.2 | Criar checkout session (Stripe) |
| RF-005.3 | Processar webhook de pagamento |
| RF-005.4 | Atualizar tier do usuário no Clerk |
| RF-005.5 | Cancelar assinatura |
| RF-005.6 | Exibir status atual da assinatura |

### 4.2 Módulos em Roadmap (Tier 1)

#### RF-006: Importação de Extratos Bancários
**Prioridade**: P0 (Crítico para lançamento)
**Status**: 🔄 Roadmap

| Requisito | Descrição |
|-----------|-----------|
| RF-006.1 | Upload de arquivos OFX, XLS, XLSX, CSV |
| RF-006.2 | Parsing automático do arquivo |
| RF-006.3 | Preview das transações antes de importar |
| RF-006.4 | Detecção de duplicatas |
| RF-006.5 | Categorização automática sugerida |
| RF-006.6 | Importação em lote |

#### RF-007: Controle de Cartões de Crédito
**Prioridade**: P0 (Crítico para lançamento)
**Status**: 🔄 Roadmap

| Requisito | Descrição |
|-----------|-----------|
| RF-007.1 | CRUD de cartões de crédito |
| RF-007.2 | Definir limite, dia de fechamento, dia de vencimento |
| RF-007.3 | Vincular transações ao cartão |
| RF-007.4 | Calcular fatura atual e futura |
| RF-007.5 | Controle de parcelas |
| RF-007.6 | Alertas de vencimento |

#### RF-008: Integração WhatsApp
**Prioridade**: P1 (Alto - Diferencial)
**Status**: 🔄 Roadmap

| Requisito | Descrição |
|-----------|-----------|
| RF-008.1 | Cadastro de transação por mensagem de texto |
| RF-008.2 | Confirmação via WhatsApp |
| RF-008.3 | Lembretes de vencimento |
| RF-008.4 | Resumo diário/semanal |
| RF-008.5 | Alertas de limite de cartão |

---

## 5. Requisitos Não-Funcionais

### 5.1 Performance

| ID | Requisito | Meta |
|----|-----------|------|
| RNF-001 | Tempo de carregamento inicial | < 3 segundos |
| RNF-002 | Time to First Byte (TTFB) | < 200ms |
| RNF-003 | Largest Contentful Paint (LCP) | < 2.5s |
| RNF-004 | First Input Delay (FID) | < 100ms |
| RNF-005 | Cumulative Layout Shift (CLS) | < 0.1 |
| RNF-006 | Tempo de resposta de API | < 500ms (p95) |

### 5.2 Escalabilidade

| ID | Requisito | Meta |
|----|-----------|------|
| RNF-007 | Usuários simultâneos | 10.000+ |
| RNF-008 | Transações por usuário | Ilimitadas (premium) |
| RNF-009 | Requisições por minuto | 100.000+ |
| RNF-010 | Disponibilidade | 99.9% uptime |

### 5.3 Segurança

| ID | Requisito | Implementação |
|----|-----------|---------------|
| RNF-011 | Autenticação | Clerk (JWT, OAuth 2.0) |
| RNF-012 | Autorização | Role-based (tier metadata) |
| RNF-013 | Criptografia em trânsito | TLS 1.3 |
| RNF-014 | Criptografia em repouso | AES-256 (Neon) |
| RNF-015 | OWASP Top 10 | Proteção contra todas |
| RNF-016 | LGPD | Conformidade total |
| RNF-017 | PCI DSS | Via Stripe (não armazenamos cartões) |

### 5.4 Usabilidade

| ID | Requisito | Meta |
|----|-----------|------|
| RNF-018 | Mobile-first | Responsivo 100% |
| RNF-019 | Acessibilidade | WCAG 2.1 AA |
| RNF-020 | Idioma | Português (Brasil) |
| RNF-021 | Tema | Dark/Light mode |
| RNF-022 | Onboarding | < 2 minutos |

---

## 6. Stack Tecnológico

### 6.1 Frontend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Next.js | 14.2.16 | Framework React full-stack |
| React | 18.x | Biblioteca UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.1 | Estilização |
| shadcn/ui | Latest | Componentes UI |
| Radix UI | Latest | Primitivos acessíveis |
| React Hook Form | 7.x | Gerenciamento de formulários |
| Zod | 3.x | Validação de schemas |
| Recharts | 2.x | Gráficos |

### 6.2 Backend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Next.js Server Actions | 14.x | API layer |
| Prisma ORM | 6.19.0 | Acesso ao banco de dados |
| PostgreSQL | 16.x | Banco de dados principal |
| Neon | Serverless | Hosting do PostgreSQL |

### 6.3 Serviços Externos

| Serviço | Propósito | Tier |
|---------|-----------|------|
| Clerk | Autenticação e usuários | Todos |
| Stripe | Pagamentos e assinaturas | Todos |
| OpenAI (GPT-4o-mini) | Relatórios com IA | Premium |
| WhatsApp Business API | Notificações | Premium |
| Vercel | Hosting e deploy | Todos |

### 6.4 Infraestrutura

| Componente | Solução | Fase |
|------------|---------|------|
| Hosting | Vercel | 1 |
| Database | Neon PostgreSQL | 1 |
| CDN | Vercel Edge Network | 1 |
| Monitoring | Vercel Analytics | 1 |
| CI/CD | GitHub Actions | 1 |

---

## 7. Arquitetura do Sistema

### 7.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUÁRIOS                                 │
│                    (Web / Mobile PWA)                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                          │
│                         (CDN)                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MONETTIS APP                                 │
│                   Next.js 14 (App Router)                       │
├─────────────────────────────────────────────────────────────────┤
│  PRESENTATION        │  APPLICATION       │  INFRASTRUCTURE     │
│  ─────────────       │  ─────────────     │  ───────────────    │
│  • Pages             │  • Server Actions  │  • Prisma Client    │
│  • Components        │  • Data Layer      │  • External APIs    │
│  • Layouts           │  • Zod Schemas     │  • Middleware       │
└─────────────────────────────────────────────────────────────────┘
          │                    │                     │
          │                    ▼                     │
          │    ┌───────────────────────────┐        │
          │    │   NEON POSTGRESQL 16      │        │
          │    │    (Serverless DB)        │        │
          │    └───────────────────────────┘        │
          │                                          │
          ▼                                          ▼
┌──────────────────┐  ┌──────────────┐  ┌──────────────────────┐
│      CLERK       │  │    STRIPE    │  │       OPENAI         │
│  (Auth/Users)    │  │  (Payments)  │  │   (AI Reports)       │
└──────────────────┘  └──────────────┘  └──────────────────────┘
```

### 7.2 Estrutura de Módulos

```
app/
├── (home)/                    # Dashboard
├── transactions/              # Gestão de Transações
├── subscription/              # Assinatura
├── login/                     # Autenticação
├── _actions/                  # Server Actions Compartilhadas
├── _components/               # Componentes Globais
├── _data/                     # Data Layer
├── _lib/                      # Configurações
├── _constants/                # Constantes
├── _utils/                    # Utilitários
└── api/                       # API Routes (Webhooks)
```

### 7.3 Fluxo de Dados

1. **Usuário** acessa página via browser
2. **Next.js** renderiza Server Components
3. **Middleware** verifica autenticação (Clerk)
4. **Server Action** é chamada para mutações
5. **Zod** valida dados de entrada
6. **Prisma** executa queries no PostgreSQL
7. **Response** retorna ao usuário
8. **revalidatePath** atualiza cache

---

## 8. Roadmap de Desenvolvimento

### 8.1 Fase 1: MVP Enhancement (Meses 1-4)

**Objetivo**: Completar Tier 1 para lançamento comercial

| Sprint | Módulos | Entregáveis |
|--------|---------|-------------|
| 1-2 | M06 | Importação de extratos bancários |
| 3-4 | M07 | Importação de faturas de cartão |
| 5-6 | M08 | Controle de cartões de crédito |
| 7-8 | M09 | Integração WhatsApp básica |

**Métricas de Sucesso**:
- 500 usuários pagantes
- NPS > 40
- Churn < 8%

### 8.2 Fase 2: Consolidação (Meses 5-12)

**Objetivo**: Escalar Tier 1 e preparar Tier 2

| Sprint | Módulos | Entregáveis |
|--------|---------|-------------|
| 9-10 | M10 | Contas bancárias e saldo |
| 11-12 | M11 | Metas financeiras |
| 13-14 | M12 | Contas a pagar/receber |
| 15-16 | Infra | Otimizações de performance |

**Métricas de Sucesso**:
- 3.000 usuários pagantes
- MRR R$ 42.000
- NPS > 50

### 8.3 Fase 3: Tier 2 (Meses 13-18)

**Objetivo**: Lançar Família Plus

| Sprint | Módulos | Entregáveis |
|--------|---------|-------------|
| 17-20 | M13-16 | Multi-usuários e perfis |
| 21-24 | M17-20 | Controles parentais e metas |
| 25-28 | M21-24 | Chat, educação, WhatsApp familiar |

**Métricas de Sucesso**:
- 500 famílias ativas
- Upsell rate > 10%
- NPS familiar > 55

### 8.4 Fase 4: Tier 3 (Meses 19-24)

**Objetivo**: Lançar Business Enterprise

| Sprint | Módulos | Entregáveis |
|--------|---------|-------------|
| 29-32 | M25-28 | Perfil empresarial e cadastros |
| 33-36 | M29-32 | NF, relatórios fiscais, fluxo de caixa |
| 37-40 | M33-36 | Contas PJ, orçamento, KPIs |
| 41-44 | M37-40 | Multi-usuários, contador, IA business |

**Métricas de Sucesso**:
- 1.000 empresas ativas
- MRR total R$ 183.850
- Churn business < 3%

---

## 9. Métricas e KPIs

### 9.1 Métricas de Produto

| Métrica | Definição | Meta |
|---------|-----------|------|
| DAU/MAU | Usuários ativos diários/mensais | > 30% |
| Session Duration | Tempo médio por sessão | > 5 min |
| Feature Adoption | % usuários usando feature | > 60% |
| Task Completion | % tarefas completadas | > 90% |

### 9.2 Métricas de Negócio

| Métrica | Definição | Meta |
|---------|-----------|------|
| MRR | Receita Recorrente Mensal | Crescimento 15%/mês |
| ARPU | Receita média por usuário | R$ 17,50 |
| CAC | Custo de Aquisição | < R$ 50 |
| LTV | Lifetime Value | > R$ 500 |
| LTV/CAC | Razão LTV sobre CAC | > 10x |
| Churn | Taxa de cancelamento | < 5%/mês |

### 9.3 Métricas Técnicas

| Métrica | Definição | Meta |
|---------|-----------|------|
| Uptime | Disponibilidade | > 99.9% |
| MTTR | Tempo médio de recuperação | < 1 hora |
| Error Rate | Taxa de erros | < 0.1% |
| Latency P95 | Latência percentil 95 | < 500ms |

---

## 10. Riscos e Mitigações

### 10.1 Riscos de Produto

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Baixa adoção de importação | Média | Alto | Tutoriais, onboarding guiado |
| Concorrência de preço | Alta | Médio | Diferenciação por features |
| Complexidade para usuários | Média | Alto | UX simplificada, IA assistente |

### 10.2 Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Escalabilidade do banco | Baixa | Alto | Neon auto-scaling |
| Custos de IA | Média | Médio | Rate limiting, caching |
| Downtime Stripe/Clerk | Baixa | Alto | Fallbacks, retry logic |

### 10.3 Riscos de Negócio

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Churn alto | Média | Alto | Engajamento, valor contínuo |
| CAC elevado | Média | Alto | Marketing orgânico, referral |
| Regulamentação LGPD | Baixa | Alto | Compliance desde o início |

---

## 11. Critérios de Sucesso

### 11.1 Critérios de Lançamento (Tier 1)

- [ ] Todos os 12 módulos do Tier 1 implementados
- [ ] Cobertura de testes > 80%
- [ ] Performance dentro das metas
- [ ] Segurança auditada
- [ ] Documentação completa
- [ ] 50 beta testers com feedback positivo

### 11.2 Critérios de Sucesso (Ano 1)

- [ ] 3.000 usuários pagantes
- [ ] MRR R$ 42.000
- [ ] NPS > 50
- [ ] Churn < 5%
- [ ] Zero incidentes críticos de segurança

### 11.3 Critérios de Sucesso (Ano 2)

- [ ] 10.500 usuários pagantes
- [ ] MRR R$ 183.850
- [ ] 3 tiers ativos
- [ ] Break-even atingido
- [ ] Expansão para novos mercados (LATAM)

---

## 12. Referências

### 12.1 Documentação Interna

- [Arquitetura do Sistema](arquitetura-sistema.md)
- [Especificação de API](api-endpoints.md)
- [Banco de Dados](banco-dados.md)
- [Guia de Instalação](guia-instalacao.md)
- [Guia de Desenvolvimento](guia-desenvolvimento.md)
- [Padrões de Código](padroes-codigo.md)
- [Definição de Tiers](definicao-tiers-precos.md)

### 12.2 Diagramas

- [Diagrama de Dados](diagrama-dados-tiers.drawio)
- [Diagrama de Caso de Uso](diagrama-caso-de-uso-tiers.drawio)
- [Diagrama de Classes](diagrama-classes-tiers.drawio)
- [Diagrama de Sequência](diagrama-sequencia.drawio)
- [Diagrama de Atividades](diagrama-atividades.drawio)
- [Diagrama de Deploy](diagrama-deploy.drawio)
- [Diagrama de Componentes](diagrama-componentes.drawio)

### 12.3 Pesquisa de Mercado

- Análise de concorrentes (docs/market/)
- Benchmark de preços
- Pesquisa com usuários

---

## Histórico de Revisões

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0 | Jan/2026 | Equipe Monettis | Documento inicial |

---

**Aprovado por**: [Nome do Responsável]
**Data de Aprovação**: [Data]
**Próxima Revisão**: [Data]
