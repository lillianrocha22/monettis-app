# Plano de Alteração de Código - Tela de Transações Responsiva

## Objetivo

Implementar o design responsivo da tela de Transações conforme protótipo aprovado em `prototipo-tela-transactions.md`.

**IMPORTANTE:** Este plano deve ser aprovado antes de qualquer modificação no código.

---

## Arquivos a Serem Modificados

### 1. `app/transactions/page.tsx`

**Alterações:**
- Adicionar lógica de renderização condicional baseada no breakpoint
- Mostrar tabela para desktop/tablet
- Mostrar cards para mobile
- Adicionar FAB (Floating Action Button) para mobile

**Código atual:**
```tsx
<div className="flex w-full items-center justify-between">
  <h1 className="text-2xl font-bold">Transações</h1>
  <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
</div>
<ScrollArea className="h-full">
  <DataTable columns={transactionColumns} data={...} />
</ScrollArea>
```

**Código proposto:**
```tsx
<div className="flex w-full items-center justify-between">
  <h1 className="text-2xl font-bold">Transações</h1>
  {/* Botão visível apenas em tablet/desktop */}
  <div className="hidden md:block">
    <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
  </div>
</div>

{/* Tabela para tablet/desktop */}
<div className="hidden md:block">
  <ScrollArea className="h-full">
    <DataTable columns={transactionColumns} data={...} />
  </ScrollArea>
</div>

{/* Cards para mobile */}
<div className="md:hidden">
  <TransactionCardList transactions={...} />
</div>

{/* FAB para mobile */}
<div className="md:hidden fixed bottom-6 right-6">
  <AddTransactionButton userCanAddTransaction={userCanAddTransaction} fab />
</div>
```

---

### 2. `app/transactions/_columns/index.tsx`

**Alterações:**
- Adicionar classe `hidden lg:table-cell` na coluna "Método de Pagamento"
- Ajustar formato de data para tablet (formato curto)

**Código atual:**
```tsx
{
  accessorKey: "paymentMethod",
  header: "Método de Pagamento",
  cell: ({ row: { original: transaction } }) =>
    TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
},
```

**Código proposto:**
```tsx
{
  accessorKey: "paymentMethod",
  header: () => <span className="hidden lg:inline">Método de Pagamento</span>,
  cell: ({ row: { original: transaction } }) => (
    <span className="hidden lg:inline">
      {TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]}
    </span>
  ),
},
```

---

### 3. Novo Arquivo: `app/transactions/_components/transaction-card.tsx`

**Descrição:** Componente de card individual para exibição mobile.

**Estrutura proposta:**
```tsx
interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      {/* Nome */}
      <h3 className="font-bold text-foreground">{transaction.name}</h3>

      {/* Badge Tipo */}
      <TransactionTypeBadge transaction={transaction} />

      {/* Categoria e Método */}
      <p className="mt-2 text-sm text-muted-foreground">
        {TRANSACTION_CATEGORY_LABELS[transaction.category]} ·
        {TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]}
      </p>

      {/* Data */}
      <p className="text-sm text-muted-foreground">
        {formatDate(transaction.date)}
      </p>

      {/* Valor e Ações */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-semibold">
          {formatCurrency(transaction.amount)}
        </span>
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      </div>
    </div>
  );
}
```

---

### 4. Novo Arquivo: `app/transactions/_components/transaction-card-list.tsx`

**Descrição:** Lista de cards para exibição mobile.

**Estrutura proposta:**
```tsx
interface TransactionCardListProps {
  transactions: Transaction[];
}

export function TransactionCardList({ transactions }: TransactionCardListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}
```

---

### 5. `app/_components/add-transaction-button.tsx`

**Alterações:**
- Adicionar prop `fab` para renderização como Floating Action Button
- Estilo FAB: botão circular com ícone "+"

**Código proposto (adição):**
```tsx
interface AddTransactionButtonProps {
  userCanAddTransaction: boolean;
  fab?: boolean;
}

// Se fab=true, renderizar como botão circular fixo
{fab ? (
  <Button className="h-14 w-14 rounded-full shadow-lg" ...>
    <ArrowDownUpIcon />
  </Button>
) : (
  // Renderização atual
)}
```

---

### 6. `app/_components/ui/data-table.tsx`

**Alterações:**
- Adicionar suporte a colunas responsivas (classes CSS condicionais)
- Garantir que colunas ocultas não quebrem o layout

**Nota:** Pode não ser necessário modificar este arquivo se as classes responsivas forem aplicadas diretamente nas colunas.

---

## Ordem de Implementação

1. **Criar** `transaction-card.tsx` - Componente de card
2. **Criar** `transaction-card-list.tsx` - Lista de cards
3. **Modificar** `add-transaction-button.tsx` - Adicionar suporte a FAB
4. **Modificar** `_columns/index.tsx` - Ocultar coluna em tablet
5. **Modificar** `page.tsx` - Integrar tudo com renderização condicional
6. **Testar** em diferentes resoluções

---

## Breakpoints Tailwind

| Classe | Largura Mínima | Uso |
|--------|----------------|-----|
| `sm:` | 640px | - |
| `md:` | 768px | Tablet (mostrar tabela) |
| `lg:` | 1024px | Desktop (todas colunas) |
| `xl:` | 1280px | - |

---

## Testes Necessários

- [ ] Testar em viewport 375px (iPhone SE)
- [ ] Testar em viewport 414px (iPhone 12)
- [ ] Testar em viewport 768px (iPad)
- [ ] Testar em viewport 1024px (iPad Pro)
- [ ] Testar em viewport 1280px+ (Desktop)
- [ ] Verificar funcionalidade dos botões de ação
- [ ] Verificar funcionamento do FAB
- [ ] Testar scroll em listas longas

---

## Aprovação

- [ ] Plano de implementação aprovado
- [ ] Ordem de arquivos aprovada
- [ ] Breakpoints aprovados

**Após aprovação, iniciar implementação na ordem especificada.**
