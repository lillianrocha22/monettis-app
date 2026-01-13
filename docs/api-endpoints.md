# Especificação de API - Monettis App

**Documentação de Endpoints e Server Actions**

**Versão**: 1.0
**Data**: Janeiro 2026
**Status**: Vigente

---

## 📋 Índice

1. [Visão Geral](#1-visão-geral)
2. [Autenticação](#2-autenticação)
3. [Server Actions (Next.js)](#3-server-actions-nextjs)
4. [API Routes](#4-api-routes)
5. [Webhooks](#5-webhooks)
6. [Especificação Futura - REST API (Fase 2)](#6-especificação-futura---rest-api-fase-2)
7. [Códigos de Erro](#7-códigos-de-erro)
8. [Rate Limiting](#8-rate-limiting)

---

## 1. Visão Geral

### 1.1 Arquitetura Atual (Fase 1)

O Monettis App utiliza **Server Actions** do Next.js 14 para comunicação cliente-servidor, ao invés de endpoints REST tradicionais.

```
┌─────────────┐
│   Frontend  │
│  (Client)   │
└──────┬──────┘
       │ invoke
       ▼
┌─────────────┐
│   Server    │
│   Actions   │  "use server"
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Prisma    │
│   Database  │
└─────────────┘
```

### 1.2 Tecnologias

- **Server Actions**: Funções TypeScript com diretiva `"use server"`
- **Validação**: Zod schemas
- **Autenticação**: Clerk (`auth()` helper)
- **ORM**: Prisma Client

---

## 2. Autenticação

### 2.1 Método de Autenticação

Todas as Server Actions e API Routes protegidas utilizam **Clerk** para autenticação.

**Exemplo de Verificação**:
```typescript
import { auth } from "@clerk/nextjs/server";

export async function protectedAction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Lógica da ação
}
```

### 2.2 Headers Obrigatórios

Para rotas protegidas (futuras APIs REST):

```http
Authorization: Bearer <clerk_session_token>
Content-Type: application/json
```

---

## 3. Server Actions (Next.js)

### 3.1 Transações

#### 3.1.1 Criar/Atualizar Transação

**Função**: `upsertTransaction`
**Arquivo**: `app/_actions/upsert-transaction/index.ts`

**Parâmetros**:
```typescript
interface UpsertTransactionParams {
  id?: string;                         // UUID (opcional, para update)
  name: string;                        // Nome da transação
  amount: number;                      // Valor (positivo, 2 decimais)
  type: "DEPOSIT" | "EXPENSE" | "INVESTMENT";
  category: TransactionCategory;       // Enum: HOUSING, FOOD, etc.
  paymentMethod: TransactionPaymentMethod; // Enum: CREDIT_CARD, PIX, etc.
  date: Date;                          // Data da transação
}
```

**Schema de Validação**:
```typescript
// app/_actions/upsert-transaction/schema.ts
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  amount: z.number().positive("Valor deve ser positivo"),
  type: z.enum(["DEPOSIT", "EXPENSE", "INVESTMENT"]),
  category: z.enum([
    "HOUSING", "TRANSPORTATION", "FOOD", "ENTERTAINMENT",
    "HEALTH", "UTILITY", "SALARY", "EDUCATION", "OTHER"
  ]),
  paymentMethod: z.enum([
    "CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER",
    "BANK_SLIP", "CASH", "PIX", "OTHER"
  ]),
  date: z.date(),
});
```

**Retorno**:
```typescript
Promise<void>
```

**Erros**:
- `"Unauthorized"`: Usuário não autenticado
- `ZodError`: Validação falhou
- `PrismaClientKnownRequestError`: Erro de banco de dados

**Exemplo de Uso**:
```typescript
"use client"

import { upsertTransaction } from "@/app/_actions/upsert-transaction";

const handleSubmit = async (data) => {
  try {
    await upsertTransaction({
      name: "Supermercado",
      amount: 150.50,
      type: "EXPENSE",
      category: "FOOD",
      paymentMethod: "CREDIT_CARD",
      date: new Date(),
    });

    toast.success("Transação criada!");
  } catch (error) {
    toast.error("Erro ao criar transação");
  }
};
```

---

#### 3.1.2 Excluir Transação

**Função**: `deleteTransaction`
**Arquivo**: `app/transactions/_actions/delete-transaction/index.ts`

**Parâmetros**:
```typescript
interface DeleteTransactionParams {
  transactionId: string;  // UUID
}
```

**Retorno**:
```typescript
Promise<void>
```

**Erros**:
- `"Unauthorized"`: Usuário não autenticado
- `"Transaction not found"`: Transação não existe
- `"Forbidden"`: Transação não pertence ao usuário

---

### 3.2 Dashboard

#### 3.2.1 Obter Dados do Dashboard

**Função**: `getDashboard`
**Arquivo**: `app/_data/get-dashboard/index.ts`

**Parâmetros**:
```typescript
interface GetDashboardParams {
  month: string;  // Formato: "YYYY-MM" (ex: "2026-01")
}
```

**Retorno**:
```typescript
interface DashboardData {
  balance: number;                    // Saldo total
  depositsTotal: number;              // Total de receitas
  investmentsTotal: number;           // Total de investimentos
  expensesTotal: number;              // Total de despesas

  typesPercentage: {
    [key in TransactionType]: number; // Percentual por tipo
  };

  totalExpensePerCategory: Array<{
    category: TransactionCategory;
    totalAmount: number;
    percentageOfTotal: number;
  }>;

  lastTransactions: Transaction[];   // Últimas 10 transações
}
```

**Exemplo**:
```typescript
const dashboard = await getDashboard({ month: "2026-01" });

console.log(dashboard);
// {
//   balance: 5000,
//   depositsTotal: 7000,
//   expensesTotal: 2000,
//   investmentsTotal: 0,
//   typesPercentage: { DEPOSIT: 77.78, EXPENSE: 22.22, INVESTMENT: 0 },
//   totalExpensePerCategory: [
//     { category: "FOOD", totalAmount: 800, percentageOfTotal: 40 },
//     { category: "TRANSPORTATION", totalAmount: 600, percentageOfTotal: 30 },
//     ...
//   ],
//   lastTransactions: [...]
// }
```

---

#### 3.2.2 Gerar Relatório com IA

**Função**: `generateAiReport`
**Arquivo**: `app/(home)/_actions/generate-ai-report/index.ts`

**Parâmetros**:
```typescript
interface GenerateAiReportParams {
  month: string;  // Formato: "YYYY-MM"
}
```

**Retorno**:
```typescript
Promise<string>  // Relatório em Markdown
```

**Processamento**:
1. Busca transações do mês
2. Calcula estatísticas (totais, médias, categorias)
3. Envia prompt para OpenAI GPT-4o-mini
4. Retorna análise em Markdown

**Exemplo de Retorno**:
```markdown
# Relatório Financeiro - Janeiro 2026

## Resumo Geral
Você teve um mês financeiramente positivo, com saldo de R$ 5.000,00.

## Análise de Gastos
Suas maiores despesas foram em:
- Alimentação: R$ 800,00 (40%)
- Transporte: R$ 600,00 (30%)

## Sugestões
1. Considere reduzir gastos com alimentação...
2. Avalie opções de transporte público...
```

**Rate Limit**: 5 relatórios por usuário por dia

---

### 3.3 Assinatura

#### 3.3.1 Criar Checkout Stripe

**Função**: `createStripeCheckout`
**Arquivo**: `app/subscription/_actions/create-stripe-checkout/index.ts`

**Parâmetros**: Nenhum (usa `userId` do auth)

**Retorno**:
```typescript
interface CheckoutResponse {
  sessionId: string;  // Stripe Checkout Session ID
}
```

**Fluxo**:
1. Verifica se usuário já tem assinatura
2. Cria customer no Stripe (se não existir)
3. Cria checkout session
4. Retorna session ID para redirecionamento

**Exemplo de Uso**:
```typescript
const { sessionId } = await createStripeCheckout();

// Redireciona para Stripe Checkout
const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
await stripe.redirectToCheckout({ sessionId });
```

---

### 3.4 Dados Auxiliares

#### 3.4.1 Obter Transações do Mês Atual

**Função**: `getCurrentMonthTransactions`
**Arquivo**: `app/_data/get-current-month-transactions/index.ts`

**Retorno**:
```typescript
Promise<Transaction[]>
```

---

#### 3.4.2 Verificar Limite de Transações (Free Tier)

**Função**: `canUserAddTransaction`
**Arquivo**: `app/_data/can-user-add-transaction/index.ts`

**Retorno**:
```typescript
Promise<boolean>  // true se pode adicionar, false se atingiu limite
```

**Lógica**:
- Free tier: Máximo 10 transações por mês
- Premium tiers: Ilimitado

---

#### 3.4.3 Obter Anos Disponíveis

**Função**: `getAvailableYears`
**Arquivo**: `app/_data/get-available-years/index.ts`

**Retorno**:
```typescript
Promise<number[]>  // Ex: [2024, 2025, 2026]
```

---

## 4. API Routes

### 4.1 Webhooks Stripe

**Endpoint**: `POST /api/webhooks/stripe`
**Arquivo**: `app/api/webhooks/stripe/route.ts`

**Headers Obrigatórios**:
```http
Stripe-Signature: <signature>
```

**Body**: Raw body do evento Stripe

**Eventos Processados**:

#### 4.1.1 `checkout.session.completed`

Disparado quando checkout é concluído.

**Ação**:
1. Extrai `customer` e `subscription` do evento
2. Busca usuário por `stripeCustomerId`
3. Atualiza metadata do Clerk com tier "premium"

---

#### 4.1.2 `invoice.payment_succeeded`

Disparado quando pagamento recorrente é bem-sucedido.

**Ação**:
1. Valida assinatura ativa
2. Mantém tier "premium" no metadata

---

#### 4.1.3 `customer.subscription.deleted`

Disparado quando assinatura é cancelada.

**Ação**:
1. Busca usuário por `stripeCustomerId`
2. Atualiza metadata do Clerk para tier "free"

---

**Retorno**:
```json
{
  "received": true
}
```

**Status Codes**:
- `200`: Webhook processado com sucesso
- `400`: Assinatura inválida
- `500`: Erro ao processar

---

## 5. Webhooks

### 5.1 Validação de Webhooks

Todos os webhooks externos DEVEM validar assinatura antes de processar:

```typescript
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Processar evento

  } catch (error) {
    return new Response("Invalid signature", { status: 400 });
  }
}
```

---

## 6. Especificação Futura - REST API (Fase 2)

### 6.1 Base URL

```
Production: https://api.monettis.com/v1
Staging: https://api-staging.monettis.com/v1
```

### 6.2 Autenticação

```http
Authorization: Bearer <jwt_token>
```

### 6.3 Endpoints Planejados

#### Transações

```http
GET    /transactions              # Listar transações
POST   /transactions              # Criar transação
GET    /transactions/:id          # Obter transação
PUT    /transactions/:id          # Atualizar transação
DELETE /transactions/:id          # Excluir transação
GET    /transactions/stats        # Estatísticas
```

#### Dashboard

```http
GET    /dashboard                 # Dados do dashboard
GET    /dashboard/charts          # Dados para gráficos
```

#### Relatórios

```http
POST   /reports/generate          # Gerar relatório IA
GET    /reports/:id               # Obter relatório
```

#### Importação

```http
POST   /import/bank-statement     # Importar extrato
POST   /import/credit-card        # Importar fatura
GET    /import/:id/status         # Status da importação
```

---

## 7. Códigos de Erro

### 7.1 Erros de Autenticação

| Código | Mensagem | Descrição |
|--------|----------|-----------|
| 401 | Unauthorized | Token ausente ou inválido |
| 403 | Forbidden | Usuário sem permissão |

### 7.2 Erros de Validação

| Código | Mensagem | Descrição |
|--------|----------|-----------|
| 400 | Bad Request | Dados inválidos |
| 422 | Unprocessable Entity | Validação Zod falhou |

### 7.3 Erros de Recursos

| Código | Mensagem | Descrição |
|--------|----------|-----------|
| 404 | Not Found | Recurso não existe |
| 409 | Conflict | Conflito (ex: duplicação) |

### 7.4 Erros de Servidor

| Código | Mensagem | Descrição |
|--------|----------|-----------|
| 500 | Internal Server Error | Erro inesperado |
| 503 | Service Unavailable | Serviço temporariamente indisponível |

### 7.5 Formato de Erro

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid transaction data",
    "details": [
      {
        "field": "amount",
        "message": "Amount must be positive"
      }
    ]
  }
}
```

---

## 8. Rate Limiting

### 8.1 Limites por Endpoint (Planejado)

| Endpoint | Limite | Janela |
|----------|--------|--------|
| Server Actions | 100 req | 1 minuto |
| AI Report | 5 req | 1 dia |
| Import | 10 req | 1 hora |
| Webhooks | 1000 req | 1 minuto |

### 8.2 Headers de Rate Limit

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### 8.3 Resposta ao Exceder Limite

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retryAfter": 60
  }
}
```

---

## 9. Versionamento

### 9.1 Estratégia

- **Fase 1 (Atual)**: Server Actions (sem versionamento formal)
- **Fase 2 (Futura)**: REST API com versionamento via URL (`/v1`, `/v2`)

### 9.2 Compatibilidade

- Mudanças **backward-compatible**: Mesma versão
- Mudanças **breaking**: Nova versão

---

## 10. Referências

### 10.1 Documentação Relacionada

- [Arquitetura do Sistema](arquitetura-sistema.md)
- [Requisitos Funcionais](requisitos.md)
- [Diagrama de Classes](diagrama-classes-tiers.drawio)

### 10.2 Documentação Externa

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Clerk Authentication](https://clerk.com/docs)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Zod Validation](https://zod.dev/)

---

**Aprovado por**: [Nome]
**Data de Aprovação**: [Data]
**Próxima Revisão**: [Data]
