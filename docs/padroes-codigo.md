# Padrões de Código - Monettis App

**Convenções e Boas Práticas de Desenvolvimento**

**Versão**: 1.0
**Data**: Janeiro 2026
**Status**: Vigente

---

## 📋 Índice

1. [Princípios Gerais](#1-princípios-gerais)
2. [TypeScript](#2-typescript)
3. [React](#3-react)
4. [Next.js](#4-nextjs)
5. [Estilização (Tailwind CSS)](#5-estilização-tailwind-css)
6. [Prisma e Banco de Dados](#6-prisma-e-banco-de-dados)
7. [Validação (Zod)](#7-validação-zod)
8. [Tratamento de Erros](#8-tratamento-de-erros)
9. [Organização de Arquivos](#9-organização-de-arquivos)
10. [Comentários e Documentação](#10-comentários-e-documentação)
11. [Git e Commits](#11-git-e-commits)
12. [ESLint e Prettier](#12-eslint-e-prettier)

---

## 1. Princípios Gerais

### 1.1 KISS (Keep It Simple, Stupid)

✅ **BOM**: Simples e direto
```typescript
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

❌ **RUIM**: Complexidade desnecessária
```typescript
function calculateTotal(items: Item[]) {
  let total = 0;
  const iterator = items.values();
  let current = iterator.next();
  while (!current.done) {
    total = total + current.value.price;
    current = iterator.next();
  }
  return total;
}
```

---

### 1.2 DRY (Don't Repeat Yourself)

✅ **BOM**: Extrair lógica repetida
```typescript
// app/_utils/format.ts
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Usar em vários lugares
<span>{formatCurrency(transaction.amount)}</span>
```

❌ **RUIM**: Duplicar código
```typescript
// Arquivo 1
<span>
  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount)}
</span>

// Arquivo 2
<span>
  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}
</span>
```

---

### 1.3 YAGNI (You Aren't Gonna Need It)

✅ **BOM**: Implementar apenas o necessário
```typescript
interface Transaction {
  id: string;
  amount: number;
  date: Date;
}
```

❌ **RUIM**: Adicionar campos "por via das dúvidas"
```typescript
interface Transaction {
  id: string;
  amount: number;
  date: Date;
  futureField1?: string;  // ❌ Não usado agora
  futureField2?: number;  // ❌ Não usado agora
  flags?: string[];       // ❌ Não usado agora
}
```

---

### 1.4 Single Responsibility Principle

✅ **BOM**: Uma responsabilidade por função
```typescript
// Separar em funções específicas
function validateTransaction(data: unknown) { }
function saveTransaction(data: Transaction) { }
function notifyUser(userId: string) { }

async function createTransaction(data: unknown) {
  validateTransaction(data);
  await saveTransaction(data);
  await notifyUser(data.userId);
}
```

❌ **RUIM**: Função faz tudo
```typescript
async function createTransaction(data: any) {
  // Validação inline
  if (!data.amount || data.amount <= 0) throw new Error();
  if (!data.name) throw new Error();

  // Salvamento
  const transaction = await db.transaction.create({ data });

  // Notificação
  await fetch("/api/notify", { method: "POST", body: JSON.stringify({ userId: data.userId }) });

  // Logging
  console.log("Transaction created:", transaction.id);

  return transaction;
}
```

---

## 2. TypeScript

### 2.1 Sempre Tipar

✅ **BOM**: Tipos explícitos
```typescript
interface CreateTransactionParams {
  name: string;
  amount: number;
  type: TransactionType;
  date: Date;
}

function createTransaction(params: CreateTransactionParams): Promise<Transaction> {
  // ...
}
```

❌ **RUIM**: `any` ou sem tipos
```typescript
function createTransaction(params: any): any {
  // ...
}
```

---

### 2.2 Interfaces vs Types

**Use `interface` para**:
- Objetos que podem ser estendidos
- Contratos públicos

```typescript
interface User {
  id: string;
  name: string;
}

interface AdminUser extends User {
  role: "admin";
}
```

**Use `type` para**:
- Unions, intersections
- Tipos derivados
- Helpers

```typescript
type TransactionType = "DEPOSIT" | "EXPENSE" | "INVESTMENT";

type Nullable<T> = T | null;

type ReadonlyTransaction = Readonly<Transaction>;
```

---

### 2.3 Evitar `any`

✅ **BOM**: Tipos específicos
```typescript
function handleData(data: unknown) {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  // ...
}
```

❌ **RUIM**: Usar `any`
```typescript
function handleData(data: any) {
  return data.toUpperCase();  // Sem type safety
}
```

**Quando `any` é aceitável**:
- Migrando código JavaScript
- Tipos de terceiros quebrados (temporariamente com `// @ts-ignore`)
- Casos excepcionais bem documentados

---

### 2.4 Utility Types

Use utility types do TypeScript:

```typescript
// Partial - tornar todos campos opcionais
type UpdateTransactionParams = Partial<Transaction>;

// Pick - selecionar campos específicos
type TransactionPreview = Pick<Transaction, "id" | "name" | "amount">;

// Omit - omitir campos
type TransactionWithoutDates = Omit<Transaction, "createdAt" | "updatedAt">;

// Record - criar objeto com chaves tipadas
type TransactionsByMonth = Record<string, Transaction[]>;

// ReturnType - tipo do retorno de função
type GetTransactionsReturn = ReturnType<typeof getTransactions>;
```

---

### 2.5 Enums

✅ **BOM**: String enums (mais seguro)
```typescript
enum TransactionType {
  DEPOSIT = "DEPOSIT",
  EXPENSE = "EXPENSE",
  INVESTMENT = "INVESTMENT",
}
```

**Alternativa**: Union types (preferido em alguns casos)
```typescript
type TransactionType = "DEPOSIT" | "EXPENSE" | "INVESTMENT";

const TRANSACTION_TYPES = {
  DEPOSIT: "DEPOSIT",
  EXPENSE: "EXPENSE",
  INVESTMENT: "INVESTMENT",
} as const;
```

---

## 3. React

### 3.1 Componentes Funcionais

✅ **SEMPRE** usar componentes funcionais (não class components)

```typescript
// ✅ BOM
export function MyComponent({ name }: MyComponentProps) {
  return <div>{name}</div>;
}

// ❌ RUIM (desatualizado)
export class MyComponent extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}
```

---

### 3.2 Props

✅ **BOM**: Interface nomeada para props
```typescript
interface TransactionCardProps {
  transaction: Transaction;
  onEdit?: (id: string) => void;
  className?: string;
}

export function TransactionCard({
  transaction,
  onEdit,
  className
}: TransactionCardProps) {
  // ...
}
```

❌ **RUIM**: Props inline
```typescript
export function TransactionCard({
  transaction,
  onEdit,
  className
}: {
  transaction: Transaction;
  onEdit?: (id: string) => void;
  className?: string;
}) {
  // ...
}
```

---

### 3.3 Hooks

**Ordem dos Hooks** (sempre a mesma):

```typescript
export function MyComponent() {
  // 1. State hooks
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // 2. Context hooks
  const user = useUser();

  // 3. Ref hooks
  const inputRef = useRef<HTMLInputElement>(null);

  // 4. Effect hooks
  useEffect(() => {
    // ...
  }, []);

  // 5. Custom hooks
  const { data, loading } = useTransactions();

  // 6. Callbacks e memos
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const total = useMemo(() => {
    return data.reduce((sum, t) => sum + t.amount, 0);
  }, [data]);

  // 7. Render
  return <div>...</div>;
}
```

---

### 3.4 Custom Hooks

✅ **BOM**: Nome começa com `use`
```typescript
// app/_hooks/use-transactions.ts
export function useTransactions(userId: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions(userId).then(setTransactions);
    setLoading(false);
  }, [userId]);

  return { transactions, loading };
}

// Usar:
const { transactions, loading } = useTransactions(userId);
```

---

### 3.5 Conditional Rendering

✅ **BOM**: Operador ternário ou &&
```typescript
// Ternário para if/else
{loading ? <Spinner /> : <Content />}

// && para apenas "if"
{error && <ErrorMessage>{error}</ErrorMessage>}

// Early return
if (loading) return <Spinner />;
if (error) return <ErrorMessage>{error}</ErrorMessage>;
return <Content />;
```

❌ **RUIM**: IIFEs desnecessárias
```typescript
{(() => {
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;
  return <Content />;
})()}
```

---

### 3.6 Lists

✅ **BOM**: Sempre usar `key` única
```typescript
{transactions.map(transaction => (
  <TransactionItem
    key={transaction.id}  // ✅ ID único
    transaction={transaction}
  />
))}
```

❌ **RUIM**: Usar index como key
```typescript
{transactions.map((transaction, index) => (
  <TransactionItem
    key={index}  // ❌ Problemas com reordenação
    transaction={transaction}
  />
))}
```

---

### 3.7 Event Handlers

✅ **BOM**: Prefixo `handle` ou `on`
```typescript
function MyComponent() {
  const handleClick = () => {
    console.log("Clicked");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={handleClick}>Click</button>
    </form>
  );
}
```

**Nomenclatura**:
- **Componente**: `onEvent` (prop)
- **Handler**: `handleEvent` (função)

```typescript
interface ButtonProps {
  onClick?: () => void;  // Prop
}

function MyComponent() {
  const handleClick = () => { };  // Handler

  return <Button onClick={handleClick} />;
}
```

---

## 4. Next.js

### 4.1 Server vs Client Components

**Default**: Server Component

```typescript
// Server Component (default)
export function ServerComponent() {
  // Pode fazer queries diretas
  const data = await db.transaction.findMany();
  return <div>{data.length}</div>;
}
```

**Client**: Apenas quando necessário

```typescript
// Client Component (quando precisa de interatividade)
"use client"

export function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Composição**:
```typescript
// Server Component
export function Page() {
  const data = await fetchData();

  return (
    <div>
      <ServerPart data={data} />
      <ClientInteractivePart />  {/* Client Component */}
    </div>
  );
}
```

---

### 4.2 Server Actions

✅ **BOM**: Estrutura padrão
```typescript
"use server"

import { revalidatePath } from "next/cache";

export async function myAction(params: Params) {
  // 1. Autenticação
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 2. Validação
  schema.parse(params);

  // 3. Lógica
  await db.myModel.create({ data: { ...params, userId } });

  // 4. Revalidação
  revalidatePath("/my-path");
}
```

**Revalidação**:
- `revalidatePath("/path")`: Revalida rota específica
- `revalidateTag("tag")`: Revalida cache com tag

---

### 4.3 Metadata

✅ **BOM**: Metadata estática
```typescript
// app/transactions/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transações - Monettis",
  description: "Gerencie suas transações financeiras",
};
```

**Metadata dinâmica**:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const transaction = await getTransaction(params.id);

  return {
    title: `${transaction.name} - Monettis`,
    description: transaction.description,
  };
}
```

---

### 4.4 Loading e Error States

**Loading**:
```typescript
// app/transactions/loading.tsx
export default function Loading() {
  return <div>Carregando transações...</div>;
}
```

**Error**:
```typescript
// app/transactions/error.tsx
"use client"

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Algo deu errado!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  );
}
```

---

## 5. Estilização (Tailwind CSS)

### 5.1 Ordem das Classes

✅ **BOM**: Ordem lógica (Prettier plugin faz automaticamente)
```typescript
<div className="
  flex items-center justify-between  /* Layout */
  p-4 rounded-lg                      /* Spacing & Borders */
  bg-white shadow-md                  /* Background & Effects */
  text-lg font-semibold              /* Typography */
  hover:bg-gray-50                    /* States */
  md:p-6                              /* Responsive */
">
```

---

### 5.2 Componentes Reutilizáveis

✅ **BOM**: Extrair estilos repetidos para componentes
```typescript
// app/_components/ui/card.tsx
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "rounded-lg bg-white p-6 shadow-md",
      className
    )}>
      {children}
    </div>
  );
}

// Usar:
<Card className="hover:shadow-lg">Content</Card>
```

**Utility `cn` (className)**:
```typescript
// app/_lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

### 5.3 Variantes com CVA

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// Usar:
<Button variant="destructive" size="lg">Delete</Button>
```

---

### 5.4 Responsive Design

✅ **BOM**: Mobile-first
```typescript
<div className="
  flex flex-col        /* Mobile (default) */
  md:flex-row          /* Tablet */
  lg:gap-6             /* Desktop */
">
```

**Breakpoints Tailwind**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 6. Prisma e Banco de Dados

### 6.1 Queries

✅ **BOM**: Queries específicas
```typescript
// Buscar apenas campos necessários
const transactions = await db.transaction.findMany({
  select: {
    id: true,
    name: true,
    amount: true,
  },
  where: { userId },
});
```

❌ **RUIM**: Buscar tudo
```typescript
const transactions = await db.transaction.findMany({
  where: { userId },
});  // Retorna todos os campos
```

---

### 6.2 Includes vs Select

**Include** (relacionamentos):
```typescript
const transactions = await db.transaction.findMany({
  include: {
    creditCard: true,  // Inclui relação completa
  },
});
```

**Select** (campos específicos):
```typescript
const transactions = await db.transaction.findMany({
  select: {
    id: true,
    name: true,
    creditCard: {  // Select em relação
      select: {
        name: true,
        brand: true,
      },
    },
  },
});
```

---

### 6.3 Where Conditions

```typescript
// Equality
where: { userId: "123" }

// Comparações
where: { amount: { gt: 100 } }  // greater than
where: { amount: { gte: 100 } } // greater than or equal
where: { amount: { lt: 100 } }  // less than

// IN
where: { type: { in: ["DEPOSIT", "EXPENSE"] } }

// Datas
where: {
  date: {
    gte: new Date("2026-01-01"),
    lt: new Date("2026-02-01"),
  },
}

// AND
where: {
  AND: [
    { userId: "123" },
    { type: "EXPENSE" },
  ],
}

// OR
where: {
  OR: [
    { category: "FOOD" },
    { category: "TRANSPORTATION" },
  ],
}
```

---

### 6.4 Transações (Database Transactions)

✅ **BOM**: Usar quando operações são dependentes
```typescript
await db.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData });
  await tx.subscription.create({
    data: { userId: user.id, ...subData }
  });
});
```

---

## 7. Validação (Zod)

### 7.1 Schemas

✅ **BOM**: Schema bem definido
```typescript
import { z } from "zod";

export const createTransactionSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100),
  amount: z.number().positive("Valor deve ser positivo"),
  type: z.enum(["DEPOSIT", "EXPENSE", "INVESTMENT"]),
  category: z.enum([
    "HOUSING", "TRANSPORTATION", "FOOD",
    "ENTERTAINMENT", "HEALTH", "UTILITY",
    "SALARY", "EDUCATION", "OTHER"
  ]),
  date: z.date(),
  userId: z.string().uuid(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
```

---

### 7.2 Mensagens de Erro

✅ **BOM**: Mensagens claras e em português
```typescript
z.string()
  .min(3, "Mínimo de 3 caracteres")
  .max(50, "Máximo de 50 caracteres")

z.number()
  .positive("Valor deve ser positivo")
  .max(1000000, "Valor muito alto")

z.string()
  .email("Email inválido")
  .endsWith("@empresa.com", "Deve ser email corporativo")
```

---

### 7.3 Transformações

```typescript
const schema = z.object({
  email: z.string().email().toLowerCase().trim(),
  age: z.string().transform(val => parseInt(val, 10)),
  date: z.string().transform(str => new Date(str)),
});
```

---

### 7.4 Validação Condicional

```typescript
const schema = z.object({
  type: z.enum(["EXPENSE", "DEPOSIT"]),
  category: z.string(),
}).refine(
  data => {
    if (data.type === "DEPOSIT") {
      return ["SALARY", "OTHER"].includes(data.category);
    }
    return true;
  },
  {
    message: "Categoria inválida para depósito",
    path: ["category"],
  }
);
```

---

## 8. Tratamento de Erros

### 8.1 Try-Catch

✅ **BOM**: Try-catch em operações assíncronas
```typescript
async function createTransaction(data: TransactionData) {
  try {
    const transaction = await db.transaction.create({ data });
    return { success: true, transaction };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, error: "Failed to create transaction" };
  }
}
```

---

### 8.2 Error Boundaries (React)

```typescript
// app/_components/error-boundary.tsx
"use client"

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Algo deu errado</div>;
    }

    return this.props.children;
  }
}
```

---

### 8.3 Toast/Notifications

✅ **BOM**: Feedback visual para usuário
```typescript
import { toast } from "sonner";

async function handleSubmit(data: FormData) {
  try {
    await createTransaction(data);
    toast.success("Transação criada com sucesso!");
  } catch (error) {
    toast.error("Erro ao criar transação");
  }
}
```

---

## 9. Organização de Arquivos

### 9.1 Nomenclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componentes | `kebab-case.tsx` | `transaction-card.tsx` |
| Páginas | `page.tsx` | `page.tsx` |
| Layouts | `layout.tsx` | `layout.tsx` |
| Server Actions | `index.ts` | `upsert-transaction/index.ts` |
| Types | `types.ts` | `types.ts` |
| Utils | `kebab-case.ts` | `format-currency.ts` |
| Constants | `kebab-case.ts` | `transaction-categories.ts` |

---

### 9.2 Estrutura de Módulo

```
my-feature/
├── _actions/              # Server Actions
│   └── my-action/
│       ├── index.ts
│       └── schema.ts
├── _components/           # Componentes
│   ├── my-component.tsx
│   └── my-other-component.tsx
├── _data/                 # Queries
│   └── get-my-data/
│       └── index.ts
├── _types/                # Types (se necessário)
│   └── index.ts
└── page.tsx               # Página
```

---

### 9.3 Imports

✅ **BOM**: Ordem dos imports
```typescript
// 1. External libraries
import { useState } from "react";
import { z } from "zod";

// 2. Internal modules
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

// 3. Components
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";

// 4. Tipos
import type { Transaction } from "@prisma/client";

// 5. Styles (se houver)
import styles from "./styles.module.css";
```

**Use alias `@/`**:
```typescript
// ✅ BOM
import { db } from "@/app/_lib/prisma";

// ❌ RUIM
import { db } from "../../_lib/prisma";
```

---

## 10. Comentários e Documentação

### 10.1 Quando Comentar

✅ **BOM**: Comentar o "porquê", não o "o quê"
```typescript
// Aplicar taxa de processamento apenas para cartões de crédito
// conforme acordo com operadora (contrato #2024-001)
if (paymentMethod === "CREDIT_CARD") {
  amount *= 1.03;
}
```

❌ **RUIM**: Comentar o óbvio
```typescript
// Incrementar contador
counter++;

// Criar array vazio
const items = [];
```

---

### 10.2 JSDoc

✅ **BOM**: Documentar funções públicas/complexas
```typescript
/**
 * Calcula o total de transações de um usuário em um período
 *
 * @param userId - ID do usuário (Clerk)
 * @param startDate - Data inicial (inclusive)
 * @param endDate - Data final (exclusive)
 * @returns Total em reais
 *
 * @example
 * const total = await calculateTotal("user_123", new Date("2026-01-01"), new Date("2026-02-01"));
 */
export async function calculateTotal(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<number> {
  // ...
}
```

---

### 10.3 TODOs

✅ **BOM**: TODOs com contexto
```typescript
// TODO(nome): Implementar cache para melhorar performance
// Issue: #123

// FIXME(nome): Bug ao processar valores negativos
// Temporariamente bloqueando valores < 0

// HACK(nome): Workaround para bug do Stripe webhook
// Remover quando Stripe corrigir (estimativa: Q2 2026)
```

---

## 11. Git e Commits

### 11.1 Mensagens de Commit

**Formato**: [Conventional Commits](https://www.conventionalcommits.org/)

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

**Tipos**:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `refactor`: Refatoração
- `docs`: Documentação
- `style`: Formatação (não afeta lógica)
- `test`: Testes
- `chore`: Tarefas gerais
- `perf`: Performance

**Exemplos**:
```bash
feat(transactions): add filter by category

fix(dashboard): correct total calculation for investments

refactor(components): extract reusable Card component

docs(readme): update installation steps

test(transactions): add unit tests for upsertTransaction

chore(deps): update dependencies
```

---

### 11.2 Commits Pequenos

✅ **BOM**: Commits atômicos
```bash
git commit -m "feat: add CreditCard model"
git commit -m "feat: add credit card form component"
git commit -m "feat: add credit card list page"
```

❌ **RUIM**: Commit gigante
```bash
git commit -m "feat: add entire credit cards module with model, forms, pages, tests, and documentation"
```

---

### 11.3 Branches

```bash
# Nomenclatura
<tipo>/<descrição-curta>

# Exemplos
feat/add-credit-cards
fix/transaction-date-bug
refactor/dashboard-components
docs/update-api-docs
```

---

## 12. ESLint e Prettier

### 12.1 Configuração

**ESLint** (`.eslintrc.json`):
```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

**Prettier** (`.prettierrc`):
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

---

### 12.2 Executar

```bash
# Lint
npm run lint

# Fix automático
npm run lint -- --fix

# Prettier (se configurado separadamente)
npx prettier --write .
```

---

### 12.3 Pre-commit Hook (Husky)

```bash
# Instalar
npm install -D husky lint-staged

# Configurar
npx husky init
```

**`.husky/pre-commit`**:
```bash
#!/bin/sh
npm run lint
npm run test
```

**`package.json`**:
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## 13. Checklist Final

Antes de criar PR, verificar:

- [ ] Código segue padrões deste documento
- [ ] Tipos TypeScript corretos (sem `any`)
- [ ] Componentes com props tipadas
- [ ] Server Actions com validação Zod
- [ ] Queries otimizadas (select, where, index)
- [ ] Erros tratados adequadamente
- [ ] Feedback visual para usuário (toast)
- [ ] Acessibilidade (labels, aria, semantic HTML)
- [ ] Responsive (mobile-first)
- [ ] Sem `console.log` esquecidos
- [ ] Commits organizados
- [ ] Testes passando
- [ ] Build passando
- [ ] Lint passando

---

**Dúvidas sobre algum padrão?** Abra uma discussão no GitHub!

---

**Aprovado por**: [Nome]
**Data de Aprovação**: [Data]
**Próxima Revisão**: [Data]
