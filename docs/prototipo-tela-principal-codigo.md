# Plano de Alteracao de Codigo - Responsividade Dashboard

## Resumo da Analise

**Framework:** Next.js 14 (App Router)
**Estilos:** Tailwind CSS 3.4.1
**Componentes UI:** Radix UI

**Status Atual:** Layout fixo para desktop, sem breakpoints responsivos.

---

## Breakpoints Tailwind a Utilizar

| Prefixo | Largura Minima | Dispositivo |
|---------|----------------|-------------|
| (base)  | 0px            | Mobile      |
| `md:`   | 768px          | Tablet      |
| `lg:`   | 1024px         | Desktop     |

---

## Arquivos a Modificar

### 1. `app/(home)/page.tsx`

**Localizacao:** `app/(home)/page.tsx`

**Alteracoes Necessarias:**

| Linha | Codigo Atual | Codigo Proposto |
|-------|--------------|-----------------|
| Grid principal | `grid-cols-[2fr,1fr]` | `grid-cols-1 lg:grid-cols-[2fr,1fr]` |
| Gap | `gap-6` | `gap-4 md:gap-6` |
| Padding | - | `px-4 md:px-6` |
| Grid interno | `grid-cols-3` | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |

**Mudanca Estrutural:**
- Mobile: Layout single column, LastTransactions no final
- Tablet: 2 colunas para grafico/categorias
- Desktop: Layout atual (2fr + 1fr)

**Adicionar:** Padding bottom para acomodar bottom nav em mobile (`pb-20 lg:pb-0`)

---

### 2. `app/(home)/_components/summary-cards.tsx`

**Localizacao:** `app/(home)/_components/summary-cards.tsx`

**Alteracoes Necessarias:**

| Elemento | Atual | Proposto |
|----------|-------|----------|
| Container cards pequenos | `grid-cols-3` | `grid-cols-2 md:grid-cols-3` |
| Gap | `gap-6` | `gap-3 md:gap-6` |

**Mudanca Estrutural Mobile:**
- Investido e Receita: lado a lado (2 colunas)
- Despesas: full width abaixo
- Usar `col-span-2 md:col-span-1` no card de Despesas para mobile

---

### 3. `app/(home)/_components/summary-card.tsx`

**Localizacao:** `app/(home)/_components/summary-card.tsx`

**Alteracoes Necessarias:**

| Elemento | Atual | Proposto |
|----------|-------|----------|
| Tamanho fonte (large) | `text-4xl` | `text-2xl md:text-4xl` |
| Tamanho fonte (small) | `text-2xl` | `text-xl md:text-2xl` |
| Botao AddTransaction | Inline | `w-full md:w-auto` em mobile |

**Mudanca Estrutural Mobile:**
- Card de Saldo: botao "Adicionar transacao" abaixo do valor (flex-col)
- Layout: `flex-col md:flex-row md:items-center md:justify-between`

---

### 4. `app/(home)/_components/transactions-pie-chart.tsx`

**Localizacao:** `app/(home)/_components/transactions-pie-chart.tsx`

**Alteracoes Necessarias:**

| Elemento | Atual | Proposto |
|----------|-------|----------|
| Col span | `col-span-1` | `col-span-1 md:col-span-1` |
| Max height | `max-h-[250px]` | `max-h-[200px] md:max-h-[250px]` |
| Legenda | Vertical | `flex-row flex-wrap md:flex-col` em mobile |

**Mudanca Estrutural:**
- Mobile: Grafico full width, legenda horizontal abaixo
- Tablet/Desktop: Layout atual

---

### 5. `app/(home)/_components/percentage-item.tsx`

**Localizacao:** `app/(home)/_components/percentage-item.tsx`

**Alteracoes Necessarias:**

| Elemento | Atual | Proposto |
|----------|-------|----------|
| Gap | `gap-3` | `gap-2 md:gap-3` |
| Padding icone | `p-2` | `p-1.5 md:p-2` |
| Font size | `text-sm` | `text-xs md:text-sm` |

---

### 6. `app/(home)/_components/expenses-per-category.tsx`

**Localizacao:** `app/(home)/_components/expenses-per-category.tsx`

**Alteracoes Necessarias:**

| Elemento | Atual | Proposto |
|----------|-------|----------|
| Col span | `col-span-2` | `col-span-1 md:col-span-2` |
| Padding | - | `p-4 md:p-6` |
| ScrollArea height | Fixo | `max-h-[300px] md:max-h-none` |

**Mudanca Estrutural:**
- Mobile: Full width, altura limitada com scroll
- Tablet/Desktop: 2 colunas como atual

---

### 7. `app/(home)/_components/last-transactions.tsx`

**Localizacao:** `app/(home)/_components/last-transactions.tsx`

**Alteracoes Necessarias:**

| Elemento | Atual | Proposto |
|----------|-------|----------|
| Container | Sidebar direita | `order-last lg:order-none` |
| Layout item | Horizontal | `flex-col md:flex-row` em mobile |
| Padding | - | `p-4 md:p-6` |
| Max items mobile | - | Limitar a 5 com CSS `[&>*:nth-child(n+6)]:hidden md:[&>*:nth-child(n+6)]:flex` |

**Mudanca Estrutural Mobile:**
- Nome da transacao em uma linha
- Data e valor na linha abaixo
- Bordas entre items mais sutis

---

### 8. `app/(home)/_components/time-select.tsx`

**Localizacao:** `app/(home)/_components/time-select.tsx`

**Alteracoes Necessarias:**

| Elemento | Atual | Proposto |
|----------|-------|----------|
| Width | `w-[150px]` | `w-[100px] md:w-[150px]` |
| Font size trigger | - | `text-sm md:text-base` |

---

### 9. `app/(home)/_components/year-select.tsx`

**Localizacao:** `app/(home)/_components/year-select.tsx`

**Alteracoes Necessarias:**

| Elemento | Atual | Proposto |
|----------|-------|----------|
| Width | `w-[120px]` | `w-[80px] md:w-[120px]` |
| Font size trigger | - | `text-sm md:text-base` |

---

### 10. `app/_components/navbar.tsx`

**Localizacao:** `app/_components/navbar.tsx`

**Alteracoes Necessarias:**

Este e o componente com MAIOR mudanca estrutural.

#### 10.1 Estrutura Atual (Desktop)
```
[Logo] [Dashboard] [Transacoes] [Assinatura]  ...  [Theme] [User]
```

#### 10.2 Estrutura Proposta (Mobile)
```
[Hamburger] [Logo]                            [Avatar]
```

**Novos Elementos a Criar:**

1. **Estado para menu mobile:**
   ```tsx
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   ```

2. **Botao Hamburger:**
   ```tsx
   <button className="lg:hidden">
     <Menu className="h-6 w-6" />  // ou X quando aberto
   </button>
   ```

3. **Menu Mobile (Sheet/Drawer):**
   - Usar componente Sheet do Radix UI
   - Links verticais
   - Fechar ao clicar em link

4. **Classes Condicionais:**

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| Links navegacao | `hidden lg:flex` | Visivel |
| Nome usuario | `hidden md:block` | Visivel |
| Hamburger | `flex lg:hidden` | Oculto |

---

### 11. NOVO COMPONENTE: `app/_components/bottom-nav.tsx`

**Criar novo arquivo:** `app/_components/bottom-nav.tsx`

**Estrutura Proposta:**

```tsx
"use client"

import { Home, ArrowLeftRight, Plus, FolderOpen, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/app/_lib/utils"

interface NavItem {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  isAction?: boolean
}

const navItems: NavItem[] = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/transactions", icon: ArrowLeftRight, label: "Transacoes" },
  { href: "#add", icon: Plus, label: "Adicionar", isAction: true },
  { href: "/categories", icon: FolderOpen, label: "Categorias" },
  { href: "#more", icon: MoreHorizontal, label: "Mais" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          if (item.isAction) {
            return (
              <button
                key={item.label}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Icon className="h-6 w-6" />
              </button>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

**Integrar em:** `app/layout.tsx`

```tsx
// Adicionar antes do fechamento do body
<BottomNav />
```

---

### 12. `app/layout.tsx`

**Localizacao:** `app/layout.tsx`

**Alteracoes Necessarias:**

1. Importar e renderizar `BottomNav`
2. Adicionar padding bottom ao main content para mobile:
   ```tsx
   <main className="pb-16 lg:pb-0">
     {children}
   </main>
   ```

---

### 13. `app/globals.css`

**Localizacao:** `app/globals.css`

**Adicoes Necessarias:**

```css
/* Safe area para dispositivos com notch */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .bottom-nav {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Smooth scroll para mobile */
@media (max-width: 768px) {
  html {
    scroll-behavior: smooth;
  }
}
```

---

## Ordem de Implementacao Sugerida

| Fase | Arquivos | Descricao |
|------|----------|-----------|
| 1 | `navbar.tsx` | Menu hamburguer e responsividade do header |
| 2 | `bottom-nav.tsx` + `layout.tsx` | Criar e integrar bottom navigation |
| 3 | `page.tsx` | Grid responsivo principal |
| 4 | `summary-cards.tsx` + `summary-card.tsx` | Cards de resumo responsivos |
| 5 | `transactions-pie-chart.tsx` + `percentage-item.tsx` | Grafico responsivo |
| 6 | `expenses-per-category.tsx` | Categorias responsivas |
| 7 | `last-transactions.tsx` | Transacoes responsivas |
| 8 | `time-select.tsx` + `year-select.tsx` | Seletores responsivos |
| 9 | `globals.css` | Ajustes finais CSS |

---

## Testes Necessarios

### Breakpoints a Testar

| Largura | Dispositivo | Verificar |
|---------|-------------|-----------|
| 320px   | iPhone SE   | Layout mobile completo |
| 375px   | iPhone 12   | Layout mobile |
| 414px   | iPhone Plus | Layout mobile |
| 768px   | iPad        | Transicao tablet |
| 1024px  | iPad Pro    | Transicao desktop |
| 1280px  | Desktop     | Layout completo |

### Checklist de Testes

- [ ] Menu hamburguer abre/fecha corretamente
- [ ] Bottom nav aparece apenas em mobile
- [ ] Cards reorganizam corretamente em cada breakpoint
- [ ] Grafico de rosca legivel em todos os tamanhos
- [ ] Scroll funciona em areas com overflow
- [ ] Touch targets >= 44x44px em mobile
- [ ] Botao "Adicionar transacao" acessivel em todos os tamanhos
- [ ] Navegacao entre paginas funciona via bottom nav
- [ ] Tema dark/light funciona em todos os breakpoints

---

## Dependencias Adicionais

Nenhuma nova dependencia necessaria. Todos os recursos ja estao disponiveis:
- Tailwind CSS (breakpoints)
- Radix UI Sheet (menu mobile)
- Lucide React (icones)

---

## Estimativa de Complexidade

| Componente | Complexidade | Motivo |
|------------|--------------|--------|
| `navbar.tsx` | Alta | Nova logica de estado + Sheet |
| `bottom-nav.tsx` | Media | Novo componente, mas simples |
| `page.tsx` | Media | Mudanca de grid |
| `summary-cards.tsx` | Baixa | Apenas classes Tailwind |
| `summary-card.tsx` | Baixa | Apenas classes Tailwind |
| `transactions-pie-chart.tsx` | Media | Reorganizar legenda |
| `expenses-per-category.tsx` | Baixa | Apenas classes Tailwind |
| `last-transactions.tsx` | Media | Layout de item muda |
| Seletores | Baixa | Apenas width |

---

## Riscos e Mitigacoes

| Risco | Mitigacao |
|-------|-----------|
| Quebra de layout em transicoes | Testar todos os breakpoints |
| Performance em mobile | Lazy load de componentes pesados |
| Overflow de texto | Usar `truncate` do Tailwind |
| Touch targets pequenos | Minimo 44x44px em botoes |

---

## Status

**AGUARDANDO APROVACAO ANTES DA IMPLEMENTACAO**

---

*Plano criado em: 13/01/2026*
*Baseado no prototipo: prototipo-tela-principal.md*
