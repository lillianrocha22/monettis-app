# Protótipo - Tela de Transações Responsiva

## Visão Geral

Este documento apresenta o protótipo de design responsivo para a tela de Transações, adaptando o layout atual (Desktop) para **Tablet** e **Mobile**.

**Nota:** A navbar (logo, navegação, usuário) permanece inalterada. Este protótipo foca apenas no conteúdo da página.

---

## Layout Atual (Desktop - >1024px)

```
│  Transações                                    [+ Adicionar transação]      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Nome        │ Tipo    │ Categoria  │ Método Pgto │ Data    │ Valor │ Ações │
│  ├─────────────┼─────────┼────────────┼─────────────┼─────────┼───────┼───────┤
│  │ Faxina      │ Despesa │ Utilidades │ Pix         │ 02 jan  │ R$195 │ ✎ 🗑  │
│  │ Internet    │ Despesa │ Utilidades │ Pix         │ 02 jan  │ R$204 │ ✎ 🗑  │
│  │ ...         │ ...     │ ...        │ ...         │ ...     │ ...   │ ...   │
│  └─────────────────────────────────────────────────────────────────────┘   │
```

**Colunas exibidas:** Nome, Tipo, Categoria, Método de Pagamento, Data, Valor, Ações

---

## Layout Tablet (768px - 1024px)

### Características:
- Tabela mantida com **colunas reduzidas**
- Colunas ocultas: **Método de Pagamento**
- Botão "Adicionar" com texto reduzido
- Data em formato curto

```
│  Transações                              [+ Adicionar]                │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ Nome          │ Tipo    │ Categoria  │ Data   │ Valor   │ Ações │ │
│  ├───────────────┼─────────┼────────────┼────────┼─────────┼───────┤ │
│  │ Faxina        │ Despesa │ Utilidades │ 02/01  │ R$195   │ ✎ 🗑  │ │
│  │ Internet      │ Despesa │ Utilidades │ 02/01  │ R$204   │ ✎ 🗑  │ │
│  │ Principiapay  │ Despesa │ Educação   │ 02/01  │ R$290   │ ✎ 🗑  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
```

**Colunas exibidas:** Nome, Tipo, Categoria, Data (formato curto), Valor, Ações
**Colunas ocultas:** Método de Pagamento

---

## Layout Mobile (<768px)

### Características:
- **Layout em cards** substituindo a tabela
- Cada transação é um card independente
- Informações organizadas em hierarquia visual
- Ações acessíveis via botões no card
- Botão FAB (Floating Action Button) para adicionar

```
│  Transações                                                         │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Faxina                                                      │   │
│  │ ● Despesa                                                   │   │
│  │                                                             │   │
│  │ Utilidades · Pix                                            │   │
│  │ 02 de janeiro de 2026                                       │   │
│  │                                                             │   │
│  │ R$ 195,00                                        [✎] [🗑]   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Claro internet fixa                                         │   │
│  │ ● Despesa                                                   │   │
│  │                                                             │   │
│  │ Utilidades · Pix                                            │   │
│  │ 02 de janeiro de 2026                                       │   │
│  │                                                             │   │
│  │ R$ 204,25                                        [✎] [🗑]   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Principiapay                                                │   │
│  │ ● Despesa                                                   │   │
│  │                                                             │   │
│  │ Educação · Boleto Bancário                                  │   │
│  │ 02 de janeiro de 2026                                       │   │
│  │                                                             │   │
│  │ R$ 290,38                                        [✎] [🗑]   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│                                                            [+]     │ <- FAB
```

### Estrutura do Card Mobile:

```
┌─────────────────────────────────────────┐
│ [Nome da Transação]                     │  <- Título (font-bold)
│ [● Badge Tipo]                          │  <- Badge colorido (Despesa/Depósito)
│                                         │
│ [Categoria] · [Método Pgto]             │  <- Texto secundário (text-muted)
│ [Data completa]                         │  <- Data formatada
│                                         │
│ [Valor]                      [✎] [🗑]   │  <- Valor destacado + ações
└─────────────────────────────────────────┘
```

---

## Breakpoints Sugeridos

| Dispositivo | Largura | Layout |
|-------------|---------|--------|
| Mobile | < 768px | Cards |
| Tablet | 768px - 1024px | Tabela reduzida |
| Desktop | > 1024px | Tabela completa |

---

## Comportamentos Interativos

### Mobile
- **Scroll vertical** para navegar entre cards
- **FAB** sempre visível no canto inferior direito
- Cards com espaçamento adequado para toque

### Tablet
- **Tabela compacta** com scroll horizontal se necessário
- **Hover states** para ações
- **Botão adicionar** visível no header

---

## Cores e Estilos (Referência)

- **Badge Despesa:** Vermelho (`bg-danger/10 text-danger`)
- **Badge Depósito:** Verde (`bg-primary/10 text-primary`)
- **Fundo Card:** `bg-card` ou `bg-muted/50`
- **Borda Card:** `border border-border`
- **Sombra Card:** `shadow-sm`

---

## Aprovação

- [ ] Design Mobile aprovado
- [ ] Design Tablet aprovado
- [ ] Comportamentos interativos aprovados

**Após aprovação, proceder com implementação conforme plano em `prototipo-tela-transactions-código.md`**
