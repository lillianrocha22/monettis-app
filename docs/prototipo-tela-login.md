# Protótipo - Tela de Login (Responsivo)

## Design Atual (Desktop)
A tela atual possui um layout de 2 colunas:
- **Coluna Esquerda**: Logo, título "Bem-vindo", descrição e botão de login
- **Coluna Direita**: Imagem do dashboard

---

## Proposta Geral (Todas as Resoluções)

A imagem do dashboard será **REMOVIDA** em todas as resoluções, resultando em um layout centralizado e simplificado.

---

## Proposta para Desktop (1024px+)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                          [LOGO]                                 │
│                                                                 │
│                        Bem-vindo                                │
│                                                                 │
│       O Monettis é uma plataforma de gestão financeira que      │
│       utiliza IA para monitorar suas movimentações, e           │
│       oferecer insights personalizados, facilitando o           │
│       controle do seu orçamento.                                │
│                                                                 │
│               ┌─────────────────────────────┐                   │
│               │  Fazer login ou criar conta │                   │
│               └─────────────────────────────┘                   │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Especificações Desktop:
- Layout em coluna única centralizada
- Largura máxima do conteúdo: 550px
- Padding lateral: 32px (p-8)
- Imagem da direita: **REMOVIDA**
- Conteúdo: Centralizado vertical e horizontalmente

---

## Proposta para Tablet (768px - 1024px)

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│              [LOGO]                     │
│                                         │
│            Bem-vindo                    │
│                                         │
│   O Monettis é uma plataforma de        │
│   gestão financeira que utiliza IA      │
│   para monitorar suas movimentações,    │
│   e oferecer insights personalizados,   │
│   facilitando o controle do seu         │
│   orçamento.                            │
│                                         │
│     ┌─────────────────────────────┐     │
│     │  Fazer login ou criar conta │     │
│     └─────────────────────────────┘     │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### Especificações Tablet:
- Layout em coluna única centralizada
- Largura máxima do conteúdo: 550px
- Padding lateral: 32px (p-8)
- Imagem da direita: **REMOVIDA**
- Conteúdo: Centralizado vertical e horizontalmente

---

## Proposta para Mobile (< 768px)

```
┌───────────────────────────┐
│                           │
│          [LOGO]           │
│                           │
│        Bem-vindo          │
│                           │
│ O Monettis é uma          │
│ plataforma de gestão      │
│ financeira que utiliza    │
│ IA para monitorar suas    │
│ movimentações, e          │
│ oferecer insights         │
│ personalizados,           │
│ facilitando o controle    │
│ do seu orçamento.         │
│                           │
│ ┌───────────────────────┐ │
│ │ Fazer login ou criar  │ │
│ │        conta          │ │
│ └───────────────────────┘ │
│                           │
└───────────────────────────┘
```

### Especificações Mobile:
- Layout em coluna única centralizada
- Largura: 100% com padding
- Padding lateral: 24px (p-6)
- Título: texto menor (text-3xl ao invés de text-4xl)
- Imagem da direita: **REMOVIDA**
- Conteúdo: Centralizado vertical e horizontalmente
- Botão: largura total (w-full)

---

## Resumo das Mudanças

| Elemento | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Colunas | 1 | 1 | 1 |
| Imagem Dashboard | **Removida** | **Removida** | **Removida** |
| Alinhamento | Centro | Centro | Centro |
| Largura conteúdo | max-w-[550px] | max-w-[550px] | 100% |
| Padding | p-8 | p-8 | p-6 |
| Título | text-4xl | text-4xl | text-3xl |
| Botão | auto | auto | w-full |

---

## Breakpoints Tailwind

- **Mobile**: `< 768px` (default)
- **Tablet**: `md:` (768px - 1023px)
- **Desktop**: `lg:` (1024px+)

---

**Status**: Aguardando aprovação antes de implementar no código.
