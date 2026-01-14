# Protótipo - Tela de Assinatura Responsiva

## Visão Geral

Este documento apresenta o protótipo de design responsivo para a tela de Assinatura, adaptando o layout atual (Desktop) para **Tablet** e **Mobile**.

**Nota:** A navbar (cabeçalho) permanece inalterada. Este protótipo foca apenas no conteúdo da página.

---

## Layout Atual (Desktop - >1024px)

```
│  Assinatura                                                                 │
│                                                                             │
│  ┌─────────────────────────┐    ┌─────────────────────────┐                │
│  │      Plano Básico       │    │  [Ativo] Plano Premium  │                │
│  │        R$ 0 /mês        │    │       R$ 14 /mês        │                │
│  │─────────────────────────│    │─────────────────────────│                │
│  │ ✓ Apenas 10 transações  │    │ ✓ Transações ilimitadas │                │
│  │   por mês (9/10)        │    │ ✓ Relatórios de IA      │                │
│  │ ✗ Relatórios de IA      │    │                         │                │
│  │                         │    │    [Gerenciar plano]    │                │
│  └─────────────────────────┘    └─────────────────────────┘                │
│                                                                             │
│        width: 450px                    width: 450px                         │
```

**Características:**
- Dois cards lado a lado com largura fixa de 450px
- Espaçamento de 24px (gap-6) entre os cards

---

## Layout Tablet (768px - 1024px)

### Características:
- Cards **lado a lado** com largura flexível
- Cada card ocupa 50% do espaço disponível
- Largura máxima dos cards ajustada para caber na tela

```
│  Assinatura                                                   │
│                                                               │
│  ┌─────────────────────┐    ┌─────────────────────┐          │
│  │    Plano Básico     │    │ [Ativo] Plano Premium│          │
│  │      R$ 0 /mês      │    │     R$ 14 /mês      │          │
│  │─────────────────────│    │─────────────────────│          │
│  │ ✓ Apenas 10 trans.  │    │ ✓ Transações        │          │
│  │   por mês (9/10)    │    │   ilimitadas        │          │
│  │ ✗ Relatórios de IA  │    │ ✓ Relatórios de IA  │          │
│  │                     │    │                     │          │
│  │                     │    │  [Gerenciar plano]  │          │
│  └─────────────────────┘    └─────────────────────┘          │
│                                                               │
│       flex: 1                      flex: 1                    │
```

**Características:**
- Cards com `flex: 1` para dividir espaço igualmente
- Mantém layout horizontal
- Gap reduzido se necessário

---

## Layout Mobile (<768px)

### Características:
- Cards **empilhados verticalmente**
- Cada card ocupa 100% da largura disponível
- Espaçamento vertical entre os cards

```
│  Assinatura                               │
│                                           │
│  ┌───────────────────────────────────┐   │
│  │         Plano Básico              │   │
│  │           R$ 0 /mês               │   │
│  │───────────────────────────────────│   │
│  │ ✓ Apenas 10 transações por mês    │   │
│  │   (9/10)                          │   │
│  │ ✗ Relatórios de IA                │   │
│  └───────────────────────────────────┘   │
│                                           │
│  ┌───────────────────────────────────┐   │
│  │  [Ativo]   Plano Premium          │   │
│  │           R$ 14 /mês              │   │
│  │───────────────────────────────────│   │
│  │ ✓ Transações ilimitadas           │   │
│  │ ✓ Relatórios de IA                │   │
│  │                                   │   │
│  │        [Gerenciar plano]          │   │
│  └───────────────────────────────────┘   │
│                                           │
│              width: 100%                  │
```

**Características:**
- Cards com `width: 100%`
- Layout em coluna (`flex-direction: column`)
- Gap vertical de 24px entre cards

---

## Breakpoints Sugeridos

| Dispositivo | Largura | Layout |
|-------------|---------|--------|
| Mobile | < 768px | Cards empilhados (coluna) |
| Tablet | 768px - 1024px | Cards lado a lado (flex) |
| Desktop | > 1024px | Cards lado a lado (450px fixo) |

---

## Comportamentos Interativos

### Mobile
- **Scroll vertical** para ver ambos os cards
- Botão "Gerenciar plano" com área de toque adequada

### Tablet
- Cards responsivos que se ajustam ao espaço
- Mesma interatividade do desktop

---

## Estilos de Referência (Tailwind)

### Container dos Cards
- **Desktop:** `flex gap-6`
- **Tablet:** `flex gap-6` (cards com flex-1)
- **Mobile:** `flex flex-col gap-6`

### Cards
- **Desktop:** `w-[450px]`
- **Tablet:** `flex-1` ou `w-full max-w-[450px]`
- **Mobile:** `w-full`

---

## Aprovação

- [ ] Design Mobile aprovado
- [ ] Design Tablet aprovado
- [ ] Breakpoints aprovados

**Após aprovação, proceder com implementação conforme plano em `prototipo-tela-subscribe-código.md`**
