# Arquitetura do Sistema - Monettis App

**Documento de Arquitetura de Software**

**Versão**: 1.0
**Data**: Janeiro 2026
**Status**: Vigente

---

## 📋 Índice

1. [Visão Geral](#1-visão-geral)
2. [Princípios Arquiteturais](#2-princípios-arquiteturais)
3. [Fase 1: Arquitetura Modular (Atual)](#3-fase-1-arquitetura-modular-atual)
4. [Fase 2: Migração para Microsserviços (Planejado)](#4-fase-2-migração-para-microsserviços-planejado)
5. [Separação Aplicativo vs Backoffice](#5-separação-aplicativo-vs-backoffice)
6. [Camadas da Aplicação](#6-camadas-da-aplicação)
7. [Módulos e Serviços](#7-módulos-e-serviços)
8. [Integrações Externas](#8-integrações-externas)
9. [Banco de Dados](#9-banco-de-dados)
10. [Segurança](#10-segurança)
11. [Escalabilidade](#11-escalabilidade)
12. [Referências](#12-referências)

---

## 1. Visão Geral

### 1.1 Propósito

Este documento descreve a arquitetura do Monettis App, um sistema de gestão financeira multi-tier (pessoal, familiar e empresarial) que evolui de uma arquitetura monolítica modular para uma arquitetura de microsserviços.

### 1.2 Escopo

- **Fase 1 (Atual)**: Monólito modular Next.js 14 com separação clara de responsabilidades
- **Fase 2 (Planejada)**: Migração gradual para microsserviços independentes

### 1.3 Objetivos Arquiteturais

1. **Modularidade**: Cada funcionalidade é tratada como módulo independente
2. **Escalabilidade**: Preparar para crescimento horizontal
3. **Manutenibilidade**: Código organizado e fácil de entender
4. **Segurança**: Isolamento de dados e autenticação robusta
5. **Performance**: Otimização de carregamento e processamento

---

## 2. Princípios Arquiteturais

### 2.1 Separation of Concerns

Cada módulo possui responsabilidades bem definidas:
- **Apresentação**: Componentes React (UI)
- **Lógica de Negócio**: Server Actions e Services
- **Acesso a Dados**: Camada de dados com Prisma
- **Integrações**: Serviços externos isolados

### 2.2 DRY (Don't Repeat Yourself)

- Componentes reutilizáveis em `app/_components/ui`
- Funções utilitárias em `app/_utils`
- Constantes centralizadas em `app/_constants`

### 2.3 SOLID

- **S**ingle Responsibility: Cada módulo/serviço tem uma responsabilidade
- **O**pen/Closed: Extensível sem modificar código existente
- **L**iskov Substitution: Interfaces consistentes
- **I**nterface Segregation: APIs específicas por módulo
- **D**ependency Inversion: Dependência de abstrações

### 2.4 Convention over Configuration

- Estrutura de pastas padronizada
- Nomenclatura consistente
- Padrões do Next.js 14 App Router

---

## 3. Fase 1: Arquitetura Modular (Atual)

### 3.1 Visão Geral da Fase 1

```
┌─────────────────────────────────────────────────────────────┐
│                    MONETTIS APP - FASE 1                     │
│                  Monólito Modular Next.js 14                 │
└─────────────────────────────────────────────────────────────┘

┌────────────────────┐        ┌────────────────────┐
│     FRONTEND       │        │      BACKEND       │
│   (React/Next.js)  │◄──────►│  (Server Actions)  │
│                    │        │                    │
│  ┌──────────────┐  │        │  ┌──────────────┐  │
│  │  Dashboard   │  │        │  │   Services   │  │
│  ├──────────────┤  │        │  ├──────────────┤  │
│  │ Transactions │  │        │  │  Data Layer  │  │
│  ├──────────────┤  │        │  ├──────────────┤  │
│  │ Subscription │  │        │  │    Prisma    │  │
│  └──────────────┘  │        │  └──────────────┘  │
└────────────────────┘        └────────────────────┘
         │                             │
         └──────────┬──────────────────┘
                    │
         ┌──────────▼──────────┐
         │   PostgreSQL 16     │
         │   (Neon/Vercel)     │
         └─────────────────────┘

         ┌─────────────────────┐
         │ Serviços Externos   │
         ├─────────────────────┤
         │ Clerk (Auth)        │
         │ Stripe (Payments)   │
         │ OpenAI (IA)         │
         │ WhatsApp (Notify)   │
         └─────────────────────┘
```

### 3.2 Estrutura de Diretórios

```
app/
├── (home)/                    # Módulo: Dashboard
│   ├── _actions/
│   │   └── generate-ai-report/
│   ├── _components/
│   │   ├── ai-report-button.tsx
│   │   ├── expenses-per-category.tsx
│   │   ├── last-transactions.tsx
│   │   ├── percentage-item.tsx
│   │   ├── summary-card.tsx
│   │   ├── summary-cards.tsx
│   │   └── time-select.tsx
│   └── page.tsx
│
├── transactions/              # Módulo: Gestão de Transações
│   ├── _actions/
│   │   └── delete-transaction/
│   ├── _columns/
│   │   └── index.tsx
│   ├── _components/
│   │   ├── edit-transaction-button.tsx
│   │   └── type-badge.tsx
│   └── page.tsx
│
├── subscription/              # Módulo: Assinatura
│   ├── _actions/
│   │   └── create-stripe-checkout/
│   ├── _components/
│   │   └── acquire-plan-button.tsx
│   └── page.tsx
│
├── login/                     # Módulo: Autenticação
│   └── [[...sign-in]]/
│       └── page.tsx
│
├── _actions/                  # Server Actions Compartilhadas
│   └── upsert-transaction/
│       ├── index.ts
│       └── schema.ts
│
├── _components/               # Componentes Globais
│   ├── add-transaction-button.tsx
│   ├── money-input.tsx
│   ├── navbar.tsx
│   └── ui/                    # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ...
│
├── _data/                     # Camada de Dados
│   ├── can-user-add-transaction/
│   │   └── index.ts
│   ├── get-available-years/
│   │   └── index.ts
│   ├── get-current-month-transactions/
│   │   └── index.ts
│   └── get-dashboard/
│       └── index.ts
│
├── _lib/                      # Bibliotecas e Configurações
│   ├── auth.ts                # Configuração Clerk
│   ├── prisma.ts              # Cliente Prisma
│   ├── stripe.ts              # Cliente Stripe
│   └── utils.ts               # Funções utilitárias
│
├── _constants/                # Constantes
│   └── transactions.ts        # Enums e constantes de transações
│
├── _utils/                    # Utilitários
│   └── format-currency.ts
│
├── api/                       # API Routes
│   └── webhooks/
│       └── stripe/
│           └── route.ts
│
├── layout.tsx                 # Layout raiz
└── globals.css                # Estilos globais
```

### 3.3 Módulos Implementados (Fase 1)

#### Módulo 1: Autenticação (Login)
**Responsabilidade**: Gerenciar autenticação e autorização de usuários

- **Tecnologia**: Clerk
- **Endpoints**:
  - `/login` - Página de login
  - `/api/auth/*` - Rotas do Clerk
- **Componentes**:
  - SignIn (Clerk)
  - UserButton (Clerk)

#### Módulo 2: Dashboard
**Responsabilidade**: Exibir visão geral financeira do usuário

- **Página**: `app/(home)/page.tsx`
- **Server Actions**:
  - `generateAiReport` - Gera relatório com IA
- **Data Layer**:
  - `getDashboard` - Busca dados agregados
- **Componentes**:
  - `SummaryCards` - Cards de resumo
  - `ExpensesPerCategory` - Gráfico de pizza
  - `LastTransactions` - Lista de transações recentes
  - `AiReportButton` - Botão para gerar relatório IA

#### Módulo 3: Gestão de Transações
**Responsabilidade**: CRUD de transações financeiras

- **Página**: `app/transactions/page.tsx`
- **Server Actions**:
  - `upsertTransaction` - Criar/Atualizar transação
  - `deleteTransaction` - Excluir transação
- **Data Layer**:
  - `getCurrentMonthTransactions` - Lista transações do mês
  - `canUserAddTransaction` - Verifica limite free tier
- **Componentes**:
  - `DataTable` - Tabela de transações
  - `AddTransactionButton` - Botão adicionar
  - `EditTransactionButton` - Botão editar
  - `DeleteTransactionButton` - Botão excluir (na tabela)

#### Módulo 4: Assinatura
**Responsabilidade**: Gestão de planos e pagamentos

- **Página**: `app/subscription/page.tsx`
- **Server Actions**:
  - `createStripeCheckout` - Cria sessão de checkout
- **Webhook**:
  - `app/api/webhooks/stripe/route.ts` - Processa eventos Stripe
- **Componentes**:
  - `AcquirePlanButton` - Botão para adquirir plano

### 3.4 Padrões de Implementação (Fase 1)

#### Server Actions Pattern

```typescript
// app/_actions/upsert-transaction/index.ts
"use server"

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { upsertTransactionSchema } from "./schema";

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  // 1. Autenticação
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 2. Validação
  upsertTransactionSchema.parse(params);

  // 3. Lógica de negócio
  await db.transaction.upsert({
    where: { id: params.id ?? "" },
    update: { ...params, userId },
    create: { ...params, userId },
  });
};
```

#### Data Layer Pattern

```typescript
// app/_data/get-dashboard/index.ts
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getDashboard = async (month: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: new Date(`${month}-01`),
        lt: new Date(`${month}-31`),
      },
    },
  });

  // Agregações e cálculos
  const totalExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  return { transactions, totalExpenses, /* ... */ };
};
```

#### Component Pattern

```typescript
// app/_components/add-transaction-button.tsx
"use client"

import { useState } from "react";
import { upsertTransaction } from "@/app/_actions/upsert-transaction";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";

export function AddTransactionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data) => {
    await upsertTransaction(data);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Transaction</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          {/* Form */}
        </DialogContent>
      </Dialog>
    </>
  );
}
```

---

## 4. Fase 2: Migração para Microsserviços (Planejado)

### 4.1 Visão Geral da Fase 2

```
┌─────────────────────────────────────────────────────────────┐
│                    MONETTIS APP - FASE 2                     │
│                 Arquitetura de Microsserviços                │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Frontend   │  │  Backoffice  │  │  Mobile App  │
│  (Next.js)   │  │  (Next.js)   │  │  (React Native)
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └─────────────────┼─────────────────┘
                         │
              ┌──────────▼──────────┐
              │   API Gateway       │
              │  (Kong/Nginx)       │
              └──────────┬──────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
    │  Auth   │    │ Trans-  │    │  Pay-   │
    │ Service │    │ actions │    │ ments   │
    │         │    │ Service │    │ Service │
    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │
    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
    │ Users   │    │ Trans-  │    │ Subs-   │
    │   DB    │    │ actions │    │ criptions
    │         │    │   DB    │    │   DB    │
    └─────────┘    └─────────┘    └─────────┘

         ┌────────────┐    ┌────────────┐
         │  Reports   │    │  Notif.    │
         │  Service   │    │  Service   │
         │  (IA)      │    │ (WhatsApp) │
         └────────────┘    └────────────┘
```

### 4.2 Microsserviços Planejados

#### MS-01: Auth Service
**Responsabilidade**: Autenticação e autorização

- **Tecnologia**: Clerk + Custom JWT validation
- **Banco de Dados**: PostgreSQL (users, sessions)
- **APIs**:
  - `POST /auth/login`
  - `POST /auth/logout`
  - `GET /auth/me`
  - `PUT /auth/profile`

#### MS-02: Transactions Service
**Responsabilidade**: Gestão de transações

- **Tecnologia**: Node.js + Express/Fastify
- **Banco de Dados**: PostgreSQL (transactions)
- **APIs**:
  - `GET /transactions`
  - `POST /transactions`
  - `PUT /transactions/:id`
  - `DELETE /transactions/:id`
  - `GET /transactions/stats`

#### MS-03: Payments Service
**Responsabilidade**: Processamento de pagamentos e assinaturas

- **Tecnologia**: Node.js + Stripe SDK
- **Banco de Dados**: PostgreSQL (subscriptions, payments)
- **APIs**:
  - `POST /payments/checkout`
  - `POST /payments/webhook`
  - `GET /subscriptions`
  - `PUT /subscriptions/:id`

#### MS-04: Reports Service
**Responsabilidade**: Geração de relatórios com IA

- **Tecnologia**: Python + FastAPI + OpenAI SDK
- **Banco de Dados**: Cache (Redis)
- **APIs**:
  - `POST /reports/generate`
  - `GET /reports/:id`

#### MS-05: Notifications Service
**Responsabilidade**: Envio de notificações

- **Tecnologia**: Node.js + WhatsApp Business API
- **Banco de Dados**: PostgreSQL (notification_logs)
- **APIs**:
  - `POST /notifications/send`
  - `GET /notifications/history`

#### MS-06: Import Service
**Responsabilidade**: Importação de extratos e faturas

- **Tecnologia**: Node.js + File processing
- **Banco de Dados**: PostgreSQL + S3 (files)
- **APIs**:
  - `POST /import/bank-statement`
  - `POST /import/credit-card`
  - `GET /import/status/:id`

### 4.3 Padrões de Comunicação

#### Síncrona: REST APIs
- Frontend ↔ API Gateway ↔ Microsserviços
- Timeout: 30s
- Retry: 3 tentativas com backoff exponencial

#### Assíncrona: Event Bus (RabbitMQ/Kafka)
- Eventos de domínio entre serviços
- Exemplo: `TransactionCreated` → `NotificationService`

### 4.4 Estratégia de Migração

**Abordagem**: Strangler Fig Pattern

1. **Fase 2.1**: Extrair Auth Service (Clerk wrapper)
2. **Fase 2.2**: Extrair Payments Service (Stripe)
3. **Fase 2.3**: Extrair Transactions Service
4. **Fase 2.4**: Extrair Reports Service (IA)
5. **Fase 2.5**: Extrair Notifications Service

---

## 5. Separação Aplicativo vs Backoffice

### 5.1 Aplicativo (Frontend do Usuário)

**Status**: ✅ Implementado

- **Público**: Usuários finais (individual, família, empresarial)
- **Tecnologia**: Next.js 14 App Router
- **Localização**: `app/`
- **Características**:
  - Interface responsiva
  - Dashboard financeiro
  - Gestão de transações
  - Relatórios personalizados

### 5.2 Backoffice (Admin Panel)

**Status**: 📋 Planejado para Fase 2

- **Público**: Administradores e equipe interna
- **Tecnologia**: Next.js 14 (separado) ou Admin Framework
- **Localização**: `backoffice/` (novo projeto)
- **Funcionalidades Planejadas**:
  - Gestão de usuários
  - Monitoramento de assinaturas
  - Suporte e tickets
  - Análise de uso (analytics)
  - Configurações de sistema
  - Gestão de conteúdo
  - Logs e auditoria

### 5.3 Arquitetura Backoffice (Planejado)

```
backoffice/
├── app/
│   ├── dashboard/              # Dashboard administrativo
│   ├── users/                  # Gestão de usuários
│   ├── subscriptions/          # Gestão de assinaturas
│   ├── support/                # Tickets de suporte
│   ├── analytics/              # Análises e métricas
│   ├── settings/               # Configurações globais
│   └── audit-logs/             # Logs de auditoria
│
├── _components/                # Componentes admin
└── _lib/                       # Libs específicas admin
```

---

## 6. Camadas da Aplicação

### 6.1 Presentation Layer (UI)

**Responsabilidade**: Interface do usuário

- **Tecnologia**: React 18 + Next.js 14
- **Componentes**: shadcn/ui + Radix UI
- **Estilização**: Tailwind CSS
- **Estado**: React Hooks + Server State

### 6.2 Business Logic Layer

**Responsabilidade**: Regras de negócio

- **Server Actions**: Lógica executada no servidor
- **Services**: Camada de serviços (planejado para Fase 2)
- **Validação**: Zod schemas

### 6.3 Data Access Layer

**Responsabilidade**: Acesso ao banco de dados

- **ORM**: Prisma 6.19.0
- **Banco**: PostgreSQL 16
- **Padrão**: Repository Pattern (parcial)

### 6.4 Integration Layer

**Responsabilidade**: Integrações com serviços externos

- **Clerk**: Autenticação
- **Stripe**: Pagamentos
- **OpenAI**: IA
- **WhatsApp**: Notificações

---

## 7. Módulos e Serviços

### 7.1 Mapeamento Módulos → Microsserviços

| Módulo Atual (Fase 1) | Microsserviço (Fase 2) | Prioridade |
|------------------------|------------------------|------------|
| Autenticação           | Auth Service           | P0         |
| Dashboard              | Dashboard Service      | P1         |
| Transações             | Transactions Service   | P0         |
| Assinatura             | Payments Service       | P0         |
| Relatórios IA          | Reports Service        | P1         |
| Importação (planejado) | Import Service         | P2         |
| Notificações (planejado)| Notifications Service | P2         |

### 7.2 Dependências entre Módulos

```
Auth ──┐
       ├──► Transactions ──► Dashboard
       │                        │
       ├──► Payments ───────────┤
       │                        │
       └──► Reports ◄───────────┘
```

---

## 8. Integrações Externas

### 8.1 Clerk (Autenticação)

**Propósito**: Gestão de usuários e autenticação

- **Modelo**: SaaS
- **Dados armazenados no Clerk**:
  - Perfil do usuário
  - Email
  - Metadata (subscription tier)
- **Integração**:
  - Middleware do Next.js
  - Server-side auth
  - Webhooks para sincronização

### 8.2 Stripe (Pagamentos)

**Propósito**: Processamento de pagamentos e assinaturas

- **Modelo**: API + Webhooks
- **Fluxo**:
  1. Frontend → Cria checkout session
  2. Stripe → Processa pagamento
  3. Webhook → Atualiza subscription no DB
  4. Clerk metadata → Sincroniza tier

### 8.3 OpenAI (IA)

**Propósito**: Geração de relatórios financeiros

- **Modelo**: GPT-4o-mini
- **Fluxo**:
  1. Usuário clica "Gerar Relatório"
  2. Server Action busca transações
  3. Prompt enviado para OpenAI
  4. Resposta renderizada como Markdown

### 8.4 WhatsApp Business API (Planejado)

**Propósito**: Notificações e alertas

- **Modelo**: API + Webhooks
- **Casos de uso**:
  - Lembrete de vencimento
  - Alerta de meta atingida
  - Confirmação de transação

---

## 9. Banco de Dados

### 9.1 Estratégia Atual (Fase 1)

- **Modelo**: Banco único PostgreSQL
- **ORM**: Prisma
- **Isolamento**: Por `userId`

### 9.2 Estratégia Futura (Fase 2)

- **Modelo**: Database per Service
- **Sincronização**: Event Sourcing / CQRS

**Exemplo**:
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Users DB    │  │ Transactions │  │ Payments DB  │
│ (Auth Svc)   │  │     DB       │  │ (Pay Svc)    │
└──────────────┘  └──────────────┘  └──────────────┘
```

### 9.3 Schema Atual

Referência completa: [docs/banco-dados.md](banco-dados.md)

**Tabelas principais**:
- `Transaction` - Transações financeiras
- (Planejado) `CreditCard`, `BankAccount`, `Goal`, etc.

---

## 10. Segurança

### 10.1 Autenticação

- **Clerk**: JWT tokens
- **Validação**: Middleware em todas as rotas protegidas
- **Session**: Server-side

### 10.2 Autorização

- **Multi-tenant**: Isolamento por `userId`
- **Tiers**: Validação de features por subscription
- **API**: Validação de permissões em Server Actions

### 10.3 Dados Sensíveis

- **Variáveis de ambiente**: Nunca commitar .env
- **Secrets**: Armazenados em plataforma (Vercel, Railway)
- **PCI-DSS**: Stripe lida com dados de cartão

### 10.4 Webhooks

- **Validação**: Assinatura de eventos
- **Idempotência**: Proteção contra replay attacks

---

## 11. Escalabilidade

### 11.1 Fase 1 (Atual)

- **Horizontal**: Serverless functions (Vercel)
- **Vertical**: Otimização de queries
- **Cache**: React Server Components cache

### 11.2 Fase 2 (Planejado)

- **Load Balancer**: API Gateway
- **Auto-scaling**: Kubernetes / Docker Swarm
- **Cache**: Redis para sessions e reports
- **CDN**: Cloudflare para assets

---

## 12. Referências

### 12.1 Documentação Relacionada

- [Diagrama de Classes](diagrama-classes-tiers.drawio)
- [Diagrama de Casos de Uso](diagrama-caso-de-uso-tiers.drawio)
- [Diagrama de Dados](diagrama-dados-tiers.drawio)
- [Requisitos Funcionais](requisitos.md)
- [Definição de Tiers](definicao-tiers-precos.md)

### 12.2 Referências Externas

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Microservices Patterns (Chris Richardson)](https://microservices.io/patterns/)

---

**Aprovado por**: [Nome]
**Data de Aprovação**: [Data]
**Próxima Revisão**: [Data]
