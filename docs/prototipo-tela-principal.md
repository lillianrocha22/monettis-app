# Protótipo - Tela Principal (Dashboard)

## Referência: Layout Desktop Atual

A tela desktop atual possui:
- **Header**: Logo + Menu horizontal (Dashboard, Transações, Assinatura) + Configurações + Perfil do usuário
- **Área principal** (2 colunas):
  - Coluna esquerda: Saldo + Cards resumo (Investido, Receita, Despesas) + Gráfico de rosca + Gastos por categoria
  - Coluna direita (sidebar): Últimas Transações

---

## Proposta: Layout Tablet (768px - 1024px)

```
+--------------------------------------------------+
|  [=] finance.ai                    [user] [...]  |
+--------------------------------------------------+
|  Dashboard              [2026] [Janeiro] [IA]    |
+--------------------------------------------------+
|                                                  |
|  +--------------------------------------------+  |
|  |  Saldo                                     |  |
|  |  R$ 306,04        [+ Adicionar transação]  |  |
|  +--------------------------------------------+  |
|                                                  |
|  +------------+ +------------+ +------------+    |
|  | Investido  | |  Receita   | |  Despesas  |    |
|  |  R$ 0,00   | | R$ 1.521   | | R$ 1.215   |    |
|  +------------+ +------------+ +------------+    |
|                                                  |
|  +--------------------+ +--------------------+   |
|  |                    | | Gastos por         |   |
|  |    [GRÁFICO]       | | Categoria          |   |
|  |     Rosca          | |                    |   |
|  |                    | | Alimentação   23%  |   |
|  | Receita     56%    | | Entretenimento 1%  |   |
|  | Despesas    44%    | | Saúde         18%  |   |
|  | Investido    0%    | | Utilidades    34%  |   |
|  +--------------------+ | Educação      24%  |   |
|                         +--------------------+   |
|                                                  |
|  +--------------------------------------------+  |
|  | Últimas Transações              [Ver mais] |  |
|  |--------------------------------------------|  |
|  | Faxina           02/jan   |    -R$ 195,00  |  |
|  | Principiapay     02/jan   |    -R$ 290,38  |  |
|  | Claro internet   02/jan   |    -R$ 204,25  |  |
|  | Lava-jato        02/jan   |     -R$ 15,00  |  |
|  | Banho e tosa     02/jan   |    -R$ 220,00  |  |
|  +--------------------------------------------+  |
|                                                  |
+--------------------------------------------------+
```

### Mudanças para Tablet:
1. **Header**: Menu horizontal substituído por ícone hambúrguer [=] à esquerda
2. **Filtros**: Mantidos no topo, mas com dropdowns menores
3. **Sidebar de transações**: Move para baixo da área principal (layout single column)
4. **Cards de resumo**: Mantidos em 3 colunas, mas com menor espaçamento
5. **Gráfico + Categorias**: Lado a lado em 2 colunas (50%/50%)
6. **Transações**: Lista horizontal compacta no rodapé

---

## Proposta: Layout Mobile (< 768px)

```
+--------------------------------+
|  [=]  finance.ai      [avatar] |
+--------------------------------+
|  Dashboard                     |
|  [2026 v] [Jan v] [Relatório]  |
+--------------------------------+
|                                |
|  +----------------------------+|
|  |  Saldo                     ||
|  |  R$ 306,04                 ||
|  |                            ||
|  |  [+ Adicionar transação]   ||
|  +----------------------------+|
|                                |
|  +------------+ +------------+ |
|  | Investido  | |  Receita   | |
|  |  R$ 0,00   | | R$ 1.521   | |
|  +------------+ +------------+ |
|  +---------------------------+ |
|  |        Despesas           | |
|  |       R$ 1.215,83         | |
|  +---------------------------+ |
|                                |
|  +---------------------------+ |
|  |                           | |
|  |      [GRÁFICO ROSCA]      | |
|  |                           | |
|  |  Receita 56% | Despesas 44%|
|  |      Investido 0%         | |
|  +---------------------------+ |
|                                |
|  +---------------------------+ |
|  | Gastos por Categoria      | |
|  |---------------------------|
|  | Alimentacao    [===] 23%  | |
|  | Entretenimento [=  ]  1%  | |
|  | Saude          [== ] 18%  | |
|  | Utilidades     [===] 34%  | |
|  | Educacao       [===] 24%  | |
|  +---------------------------+ |
|                                |
|  +---------------------------+ |
|  | Ultimas Transacoes        | |
|  |             [Ver mais >]  | |
|  |---------------------------|
|  | Faxina                    | |
|  | 02 de jan       -R$195,00 | |
|  |---------------------------|
|  | Principiapay              | |
|  | 02 de jan       -R$290,38 | |
|  |---------------------------|
|  | Claro internet            | |
|  | 02 de jan       -R$204,25 | |
|  |---------------------------|
|  | Lava-jato                 | |
|  | 02 de jan        -R$15,00 | |
|  +---------------------------+ |
|                                |
+--------------------------------+
|  [Home] [Trans] [+] [Cat] [...] |
+--------------------------------+
```

### Mudanças para Mobile:
1. **Header**:
   - Compacto com menu hambúrguer + logo + avatar
   - Nome do usuário removido (só avatar)

2. **Filtros**:
   - Movidos para linha separada abaixo do título
   - Botões menores/dropdowns compactos

3. **Card de Saldo**:
   - Full width
   - Botão "Adicionar transação" abaixo do valor

4. **Cards de Resumo**:
   - Investido e Receita lado a lado (2 colunas)
   - Despesas em linha separada (full width)

5. **Gráfico de Rosca**:
   - Full width
   - Legenda abaixo do gráfico (horizontal)

6. **Gastos por Categoria**:
   - Full width
   - Barras de progresso menores

7. **Últimas Transações**:
   - Cards empilhados verticalmente
   - Nome da transação em uma linha, data e valor na linha abaixo
   - Limite de 4-5 transações visíveis com "Ver mais"

8. **Bottom Navigation Bar** (NOVO):
   - Barra fixa no rodapé com ícones:
     - Home (Dashboard)
     - Transações
     - Adicionar (+) - botão central destacado
     - Categorias
     - Menu (mais opções)

---

## Breakpoints Sugeridos

| Dispositivo | Largura | Layout |
|-------------|---------|--------|
| Desktop     | > 1024px | 2 colunas (principal + sidebar) |
| Tablet      | 768px - 1024px | 1 coluna, componentes reorganizados |
| Mobile      | < 768px | 1 coluna, bottom nav, cards empilhados |

---

## Considerações de UX

### Prioridade de Informações (Mobile-first)
1. Saldo atual (mais importante)
2. Botão de adicionar transação (ação principal)
3. Resumo financeiro (Investido, Receita, Despesas)
4. Gráfico visual de distribuição
5. Últimas transações

### Interações Touch
- Aumentar área de toque dos botões para mínimo 44x44px
- Swipe horizontal nas transações para ações rápidas (editar/excluir)
- Pull-to-refresh para atualizar dados

### Acessibilidade
- Contraste adequado mantido em todos os breakpoints
- Fonte mínima de 14px em mobile
- Ícones com labels alternativos

---

## Status

**Aguardando aprovação antes da implementação.**

---

*Protótipo criado em: 13/01/2026*
