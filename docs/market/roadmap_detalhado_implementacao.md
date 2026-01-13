# Roadmap Detalhado de Implementação - Aplicativo Financeiro

## Visão Geral do Roadmap

Este roadmap está estruturado em 3 fases principais, cada uma com duração estimada e objetivos claros. As funcionalidades estão priorizadas por impacto comercial e dependências técnicas.

---

# FASE 1 - PARIDADE COMPETITIVA
**Duração estimada**: 3-4 meses  
**Objetivo**: Atingir paridade com funcionalidades essenciais do mercado  
**Impacto esperado**: Tornar o produto competitivo e vendável

---

## 1.1 Toggle Tema Claro/Escuro
**Prioridade**: CRÍTICA  
**Esforço**: Baixo (1-2 semanas)  
**Impacto comercial**: Alto

### Especificações:
- ✅ Você já tem tema escuro implementado
- Adicionar tema claro como opção
- Toggle switch no menu de configurações
- Persistir preferência do usuário (localStorage/banco)
- Aplicar tema em todas as telas do aplicativo
- Garantir contraste adequado em ambos os temas

### Entregáveis:
- [ ] Componente de toggle tema
- [ ] Paleta de cores para tema claro
- [ ] Persistência de preferência
- [ ] Testes em todas as telas

---

## 1.2 Filtro por Mês e Ano
**Prioridade**: CRÍTICA  
**Esforço**: Baixo (1-2 semanas)  
**Impacto comercial**: Alto

### Especificações:
- Seletor de mês e ano no dashboard
- Filtrar todas as transações por período selecionado
- Atualizar automaticamente gráficos e resumos
- Navegação rápida: mês anterior/próximo
- Opções: mês atual, últimos 3 meses, últimos 6 meses, ano atual, personalizado
- Manter filtro ao navegar entre páginas (contexto global)

### Entregáveis:
- [ ] Componente de seletor de período
- [ ] Lógica de filtragem de transações
- [ ] Atualização de dashboard e gráficos
- [ ] Navegação entre períodos
- [ ] Persistência de filtro selecionado

---

## 1.3 Controle de Saldo (Saldo Inicial e Saldo Total)
**Prioridade**: CRÍTICA  
**Esforço**: Médio (2-3 semanas)  
**Impacto comercial**: Alto

### Especificações:

#### 1.3.1 Saldo Inicial
- Permitir usuário definir saldo inicial ao criar conta/configurar app
- Opção de editar saldo inicial posteriormente
- Considerar saldo inicial em todos os cálculos

#### 1.3.2 Saldo Total
- Cálculo: Saldo Inicial + Total de Receitas - Total de Despesas
- Exibir saldo total em destaque no dashboard
- Indicador visual: verde (positivo), vermelho (negativo)
- Histórico de evolução do saldo (gráfico de linha)

#### 1.3.3 Saldo por Conta
- Se houver múltiplas contas bancárias, mostrar saldo de cada uma
- Saldo consolidado (soma de todas as contas)

### Entregáveis:
- [ ] Tela de configuração de saldo inicial
- [ ] Cálculo automático de saldo total
- [ ] Widget de saldo no dashboard
- [ ] Gráfico de evolução do saldo
- [ ] Saldo por conta (se aplicável)

---

## 1.4 Importação de Extratos Bancários
**Prioridade**: MÁXIMA  
**Esforço**: Alto (4-6 semanas)  
**Impacto comercial**: MUITO ALTO

### Especificações:

#### 1.4.1 Formatos Suportados
- **OFX** (Open Financial Exchange) - Formato padrão bancário
- **XLS/XLSX** (Excel) - Planilhas exportadas de bancos
- **CSV** (Comma-Separated Values) - Formato universal

#### 1.4.2 Fluxo de Importação
1. Botão "Importar Extrato" no dashboard
2. Upload de arquivo (drag & drop ou seleção)
3. Parsing automático do arquivo
4. Preview das transações identificadas
5. Mapeamento de colunas (se necessário)
6. Confirmação e importação

#### 1.4.3 Processamento
- Identificar automaticamente: data, descrição, valor, tipo (débito/crédito)
- Evitar duplicatas (verificar se transação já existe)
- Sugerir categoria baseado em descrição (preparar para IA na Fase 2)
- Permitir edição antes de confirmar importação

#### 1.4.4 Tratamento de Erros
- Validação de formato de arquivo
- Mensagens claras de erro
- Opção de download de template de exemplo
- Log de transações não importadas (com motivo)

### Entregáveis:
- [ ] Parser para formato OFX
- [ ] Parser para formato XLS/XLSX
- [ ] Parser para formato CSV
- [ ] Interface de upload de arquivo
- [ ] Tela de preview e confirmação
- [ ] Lógica de detecção de duplicatas
- [ ] Sistema de mapeamento de colunas
- [ ] Tratamento de erros e validações
- [ ] Documentação de formatos suportados

---

## 1.5 Importação de Faturas de Cartão de Crédito
**Prioridade**: MÁXIMA  
**Esforço**: Alto (4-6 semanas)  
**Impacto comercial**: MUITO ALTO

### Especificações:

#### 1.5.1 Formatos Suportados
- **PDF** - Faturas em PDF de bancos/operadoras
- **OFX** - Algumas operadoras oferecem
- **XLS/XLSX** - Planilhas exportadas
- **CSV** - Formato universal

#### 1.5.2 Extração de Dados de PDF
- Usar biblioteca de OCR/parsing de PDF (ex: pdf.js, pdfplumber)
- Identificar padrões comuns de faturas brasileiras
- Extrair: data da compra, descrição, valor, parcelas (X/Y)
- Identificar compras parceladas automaticamente

#### 1.5.3 Fluxo de Importação
1. Botão "Importar Fatura" na seção de cartões
2. Upload de arquivo
3. Parsing automático
4. Preview das compras identificadas
5. Identificação automática de parcelas
6. Confirmação e importação

#### 1.5.4 Processamento de Parcelas
- Detectar padrão "X/Y" na descrição
- Criar automaticamente as parcelas futuras
- Associar ao cartão de crédito correto
- Calcular impacto nas faturas futuras

### Entregáveis:
- [ ] Parser para PDF de faturas
- [ ] Parser para OFX de cartão
- [ ] Parser para XLS/CSV de cartão
- [ ] Detecção automática de parcelas
- [ ] Interface de importação de fatura
- [ ] Tela de preview e confirmação
- [ ] Criação automática de parcelas futuras
- [ ] Associação com cartão de crédito
- [ ] Tratamento de erros e validações

---

## 1.6 Controle Avançado de Cartão de Crédito
**Prioridade**: MÁXIMA  
**Esforço**: Alto (5-7 semanas)  
**Impacto comercial**: MUITO ALTO

### Especificações:

#### 1.6.1 Cadastro de Cartões
- Nome do cartão (ex: "Nubank", "Itaú Mastercard")
- Limite total
- Dia de fechamento da fatura
- Dia de vencimento da fatura
- Bandeira (Visa, Mastercard, Elo, etc.)
- Cor/ícone para identificação visual

#### 1.6.2 Gestão de Compras
- Registrar compra: valor, descrição, data, categoria
- Opção: à vista ou parcelado
- Se parcelado: número de parcelas
- Calcular automaticamente em qual fatura cada parcela cairá
- Editar/excluir compras

#### 1.6.3 Visualização de Faturas
- **Fatura Atual**: compras do período atual (até o fechamento)
- **Fatura Fechada**: compras já fechadas (aguardando vencimento)
- **Faturas Futuras**: projeção das próximas faturas (com parcelas)
- Valor total de cada fatura
- Detalhamento por compra
- Filtro por categoria

#### 1.6.4 Controle de Limite
- Limite total do cartão
- Limite disponível (limite - fatura atual - faturas futuras)
- Indicador visual de uso do limite (barra de progresso)
- Alerta quando ultrapassar X% do limite (configurável)

#### 1.6.5 Compras Parceladas
- Lista de todas as compras parceladas ativas
- Visualização: "Parcela X de Y - Valor - Descrição"
- Quanto falta pagar (soma das parcelas restantes)
- Impacto no orçamento mensal
- Opção de simular nova compra parcelada

#### 1.6.6 Dashboard de Cartões
- Card para cada cartão cadastrado
- Resumo: fatura atual, limite disponível, próximo vencimento
- Gráfico de distribuição de gastos por categoria
- Comparação entre cartões (qual usa mais)

### Entregáveis:
- [ ] CRUD de cartões de crédito
- [ ] Cadastro de compras (à vista e parceladas)
- [ ] Cálculo automático de faturas
- [ ] Tela de visualização de fatura atual
- [ ] Tela de faturas futuras (projeção)
- [ ] Controle de limite disponível
- [ ] Lista de compras parceladas ativas
- [ ] Dashboard de cartões
- [ ] Gráficos de gastos por cartão
- [ ] Simulador de impacto de nova compra

---

## 1.7 Sistema de Lembretes e Notificações
**Prioridade**: ALTA  
**Esforço**: Médio (3-4 semanas)  
**Impacto comercial**: Alto

### Especificações:

#### 1.7.1 Tipos de Lembretes
- **Contas a pagar**: X dias antes do vencimento
- **Contas a receber**: no dia do recebimento esperado
- **Vencimento de fatura de cartão**: 1 dia antes e no dia
- **Metas financeiras**: progresso semanal/mensal
- **Orçamento**: alerta quando ultrapassar limite de categoria

#### 1.7.2 Configurações de Notificações
- Ativar/desativar notificações
- Escolher quais tipos de lembrete receber
- Definir antecedência (1, 3, 7 dias antes)
- Horário preferencial para notificações
- Canal: push notification, e-mail, ambos

#### 1.7.3 Notificações Push (Web)
- Usar Web Push API
- Solicitar permissão ao usuário
- Notificações mesmo com app fechado (se navegador permitir)
- Ação rápida: "Marcar como pago", "Ver detalhes"

#### 1.7.4 Notificações por E-mail
- Template profissional de e-mail
- Resumo diário/semanal (opcional)
- Link direto para a transação no app

#### 1.7.5 Central de Notificações
- Ícone de sino no header com contador
- Lista de notificações recentes
- Marcar como lida
- Ação rápida a partir da notificação

### Entregáveis:
- [ ] Sistema de agendamento de lembretes (cron job/scheduler)
- [ ] Configurações de notificações
- [ ] Implementação de Web Push API
- [ ] Sistema de envio de e-mails
- [ ] Templates de e-mail
- [ ] Central de notificações no app
- [ ] Lógica de disparo de lembretes
- [ ] Testes de notificações

---

## 1.8 Download de Relatório IA em PDF
**Prioridade**: ALTA  
**Esforço**: Médio (2-3 semanas)  
**Impacto comercial**: Alto

### Especificações:

#### 1.8.1 Geração de PDF
- Usar biblioteca de geração de PDF (ex: jsPDF, pdfmake, puppeteer)
- Layout profissional e bem formatado
- Incluir logo do app
- Data de geração
- Período do relatório

#### 1.8.2 Conteúdo do Relatório
- Relatório IA gerado (texto completo)
- Resumo financeiro do período
- Principais gráficos (receitas, despesas, categorias)
- Tabelas de transações (se aplicável)
- Insights e recomendações da IA

#### 1.8.3 Opções de Download
- Botão "Baixar PDF" na tela do relatório IA
- Opção de enviar por e-mail
- Nome do arquivo: "Relatorio_Financeiro_MesAno.pdf"

#### 1.8.4 Personalização (opcional)
- Escolher quais seções incluir
- Adicionar notas pessoais
- Selecionar período específico

### Entregáveis:
- [ ] Biblioteca de geração de PDF integrada
- [ ] Template de relatório em PDF
- [ ] Função de conversão relatório IA → PDF
- [ ] Botão de download na interface
- [ ] Opção de envio por e-mail
- [ ] Testes de geração em diferentes cenários

---

## 1.9 Exportação de Dados (Excel e PDF)
**Prioridade**: ALTA  
**Esforço**: Médio (2-3 semanas)  
**Impacto comercial**: Médio-Alto

### Especificações:

#### 1.9.1 Exportação para Excel
- Exportar transações em formato XLSX
- Colunas: Data, Descrição, Categoria, Valor, Tipo (Receita/Despesa), Conta
- Filtros aplicáveis: período, categoria, tipo
- Formatação: valores como moeda, datas formatadas
- Nome do arquivo: "Transacoes_MesAno.xlsx"

#### 1.9.2 Exportação para PDF
- Relatório de transações em PDF
- Tabela formatada com todas as transações
- Resumo no topo: total de receitas, despesas, saldo
- Filtros aplicados visíveis no relatório
- Nome do arquivo: "Transacoes_MesAno.pdf"

#### 1.9.3 Opções de Exportação
- Botão "Exportar" na lista de transações
- Escolher formato: Excel ou PDF
- Escolher período
- Escolher categorias específicas (ou todas)
- Escolher tipo: receitas, despesas ou ambas

#### 1.9.4 Exportação de Backup Completo
- Opção de exportar TODOS os dados do usuário
- Formato JSON para backup completo
- Incluir: transações, categorias, cartões, metas, configurações
- Permitir reimportação (restore de backup)

### Entregáveis:
- [ ] Biblioteca de geração de Excel (ex: xlsx, exceljs)
- [ ] Função de exportação para Excel
- [ ] Função de exportação para PDF
- [ ] Interface de seleção de opções de exportação
- [ ] Exportação de backup completo (JSON)
- [ ] Função de restore de backup
- [ ] Testes de exportação

---

## 1.10 Melhorias no Dashboard Existente
**Prioridade**: MÉDIA  
**Esforço**: Médio (2-3 semanas)  
**Impacto comercial**: Médio

### Especificações:

#### 1.10.1 Widgets Adicionais
- Saldo total (já especificado em 1.3)
- Resumo de cartões (faturas a vencer)
- Próximas contas a pagar (top 5)
- Progresso de metas (se houver)
- Comparação mês atual vs mês anterior

#### 1.10.2 Gráficos Melhorados
- Gráfico de evolução do saldo (linha do tempo)
- Gráfico de pizza: despesas por categoria
- Gráfico de barras: receitas vs despesas por mês
- Gráfico de área: fluxo de caixa acumulado

#### 1.10.3 Personalização
- Permitir reordenar widgets (drag & drop)
- Mostrar/ocultar widgets
- Salvar preferências de layout

### Entregáveis:
- [ ] Novos widgets de resumo
- [ ] Gráficos adicionais
- [ ] Sistema de personalização de dashboard
- [ ] Persistência de preferências de layout

---

## Resumo da Fase 1

### Funcionalidades Implementadas:
1. ✅ Toggle tema claro/escuro
2. ✅ Filtro por mês e ano
3. ✅ Controle de saldo (inicial e total)
4. ✅ Importação de extratos bancários (OFX, XLS, CSV)
5. ✅ Importação de faturas de cartão (PDF, OFX, XLS)
6. ✅ Controle avançado de cartão de crédito e parcelamentos
7. ✅ Sistema de lembretes e notificações
8. ✅ Download de relatório IA em PDF
9. ✅ Exportação de dados (Excel e PDF)
10. ✅ Melhorias no dashboard

### Métricas de Sucesso:
- Tempo de lançamento de transações reduzido em 90% (com importação)
- Taxa de retenção aumentada em 30% (com notificações)
- NPS (Net Promoter Score) acima de 50
- Usuários conseguem organizar finanças em menos de 15 minutos/semana

---

# FASE 2 - DIFERENCIAÇÃO E INOVAÇÃO
**Duração estimada**: 3-4 meses  
**Objetivo**: Criar diferenciais competitivos únicos  
**Impacto esperado**: Destaque no mercado e crescimento acelerado

---

## 2.1 Integração com WhatsApp ⭐ GRANDE DIFERENCIAL
**Prioridade**: MÁXIMA  
**Esforço**: Muito Alto (6-8 semanas)  
**Impacto comercial**: MUITO ALTO (Disruptivo)

### Especificações:

#### 2.1.1 Arquitetura Técnica
- Usar WhatsApp Business API (oficial) ou alternativa como Baileys/Venom
- Servidor Node.js para processar mensagens
- Webhook para receber mensagens do WhatsApp
- Queue system para processar mensagens (ex: Bull, RabbitMQ)
- Banco de dados para associar número de WhatsApp ao usuário

#### 2.1.2 Cadastro de Transações por Texto
- Usuário envia mensagem: "Adiciona despesa de 50 reais no mercado"
- Bot processa com NLP (Natural Language Processing)
- Extrai: tipo (despesa), valor (50), categoria (mercado)
- Confirma com usuário: "✅ Despesa de R$ 50,00 em Mercado registrada!"
- Salva no banco de dados

#### 2.1.3 Processamento de Linguagem Natural (NLP)
- Usar biblioteca de NLP (ex: Compromise, NLP.js, ou API como Dialogflow)
- Identificar intenções:
  - Adicionar despesa
  - Adicionar receita
  - Consultar saldo
  - Consultar gastos
  - Criar lembrete
  - Ver relatório
- Extrair entidades: valor, categoria, data, descrição

#### 2.1.4 Exemplos de Comandos Suportados

**Adicionar Despesas:**
- "Adiciona despesa de 50 reais no mercado"
- "Gastei 30 com uber"
- "Paguei 200 de farmácia"
- "Lança despesa de 100 em alimentação"

**Adicionar Receitas:**
- "Recebi salário de 5000"
- "Adiciona receita de freelance 800"
- "Lança receita de venda 1500"

**Consultas:**
- "Quanto gastei com delivery?"
- "Qual meu saldo atual?"
- "Quanto gastei este mês?"
- "Recebi quanto este mês?"
- "Mostra minhas metas"

**Lembretes:**
- "Cria lembrete para pagar conta de luz"
- "Lembra de pagar aluguel dia 10"

#### 2.1.5 Cadastro por Áudio
- Receber mensagem de áudio do WhatsApp
- Converter áudio para texto (Speech-to-Text)
- Usar API como Google Speech-to-Text, Azure Speech, ou OpenAI Whisper
- Processar texto extraído como mensagem normal
- Confirmar transação com usuário

#### 2.1.6 Lembretes Automáticos no WhatsApp
- **Resumo Diário Matinal** (8h):
  - "☀️ Bom dia! Hoje você tem 2 contas a pagar: Conta de luz (R$ 150) e Internet (R$ 100)"
  
- **Lembretes de Vencimento**:
  - 1 dia antes: "⚠️ Amanhã vence sua conta de luz (R$ 150)"
  - No dia: "🔔 Hoje vence sua conta de luz (R$ 150)"
  
- **Alertas de Orçamento**:
  - "⚠️ Você já gastou 80% do orçamento de Alimentação este mês"
  
- **Resumo Semanal** (domingo):
  - "📊 Resumo da semana: Você gastou R$ 500 e recebeu R$ 2000. Saldo: +R$ 1500"

#### 2.1.7 Relatórios pelo WhatsApp
- Usuário solicita: "Me manda o relatório do mês"
- Bot gera relatório resumido em texto
- Opção de enviar PDF completo
- Gráficos como imagens (opcional)

#### 2.1.8 Configurações e Onboarding
- Primeiro acesso: vincular número de WhatsApp à conta
- QR Code para autenticação
- Configurar preferências de notificações
- Tutorial interativo via WhatsApp
- Opção de desativar bot temporariamente

#### 2.1.9 Segurança
- Autenticação de número de WhatsApp
- Apenas número vinculado pode acessar dados
- Opção de senha/PIN adicional para comandos sensíveis
- Criptografia de mensagens (nativa do WhatsApp)
- Logs de acesso

### Entregáveis:
- [ ] Servidor de integração com WhatsApp
- [ ] Sistema de processamento de linguagem natural
- [ ] Comandos de adicionar despesa/receita
- [ ] Comandos de consulta (saldo, gastos, etc.)
- [ ] Sistema de lembretes automáticos
- [ ] Conversão de áudio para texto
- [ ] Geração de relatórios via WhatsApp
- [ ] Fluxo de vinculação de número
- [ ] Configurações de notificações
- [ ] Sistema de segurança e autenticação
- [ ] Documentação de comandos
- [ ] Tutorial interativo
- [ ] Testes de integração

---

## 2.2 Categorização Inteligente com IA
**Prioridade**: ALTA  
**Esforço**: Médio-Alto (3-4 semanas)  
**Impacto comercial**: Alto

### Especificações:

#### 2.2.1 Treinamento do Modelo
- Coletar dataset de transações categorizadas
- Treinar modelo de machine learning (ex: Naive Bayes, Random Forest, ou usar API de LLM)
- Usar descrição da transação como input
- Output: categoria sugerida + confiança (%)

#### 2.2.2 Categorização Automática
- Ao importar extrato ou adicionar transação manualmente
- Sugerir categoria automaticamente
- Mostrar nível de confiança (ex: 95% confiança)
- Permitir usuário aceitar ou corrigir
- Aprender com correções do usuário (feedback loop)

#### 2.2.3 Categorias Inteligentes
- Identificar padrões:
  - "UBER" → Transporte
  - "IFOOD" → Alimentação
  - "NETFLIX" → Entretenimento
  - "FARMACIA" → Saúde
  - "POSTO" → Transporte
  - "MERCADO" → Mercado

#### 2.2.4 Aprendizado Contínuo
- Salvar correções do usuário
- Retreinar modelo periodicamente
- Melhorar precisão ao longo do tempo
- Personalização por usuário (suas categorias específicas)

#### 2.2.5 Integração com Relatório IA
- Usar mesma IA que gera relatórios
- Contexto: histórico de transações do usuário
- Sugestões mais precisas baseadas em padrão individual

### Entregáveis:
- [ ] Modelo de categorização treinado
- [ ] API de categorização
- [ ] Integração com importação de extratos
- [ ] Interface de sugestão de categoria
- [ ] Sistema de feedback e aprendizado
- [ ] Retreinamento periódico do modelo
- [ ] Testes de precisão

---

## 2.3 Projeção de Saldo Futuro
**Prioridade**: ALTA  
**Esforço**: Médio (3-4 semanas)  
**Impacto comercial**: Alto

### Especificações:

#### 2.3.1 Cálculo de Projeção
- Identificar receitas recorrentes (salário, freelance fixo, etc.)
- Identificar despesas recorrentes (aluguel, contas, assinaturas, etc.)
- Identificar parcelas de cartão futuras
- Calcular saldo projetado para próximos 3, 6, 12 meses

#### 2.3.2 Visualização
- Gráfico de linha: evolução do saldo projetado
- Linha atual (saldo real) vs linha projetada
- Marcar eventos importantes (recebimentos, pagamentos grandes)
- Cenário otimista, realista, pessimista (opcional)

#### 2.3.3 Alertas Proativos
- "⚠️ Seu saldo ficará negativo em março se continuar neste ritmo"
- "✅ Se manter este padrão, terá R$ 5000 economizados em 6 meses"
- Sugestões de ajustes

#### 2.3.4 Simulações
- "E se eu economizar R$ 500/mês?"
- "E se eu cancelar esta assinatura?"
- "E se eu receber um extra de R$ 1000?"
- Mostrar impacto no saldo futuro

### Entregáveis:
- [ ] Algoritmo de projeção de saldo
- [ ] Identificação de receitas/despesas recorrentes
- [ ] Gráfico de projeção futura
- [ ] Sistema de alertas proativos
- [ ] Simulador de cenários
- [ ] Testes de precisão de projeção

---

## 2.4 Comparação Orçado x Realizado
**Prioridade**: ALTA  
**Esforço**: Médio (2-3 semanas)  
**Impacto comercial**: Alto

### Especificações:

#### 2.4.1 Planejamento Orçamentário
- Permitir usuário definir orçamento mensal por categoria
- Ex: Alimentação: R$ 800, Transporte: R$ 300, Lazer: R$ 200
- Salvar como template mensal (repetir todos os meses)
- Opção de ajustar mês a mês

#### 2.4.2 Acompanhamento em Tempo Real
- Mostrar quanto já foi gasto vs orçamento planejado
- Barra de progresso por categoria
- Cores: verde (dentro), amarelo (80%+), vermelho (ultrapassou)
- Valor restante disponível

#### 2.4.3 Visualização Gráfica
- Gráfico de barras: orçado vs realizado por categoria
- Gráfico de pizza: distribuição do orçamento
- Comparação mês a mês

#### 2.4.4 Alertas de Orçamento
- Notificação quando atingir 80% do orçamento de uma categoria
- Notificação quando ultrapassar orçamento
- Sugestão de ajuste: "Você ultrapassou R$ 100 em Alimentação. Considere reduzir gastos em Lazer."

#### 2.4.5 Relatório de Orçamento
- Resumo mensal: categorias que ficaram dentro/fora do orçamento
- Análise de tendências: categorias que sempre estouram
- Sugestões de ajuste de orçamento

### Entregáveis:
- [ ] Interface de planejamento orçamentário
- [ ] Cálculo de orçado vs realizado
- [ ] Barras de progresso por categoria
- [ ] Gráficos de comparação
- [ ] Sistema de alertas de orçamento
- [ ] Relatório mensal de orçamento
- [ ] Templates de orçamento

---

## 2.5 Gestão de Metas e Sonhos
**Prioridade**: MÉDIA  
**Esforço**: Médio (3-4 semanas)  
**Impacto comercial**: Médio-Alto

### Especificações:

#### 2.5.1 Criação de Metas
- Nome da meta (ex: "Viagem para Europa", "Carro novo", "Reserva de emergência")
- Valor total necessário
- Prazo (data alvo)
- Prioridade (alta, média, baixa)
- Imagem/ícone representativo

#### 2.5.2 Planejamento Automático
- Calcular quanto economizar por mês para atingir meta
- Ex: Meta de R$ 10.000 em 10 meses = R$ 1.000/mês
- Ajustar baseado em saldo disponível
- Sugerir cortes em categorias para viabilizar

#### 2.5.3 Acompanhamento de Progresso
- Barra de progresso: quanto já foi economizado
- Percentual atingido
- Quanto falta
- Previsão de conclusão (baseado em ritmo atual)

#### 2.5.4 Destinação de Saldo
- Ao final do mês, se sobrar dinheiro, sugerir destinar para metas
- "Você tem R$ 500 de sobra. Deseja destinar para alguma meta?"
- Dividir entre múltiplas metas
- Histórico de aportes

#### 2.5.5 Visualização de Metas
- Dashboard de metas
- Card para cada meta com progresso
- Gráfico de evolução ao longo do tempo
- Metas concluídas (histórico de conquistas)

#### 2.5.6 Gamificação (opcional)
- Badges/conquistas ao atingir metas
- Streak de meses consecutivos economizando
- Compartilhar conquistas (redes sociais)

### Entregáveis:
- [ ] CRUD de metas
- [ ] Cálculo automático de valor mensal
- [ ] Acompanhamento de progresso
- [ ] Sistema de destinação de saldo
- [ ] Dashboard de metas
- [ ] Gráficos de evolução
- [ ] Histórico de metas concluídas
- [ ] Sistema de gamificação (opcional)

---

## 2.6 Melhorias no Relatório IA
**Prioridade**: MÉDIA  
**Esforço**: Médio (2-3 semanas)  
**Impacto comercial**: Médio

### Especificações:

#### 2.6.1 Relatórios Mais Detalhados
- Análise de tendências (gastos aumentando/diminuindo)
- Comparação com meses anteriores
- Identificação de gastos atípicos
- Previsões para próximo mês

#### 2.6.2 Insights Acionáveis
- Não apenas análise, mas sugestões concretas
- "Você gastou 30% a mais em Alimentação. Considere cozinhar mais em casa."
- "Seu gasto com assinaturas está alto. Revise quais são essenciais."

#### 2.6.3 Personalização
- Tom do relatório: formal, casual, motivacional
- Frequência: semanal, mensal, trimestral
- Focos: economia, investimentos, controle de dívidas

#### 2.6.4 Relatórios Temáticos
- Relatório de Cartão de Crédito
- Relatório de Investimentos
- Relatório de Dívidas
- Relatório de Metas

### Entregáveis:
- [ ] Análise de tendências
- [ ] Insights acionáveis
- [ ] Opções de personalização
- [ ] Relatórios temáticos
- [ ] Melhorias no modelo de IA

---

## 2.7 Controle de Contas a Pagar e Receber
**Prioridade**: MÉDIA  
**Esforço**: Médio (2-3 semanas)  
**Impacto comercial**: Médio

### Especificações:

#### 2.7.1 Contas a Pagar
- Cadastro de contas: descrição, valor, vencimento, categoria
- Status: pendente, paga, atrasada
- Recorrência: única, mensal, anual
- Anexar comprovante (opcional)
- Marcar como paga (registra transação automaticamente)

#### 2.7.2 Contas a Receber
- Cadastro de recebimentos esperados
- Cliente/fonte (opcional)
- Data esperada
- Status: pendente, recebida, atrasada
- Marcar como recebida (registra transação)

#### 2.7.3 Calendário Financeiro
- Visualização em calendário
- Marcar contas a pagar (vermelho) e receber (verde)
- Visão mensal e semanal
- Alertas de vencimentos próximos

#### 2.7.4 Fluxo de Caixa
- Projeção de entradas e saídas
- Saldo projetado dia a dia
- Identificar dias críticos (saldo baixo)

### Entregáveis:
- [ ] CRUD de contas a pagar
- [ ] CRUD de contas a receber
- [ ] Calendário financeiro
- [ ] Fluxo de caixa projetado
- [ ] Sistema de status e alertas
- [ ] Integração com transações

---

## Resumo da Fase 2

### Funcionalidades Implementadas:
1. ✅ Integração com WhatsApp (DIFERENCIAL ÚNICO)
2. ✅ Categorização inteligente com IA
3. ✅ Projeção de saldo futuro
4. ✅ Comparação orçado x realizado
5. ✅ Gestão de metas e sonhos
6. ✅ Melhorias no relatório IA
7. ✅ Controle de contas a pagar e receber

### Métricas de Sucesso:
- 50%+ dos usuários ativos usam WhatsApp para cadastrar transações
- Precisão de categorização IA acima de 85%
- Usuários atingem metas 40% mais rápido
- NPS acima de 60
- Taxa de churn reduzida em 25%

---

# FASE 3 - EXPANSÃO E ESCALA
**Duração estimada**: 6+ meses  
**Objetivo**: Expandir público e funcionalidades avançadas  
**Impacto esperado**: Crescimento sustentável e liderança de mercado

---

## 3.1 Perfis Múltiplos (Pessoal e Empresarial)
**Prioridade**: MÉDIA  
**Esforço**: Alto (4-5 semanas)  
**Impacto comercial**: Médio-Alto

### Especificações:

#### 3.1.1 Tipos de Perfis
- **Perfil Pessoal**: criado automaticamente ao cadastrar
- **Perfil Empresarial**: opcional, para empreendedores/profissionais liberais
- Limite: 2 perfis por conta (pessoal + empresarial)

#### 3.1.2 Separação de Dados
- Cada perfil tem seus próprios:
  - Transações
  - Categorias
  - Cartões
  - Contas bancárias
  - Metas
  - Relatórios
- Dados completamente independentes

#### 3.1.3 Troca de Perfil
- Seletor de perfil no header/menu
- Troca rápida com um clique
- Indicador visual de qual perfil está ativo
- Lembrar último perfil usado

#### 3.1.4 Funcionalidades Empresariais
- DRE (Demonstração do Resultado do Exercício)
- Controle por centro de custos
- Cadastro de clientes e fornecedores
- Notas fiscais (anexar PDFs)
- Relatórios fiscais/contábeis

#### 3.1.5 Dashboard Empresarial
- Faturamento mensal
- Despesas operacionais
- Lucro líquido
- Margem de lucro
- Fluxo de caixa empresarial

### Entregáveis:
- [ ] Sistema de perfis múltiplos
- [ ] Separação de dados por perfil
- [ ] Seletor de perfil
- [ ] Funcionalidades empresariais (DRE, centros de custo)
- [ ] Dashboard empresarial
- [ ] Cadastro de clientes/fornecedores
- [ ] Relatórios empresariais

---

## 3.2 Compartilhamento Familiar/Cônjuge
**Prioridade**: MÉDIA  
**Esforço**: Alto (4-5 semanas)  
**Impacto comercial**: Médio-Alto

### Especificações:

#### 3.2.1 Convite para Compartilhamento
- Usuário envia convite por e-mail ou link
- Convidado aceita e vincula sua conta
- Ambos acessam mesmo perfil financeiro

#### 3.2.2 Permissões
- **Administrador**: controle total, pode remover membros
- **Membro**: pode adicionar transações, ver relatórios
- **Visualizador**: apenas visualiza, não edita

#### 3.2.3 Separação por Pessoa
- Ao adicionar transação, marcar quem gastou
- Filtro: "Meus gastos", "Gastos do cônjuge", "Gastos compartilhados"
- Relatório individual: quanto cada um gastou

#### 3.2.4 Transparência
- Ambos veem todas as transações em tempo real
- Notificações de novas transações (opcional)
- Chat interno para discussões financeiras (opcional)

#### 3.2.5 Metas Compartilhadas
- Criar metas conjuntas (ex: "Casa própria")
- Ambos contribuem
- Acompanhamento conjunto

### Entregáveis:
- [ ] Sistema de convites
- [ ] Gestão de permissões
- [ ] Marcação de transações por pessoa
- [ ] Filtros e relatórios individuais
- [ ] Sincronização em tempo real
- [ ] Notificações de atividades
- [ ] Metas compartilhadas

---

## 3.3 App Mobile Nativo (iOS e Android)
**Prioridade**: MÉDIA  
**Esforço**: Muito Alto (4-6 meses)  
**Impacto comercial**: Alto

### Especificações:

#### 3.3.1 Tecnologia
- React Native ou Flutter (cross-platform)
- Compartilhar lógica de negócio com web
- Design consistente entre plataformas

#### 3.3.2 Funcionalidades Mobile-First
- Cadastro rápido de transação (widget/shortcut)
- Notificações push nativas
- Modo offline (sincroniza quando conectar)
- Câmera: escanear notas fiscais/recibos (OCR)
- Biometria: login com digital/face ID

#### 3.3.3 Widgets
- Widget de saldo na home screen
- Widget de próximas contas a pagar
- Ação rápida: adicionar despesa

#### 3.3.4 Integração com Sistema
- Apple Pay / Google Pay (registrar transações automaticamente)
- Notificações de transações bancárias (via SMS/push)

### Entregáveis:
- [ ] App iOS (React Native/Flutter)
- [ ] App Android (React Native/Flutter)
- [ ] Sincronização com backend
- [ ] Modo offline
- [ ] Notificações push nativas
- [ ] Widgets de home screen
- [ ] Biometria
- [ ] OCR de notas fiscais
- [ ] Publicação nas lojas (App Store, Play Store)

---

## 3.4 Controle de Investimentos
**Prioridade**: BAIXA  
**Esforço**: Alto (4-5 semanas)  
**Impacto comercial**: Médio

### Especificações:

#### 3.4.1 Cadastro de Investimentos
- Tipo: Tesouro Direto, CDB, LCI, LCA, Ações, Fundos, Criptomoedas
- Valor investido
- Data de aplicação
- Rentabilidade (% ao ano ou valor fixo)
- Vencimento (se aplicável)
- Liquidez: diária, no vencimento

#### 3.4.2 Acompanhamento
- Valor atual (atualizado)
- Rentabilidade acumulada (R$ e %)
- Comparação com CDI/IPCA
- Gráfico de evolução

#### 3.4.3 Carteira de Investimentos
- Distribuição por tipo (gráfico de pizza)
- Renda fixa vs renda variável
- Diversificação
- Recomendações de rebalanceamento

#### 3.4.4 Integração com APIs
- Cotações de ações (B3)
- Cotações de criptomoedas
- Taxas de Tesouro Direto
- Atualização automática de valores

#### 3.4.5 Cálculo de Independência Financeira
- Baseado em gastos mensais
- Regra dos 4%
- Quanto falta para independência

### Entregáveis:
- [ ] CRUD de investimentos
- [ ] Cálculo de rentabilidade
- [ ] Integração com APIs de cotações
- [ ] Dashboard de investimentos
- [ ] Gráficos de distribuição
- [ ] Cálculo de independência financeira
- [ ] Recomendações de rebalanceamento

---

## 3.5 Internacionalização (i18n)
**Prioridade**: BAIXA  
**Esforço**: Médio (3-4 semanas)  
**Impacto comercial**: Baixo (curto prazo)

### Especificações:

#### 3.5.1 Idiomas Suportados
- Português (BR) - padrão
- Inglês (EN)
- Espanhol (ES) - mercado latino-americano

#### 3.5.2 Implementação
- Biblioteca de i18n (ex: i18next, react-intl)
- Arquivos de tradução (JSON)
- Detecção automática de idioma do navegador
- Seletor de idioma nas configurações

#### 3.5.3 Localização
- Formato de moeda (R$, $, €)
- Formato de data (DD/MM/YYYY, MM/DD/YYYY)
- Separador de decimal (, ou .)
- Fuso horário

#### 3.5.4 Conteúdo Traduzido
- Interface completa
- E-mails
- Notificações
- Relatórios IA (gerar em idioma do usuário)

### Entregáveis:
- [ ] Sistema de i18n implementado
- [ ] Traduções para EN e ES
- [ ] Seletor de idioma
- [ ] Localização de moeda e data
- [ ] Relatórios IA multilíngue
- [ ] Testes em todos os idiomas

---

## 3.6 Funcionalidades Auxiliares
**Prioridade**: BAIXA  
**Esforço**: Variável  
**Impacto comercial**: Baixo

### 3.6.1 Lista de Supermercado
- Criar lista de compras
- Marcar itens comprados
- Estimar valor total
- Comparar com orçamento de mercado

### 3.6.2 Controle de Veículos
- Cadastrar veículos
- Registrar manutenções
- Controlar gastos com combustível
- Alertas de revisão

### 3.6.3 Simuladores Financeiros
- Simulador de financiamento (SAC e Price)
- Simulador de investimentos
- Calculadora de juros compostos
- Cálculo do custo da hora trabalhada

### 3.6.4 Educação Financeira
- Blog integrado
- Dicas semanais
- Vídeos educativos
- Cursos (parceria ou próprio)

### Entregáveis:
- [ ] Lista de supermercado
- [ ] Controle de veículos
- [ ] Simuladores financeiros
- [ ] Seção de educação financeira

---

## 3.7 Integrações Avançadas
**Prioridade**: BAIXA  
**Esforço**: Alto (variável)  
**Impacto comercial**: Médio

### 3.7.1 Open Banking
- Conectar diretamente com bancos
- Importação automática de transações
- Saldo em tempo real
- Requer parceria com agregadores (Pluggy, Belvo)

### 3.7.2 Integração com Contadores
- Exportar dados para contador
- Relatórios fiscais
- Livro caixa digital

### 3.7.3 API Pública
- Permitir integrações de terceiros
- Webhooks para eventos
- Documentação completa

### Entregáveis:
- [ ] Integração com Open Banking
- [ ] Exportação para contadores
- [ ] API pública documentada

---

## Resumo da Fase 3

### Funcionalidades Implementadas:
1. ✅ Perfis múltiplos (pessoal e empresarial)
2. ✅ Compartilhamento familiar/cônjuge
3. ✅ App mobile nativo (iOS e Android)
4. ✅ Controle de investimentos
5. ✅ Internacionalização (PT, EN, ES)
6. ✅ Funcionalidades auxiliares (lista de compras, veículos, simuladores)
7. ✅ Integrações avançadas (Open Banking, API pública)

### Métricas de Sucesso:
- 100.000+ usuários ativos
- Presença em 3+ países
- 30%+ dos usuários usam app mobile
- 20%+ dos usuários têm perfil empresarial
- Parcerias com bancos/fintechs estabelecidas

---

# CRONOGRAMA CONSOLIDADO

## Ano 1

### Q1 (Meses 1-3): Fase 1 - Parte 1
- Toggle tema claro/escuro
- Filtro por mês e ano
- Controle de saldo
- Importação de extratos
- Importação de faturas

### Q2 (Meses 4-6): Fase 1 - Parte 2
- Controle avançado de cartão
- Sistema de lembretes
- Download de relatório PDF
- Exportação de dados
- Melhorias no dashboard

### Q3 (Meses 7-9): Fase 2 - Parte 1
- Integração com WhatsApp (PRIORIDADE)
- Categorização IA
- Projeção de saldo futuro

### Q4 (Meses 10-12): Fase 2 - Parte 2
- Comparação orçado x realizado
- Gestão de metas
- Melhorias no relatório IA
- Contas a pagar/receber

## Ano 2

### Q1-Q2 (Meses 13-18): Fase 3 - Parte 1
- Perfis múltiplos
- Compartilhamento familiar
- App mobile nativo (desenvolvimento)

### Q3-Q4 (Meses 19-24): Fase 3 - Parte 2
- Controle de investimentos
- Internacionalização
- Funcionalidades auxiliares
- Integrações avançadas

---

# PRIORIZAÇÃO POR IMPACTO COMERCIAL

## 🔴 IMPACTO MUITO ALTO (Fazer PRIMEIRO)
1. Importação de extratos e faturas
2. Controle avançado de cartão de crédito
3. Integração com WhatsApp
4. Sistema de lembretes e notificações

## 🟡 IMPACTO ALTO
5. Categorização IA
6. Projeção de saldo futuro
7. Comparação orçado x realizado
8. Controle de saldo
9. Filtro por mês e ano
10. Download de relatório PDF
11. Exportação de dados

## 🟢 IMPACTO MÉDIO
12. Gestão de metas
13. Perfis múltiplos
14. Compartilhamento familiar
15. App mobile nativo
16. Controle de investimentos
17. Contas a pagar/receber

## 🔵 IMPACTO BAIXO (Fazer DEPOIS)
18. Internacionalização
19. Funcionalidades auxiliares
20. Integrações avançadas

---

# CONSIDERAÇÕES FINAIS

## Recursos Necessários

### Equipe Mínima Recomendada:
- 2 desenvolvedores full-stack
- 1 designer UI/UX
- 1 especialista em IA/ML (part-time ou consultoria)
- 1 product manager (pode ser você)

### Tecnologias Recomendadas:
- **Frontend**: React, Next.js, TailwindCSS
- **Backend**: Node.js, Express, PostgreSQL
- **IA**: OpenAI API, TensorFlow.js, ou Hugging Face
- **WhatsApp**: Baileys, Venom-bot, ou WhatsApp Business API
- **Mobile**: React Native ou Flutter
- **Infraestrutura**: AWS, Google Cloud, ou Vercel

### Investimento Estimado:
- **Fase 1**: R$ 80.000 - 120.000 (3-4 meses)
- **Fase 2**: R$ 100.000 - 150.000 (3-4 meses)
- **Fase 3**: R$ 200.000 - 300.000 (6-12 meses)
- **Total**: R$ 380.000 - 570.000 (12-20 meses)

## Estratégia de Lançamento

### MVP (Minimum Viable Product):
- Lançar após Fase 1 completa
- Cobrar preço inicial mais baixo (early adopters)
- Coletar feedback intensivamente
- Iterar rapidamente

### Fase 2:
- Lançar integração WhatsApp como grande atualização
- Campanha de marketing focada neste diferencial
- Aumentar preço gradualmente

### Fase 3:
- Consolidar posição de mercado
- Expandir para novos públicos (empresarial, internacional)
- Buscar investimento para escalar

## Métricas de Acompanhamento

### KPIs Principais:
- **Aquisição**: Novos usuários/mês
- **Ativação**: % de usuários que completam onboarding
- **Retenção**: % de usuários ativos após 30/60/90 dias
- **Receita**: MRR (Monthly Recurring Revenue)
- **Satisfação**: NPS, avaliações na loja

### Metas por Fase:
- **Fase 1**: 1.000 usuários, NPS 50+, retenção 60%
- **Fase 2**: 10.000 usuários, NPS 60+, retenção 70%
- **Fase 3**: 100.000 usuários, NPS 70+, retenção 80%

---

**Preparado em**: 26 de dezembro de 2025  
**Versão**: 1.0  
**Status**: Roadmap completo e detalhado pronto para execução
