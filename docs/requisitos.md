# Requisitos do Sistema - Monettis App

**Documento de Requisitos Funcionais e Não-Funcionais**

**Versão**: 1.0
**Data**: Janeiro 2026
**Status**: Vigente

---

## 📋 Índice

1. [Introdução](#1-introdução)
2. [Requisitos Funcionais](#2-requisitos-funcionais)
3. [Requisitos Não-Funcionais](#3-requisitos-não-funcionais)
4. [Requisitos por Tier](#4-requisitos-por-tier)
5. [Requisitos de Integração](#5-requisitos-de-integração)
6. [Rastreabilidade](#6-rastreabilidade)

---

## 1. Introdução

### 1.1 Propósito

Este documento especifica os requisitos funcionais e não-funcionais do Monettis App, um sistema de gestão financeira multi-tier.

### 1.2 Escopo

- **Aplicativo**: Funcionalidades para usuários finais (individual, família, empresarial)
- **Backoffice**: Funcionalidades administrativas (planejado para Fase 2)

### 1.3 Definições

- **RF**: Requisito Funcional
- **RNF**: Requisito Não-Funcional
- **T1/T2/T3**: Tiers de versão (R$ 14,00 / R$ 23,90 / R$ 45,90)
- **P0/P1/P2**: Prioridade (Crítica / Alta / Média)

---

## 2. Requisitos Funcionais

### 2.1 Módulo: Autenticação (AUTH)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-AUTH-01 | O sistema DEVE permitir login via email e senha | P0 | Todos | ✅ Implementado |
| RF-AUTH-02 | O sistema DEVE permitir login social (Google, GitHub) | P0 | Todos | ✅ Implementado |
| RF-AUTH-03 | O sistema DEVE permitir recuperação de senha | P0 | Todos | ✅ Implementado |
| RF-AUTH-04 | O sistema DEVE permitir atualização de perfil | P1 | Todos | ✅ Implementado |
| RF-AUTH-05 | O sistema DEVE armazenar subscription tier no metadata do usuário | P0 | Todos | ✅ Implementado |
| RF-AUTH-06 | O sistema DEVE fazer logout de forma segura | P0 | Todos | ✅ Implementado |

### 2.2 Módulo: Dashboard (DASH)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-DASH-01 | O sistema DEVE exibir saldo total do mês | P0 | T1, T2, T3 | ✅ Implementado |
| RF-DASH-02 | O sistema DEVE exibir total de receitas do mês | P0 | T1, T2, T3 | ✅ Implementado |
| RF-DASH-03 | O sistema DEVE exibir total de despesas do mês | P0 | T1, T2, T3 | ✅ Implementado |
| RF-DASH-04 | O sistema DEVE exibir total de investimentos do mês | P0 | T1, T2, T3 | ✅ Implementado |
| RF-DASH-05 | O sistema DEVE exibir gráfico de despesas por categoria | P0 | T1, T2, T3 | ✅ Implementado |
| RF-DASH-06 | O sistema DEVE exibir últimas 10 transações | P0 | T1, T2, T3 | ✅ Implementado |
| RF-DASH-07 | O sistema DEVE permitir filtro por mês e ano | P0 | T1, T2, T3 | ✅ Implementado |
| RF-DASH-08 | O sistema DEVE exibir comparativo com mês anterior | P1 | T1, T2, T3 | 🔄 Em desenvolvimento |
| RF-DASH-09 | O sistema DEVE exibir dashboard familiar consolidado | P0 | T2, T3 | 📋 Planejado |
| RF-DASH-10 | O sistema DEVE exibir dashboard empresarial com DRE | P0 | T3 | 📋 Planejado |

### 2.3 Módulo: Gestão de Transações (TRANS)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-TRANS-01 | O sistema DEVE permitir criar transação manual | P0 | T1, T2, T3 | ✅ Implementado |
| RF-TRANS-02 | O sistema DEVE permitir editar transação existente | P0 | T1, T2, T3 | ✅ Implementado |
| RF-TRANS-03 | O sistema DEVE permitir excluir transação | P0 | T1, T2, T3 | ✅ Implementado |
| RF-TRANS-04 | O sistema DEVE permitir categorizar transação (9 categorias) | P0 | T1, T2, T3 | ✅ Implementado |
| RF-TRANS-05 | O sistema DEVE permitir definir tipo (Receita/Despesa/Investimento) | P0 | T1, T2, T3 | ✅ Implementado |
| RF-TRANS-06 | O sistema DEVE permitir definir método de pagamento (7 opções) | P0 | T1, T2, T3 | ✅ Implementado |
| RF-TRANS-07 | O sistema DEVE permitir listar todas as transações | P0 | T1, T2, T3 | ✅ Implementado |
| RF-TRANS-08 | O sistema DEVE permitir filtrar transações por período | P0 | T1, T2, T3 | ✅ Implementado |
| RF-TRANS-09 | O sistema DEVE permitir buscar transações por nome | P1 | T1, T2, T3 | 🔄 Em desenvolvimento |
| RF-TRANS-10 | O sistema DEVE validar valores monetários (positivos, 2 decimais) | P0 | T1, T2, T3 | ✅ Implementado |
| RF-TRANS-11 | O sistema DEVE associar transação a membro familiar | P0 | T2, T3 | 📋 Planejado |
| RF-TRANS-12 | O sistema DEVE associar transação a perfil empresarial | P0 | T3 | 📋 Planejado |
| RF-TRANS-13 | O sistema DEVE associar transação a centro de custos | P0 | T3 | 📋 Planejado |
| RF-TRANS-14 | O sistema DEVE associar transação a cliente/fornecedor | P0 | T3 | 📋 Planejado |

### 2.4 Módulo: Importação (IMPORT)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-IMP-01 | O sistema DEVE permitir importação de extrato bancário (OFX) | P0 | T1, T2, T3 | 📋 Planejado |
| RF-IMP-02 | O sistema DEVE permitir importação de extrato bancário (CSV) | P0 | T1, T2, T3 | 📋 Planejado |
| RF-IMP-03 | O sistema DEVE permitir importação de fatura de cartão (PDF) | P0 | T1, T2, T3 | 📋 Planejado |
| RF-IMP-04 | O sistema DEVE fazer parsing automático de dados | P0 | T1, T2, T3 | 📋 Planejado |
| RF-IMP-05 | O sistema DEVE permitir revisão antes de confirmar importação | P1 | T1, T2, T3 | 📋 Planejado |
| RF-IMP-06 | O sistema DEVE detectar transações duplicadas | P1 | T1, T2, T3 | 📋 Planejado |
| RF-IMP-07 | O sistema DEVE sugerir categorização automática | P2 | T1, T2, T3 | 📋 Planejado |

### 2.5 Módulo: Cartões de Crédito (CARD)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-CARD-01 | O sistema DEVE permitir cadastro de cartão de crédito | P0 | T1, T2, T3 | 📋 Planejado |
| RF-CARD-02 | O sistema DEVE armazenar últimos 4 dígitos do cartão | P0 | T1, T2, T3 | 📋 Planejado |
| RF-CARD-03 | O sistema DEVE armazenar bandeira (Visa, Master, etc) | P0 | T1, T2, T3 | 📋 Planejado |
| RF-CARD-04 | O sistema DEVE armazenar limite do cartão | P0 | T1, T2, T3 | 📋 Planejado |
| RF-CARD-05 | O sistema DEVE armazenar dias de fechamento e vencimento | P0 | T1, T2, T3 | 📋 Planejado |
| RF-CARD-06 | O sistema DEVE calcular fatura atual automaticamente | P1 | T1, T2, T3 | 📋 Planejado |
| RF-CARD-07 | O sistema DEVE exibir limite disponível | P1 | T1, T2, T3 | 📋 Planejado |
| RF-CARD-08 | O sistema DEVE permitir compartilhamento de cartão (família) | P1 | T2, T3 | 📋 Planejado |

### 2.6 Módulo: Contas Bancárias (BANK)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-BANK-01 | O sistema DEVE permitir cadastro de conta bancária | P0 | T1, T2, T3 | 📋 Planejado |
| RF-BANK-02 | O sistema DEVE armazenar nome do banco | P0 | T1, T2, T3 | 📋 Planejado |
| RF-BANK-03 | O sistema DEVE armazenar número da conta (parcial) | P0 | T1, T2, T3 | 📋 Planejado |
| RF-BANK-04 | O sistema DEVE armazenar saldo atual | P0 | T1, T2, T3 | 📋 Planejado |
| RF-BANK-05 | O sistema DEVE calcular saldo total de todas as contas | P1 | T1, T2, T3 | 📋 Planejado |
| RF-BANK-06 | O sistema DEVE permitir atualização manual de saldo | P1 | T1, T2, T3 | 📋 Planejado |

### 2.7 Módulo: Metas Financeiras (GOAL)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-GOAL-01 | O sistema DEVE permitir criação de meta financeira | P1 | T1, T2, T3 | 📋 Planejado |
| RF-GOAL-02 | O sistema DEVE armazenar valor alvo da meta | P1 | T1, T2, T3 | 📋 Planejado |
| RF-GOAL-03 | O sistema DEVE armazenar valor atual da meta | P1 | T1, T2, T3 | 📋 Planejado |
| RF-GOAL-04 | O sistema DEVE armazenar prazo da meta | P1 | T1, T2, T3 | 📋 Planejado |
| RF-GOAL-05 | O sistema DEVE calcular progresso da meta (%) | P1 | T1, T2, T3 | 📋 Planejado |
| RF-GOAL-06 | O sistema DEVE permitir metas compartilhadas (família) | P1 | T2, T3 | 📋 Planejado |

### 2.8 Módulo: Contas a Pagar/Receber (BILL)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-BILL-01 | O sistema DEVE permitir cadastro de conta recorrente | P1 | T1, T2, T3 | 📋 Planejado |
| RF-BILL-02 | O sistema DEVE armazenar dia de vencimento | P1 | T1, T2, T3 | 📋 Planejado |
| RF-BILL-03 | O sistema DEVE permitir ativar/desativar recorrência | P1 | T1, T2, T3 | 📋 Planejado |
| RF-BILL-04 | O sistema DEVE notificar próximo ao vencimento | P2 | T1, T2, T3 | 📋 Planejado |

### 2.9 Módulo: Relatórios com IA (AI)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-AI-01 | O sistema DEVE gerar relatório financeiro com IA | P0 | T1, T2, T3 | ✅ Implementado |
| RF-AI-02 | O sistema DEVE analisar padrões de gastos | P0 | T1, T2, T3 | ✅ Implementado |
| RF-AI-03 | O sistema DEVE fornecer sugestões personalizadas | P0 | T1, T2, T3 | ✅ Implementado |
| RF-AI-04 | O sistema DEVE formatar relatório em Markdown | P1 | T1, T2, T3 | ✅ Implementado |
| RF-AI-05 | O sistema DEVE permitir regenerar relatório | P2 | T1, T2, T3 | 📋 Planejado |

### 2.10 Módulo: Assinatura/Pagamentos (SUB)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-SUB-01 | O sistema DEVE exibir planos disponíveis | P0 | Todos | ✅ Implementado |
| RF-SUB-02 | O sistema DEVE permitir upgrade de plano | P0 | Todos | ✅ Implementado |
| RF-SUB-03 | O sistema DEVE integrar com Stripe Checkout | P0 | Todos | ✅ Implementado |
| RF-SUB-04 | O sistema DEVE processar webhooks do Stripe | P0 | Todos | ✅ Implementado |
| RF-SUB-05 | O sistema DEVE atualizar tier do usuário após pagamento | P0 | Todos | ✅ Implementado |
| RF-SUB-06 | O sistema DEVE permitir cancelamento de assinatura | P0 | Todos | ✅ Implementado |
| RF-SUB-07 | O sistema DEVE redirecionar para portal do cliente Stripe | P1 | Todos | ✅ Implementado |

### 2.11 Módulo: Notificações WhatsApp (NOTIF)

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-NOTIF-01 | O sistema DEVE enviar notificação de transação | P1 | T1, T2, T3 | 📋 Planejado |
| RF-NOTIF-02 | O sistema DEVE enviar lembrete de vencimento | P1 | T1, T2, T3 | 📋 Planejado |
| RF-NOTIF-03 | O sistema DEVE enviar alerta de meta atingida | P2 | T1, T2, T3 | 📋 Planejado |
| RF-NOTIF-04 | O sistema DEVE permitir configurar preferências | P2 | T1, T2, T3 | 📋 Planejado |

### 2.12 Módulo: Família (FAM) - TIER 2

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-FAM-01 | O sistema DEVE permitir convidar membros (até 4) | P0 | T2, T3 | 📋 Planejado |
| RF-FAM-02 | O sistema DEVE permitir aceitar/rejeitar convite | P0 | T2, T3 | 📋 Planejado |
| RF-FAM-03 | O sistema DEVE permitir definir papel (pai, filho, etc) | P0 | T2, T3 | 📋 Planejado |
| RF-FAM-04 | O sistema DEVE permitir atribuir mesada | P0 | T2, T3 | 📋 Planejado |
| RF-FAM-05 | O sistema DEVE processar pagamento de mesada automaticamente | P1 | T2, T3 | 📋 Planejado |
| RF-FAM-06 | O sistema DEVE permitir dividir despesa entre membros | P0 | T2, T3 | 📋 Planejado |
| RF-FAM-07 | O sistema DEVE calcular divisão proporcional | P1 | T2, T3 | 📋 Planejado |
| RF-FAM-08 | O sistema DEVE permitir chat familiar | P1 | T2, T3 | 📋 Planejado |
| RF-FAM-09 | O sistema DEVE permitir definir controle parental | P0 | T2, T3 | 📋 Planejado |
| RF-FAM-10 | O sistema DEVE permitir definir regras de gasto por membro | P1 | T2, T3 | 📋 Planejado |
| RF-FAM-11 | O sistema DEVE validar transações contra regras parentais | P0 | T2, T3 | 📋 Planejado |

### 2.13 Módulo: Empresarial (BIZ) - TIER 3

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-BIZ-01 | O sistema DEVE permitir criar perfil empresarial | P0 | T3 | 📋 Planejado |
| RF-BIZ-02 | O sistema DEVE armazenar CNPJ | P0 | T3 | 📋 Planejado |
| RF-BIZ-03 | O sistema DEVE armazenar razão social e nome fantasia | P0 | T3 | 📋 Planejado |
| RF-BIZ-04 | O sistema DEVE armazenar regime tributário | P0 | T3 | 📋 Planejado |
| RF-BIZ-05 | O sistema DEVE gerar DRE automatizada | P0 | T3 | 📋 Planejado |
| RF-BIZ-06 | O sistema DEVE permitir criar centros de custo | P0 | T3 | 📋 Planejado |
| RF-BIZ-07 | O sistema DEVE permitir cadastrar clientes | P0 | T3 | 📋 Planejado |
| RF-BIZ-08 | O sistema DEVE permitir cadastrar fornecedores | P0 | T3 | 📋 Planejado |
| RF-BIZ-09 | O sistema DEVE permitir emitir nota fiscal | P0 | T3 | 📋 Planejado |
| RF-BIZ-10 | O sistema DEVE calcular impostos | P0 | T3 | 📋 Planejado |
| RF-BIZ-11 | O sistema DEVE gerar relatórios fiscais | P0 | T3 | 📋 Planejado |
| RF-BIZ-12 | O sistema DEVE projetar fluxo de caixa | P1 | T3 | 📋 Planejado |
| RF-BIZ-13 | O sistema DEVE fazer conciliação bancária avançada | P1 | T3 | 📋 Planejado |
| RF-BIZ-14 | O sistema DEVE permitir gestão de contratos | P1 | T3 | 📋 Planejado |
| RF-BIZ-15 | O sistema DEVE permitir criar orçamento empresarial | P1 | T3 | 📋 Planejado |

### 2.14 Módulo: Backoffice (ADMIN) - Planejado

| ID | Descrição | Prioridade | Tier | Status |
|----|-----------|------------|------|--------|
| RF-ADMIN-01 | O sistema DEVE permitir visualizar todos os usuários | P0 | N/A | 📋 Planejado |
| RF-ADMIN-02 | O sistema DEVE permitir bloquear/desbloquear usuários | P0 | N/A | 📋 Planejado |
| RF-ADMIN-03 | O sistema DEVE exibir métricas de uso | P0 | N/A | 📋 Planejado |
| RF-ADMIN-04 | O sistema DEVE exibir receita total e por tier | P0 | N/A | 📋 Planejado |
| RF-ADMIN-05 | O sistema DEVE permitir gerenciar tickets de suporte | P1 | N/A | 📋 Planejado |
| RF-ADMIN-06 | O sistema DEVE exibir logs de auditoria | P1 | N/A | 📋 Planejado |

---

## 3. Requisitos Não-Funcionais

### 3.1 Performance (PERF)

| ID | Descrição | Métrica | Prioridade |
|----|-----------|---------|------------|
| RNF-PERF-01 | O tempo de carregamento da página inicial DEVE ser menor que 3 segundos | < 3s | P0 |
| RNF-PERF-02 | O tempo de resposta de Server Actions DEVE ser menor que 2 segundos | < 2s | P0 |
| RNF-PERF-03 | O tempo de geração de relatório IA DEVE ser menor que 10 segundos | < 10s | P1 |
| RNF-PERF-04 | O sistema DEVE suportar 100 requisições simultâneas | 100 req/s | P1 |
| RNF-PERF-05 | O sistema DEVE ter uptime de 99.5% | 99.5% | P0 |

### 3.2 Segurança (SEC)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RNF-SEC-01 | Todas as senhas DEVEM ser armazenadas com hash bcrypt | P0 |
| RNF-SEC-02 | Todas as comunicações DEVEM usar HTTPS | P0 |
| RNF-SEC-03 | Tokens JWT DEVEM expirar em 24 horas | P0 |
| RNF-SEC-04 | Webhooks DEVEM validar assinatura antes de processar | P0 |
| RNF-SEC-05 | Dados financeiros DEVEM ser isolados por userId | P0 |
| RNF-SEC-06 | O sistema DEVE implementar rate limiting (100 req/min por usuário) | P1 |
| RNF-SEC-07 | O sistema DEVE fazer sanitização de inputs (XSS prevention) | P0 |
| RNF-SEC-08 | O sistema DEVE fazer validação de dados com Zod | P0 |

### 3.3 Usabilidade (USAB)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RNF-USAB-01 | A interface DEVE ser responsiva (mobile, tablet, desktop) | P0 |
| RNF-USAB-02 | A interface DEVE seguir princípios de acessibilidade WCAG 2.1 AA | P1 |
| RNF-USAB-03 | Mensagens de erro DEVEM ser claras e acionáveis | P0 |
| RNF-USAB-04 | Formulários DEVEM validar em tempo real | P1 |
| RNF-USAB-05 | A interface DEVE suportar temas claro e escuro | P2 |

### 3.4 Escalabilidade (SCAL)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RNF-SCAL-01 | O banco de dados DEVE suportar até 100.000 usuários | P0 |
| RNF-SCAL-02 | O banco de dados DEVE suportar até 10.000.000 transações | P0 |
| RNF-SCAL-03 | O sistema DEVE escalar horizontalmente via serverless | P0 |
| RNF-SCAL-04 | Queries de banco DEVEM usar índices apropriados | P0 |

### 3.5 Manutenibilidade (MAINT)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RNF-MAINT-01 | O código DEVE ter cobertura de testes > 70% | P1 |
| RNF-MAINT-02 | O código DEVE seguir ESLint rules | P0 |
| RNF-MAINT-03 | Funções DEVEM ter no máximo 50 linhas | P1 |
| RNF-MAINT-04 | Componentes React DEVEM ter no máximo 200 linhas | P1 |
| RNF-MAINT-05 | Commits DEVEM seguir Conventional Commits | P1 |

### 3.6 Compatibilidade (COMPAT)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RNF-COMPAT-01 | O sistema DEVE funcionar em Chrome 100+ | P0 |
| RNF-COMPAT-02 | O sistema DEVE funcionar em Firefox 100+ | P0 |
| RNF-COMPAT-03 | O sistema DEVE funcionar em Safari 15+ | P0 |
| RNF-COMPAT-04 | O sistema DEVE funcionar em Edge 100+ | P1 |

### 3.7 Observabilidade (OBS)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RNF-OBS-01 | Erros DEVEM ser logados com stack trace | P0 |
| RNF-OBS-02 | Requests DEVEM ser logados com tempo de resposta | P1 |
| RNF-OBS-03 | O sistema DEVE integrar com ferramenta de monitoring | P1 |

---

## 4. Requisitos por Tier

### 4.1 TIER 1 (R$ 14,00/mês)

**Módulos Obrigatórios**:
- Autenticação (AUTH)
- Dashboard (DASH)
- Gestão de Transações (TRANS)
- Relatórios IA (AI)
- Assinatura (SUB)

**Módulos em Desenvolvimento**:
- Importação (IMPORT)
- Cartões (CARD)
- Contas Bancárias (BANK)
- Metas (GOAL)
- Contas a Pagar/Receber (BILL)
- Notificações WhatsApp (NOTIF)

### 4.2 TIER 2 (R$ 23,90/mês)

**Inclui TIER 1 +**:
- Família (FAM)
  - Múltiplos usuários (até 4)
  - Gestão de mesada
  - Divisão de despesas
  - Controle parental
  - Chat familiar

### 4.3 TIER 3 (R$ 45,90/mês)

**Inclui TIER 1 + TIER 2 +**:
- Empresarial (BIZ)
  - Perfil empresarial
  - DRE
  - Centro de custos
  - Clientes e fornecedores
  - Notas fiscais
  - Impostos
  - Fluxo de caixa
  - Conciliação bancária
  - Contratos
  - Orçamento

---

## 5. Requisitos de Integração

### 5.1 Clerk (Autenticação)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RI-CLERK-01 | Integração DEVE usar @clerk/nextjs SDK | P0 |
| RI-CLERK-02 | Metadata DEVE armazenar subscription tier | P0 |
| RI-CLERK-03 | Webhooks DEVEM sincronizar user data | P1 |

### 5.2 Stripe (Pagamentos)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RI-STRIPE-01 | Integração DEVE usar Stripe SDK 17.x | P0 |
| RI-STRIPE-02 | Webhooks DEVEM validar assinatura | P0 |
| RI-STRIPE-03 | Checkout DEVE usar Checkout Sessions | P0 |
| RI-STRIPE-04 | Portal do cliente DEVE ser configurado | P1 |

### 5.3 OpenAI (IA)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RI-OPENAI-01 | Integração DEVE usar modelo GPT-4o-mini | P0 |
| RI-OPENAI-02 | Prompts DEVEM incluir contexto financeiro | P0 |
| RI-OPENAI-03 | Respostas DEVEM ser em Markdown | P1 |

### 5.4 WhatsApp Business API

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RI-WHATS-01 | Integração DEVE usar WhatsApp Business API oficial | P0 |
| RI-WHATS-02 | Templates DEVEM ser pré-aprovados | P0 |
| RI-WHATS-03 | Opt-in DEVE ser obrigatório | P0 |

---

## 6. Rastreabilidade

### 6.1 Requisitos → Casos de Uso

- **RF-AUTH-01 a RF-AUTH-06** → UC-01 (Fazer Login), UC-02 (Gerenciar Perfil)
- **RF-DASH-01 a RF-DASH-10** → UC-03 (Visualizar Dashboard)
- **RF-TRANS-01 a RF-TRANS-14** → UC-04 (Criar Transação), UC-05 (Editar Transação), UC-06 (Excluir Transação), UC-07 (Filtrar Transações)
- **RF-AI-01 a RF-AI-05** → UC-15 (Gerar Relatório com IA)
- **RF-SUB-01 a RF-SUB-07** → UC-16 (Gerenciar Assinatura)

### 6.2 Requisitos → Diagrama de Classes

- **RF-TRANS-***: `Transaction` entity, `TransactionService`, `TransactionRepository`
- **RF-CARD-***: `CreditCard` entity, `CreditCardService`, `CreditCardRepository`
- **RF-FAM-***: `FamilyMember` entity, `FamilyService`, `FamilyMemberRepository`
- **RF-BIZ-***: `BusinessProfile` entity, `BusinessProfileService`, `DREService`

### 6.3 Requisitos → Tiers

Consulte [docs/definicao-tiers-precos.md](definicao-tiers-precos.md) para mapeamento completo.

---

**Aprovado por**: [Nome]
**Data de Aprovação**: [Data]
**Próxima Revisão**: [Data]
