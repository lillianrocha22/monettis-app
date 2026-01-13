# Guia de Desenvolvimento - Monettis App

**Guia Completo para Contribuir com o Projeto**

**Versão**: 1.0
**Data**: Janeiro 2026
**Status**: Vigente

---

## 📋 Índice

1. [Bem-vindo](#1-bem-vindo)
2. [Fluxo de Trabalho](#2-fluxo-de-trabalho)
3. [Estrutura do Código](#3-estrutura-do-código)
4. [Padrões de Desenvolvimento](#4-padrões-de-desenvolvimento)
5. [Criando Novos Módulos](#5-criando-novos-módulos)
6. [Trabalhando com o Banco de Dados](#6-trabalhando-com-o-banco-de-dados)
7. [Testes](#7-testes)
8. [Code Review](#8-code-review)
9. [Deploy](#9-deploy)
10. [Dicas e Boas Práticas](#10-dicas-e-boas-práticas)

---

## 1. Bem-vindo

### 1.1 Antes de Começar

Certifique-se de ter:

✅ Lido a [Arquitetura do Sistema](arquitetura-sistema.md)
✅ Concluído o [Guia de Instalação](guia-instalacao.md)
✅ Familiarizado com [Padrões de Código](padroes-codigo.md)

### 1.2 Tecnologias Principais

Você deve ter conhecimento básico de:

- **TypeScript**: Linguagem principal
- **React 18**: Biblioteca UI (Server Components)
- **Next.js 14**: Framework (App Router)
- **Prisma**: ORM para banco de dados
- **Tailwind CSS**: Estilização
- **Git**: Controle de versão

---

## 2. Fluxo de Trabalho

### 2.1 Git Workflow (GitHub Flow)

```
main (protegida)
  │
  ├─ feat/add-credit-cards (sua branch)
  │   │
  │   ├─ commit: "feat: add CreditCard model"
  │   ├─ commit: "feat: add credit card form"
  │   └─ commit: "feat: add credit card list"
  │
  └─ PR → Code Review → Merge → main
```

---

### 2.2 Passo a Passo

#### 1. Escolher uma Tarefa

- Verifique **Issues** no GitHub
- Escolha uma issue com label `good first issue` (iniciantes)
- Ou label `help wanted` (qualquer nível)
- Comente na issue: "Vou trabalhar nisso"

#### 2. Criar Branch

```bash
# Sempre a partir da main atualizada
git checkout main
git pull origin main

# Criar branch com nome descritivo
git checkout -b feat/nome-da-feature

# Exemplos de nomes:
# feat/add-credit-cards
# fix/transaction-date-bug
# refactor/dashboard-components
# docs/update-readme
```

**Padrão de nome de branch**:
```
<tipo>/<descrição-curta>

Tipos:
- feat: Nova funcionalidade
- fix: Correção de bug
- refactor: Refatoração
- docs: Documentação
- test: Testes
- chore: Tarefas gerais
```

#### 3. Desenvolver

```bash
# Fazer mudanças no código
# ...

# Commitar frequentemente
git add .
git commit -m "feat: add credit card model"

# Mais mudanças...
git add .
git commit -m "feat: add credit card form component"
```

**Mensagens de commit** devem seguir [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

**Exemplos**:
```bash
git commit -m "feat(transactions): add filter by category"
git commit -m "fix(dashboard): correct total calculation"
git commit -m "refactor(components): extract AddButton component"
git commit -m "docs(readme): update installation steps"
git commit -m "test(transactions): add unit tests for upsertTransaction"
```

#### 4. Push e Pull Request

```bash
# Push da branch
git push origin feat/nome-da-feature

# Criar Pull Request no GitHub
# Preencher template de PR (veja seção 8.2)
```

#### 5. Code Review

- Aguardar review de mantenedores
- Responder comentários
- Fazer ajustes se necessário
- Aguardar aprovação

#### 6. Merge

- Após aprovação, PR será mergeado na `main`
- Branch será deletada automaticamente
- Parabéns! 🎉

---

## 3. Estrutura do Código

### 3.1 Organização de Diretórios

```
app/
├── (home)/                  # Grupo de rotas: Dashboard
│   ├── _actions/            # Server Actions específicas
│   ├── _components/         # Componentes específicos
│   └── page.tsx             # Página principal
│
├── transactions/            # Grupo de rotas: Transações
│   ├── _actions/
│   │   └── delete-transaction/
│   │       ├── index.ts      # Lógica da action
│   │       └── schema.ts     # Validação Zod (se aplicável)
│   ├── _columns/
│   │   └── index.tsx         # Definição de colunas da tabela
│   ├── _components/
│   │   ├── edit-transaction-button.tsx
│   │   └── type-badge.tsx
│   └── page.tsx
│
├── _actions/                # Server Actions globais
│   └── upsert-transaction/
│       ├── index.ts
│       └── schema.ts
│
├── _components/             # Componentes globais
│   ├── add-transaction-button.tsx
│   ├── navbar.tsx
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
│
├── _data/                   # Camada de dados (queries)
│   ├── get-dashboard/
│   │   └── index.ts
│   └── can-user-add-transaction/
│       └── index.ts
│
├── _lib/                    # Bibliotecas e configurações
│   ├── auth.ts              # Helpers de autenticação
│   ├── prisma.ts            # Cliente Prisma
│   └── utils.ts             # Funções utilitárias
│
├── _constants/              # Constantes
│   └── transactions.ts
│
├── _utils/                  # Utilitários
│   └── format-currency.ts
│
├── api/                     # API Routes
│   └── webhooks/
│       └── stripe/
│           └── route.ts
│
├── layout.tsx               # Layout raiz
└── globals.css              # Estilos globais
```

---

### 3.2 Convenções de Nomenclatura

#### Arquivos e Pastas

- **Páginas**: `page.tsx` (Next.js convenção)
- **Layouts**: `layout.tsx`
- **Componentes**: `kebab-case.tsx` (ex: `add-transaction-button.tsx`)
- **Server Actions**: `index.ts` dentro de pasta nomeada
- **Schemas**: `schema.ts`
- **Tipos**: `types.ts` ou `interfaces.ts`

#### Código

- **Componentes React**: `PascalCase`
  ```typescript
  export function AddTransactionButton() { }
  ```

- **Funções**: `camelCase`
  ```typescript
  export async function upsertTransaction() { }
  ```

- **Constantes**: `UPPER_SNAKE_CASE`
  ```typescript
  export const MAX_TRANSACTIONS_FREE_TIER = 10;
  ```

- **Interfaces/Types**: `PascalCase`
  ```typescript
  interface Transaction { }
  type UpsertTransactionParams = { };
  ```

---

## 4. Padrões de Desenvolvimento

### 4.1 Server Actions

**Estrutura padrão**:

```typescript
// app/_actions/my-action/index.ts
"use server"

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { myActionSchema } from "./schema";

export async function myAction(params: MyActionParams) {
  // 1. Autenticação
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // 2. Validação
  myActionSchema.parse(params);

  // 3. Autorização (se necessário)
  // Verificar se usuário tem permissão

  // 4. Lógica de negócio
  await db.myModel.create({
    data: {
      ...params,
      userId,
    },
  });

  // 5. Revalidação de cache
  revalidatePath("/my-page");

  // 6. Retorno (opcional)
  return { success: true };
}
```

**Schema de validação**:

```typescript
// app/_actions/my-action/schema.ts
import { z } from "zod";

export const myActionSchema = z.object({
  field1: z.string().min(1, "Campo obrigatório"),
  field2: z.number().positive(),
  // ...
});

export type MyActionParams = z.infer<typeof myActionSchema>;
```

---

### 4.2 Data Layer (Queries)

**Estrutura padrão**:

```typescript
// app/_data/get-my-data/index.ts
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getMyData(params: GetMyDataParams) {
  // 1. Autenticação
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // 2. Query
  const data = await db.myModel.findMany({
    where: {
      userId,
      // ...params
    },
    include: {
      // relacionamentos se necessário
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 3. Transformação/Agregação (se necessário)
  const processedData = data.map(item => ({
    ...item,
    // cálculos adicionais
  }));

  return processedData;
}
```

---

### 4.3 Componentes React

#### Server Component (padrão)

```typescript
// app/_components/my-server-component.tsx
import { getMyData } from "@/app/_data/get-my-data";

export async function MyServerComponent() {
  // Buscar dados diretamente
  const data = await getMyData();

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

#### Client Component

```typescript
// app/_components/my-client-component.tsx
"use client"

import { useState } from "react";
import { Button } from "./ui/button";

interface MyClientComponentProps {
  initialData: Data[];
}

export function MyClientComponent({ initialData }: MyClientComponentProps) {
  const [data, setData] = useState(initialData);

  const handleClick = () => {
    // Lógica interativa
  };

  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
      {/* ... */}
    </div>
  );
}
```

**Quando usar cada tipo**:

- **Server Component**: Default, quando não precisa de interatividade
- **Client Component**: Quando precisa de:
  - State (`useState`, `useReducer`)
  - Effects (`useEffect`)
  - Event listeners (`onClick`, `onChange`)
  - Browser APIs

---

### 4.4 Páginas (Routes)

```typescript
// app/my-page/page.tsx
import { Metadata } from "next";
import { MyServerComponent } from "@/app/_components/my-server-component";

export const metadata: Metadata = {
  title: "My Page - Monettis",
  description: "Page description",
};

export default async function MyPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">My Page</h1>
        <p className="text-muted-foreground">
          Description
        </p>
      </div>

      <MyServerComponent />
    </div>
  );
}
```

---

## 5. Criando Novos Módulos

### 5.1 Exemplo: Módulo de Cartões de Crédito

#### Passo 1: Criar Model no Prisma

```prisma
// prisma/schema.prisma
model CreditCard {
  id             String   @id @default(uuid())
  name           String
  lastFourDigits String
  brand          String
  limit          Decimal  @db.Decimal(10, 2)
  closingDay     Int
  dueDay         Int
  userId         String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([userId])
}
```

```bash
# Criar migration
npx prisma migrate dev --name add_credit_card_model
```

#### Passo 2: Criar Server Action

```typescript
// app/_actions/upsert-credit-card/schema.ts
import { z } from "zod";

export const upsertCreditCardSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  lastFourDigits: z.string().length(4, "Deve ter 4 dígitos"),
  brand: z.string().min(1, "Bandeira é obrigatória"),
  limit: z.number().positive("Limite deve ser positivo"),
  closingDay: z.number().min(1).max(31),
  dueDay: z.number().min(1).max(31),
});

export type UpsertCreditCardParams = z.infer<typeof upsertCreditCardSchema>;
```

```typescript
// app/_actions/upsert-credit-card/index.ts
"use server"

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { upsertCreditCardSchema, UpsertCreditCardParams } from "./schema";

export async function upsertCreditCard(params: UpsertCreditCardParams) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  upsertCreditCardSchema.parse(params);

  await db.creditCard.upsert({
    where: {
      id: params.id ?? "",
    },
    update: params,
    create: {
      ...params,
      userId,
    },
  });

  revalidatePath("/cards");
}
```

#### Passo 3: Criar Data Layer

```typescript
// app/_data/get-credit-cards/index.ts
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getCreditCards() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return db.creditCard.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });
}
```

#### Passo 4: Criar Componentes

```typescript
// app/cards/_components/credit-card-item.tsx
import { CreditCard } from "@prisma/client";
import { Card } from "@/app/_components/ui/card";

interface CreditCardItemProps {
  card: CreditCard;
}

export function CreditCardItem({ card }: CreditCardItemProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{card.name}</h3>
          <p className="text-sm text-muted-foreground">
            {card.brand} •••• {card.lastFourDigits}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(card.limit))}
          </p>
          <p className="text-xs text-muted-foreground">
            Limite
          </p>
        </div>
      </div>
    </Card>
  );
}
```

```typescript
// app/cards/_components/add-credit-card-button.tsx
"use client"

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { CreditCardForm } from "./credit-card-form";

export function AddCreditCardButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Adicionar Cartão
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <CreditCardForm onSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
```

#### Passo 5: Criar Página

```typescript
// app/cards/page.tsx
import { getCreditCards } from "@/app/_data/get-credit-cards";
import { CreditCardItem } from "./_components/credit-card-item";
import { AddCreditCardButton } from "./_components/add-credit-card-button";

export const metadata = {
  title: "Cartões de Crédito - Monettis",
};

export default async function CardsPage() {
  const cards = await getCreditCards();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cartões de Crédito</h1>
          <p className="text-muted-foreground">
            Gerencie seus cartões de crédito
          </p>
        </div>
        <AddCreditCardButton />
      </div>

      <div className="grid gap-4">
        {cards.map(card => (
          <CreditCardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
```

#### Passo 6: Adicionar ao Navbar

```typescript
// app/_components/navbar.tsx
// Adicionar link:
<Link href="/cards">Cartões</Link>
```

---

## 6. Trabalhando com o Banco de Dados

### 6.1 Modificando o Schema

```bash
# 1. Editar prisma/schema.prisma
# 2. Criar migration
npx prisma migrate dev --name descriptive_name

# 3. Aplicar em produção
npx prisma migrate deploy
```

### 6.2 Queries Complexas

```typescript
// Agregações
const stats = await db.transaction.groupBy({
  by: ["category"],
  where: { userId },
  _sum: { amount: true },
  _count: true,
});

// Joins (includes)
const transactionsWithCard = await db.transaction.findMany({
  where: { userId },
  include: {
    creditCard: true,
  },
});

// Raw SQL (quando necessário)
const result = await db.$queryRaw`
  SELECT category, SUM(amount) as total
  FROM "Transaction"
  WHERE "userId" = ${userId}
  GROUP BY category
`;
```

### 6.3 Transações (Database Transactions)

```typescript
await db.$transaction(async (tx) => {
  // Todas operações aqui são atômicas
  await tx.creditCard.create({ data: {...} });
  await tx.transaction.create({ data: {...} });
});
```

---

## 7. Testes

### 7.1 Estrutura de Testes

```
__tests__/
├── unit/
│   ├── actions/
│   │   └── upsert-transaction.test.ts
│   └── utils/
│       └── format-currency.test.ts
├── integration/
│   └── api/
│       └── webhooks-stripe.test.ts
└── e2e/
    └── dashboard.test.ts
```

### 7.2 Testes Unitários (Vitest)

```typescript
// __tests__/unit/utils/format-currency.test.ts
import { describe, it, expect } from "vitest";
import { formatCurrency } from "@/app/_utils/format-currency";

describe("formatCurrency", () => {
  it("should format number to BRL currency", () => {
    expect(formatCurrency(1234.56)).toBe("R$ 1.234,56");
  });

  it("should handle zero", () => {
    expect(formatCurrency(0)).toBe("R$ 0,00");
  });

  it("should handle negative numbers", () => {
    expect(formatCurrency(-500)).toBe("-R$ 500,00");
  });
});
```

### 7.3 Executar Testes

```bash
# Todos os testes
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E
npm run test:e2e
```

---

## 8. Code Review

### 8.1 Antes de Abrir PR

**Checklist**:

- [ ] Código segue os padrões do projeto
- [ ] Testes passando (`npm run test`)
- [ ] Lint passando (`npm run lint`)
- [ ] Build passando (`npm run build`)
- [ ] Sem `console.log` esquecidos
- [ ] Sem código comentado
- [ ] Variáveis com nomes descritivos
- [ ] Funções com single responsibility
- [ ] Commits organizados e com mensagens claras

### 8.2 Template de Pull Request

```markdown
## Descrição
Breve descrição do que foi implementado.

## Tipo de Mudança
- [ ] Nova funcionalidade (feat)
- [ ] Correção de bug (fix)
- [ ] Refatoração (refactor)
- [ ] Documentação (docs)
- [ ] Testes (test)

## Como Testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots (se aplicável)
[imagem]

## Checklist
- [ ] Código segue padrões do projeto
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Sem breaking changes (ou descritos)

## Issues Relacionadas
Closes #123
```

### 8.3 Durante o Review

**Respondendo a comentários**:

✅ **BOM**:
> "Boa observação! Vou refatorar para usar useMemo aqui."

❌ **RUIM**:
> "Não concordo, está bom assim."

**Fazendo mudanças**:

```bash
# Fazer ajustes solicitados
git add .
git commit -m "refactor: apply code review suggestions"
git push origin feat/my-feature
```

---

## 9. Deploy

### 9.1 Deploy Automático (Vercel)

1. **Conectar Repositório**:
   - Conecte GitHub ao Vercel
   - Cada push na `main` → deploy automático

2. **Variáveis de Ambiente**:
   - Configure em Vercel Dashboard
   - Settings > Environment Variables

3. **Deploy Preview**:
   - Cada PR gera URL de preview
   - Teste antes do merge

### 9.2 Deploy Manual

```bash
# Build local
npm run build

# Deploy para Vercel
vercel --prod
```

---

## 10. Dicas e Boas Práticas

### 10.1 Performance

**1. Minimize Client Components**:
```typescript
// ❌ RUIM: Componente inteiro como Client
"use client"
export function MyPage() {
  const [state, setState] = useState();
  return (
    <div>
      <ServerPart />  {/* poderia ser Server Component */}
      <InteractivePart state={state} />
    </div>
  );
}

// ✅ BOM: Apenas parte interativa como Client
export async function MyPage() {
  const data = await fetchData();
  return (
    <div>
      <ServerPart data={data} />
      <InteractivePartClient />  {/* só isso é Client */}
    </div>
  );
}
```

**2. Use Server Actions para Mutations**:
```typescript
// ✅ BOM
"use server"
export async function createTransaction(data) {
  await db.transaction.create({ data });
  revalidatePath("/transactions");
}

// ❌ EVITE: Route Handler para simples CRUD
export async function POST(request) {
  const data = await request.json();
  await db.transaction.create({ data });
  return Response.json({ success: true });
}
```

**3. Otimize Queries**:
```typescript
// ❌ RUIM: N+1 queries
const transactions = await db.transaction.findMany();
for (const t of transactions) {
  const card = await db.creditCard.findUnique({ where: { id: t.cardId } });
}

// ✅ BOM: Single query com include
const transactions = await db.transaction.findMany({
  include: { creditCard: true },
});
```

### 10.2 Segurança

**1. Sempre validar inputs**:
```typescript
// ✅ Validação com Zod
const schema = z.object({
  amount: z.number().positive(),
});
schema.parse(data);
```

**2. Sempre verificar autenticação**:
```typescript
const { userId } = await auth();
if (!userId) throw new Error("Unauthorized");
```

**3. Sempre verificar autorização**:
```typescript
// Usuário pode editar apenas suas próprias transações
const transaction = await db.transaction.findUnique({ where: { id } });
if (transaction.userId !== userId) {
  throw new Error("Forbidden");
}
```

**4. Sanitize outputs**:
```typescript
// React sanitiza automaticamente
<div>{userInput}</div>  // ✅ Seguro

// Cuidado com dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // ❌ Perigoso
```

### 10.3 Acessibilidade

```typescript
// ✅ Sempre usar labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Usar elementos semânticos
<button type="button">Click</button>  // não <div onClick={}>

// ✅ Fornecer alt text
<img src="..." alt="Descriptive text" />

// ✅ ARIA quando necessário
<div role="button" aria-label="Close" onClick={close}>×</div>
```

### 10.4 Debugging

**1. Usar console.log estrategicamente**:
```typescript
console.log("🔍 Debug:", { userId, params });
```

**2. Usar React DevTools**:
- Instalar extensão no navegador
- Inspecionar props, state, context

**3. Usar Prisma Studio**:
```bash
npx prisma studio
```

**4. Usar debugger**:
```typescript
debugger;  // Pausa execução se DevTools aberto
```

---

## 11. Recursos Adicionais

### 11.1 Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Prisma Docs](https://prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### 11.2 Ferramentas Úteis

- **VS Code Extensions**:
  - ESLint
  - Prettier
  - Prisma
  - Tailwind CSS IntelliSense
  - Error Lens

- **Browser Extensions**:
  - React DevTools
  - Redux DevTools (se usar Redux)

### 11.3 Comunidade

- Discord: [link]
- GitHub Discussions: [link]
- Stack Overflow: tag `monettis`

---

**Dúvidas?** Abra uma issue ou pergunte no Discord!

---

**Aprovado por**: [Nome]
**Data de Aprovação**: [Data]
**Próxima Revisão**: [Data]
