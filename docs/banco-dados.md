# Documentação do Banco de Dados - Monettis App

**Documentação Completa da Estrutura de Dados**

**Versão**: 1.0
**Data**: Janeiro 2026
**Status**: Vigente

---

## 📋 Índice

1. [Visão Geral](#1-visão-geral)
2. [Tecnologias](#2-tecnologias)
3. [Schema Atual (Fase 1)](#3-schema-atual-fase-1)
4. [Schema Planejado (Tiers)](#4-schema-planejado-tiers)
5. [Enums](#5-enums)
6. [Índices e Performance](#6-índices-e-performance)
7. [Migrations](#7-migrations)
8. [Queries Comuns](#8-queries-comuns)
9. [Estratégia de Backup](#9-estratégia-de-backup)
10. [Referências](#10-referências)

---

## 1. Visão Geral

### 1.1 Banco de Dados

- **Tipo**: PostgreSQL 16
- **Provider**: Neon (recomendado) ou qualquer PostgreSQL compatível
- **ORM**: Prisma 6.19.0
- **Estratégia**: Single Database (Fase 1) → Database per Service (Fase 2)

### 1.2 Modelo de Dados

```
┌─────────────────────────────────────────────────┐
│           MONETTIS DATABASE SCHEMA              │
└─────────────────────────────────────────────────┘

FASE 1 (ATUAL):
┌──────────────┐
│ Transaction  │ ← Tabela principal implementada
└──────────────┘

TIER 1 (PLANEJADO):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ CreditCard   │  │ BankAccount  │  │ Goal         │
└──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐
│RecurringBill │
└──────────────┘

TIER 2 (PLANEJADO):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│FamilyMember  │  │ FamilyGoal   │  │ Allowance    │
└──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ExpenseSplit  │  │ParentalCtrl  │  │SpendingRule  │
└──────────────┘  └──────────────┘  └──────────────┘

TIER 3 (PLANEJADO):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│BusinessProf  │  │ CostCenter   │  │ Client       │
└──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Supplier     │  │ Invoice      │  │ Contract     │
└──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│TaxCalc       │  │CashFlowProj  │
└──────────────┘  └──────────────┘
```

---

## 2. Tecnologias

### 2.1 Stack de Dados

| Componente | Tecnologia | Versão |
|------------|------------|--------|
| **Database** | PostgreSQL | 16+ |
| **ORM** | Prisma | 6.19.0 |
| **Client** | @prisma/client | 6.19.0 |
| **Migrations** | Prisma Migrate | 6.19.0 |

### 2.2 Conexão

```typescript
// app/_lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
```

---

## 3. Schema Atual (Fase 1)

### 3.1 Tabela: Transaction

**Status**: ✅ Implementada

**Descrição**: Armazena todas as transações financeiras dos usuários.

**Estrutura**:

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `id` | String (UUID) | PRIMARY KEY, DEFAULT uuid_generate_v4() | Identificador único |
| `name` | String (VARCHAR) | NOT NULL | Nome/descrição da transação |
| `type` | Enum | NOT NULL | Tipo: DEPOSIT, EXPENSE, INVESTMENT |
| `amount` | Decimal(10,2) | NOT NULL | Valor da transação |
| `category` | Enum | NOT NULL | Categoria (HOUSING, FOOD, etc.) |
| `paymentMethod` | Enum | NOT NULL | Método de pagamento |
| `date` | DateTime | NOT NULL | Data da transação |
| `createdAt` | DateTime | DEFAULT NOW() | Data de criação do registro |
| `updatedAt` | DateTime | DEFAULT NOW(), ON UPDATE | Data de última atualização |
| `userId` | String | NOT NULL, INDEX | ID do usuário (Clerk) |

**Schema Prisma**:

```prisma
model Transaction {
  id            String                   @id @default(uuid())
  name          String
  type          TransactionType
  amount        Decimal                  @db.Decimal(10, 2)
  category      TransactionCategory
  paymentMethod TransactionPaymentMethod
  date          DateTime
  createdAt     DateTime                 @default(now())
  updatedAt     DateTime                 @updatedAt
  userId        String

  @@index([userId])
  @@index([date])
  @@index([userId, date])
}
```

**Índices**:
- `userId`: Para queries por usuário
- `date`: Para filtros por data
- `userId + date`: Índice composto para queries comuns

**SQL Gerado**:

```sql
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "category" "TransactionCategory" NOT NULL,
    "paymentMethod" "TransactionPaymentMethod" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");
CREATE INDEX "Transaction_userId_date_idx" ON "Transaction"("userId", "date");
```

**Exemplo de Registro**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Supermercado Extra",
  "type": "EXPENSE",
  "amount": 235.50,
  "category": "FOOD",
  "paymentMethod": "CREDIT_CARD",
  "date": "2026-01-15T10:30:00.000Z",
  "createdAt": "2026-01-15T10:35:22.123Z",
  "updatedAt": "2026-01-15T10:35:22.123Z",
  "userId": "user_2abcdefghijklmnop"
}
```

---

## 4. Schema Planejado (Tiers)

### 4.1 TIER 1 - Tabelas Adicionais (Planejadas)

#### 4.1.1 CreditCard

**Descrição**: Cartões de crédito do usuário

```prisma
model CreditCard {
  id              String   @id @default(uuid())
  name            String   // Ex: "Nubank Mastercard"
  lastFourDigits  String   // Últimos 4 dígitos
  brand           String   // Visa, Mastercard, Elo, etc.
  limit           Decimal  @db.Decimal(10, 2)
  closingDay      Int      // Dia do fechamento (1-31)
  dueDay          Int      // Dia do vencimento (1-31)
  userId          String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([userId])
}
```

**Relacionamentos**: Nenhum (por enquanto)

---

#### 4.1.2 BankAccount

**Descrição**: Contas bancárias do usuário

```prisma
model BankAccount {
  id            String   @id @default(uuid())
  name          String   // Nome da conta
  bank          String   // Nome do banco
  accountNumber String   // Número da conta (parcial)
  balance       Decimal  @db.Decimal(10, 2)
  userId        String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([userId])
}
```

---

#### 4.1.3 Goal

**Descrição**: Metas financeiras

```prisma
model Goal {
  id            String   @id @default(uuid())
  name          String   // Nome da meta
  targetAmount  Decimal  @db.Decimal(10, 2)
  currentAmount Decimal  @db.Decimal(10, 2) @default(0)
  deadline      DateTime
  userId        String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([userId])
}
```

---

#### 4.1.4 RecurringBill

**Descrição**: Contas recorrentes (a pagar/receber)

```prisma
model RecurringBill {
  id        String              @id @default(uuid())
  name      String
  amount    Decimal             @db.Decimal(10, 2)
  dueDay    Int                 // Dia do vencimento (1-31)
  category  TransactionCategory
  isActive  Boolean             @default(true)
  userId    String
  createdAt DateTime            @default(now())
  updatedAt DateTime            @updatedAt

  @@index([userId])
}
```

---

### 4.2 TIER 2 - Tabelas Familiares (Planejadas)

#### 4.2.1 FamilyMember

**Descrição**: Membros da família vinculados ao usuário

```prisma
enum FamilyRole {
  PARENT
  CHILD
  SPOUSE
}

model FamilyMember {
  id           String     @id @default(uuid())
  name         String
  email        String     @unique
  role         FamilyRole
  userId       String     // ID do usuário principal (pai/mãe)
  parentUserId String     // Referência ao usuário pai
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  // Relacionamentos
  transactions Transaction[] @relation("FamilyMemberTransactions")
  allowances   Allowance[]

  @@index([userId])
  @@index([parentUserId])
}
```

**Atualização em Transaction**:
```prisma
model Transaction {
  // ... campos existentes ...
  familyMemberId String?       // Opcional, apenas para TIER 2+
  familyMember   FamilyMember? @relation("FamilyMemberTransactions", fields: [familyMemberId], references: [id])
}
```

---

#### 4.2.2 Allowance

**Descrição**: Mesadas para membros da família

```prisma
model Allowance {
  id              String       @id @default(uuid())
  familyMemberId  String
  amount          Decimal      @db.Decimal(10, 2)
  frequency       String       // WEEKLY, MONTHLY
  nextPaymentDate DateTime
  isActive        Boolean      @default(true)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  // Relacionamentos
  familyMember FamilyMember @relation(fields: [familyMemberId], references: [id])

  @@index([familyMemberId])
}
```

---

#### 4.2.3 FamilyGoal

**Descrição**: Metas compartilhadas pela família

```prisma
model FamilyGoal {
  id            String   @id @default(uuid())
  name          String
  targetAmount  Decimal  @db.Decimal(10, 2)
  currentAmount Decimal  @db.Decimal(10, 2) @default(0)
  contributors  String[] // Array de FamilyMember IDs
  deadline      DateTime
  userId        String   // Usuário principal
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([userId])
}
```

---

#### 4.2.4 ExpenseSplit

**Descrição**: Divisão de despesas entre membros

```prisma
type SplitDetail {
  memberId String
  amount   Decimal
  paid     Boolean
}

model ExpenseSplit {
  id            String        @id @default(uuid())
  transactionId String
  splits        SplitDetail[] // JSON
  totalAmount   Decimal       @db.Decimal(10, 2)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([transactionId])
}
```

---

#### 4.2.5 ParentalControl

**Descrição**: Controles parentais

```prisma
type Restriction {
  type  String // CATEGORY_BLOCK, AMOUNT_LIMIT, TIME_RESTRICTION
  value String
}

model ParentalControl {
  id              String        @id @default(uuid())
  familyMemberId  String
  restrictions    Restriction[] // JSON
  spendingLimit   Decimal?      @db.Decimal(10, 2)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@unique([familyMemberId])
}
```

---

#### 4.2.6 SpendingRule

**Descrição**: Regras de gastos por membro

```prisma
model SpendingRule {
  id              String              @id @default(uuid())
  familyMemberId  String
  category        TransactionCategory
  maxAmount       Decimal             @db.Decimal(10, 2)
  period          String              // DAILY, WEEKLY, MONTHLY
  createdAt       DateTime            @default(now())
  updatedAt       DateTime            @updatedAt

  @@index([familyMemberId])
}
```

---

### 4.3 TIER 3 - Tabelas Empresariais (Planejadas)

#### 4.3.1 BusinessProfile

**Descrição**: Perfil empresarial

```prisma
model BusinessProfile {
  id          String   @id @default(uuid())
  cnpj        String   @unique
  companyName String   // Razão social
  tradeName   String   // Nome fantasia
  taxRegime   String   // SIMPLES, PRESUMIDO, REAL
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relacionamentos
  costCenters CostCenter[]
  clients     Client[]
  suppliers   Supplier[]
  invoices    Invoice[]

  @@index([userId])
}
```

**Atualização em Transaction**:
```prisma
model Transaction {
  // ... campos existentes ...
  businessProfileId String?          // Opcional, apenas para TIER 3
  costCenterId      String?
  clientId          String?
  supplierId        String?
}
```

---

#### 4.3.2 CostCenter

**Descrição**: Centros de custo

```prisma
model CostCenter {
  id                String          @id @default(uuid())
  name              String
  code              String
  budget            Decimal         @db.Decimal(10, 2)
  businessProfileId String
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  // Relacionamentos
  businessProfile BusinessProfile @relation(fields: [businessProfileId], references: [id])

  @@index([businessProfileId])
}
```

---

#### 4.3.3 Client

**Descrição**: Clientes da empresa

```prisma
model Client {
  id                String          @id @default(uuid())
  name              String
  document          String          // CPF ou CNPJ
  email             String?
  phone             String?
  businessProfileId String
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  // Relacionamentos
  businessProfile BusinessProfile @relation(fields: [businessProfileId], references: [id])
  invoices        Invoice[]

  @@index([businessProfileId])
}
```

---

#### 4.3.4 Supplier

**Descrição**: Fornecedores da empresa

```prisma
model Supplier {
  id                String          @id @default(uuid())
  name              String
  document          String          // CPF ou CNPJ
  email             String?
  phone             String?
  businessProfileId String
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  // Relacionamentos
  businessProfile BusinessProfile @relation(fields: [businessProfileId], references: [id])
  invoices        Invoice[]

  @@index([businessProfileId])
}
```

---

#### 4.3.5 Invoice

**Descrição**: Notas fiscais

```prisma
enum InvoiceType {
  SALE     // Venda (NF-e)
  SERVICE  // Serviço (NFS-e)
  PURCHASE // Compra
}

model Invoice {
  id                String          @id @default(uuid())
  number            String
  type              InvoiceType
  amount            Decimal         @db.Decimal(10, 2)
  issueDate         DateTime
  clientId          String?
  supplierId        String?
  businessProfileId String
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  // Relacionamentos
  businessProfile BusinessProfile @relation(fields: [businessProfileId], references: [id])
  client          Client?         @relation(fields: [clientId], references: [id])
  supplier        Supplier?       @relation(fields: [supplierId], references: [id])

  @@index([businessProfileId])
}
```

---

#### 4.3.6 Contract

**Descrição**: Contratos

```prisma
model Contract {
  id                String          @id @default(uuid())
  title             String
  value             Decimal         @db.Decimal(10, 2)
  startDate         DateTime
  endDate           DateTime
  clientId          String?
  supplierId        String?
  businessProfileId String
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  @@index([businessProfileId])
}
```

---

#### 4.3.7 TaxCalculation

**Descrição**: Cálculo de impostos

```prisma
model TaxCalculation {
  id                String          @id @default(uuid())
  period            String          // 2026-01
  taxType           String          // ICMS, ISS, PIS, COFINS, etc.
  baseAmount        Decimal         @db.Decimal(10, 2)
  taxAmount         Decimal         @db.Decimal(10, 2)
  businessProfileId String
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  @@index([businessProfileId])
}
```

---

#### 4.3.8 CashFlowProjection

**Descrição**: Projeção de fluxo de caixa

```prisma
model CashFlowProjection {
  id                String          @id @default(uuid())
  date              DateTime
  expectedInflow    Decimal         @db.Decimal(10, 2)
  expectedOutflow   Decimal         @db.Decimal(10, 2)
  projectedBalance  Decimal         @db.Decimal(10, 2)
  businessProfileId String
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  @@index([businessProfileId])
  @@index([date])
}
```

---

## 5. Enums

### 5.1 TransactionType

```prisma
enum TransactionType {
  DEPOSIT     // Receita/Entrada
  EXPENSE     // Despesa/Saída
  INVESTMENT  // Investimento
}
```

**Valores SQL**:
```sql
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'EXPENSE', 'INVESTMENT');
```

---

### 5.2 TransactionCategory

```prisma
enum TransactionCategory {
  HOUSING        // Moradia
  TRANSPORTATION // Transporte
  FOOD           // Alimentação
  ENTERTAINMENT  // Entretenimento
  HEALTH         // Saúde
  UTILITY        // Utilidades
  SALARY         // Salário
  EDUCATION      // Educação
  OTHER          // Outros
}
```

**Mapeamento por Tipo**:
- **DEPOSIT**: SALARY, OTHER
- **EXPENSE**: HOUSING, TRANSPORTATION, FOOD, ENTERTAINMENT, HEALTH, UTILITY, EDUCATION, OTHER
- **INVESTMENT**: OTHER

---

### 5.3 TransactionPaymentMethod

```prisma
enum TransactionPaymentMethod {
  CREDIT_CARD    // Cartão de Crédito
  DEBIT_CARD     // Cartão de Débito
  BANK_TRANSFER  // Transferência Bancária
  BANK_SLIP      // Boleto
  CASH           // Dinheiro
  PIX            // PIX
  OTHER          // Outros
}
```

---

## 6. Índices e Performance

### 6.1 Índices Implementados

| Tabela | Índice | Tipo | Justificativa |
|--------|--------|------|---------------|
| Transaction | userId | Single | Filtro por usuário (mais comum) |
| Transaction | date | Single | Filtro por data |
| Transaction | userId + date | Composite | Query otimizada para dashboard |

### 6.2 Índices Planejados

```prisma
// Para queries de relatórios
@@index([userId, type, date])

// Para queries de categoria
@@index([userId, category, date])

// Para queries de método de pagamento
@@index([userId, paymentMethod, date])
```

### 6.3 Análise de Performance

**Query comum (Dashboard)**:
```sql
-- Sem índice composto: ~150ms (100k transactions)
-- Com índice userId + date: ~15ms (100k transactions)
SELECT * FROM "Transaction"
WHERE "userId" = 'user_xxx'
  AND "date" >= '2026-01-01'
  AND "date" < '2026-02-01';
```

---

## 7. Migrations

### 7.1 Comandos Prisma Migrate

```bash
# Criar migration
npx prisma migrate dev --name add_transaction_table

# Aplicar migrations (produção)
npx prisma migrate deploy

# Resetar banco (desenvolvimento)
npx prisma migrate reset

# Gerar Prisma Client
npx prisma generate
```

### 7.2 Histórico de Migrations

| Versão | Nome | Data | Descrição |
|--------|------|------|-----------|
| 001 | init | 2025-12 | Schema inicial com Transaction |
| 002 | add_indexes | 2026-01 | Índices de performance |

### 7.3 Rollback Strategy

Prisma Migrate não suporta rollback automático. Para reverter:

1. Criar nova migration que desfaz as mudanças
2. Ou usar `prisma db execute` com SQL manual

---

## 8. Queries Comuns

### 8.1 Dashboard do Mês Atual

```typescript
const transactions = await db.transaction.findMany({
  where: {
    userId: userId,
    date: {
      gte: new Date("2026-01-01"),
      lt: new Date("2026-02-01"),
    },
  },
  orderBy: {
    date: "desc",
  },
});
```

**Tempo estimado**: ~15ms (com índice)

---

### 8.2 Estatísticas por Categoria

```typescript
const stats = await db.transaction.groupBy({
  by: ["category"],
  where: {
    userId: userId,
    type: "EXPENSE",
    date: {
      gte: startDate,
      lt: endDate,
    },
  },
  _sum: {
    amount: true,
  },
  _count: true,
});
```

---

### 8.3 Últimas Transações

```typescript
const lastTransactions = await db.transaction.findMany({
  where: { userId },
  orderBy: { date: "desc" },
  take: 10,
});
```

---

### 8.4 Total por Tipo no Mês

```typescript
const totals = await db.transaction.groupBy({
  by: ["type"],
  where: {
    userId,
    date: {
      gte: monthStart,
      lt: monthEnd,
    },
  },
  _sum: {
    amount: true,
  },
});
```

---

## 9. Estratégia de Backup

### 9.1 Backup Automático

- **Frequência**: Diário
- **Retenção**: 30 dias
- **Provider**: Neon oferece backups automáticos

### 9.2 Backup Manual

```bash
# Export para SQL
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restaurar
psql $DATABASE_URL < backup_20260115.sql
```

### 9.3 Disaster Recovery

**RTO** (Recovery Time Objective): 2 horas
**RPO** (Recovery Point Objective): 24 horas

---

## 10. Referências

### 10.1 Documentação Relacionada

- [Arquitetura do Sistema](arquitetura-sistema.md)
- [Diagrama de Dados](diagrama-dados-tiers.drawio)
- [Definição de Tiers](definicao-tiers-precos.md)
- [Schema Prisma](../prisma/schema.prisma)

### 10.2 Documentação Externa

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL 16 Documentation](https://www.postgresql.org/docs/16/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

---

**Aprovado por**: [Nome]
**Data de Aprovação**: [Data]
**Próxima Revisão**: [Data]
