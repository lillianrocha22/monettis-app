# Plano de Alteração de Código - Tela de Assinatura Responsiva

## Objetivo

Implementar o design responsivo da tela de Assinatura conforme protótipo aprovado em `prototipo-tela-subscribe.md`.

**IMPORTANTE:** Este plano deve ser aprovado antes de qualquer modificação no código.

---

## Arquivo a Ser Modificado

### `app/subscription/page.tsx`

**Problema atual:**
- Cards com largura fixa `w-[450px]`
- Container flex sem wrap ou direção responsiva
- Não se adapta a telas menores

---

## Alterações Propostas

### 1. Container dos Cards (linha 25)

**Código atual:**
```tsx
<div className="flex gap-6">
```

**Código proposto:**
```tsx
<div className="flex flex-col gap-6 md:flex-row">
```

**Explicação:**
- `flex-col` - Empilha verticalmente por padrão (mobile)
- `md:flex-row` - Lado a lado em tablet/desktop (≥768px)

---

### 2. Card do Plano Básico (linha 26)

**Código atual:**
```tsx
<Card className="w-[450px]">
```

**Código proposto:**
```tsx
<Card className="w-full md:flex-1 lg:w-[450px] lg:flex-none">
```

**Explicação:**
- `w-full` - Largura 100% no mobile
- `md:flex-1` - Flex grow no tablet (divide espaço)
- `lg:w-[450px] lg:flex-none` - Largura fixa no desktop

---

### 3. Card do Plano Premium (linha 51)

**Código atual:**
```tsx
<Card className="w-[450px]">
```

**Código proposto:**
```tsx
<Card className="w-full md:flex-1 lg:w-[450px] lg:flex-none">
```

**Explicação:**
- Mesmas classes do card anterior para manter consistência

---

## Resumo das Alterações

| Local | Antes | Depois |
|-------|-------|--------|
| Container | `flex gap-6` | `flex flex-col gap-6 md:flex-row` |
| Cards | `w-[450px]` | `w-full md:flex-1 lg:w-[450px] lg:flex-none` |

---

## Código Final Esperado

```tsx
// Container
<div className="flex flex-col gap-6 md:flex-row">

  {/* Card Plano Básico */}
  <Card className="w-full md:flex-1 lg:w-[450px] lg:flex-none">
    {/* ... conteúdo existente ... */}
  </Card>

  {/* Card Plano Premium */}
  <Card className="w-full md:flex-1 lg:w-[450px] lg:flex-none">
    {/* ... conteúdo existente ... */}
  </Card>

</div>
```

---

## Ordem de Implementação

1. **Modificar** container dos cards (adicionar classes responsivas)
2. **Modificar** Card do Plano Básico (classes de largura responsiva)
3. **Modificar** Card do Plano Premium (classes de largura responsiva)
4. **Testar** em diferentes resoluções

---

## Breakpoints Tailwind Utilizados

| Prefixo | Largura Mínima | Uso |
|---------|----------------|-----|
| (none) | 0px | Mobile (padrão) |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |

---

## Testes Necessários

- [ ] Testar em viewport 375px (iPhone SE)
- [ ] Testar em viewport 414px (iPhone 12)
- [ ] Testar em viewport 768px (iPad)
- [ ] Testar em viewport 1024px (iPad Pro)
- [ ] Testar em viewport 1280px+ (Desktop)
- [ ] Verificar botão "Gerenciar plano" funciona em todas as resoluções
- [ ] Verificar badge "Ativo" está visível corretamente

---

## Aprovação

- [ ] Plano de implementação aprovado
- [ ] Classes Tailwind aprovadas
- [ ] Breakpoints aprovados

**Após aprovação, iniciar implementação.**
