# Definição de Tiers de Preços - Monettis App

**Data**: 02 de Janeiro de 2026
**Versão**: 1.0
**Baseado em**: Pesquisa de mercado em /docs/market

---

## Sumário Executivo

Com base na análise detalhada dos arquivos de pesquisa de mercado, definimos 3 tiers de preço estratégicos para maximizar receita e atender diferentes segmentos de público:

- **Tier 1**: R$ 14,00/mês - **Premium Individual** (atual)
- **Tier 2**: R$ 23,90/mês - **Família Plus** (upsell)
- **Tier 3**: R$ 45,90/mês - **Business Enterprise** (enterprise)

---

## TIER 1 - R$ 14,00/MÊS (PREMIUM INDIVIDUAL)

### Público-Alvo
- Profissionais individuais
- Pessoas que querem controle financeiro pessoal completo
- Early adopters (preço promocional original: R$ 14,90)

### Objetivo Estratégico
- Primeira versão paga competitiva no mercado
- Paridade com principais concorrentes
- Base sólida para upsell futuro

### Módulos Incluídos

#### ✅ **Já Implementados** (MVP Atual)
1. **Gestão de Transações**
   - Transações ilimitadas (diferente do Free que tem 50/mês)
   - CRUD completo (criar, editar, deletar)
   - Categorização manual
   - 3 tipos: DEPOSIT, EXPENSE, INVESTMENT
   - 9 categorias padrão
   - 7 métodos de pagamento (incluindo PIX)

2. **Dashboard Financeiro**
   - Resumo mensal (saldo, receitas, despesas, investimentos)
   - Gráficos:
     - Pizza de tipos de transação
     - Despesas por categoria
   - Últimas 15 transações
   - Filtros por mês e ano

3. **Relatórios com IA**
   - Relatórios financeiros ilimitados
   - GPT-4o-mini
   - Insights personalizados
   - Dicas de economia
   - Análise de tendências

4. **Interface e UX**
   - Tema escuro/claro
   - Design responsivo
   - Multiplataforma (web, mobile PWA)

5. **Sistema de Assinatura**
   - Integração com Stripe
   - Gestão de plano
   - Cancela quando quiser

#### 🚀 **Indispensáveis para Lançamento** (Fase 1 - Roadmap)

6. **Importação de Extratos Bancários** ⭐ CRÍTICO
   - Formatos: OFX, XLS/XLSX, CSV
   - Parsing automático
   - Detecção de duplicatas
   - Preview antes de importar
   - **Por quê**: Economiza 80-90% do tempo do usuário vs cadastro manual
   - **Concorrentes que têm**: Todos os principais (Meu Planner, PlannerFin, MDO)

7. **Importação de Faturas de Cartão** ⭐ CRÍTICO
   - Formatos: PDF, OFX, XLS/XLSX, CSV
   - OCR/parsing de PDF
   - Detecção automática de parcelas
   - Criação de parcelas futuras
   - **Por quê**: Diferencial crucial para controle de cartão de crédito
   - **Concorrentes que têm**: PlannerFin, MDO, GestorMoney

8. **Controle Avançado de Cartões de Crédito**
   - Múltiplos cartões (ilimitados)
   - Gestão de faturas atuais e futuras
   - Controle de parcelas
   - Limite disponível por cartão
   - Fechamento e vencimento
   - **Por quê**: Principal pain point dos usuários brasileiros
   - **Concorrentes que têm**: TODOS os principais

9. **Integração WhatsApp Básica** 🌟 DIFERENCIAL ÚNICO
   - Cadastro de transações por texto
   - Confirmação via WhatsApp
   - Lembretes simples de vencimentos
   - **Por quê**: Diferencial único no mercado (só GestorMoney tem algo similar)
   - **Impacto**: Reduz atrito, aumenta engajamento

10. **Contas Bancárias e Saldo**
    - Múltiplas contas
    - Saldo inicial configurável
    - Saldo total calculado
    - Evolução do saldo (gráfico)
    - **Por quê**: Essencial para controle financeiro real

11. **Metas Financeiras Básicas**
    - Criar metas ilimitadas
    - Definir valor alvo e prazo
    - Acompanhar progresso
    - **Por quê**: Motivação e planejamento

12. **Contas a Pagar/Receber**
    - Lançamentos futuros
    - Contas recorrentes
    - Alertas de vencimento
    - **Por quê**: Planejamento de fluxo de caixa

### Resumo Tier 1 (R$ 14,00/mês)
**Total de Módulos**: 12
**Foco**: Controle financeiro pessoal completo e profissional
**Diferencial**: WhatsApp + IA + Importações automáticas
**Concorrência**: Competitivo com Meu Planner (R$ 16,50/mês) e superior às planilhas (R$ 47-120)

---

## TIER 2 - R$ 23,90/MÊS (FAMÍLIA PLUS)

### Público-Alvo
- Casais que querem transparência financeira
- Famílias com filhos (educação financeira)
- Irmãos que dividem despesas
- Cuidadores de pais idosos

### Objetivo Estratégico
- Upsell do Tier 1 (custo por pessoa cai 70%)
- Capturar mercado familiar (15 milhões de famílias)
- Fidelização alta (famílias inteiras)

### Módulos Incluídos

#### ✅ **Herda TUDO do Tier 1** + Funcionalidades Familiares

13. **Múltiplos Usuários (Até 4 Membros)**
    - Cada membro tem login próprio
    - Acesso simultâneo
    - Sincronização em tempo real
    - **Economia**: R$ 14 × 4 = R$ 56/mês → R$ 23,90/mês (58% desconto)

14. **Perfis Individuais**
    - Conta Familiar (compartilhada)
    - Conta Individual por membro
    - Cada um vê seus gastos
    - Relatórios individuais e consolidados

15. **Gestão de Mesada para Filhos** 🎓
    - Definir mesada mensal
    - Filho registra gastos
    - Pais acompanham
    - Gamificação (badges, desafios)
    - **Valor educativo inestimável**

16. **Divisão Inteligente de Despesas**
    - Divisão igual
    - Divisão proporcional à renda
    - Divisão por categoria
    - Personalizada
    - Acerto de contas automático

17. **Controles Parentais**
    - Permissões por nível
    - Aprovar transações dos filhos
    - Limitar categorias
    - Alertas de gastos suspeitos

18. **Metas Familiares Compartilhadas** 👨‍👩‍👧‍👦
    - Viagem em família
    - Casa própria
    - Faculdade dos filhos
    - Progresso compartilhado
    - Celebração de conquistas

19. **Chat Familiar Interno**
    - Discussões sobre finanças
    - Anexar comprovantes
    - Notificações em tempo real
    - Reduz conflitos por dinheiro

20. **Relatórios Familiares com IA** 🤖
    - Gastos por membro
    - Contribuições
    - Mesada dos filhos
    - Progresso de metas
    - Tom familiar e acolhedor

21. **Calendário Financeiro Familiar**
    - Vencimentos
    - Mesadas
    - Eventos importantes
    - Sincronização opcional com Google Calendar

22. **Educação Financeira para Filhos** 📚
    - Lições por faixa etária
    - Simuladores didáticos
    - Quizzes e certificados
    - Conquistas e badges

23. **Controle de Cartão Adicional**
    - Vincular cartão do filho
    - Limites por categoria
    - Alertas em tempo real
    - Bloquear temporariamente

24. **WhatsApp Familiar** 🌟
    - Cadastro por voz (todos os membros)
    - Lembretes personalizados
    - Resumo diário familiar
    - Alertas compartilhados

### Resumo Tier 2 (R$ 23,90/mês)
**Total de Módulos**: 24 (12 do Tier 1 + 12 novos)
**Foco**: Gestão familiar, transparência, educação financeira
**Diferencial**: Único com foco familiar completo no Brasil
**Custo por pessoa**: R$ 5,98/mês (vs R$ 14/mês individual) - economia de 57%
**Concorrência**: Sem concorrentes diretos com tantas features familiares

---

## TIER 3 - R$ 45,90/MÊS (BUSINESS ENTERPRISE)

### Público-Alvo
- Microempreendedores Individuais (MEI) - 15+ milhões
- Profissionais liberais (médicos, advogados, dentistas, arquitetos)
- Pequenos empresários (até 5 funcionários)
- Freelancers com CNPJ
- Faturamento: R$ 5k - R$ 50k/mês

### Objetivo Estratégico
- Maior ticket médio
- Mercado B2B (20 milhões de MEIs/microempresas)
- Baixo churn (ferramenta essencial de trabalho)
- Alto valor percebido (economiza em contador)

### Módulos Incluídos

#### ✅ **Herda TUDO do Tier 1** + Funcionalidades Empresariais

25. **Perfil Empresarial Separado** 💼
    - Toggle entre Pessoal e Empresarial
    - Dados completamente independentes
    - Dashboard unificado opcional
    - **Clareza total PJ vs PF**

26. **DRE Automatizada** 📊 ESSENCIAL
    - Demonstração do Resultado do Exercício
    - Receita Bruta, Líquida, Lucro Bruto, EBITDA
    - Cálculo automático por categorização
    - Mensal, trimestral, anual
    - Gráfico de evolução
    - **Saber se está lucrando**

27. **Centro de Custos** 🏢
    - Por departamento, projeto, unidade
    - Ilimitados
    - Filtrar relatórios por centro
    - DRE por centro de custo
    - **Saber qual parte do negócio lucra mais**

28. **Cadastro de Clientes** 👥
    - CRUD completo
    - CPF/CNPJ, contatos
    - Histórico de transações
    - Contas a receber
    - Lifetime value
    - Ranking de melhores clientes

29. **Cadastro de Fornecedores** 🏭
    - CRUD completo
    - CNPJ, dados bancários
    - Histórico de pagamentos
    - Contas a pagar
    - Ranking por volume

30. **Gestão de Notas Fiscais** 📄
    - Upload PDF/XML
    - Extração automática de dados
    - Associar a transações
    - Busca avançada
    - Armazenamento seguro

31. **Relatórios Fiscais e Contábeis** 📋
    - Livro Caixa Digital
    - Relatório de Impostos
    - Relatório de Receitas/Despesas
    - Balanço Patrimonial simplificado
    - **Facilita trabalho do contador**

32. **Fluxo de Caixa Empresarial** 💰
    - Diário, semanal, mensal
    - Projeção 90 dias
    - Cenários (otimista/realista/pessimista)
    - Alertas de falta de caixa
    - **Nunca ficar sem dinheiro**

33. **Contas Bancárias PJ**
    - Múltiplas contas empresariais
    - Separadas das pessoais
    - Conciliação bancária
    - Transferências entre contas

34. **Planejamento Orçamentário Empresarial**
    - Orçamento anual/mensal
    - Meta de faturamento
    - Comparação orçado vs realizado
    - Alertas de desvios

35. **KPIs Empresariais** 📈
    - Faturamento mensal
    - Lucro líquido e margem
    - Ticket médio
    - CAC (Custo de Aquisição)
    - LTV (Lifetime Value)
    - Break-even
    - ROI de marketing
    - Dias de caixa

36. **Múltiplos Usuários Business (Até 3)** 👔
    - Sócio, contador, funcionário
    - Níveis de permissão:
      - Administrador
      - Financeiro
      - Contador (somente visualização)
      - Visualizador
    - Log de atividades
    - Auditoria completa

37. **Integração com Contador** 🤝
    - Convidar contador para sistema
    - Acesso controlado
    - Exportação automática mensal
    - Checklist de documentos
    - Chat interno (opcional)

38. **Relatórios IA Empresarial** 🤖
    - Análise de lucratividade
    - Identificação de custos desnecessários
    - Sugestões de redução de custos
    - Oportunidades de receita
    - Benchmarks do setor
    - Previsões de faturamento
    - Alertas de riscos

39. **WhatsApp Business** 🌟
    - Cadastro por voz (empresarial)
    - Lembretes de impostos/obrigações
    - Relatórios rápidos via WhatsApp
    - Alertas de fluxo de caixa

40. **Importação Empresarial Avançada** 📥
    - Integração com APIs bancárias (futuro)
    - Importação em lote
    - Processamento assíncrono
    - Histórico de importações

### Resumo Tier 3 (R$ 45,90/mês)
**Total de Módulos**: 40 (12 do Tier 1 + 28 novos empresariais)
**Foco**: Gestão empresarial completa, lucratividade, conformidade fiscal
**Diferencial**: Substitui software ERP caro, reduz custos de contador
**ROI**: Economiza R$ 160-550/mês em contador e software
**Custo efetivo**: -R$ 114 a -R$ 504/mês (o app se paga e sobra dinheiro)
**Concorrência**: MPF Empresas (R$ 247 pagamento único, mas é planilha)

---

## Comparação de Tiers

| Aspecto | Tier 1 (R$ 14,00) | Tier 2 (R$ 23,90) | Tier 3 (R$ 45,90) |
|---------|-------------------|-------------------|-------------------|
| **Nome** | Premium Individual | Família Plus | Business Enterprise |
| **Público** | Indivíduos | Famílias (até 4) | Empreendedores/MEI |
| **Usuários** | 1 | 4 | 3 (business) |
| **Módulos** | 12 | 24 | 40 |
| **Foco** | Controle pessoal | Transparência familiar | Lucratividade business |
| **Diferencial #1** | WhatsApp + IA | Educação financeira filhos | DRE automatizada |
| **Diferencial #2** | Importações automáticas | Divisão inteligente | KPIs empresariais |
| **Diferencial #3** | Controle de parcelas | Chat familiar | Relatórios fiscais |
| **Mercado potencial** | 100 milhões | 15 milhões famílias | 20 milhões MEI/micro |
| **ROI para usuário** | Economiza tempo | Evita conflitos + educação | Economiza R$ 160-550/mês |
| **Custo por pessoa** | R$ 14,00 | R$ 5,98 | R$ 15,30 (3 usuários) |

---

## Estratégia de Monetização

### Fase 1 - Meses 1-4: Lançamento Tier 1
- Foco total em Premium Individual (R$ 14,00)
- Implementar módulos essenciais (6-12)
- Meta: 500 usuários
- Receita: R$ 7.000/mês

### Fase 2 - Meses 5-12: Consolidação Tier 1
- Otimizar e escalar Tier 1
- Meta: 3.000 usuários
- Receita: R$ 42.000/mês

### Fase 3 - Meses 13-18: Lançamento Tier 2 (Família)
- Desenvolver módulos 13-24
- Oferecer upgrade para usuários casados/com filhos
- Meta: 300 famílias
- Receita adicional: R$ 7.170/mês
- **Receita total Tier 1 + 2**: R$ 49.170/mês

### Fase 4 - Meses 19-24: Lançamento Tier 3 (Business)
- Desenvolver módulos 25-40
- Oferecer upgrade para usuários com CNPJ
- Meta: 500 empresários
- Receita adicional: R$ 22.950/mês
- **Receita total Tiers 1 + 2 + 3**: R$ 72.120/mês

### Projeção Mês 24
| Tier | Usuários | Preço | MRR |
|------|----------|-------|-----|
| Tier 1 | 9.000 | R$ 14,00 | R$ 126.000 |
| Tier 2 | 500 | R$ 23,90 | R$ 11.950 |
| Tier 3 | 1.000 | R$ 45,90 | R$ 45.900 |
| **TOTAL** | **10.500** | - | **R$ 183.850** |

**Receita Anual Mês 24**: R$ 2.206.200

---

## Justificativa de Preços

### Tier 1 (R$ 14,00) - Por Quê é Competitivo?
✅ **Meu Planner**: R$ 16,50/mês (anual)
✅ **Planilhas concorrentes**: R$ 47-120 (pagamento único, sem atualizações)
✅ **Nosso diferencial**: WhatsApp + IA + Cloud + Atualizações constantes
✅ **Valor percebido**: 3-5x superior às planilhas

### Tier 2 (R$ 23,90) - Por Quê Vale a Pena?
✅ **4 licenças individuais**: 4 × R$ 14 = R$ 56/mês
✅ **Desconto**: 57% (R$ 23,90 vs R$ 56)
✅ **Custo por pessoa**: R$ 5,98/mês
✅ **Funcionalidades únicas**: Mesada, educação financeira, chat familiar
✅ **Sem concorrente direto** com tantas features familiares

### Tier 3 (R$ 45,90) - Por Quê é Barato?
✅ **Software ERP básico**: R$ 100-300/mês
✅ **Contador full**: R$ 200-500/mês
✅ **Nosso app economiza**: R$ 160-550/mês
✅ **ROI real**: 4x a 13x (para cada R$ 1 investido, economiza R$ 4-13)
✅ **Custo efetivo**: Negativo (o app se paga e sobra dinheiro)

---

## Próximos Passos

### Imediato
1. ✅ Definir módulos por tier (ESTE DOCUMENTO)
2. 🔄 Criar diagramas versionados (.drawio):
   - Diagrama de Dados com tiers
   - Diagrama de Caso de Uso com tiers
   - Diagrama de Classes com tiers

### Curto Prazo (Mês 1-4)
3. Implementar módulos 6-12 do Tier 1
4. Lançar Tier 1 para early adopters
5. Validar produto e pricing

### Médio Prazo (Mês 13-18)
6. Desenvolver módulos 13-24 do Tier 2
7. Lançar Tier 2 (Família Plus)
8. Oferecer upgrade para base Tier 1

### Longo Prazo (Mês 19-24)
9. Desenvolver módulos 25-40 do Tier 3
10. Lançar Tier 3 (Business Enterprise)
11. Atingir R$ 180k+ MRR

---

## Conclusão

Esta estratégia de 3 tiers permite:

✅ **Crescimento gradual**: Validar cada tier antes de desenvolver o próximo
✅ **Maximizar receita**: Capturar valor de diferentes segmentos
✅ **Upsell natural**: Usuários evoluem de Tier 1 → 2 → 3 conforme necessidade
✅ **Diferenciação competitiva**: Funcionalidades únicas em cada tier
✅ **ROI atrativo**: Preços justificados pelo valor entregue

**Preparado em**: 02 de Janeiro de 2026
**Autor**: Claude Code - Análise baseada em pesquisa de mercado
**Versão**: 1.0
