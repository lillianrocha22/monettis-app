# Plano de Alteração - Tela de Login Responsiva

## Arquivo a ser modificado
- `app/login/page.tsx`

---

## Alterações Planejadas

### 1. Container Principal (linha 15)

**Código Atual:**
```tsx
<div className="grid h-full grid-cols-2">
```

**Código Proposto:**
```tsx
<div className="flex h-full items-center justify-center">
```

**Motivo:** Remover o grid de 2 colunas e usar flexbox para centralizar o conteúdo em todas as resoluções.

---

### 2. Conteúdo Central (linha 17)

**Código Atual:**
```tsx
<div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
```

**Código Proposto:**
```tsx
<div className="flex max-w-[550px] flex-col items-center p-6 md:p-8 text-center">
```

**Motivo:**
- `p-6 md:p-8`: Padding menor em mobile (24px), maior em tablet/desktop (32px)
- `items-center`: Centraliza todos os itens
- `text-center`: Texto centralizado em todas as resoluções
- Removido `h-full` e `justify-center` pois o container pai já centraliza

---

### 3. Título - Tamanho Responsivo (linha 25)

**Código Atual:**
```tsx
<h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
```

**Código Proposto:**
```tsx
<h1 className="mb-3 text-3xl md:text-4xl font-bold">Bem-vindo</h1>
```

**Motivo:** Título menor em mobile (text-3xl), maior em tablet/desktop (text-4xl).

---

### 4. Remover Coluna Direita (linha 40-43)

**Código Atual:**
```tsx
{/*direita*/}
<div className="relative h-full w-full">
    <Image src="/login.png" alt="Faça login" fill className="object-cover"/>
</div>
```

**Código Proposto:**
```tsx
// REMOVER COMPLETAMENTE este bloco de código
```

**Motivo:** A imagem do dashboard será removida em todas as resoluções, não apenas oculta.

---

## Resumo das Classes Tailwind

| Classe | Comportamento |
|--------|---------------|
| `flex items-center justify-center` | Centraliza conteúdo vertical e horizontalmente |
| `p-6 md:p-8` | Padding 24px mobile, 32px tablet+ |
| `items-center` | Centraliza itens do conteúdo |
| `text-center` | Texto centralizado em todas as resoluções |
| `text-3xl md:text-4xl` | Título menor mobile, maior tablet+ |

---

## Checklist de Implementação

- [ ] Alterar container de grid para flexbox centralizado
- [ ] Ajustar classes do conteúdo para centralização
- [ ] Ajustar padding responsivo
- [ ] Ajustar tamanho do título responsivo
- [ ] **Remover completamente** a coluna da imagem
- [ ] Testar em diferentes resoluções
- [ ] Verificar se o botão funciona corretamente

---

## Breakpoints de Teste

Após implementação, testar nas seguintes resoluções:
- **Mobile**: 375px (iPhone SE), 390px (iPhone 14)
- **Tablet**: 768px (iPad Mini), 1024px (iPad Pro)
- **Desktop**: 1280px, 1920px

---

**Status**: AGUARDANDO APROVAÇÃO

> Este documento deve ser aprovado antes de qualquer modificação no código.
