# Arquitetura de Microsserviços \- Aplicativo de Controle Financeiro

## Sumário Executivo

Este documento descreve a arquitetura de microsserviços para o aplicativo de controle financeiro, projetada para garantir **escalabilidade horizontal**, **separação de responsabilidades**, **resiliência** e **manutenibilidade**.

**Características principais**:

- 8 microsserviços independentes  
- Comunicação assíncrona via message broker  
- API Gateway como ponto único de entrada  
- Event-driven architecture  
- Service mesh para observabilidade  
- Infraestrutura como código (IaC)

---

## 1\. Visão Geral da Arquitetura

### 1.1 Diagrama de Alto Nível

┌─────────────────────────────────────────────────────────────────────┐

│                            FRONTEND                                  │

│              React \+ Next.js \+ TypeScript                           │

│                    (Vercel / CloudFront)                            │

└────────────────────────────┬────────────────────────────────────────┘

                             │ HTTPS

                             │

┌────────────────────────────▼────────────────────────────────────────┐

│                        API GATEWAY                                   │

│                    (Kong / AWS API Gateway)                         │

│  • Rate Limiting  • Authentication  • Routing  • Load Balancing    │

└─────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬────────────┘

      │      │      │      │      │      │      │      │

      │      │      │      │      │      │      │      │

┌─────▼──┐ ┌─▼────┐ ┌▼────┐ ┌▼───┐ ┌▼───┐ ┌▼───┐ ┌▼───┐ ┌▼──────────┐

│ Auth   │ │Trans │ │Card │ │AI  │ │Noti│ │Impo│ │Repo│ │ WhatsApp  │

│Service │ │Svc   │ │Svc  │ │Svc │ │Svc │ │rt  │ │rt  │ │  Service  │

│        │ │      │ │     │ │    │ │    │ │Svc │ │Svc │ │           │

└───┬────┘ └──┬───┘ └─┬───┘ └─┬──┘ └─┬──┘ └─┬──┘ └─┬──┘ └─────┬─────┘

    │         │       │       │      │      │      │          │

    │         │       │       │      │      │      │          │

    └─────────┴───────┴───────┴──────┴──────┴──────┴──────────┘

                             │

                    ┌────────▼─────────┐

                    │  MESSAGE BROKER  │

                    │  (RabbitMQ/Kafka)│

                    └────────┬─────────┘

                             │

              ┌──────────────┼──────────────┐

              │              │              │

         ┌────▼────┐   ┌─────▼─────┐  ┌────▼────┐

         │PostgreSQL│   │   Redis   │  │   S3    │

         │ (Primary)│   │  (Cache)  │  │(Storage)│

         └──────────┘   └───────────┘  └─────────┘

              │

         ┌────▼────┐

         │PostgreSQL│

         │(Replicas)│

         └──────────┘

---

## 2\. Microsserviços

### 2.1 Auth Service (Serviço de Autenticação)

**Responsabilidades**:

- Cadastro de usuários  
- Login e logout  
- Gerenciamento de sessões  
- Recuperação de senha  
- Validação de tokens JWT  
- Gerenciamento de permissões

**Stack**:

- Node.js \+ Express \+ TypeScript  
- PostgreSQL (tabela: users, sessions)  
- Redis (cache de tokens, blacklist)  
- JWT para tokens  
- Bcrypt para hash de senhas

**Endpoints**:

POST   /auth/register          \# Cadastrar usuário

POST   /auth/login             \# Login

POST   /auth/logout            \# Logout

POST   /auth/refresh           \# Renovar token

POST   /auth/forgot-password   \# Solicitar recuperação

POST   /auth/reset-password    \# Redefinir senha

GET    /auth/verify-token      \# Validar token (interno)

GET    /auth/me                \# Dados do usuário logado

PUT    /auth/profile           \# Atualizar perfil

DELETE /auth/account           \# Excluir conta

**Banco de Dados**:

\-- auth\_db

CREATE TABLE users (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  name VARCHAR(100) NOT NULL,

  email VARCHAR(255) UNIQUE NOT NULL,

  password\_hash VARCHAR(255) NOT NULL,

  avatar\_url VARCHAR(500),

  whatsapp\_number VARCHAR(20),

  email\_verified BOOLEAN DEFAULT FALSE,

  created\_at TIMESTAMP DEFAULT NOW(),

  updated\_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE sessions (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID REFERENCES users(id) ON DELETE CASCADE,

  token\_hash VARCHAR(255) NOT NULL,

  expires\_at TIMESTAMP NOT NULL,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE INDEX idx\_users\_email ON users(email);

CREATE INDEX idx\_sessions\_user\_id ON sessions(user\_id);

CREATE INDEX idx\_sessions\_expires\_at ON sessions(expires\_at);

**Eventos Publicados**:

- `user.registered` → Quando novo usuário se cadastra  
- `user.logged_in` → Quando usuário faz login  
- `user.password_reset` → Quando senha é redefinida  
- `user.deleted` → Quando conta é excluída

**Escalabilidade**:

- Stateless (pode escalar horizontalmente)  
- Cache de tokens no Redis  
- Rate limiting por IP

---

### 2.2 Transaction Service (Serviço de Transações)

**Responsabilidades**:

- CRUD de transações  
- CRUD de categorias  
- CRUD de contas bancárias  
- Cálculo de saldo  
- Transações recorrentes  
- Transferências entre contas

**Stack**:

- Node.js \+ Express \+ TypeScript  
- PostgreSQL (tabelas: transactions, categories, accounts)  
- Redis (cache de saldos)

**Endpoints**:

\# Transações

POST   /transactions           \# Criar transação

GET    /transactions           \# Listar transações (com filtros)

GET    /transactions/:id       \# Detalhes de transação

PUT    /transactions/:id       \# Editar transação

DELETE /transactions/:id       \# Excluir transação

\# Categorias

GET    /categories             \# Listar categorias

POST   /categories             \# Criar categoria

PUT    /categories/:id         \# Editar categoria

DELETE /categories/:id         \# Excluir categoria

\# Contas

GET    /accounts               \# Listar contas

POST   /accounts               \# Criar conta

PUT    /accounts/:id           \# Editar conta

DELETE /accounts/:id           \# Excluir conta

GET    /accounts/:id/balance   \# Saldo da conta

\# Transferências

POST   /transfers              \# Transferir entre contas

\# Estatísticas

GET    /stats/summary          \# Resumo (receitas, despesas, saldo)

GET    /stats/by-category      \# Gastos por categoria

GET    /stats/by-month         \# Evolução mensal

**Banco de Dados**:

\-- transaction\_db

CREATE TABLE accounts (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  name VARCHAR(100) NOT NULL,

  type VARCHAR(50) NOT NULL,

  initial\_balance DECIMAL(12,2) DEFAULT 0,

  color VARCHAR(7),

  icon VARCHAR(50),

  is\_default BOOLEAN DEFAULT FALSE,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE categories (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  name VARCHAR(100) NOT NULL,

  type VARCHAR(20) NOT NULL,

  color VARCHAR(7),

  icon VARCHAR(50),

  budget\_limit DECIMAL(12,2),

  is\_default BOOLEAN DEFAULT FALSE,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE transactions (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  account\_id UUID REFERENCES accounts(id) ON DELETE SET NULL,

  category\_id UUID REFERENCES categories(id) ON DELETE SET NULL,

  type VARCHAR(20) NOT NULL,

  amount DECIMAL(12,2) NOT NULL,

  description VARCHAR(200) NOT NULL,

  date DATE NOT NULL,

  notes TEXT,

  attachment\_url VARCHAR(500),

  is\_recurring BOOLEAN DEFAULT FALSE,

  recurrence\_frequency VARCHAR(20),

  recurrence\_end\_date DATE,

  deleted\_at TIMESTAMP,

  created\_at TIMESTAMP DEFAULT NOW(),

  updated\_at TIMESTAMP DEFAULT NOW()

);

CREATE INDEX idx\_transactions\_user\_id ON transactions(user\_id);

CREATE INDEX idx\_transactions\_date ON transactions(date);

CREATE INDEX idx\_transactions\_category\_id ON transactions(category\_id);

CREATE INDEX idx\_accounts\_user\_id ON accounts(user\_id);

CREATE INDEX idx\_categories\_user\_id ON categories(user\_id);

**Eventos Publicados**:

- `transaction.created` → Nova transação criada  
- `transaction.updated` → Transação editada  
- `transaction.deleted` → Transação excluída  
- `balance.changed` → Saldo alterado

**Eventos Consumidos**:

- `user.deleted` → Excluir dados do usuário

**Escalabilidade**:

- Particionamento por user\_id  
- Cache de saldos no Redis (invalidar ao criar/editar/excluir)  
- Read replicas para consultas

---

### 2.3 Card Service (Serviço de Cartões)

**Responsabilidades**:

- CRUD de cartões de crédito  
- Registro de compras  
- Gestão de parcelas  
- Cálculo de faturas  
- Pagamento de faturas  
- Cálculo de limite disponível

**Stack**:

- Node.js \+ Express \+ TypeScript  
- PostgreSQL (tabelas: credit\_cards, purchases, installments)  
- Redis (cache de limites)

**Endpoints**:

\# Cartões

GET    /cards                  \# Listar cartões

POST   /cards                  \# Criar cartão

GET    /cards/:id              \# Detalhes do cartão

PUT    /cards/:id              \# Editar cartão

DELETE /cards/:id              \# Excluir cartão

\# Compras

POST   /cards/:id/purchases    \# Adicionar compra

GET    /cards/:id/purchases    \# Listar compras do cartão

PUT    /purchases/:id          \# Editar compra

DELETE /purchases/:id          \# Excluir compra

\# Faturas

GET    /cards/:id/invoices     \# Listar faturas (atual, fechada, futuras)

GET    /invoices/:id           \# Detalhes da fatura

POST   /invoices/:id/pay       \# Marcar fatura como paga

\# Parcelas

GET    /installments           \# Listar todas as parcelas ativas

GET    /purchases/:id/installments \# Parcelas de uma compra

\# Limite

GET    /cards/:id/limit        \# Limite disponível

**Banco de Dados**:

\-- card\_db

CREATE TABLE credit\_cards (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  name VARCHAR(100) NOT NULL,

  limit\_amount DECIMAL(12,2) NOT NULL,

  closing\_day INTEGER NOT NULL,

  due\_day INTEGER NOT NULL,

  brand VARCHAR(50),

  color VARCHAR(7),

  icon VARCHAR(50),

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE credit\_card\_purchases (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  credit\_card\_id UUID REFERENCES credit\_cards(id) ON DELETE CASCADE,

  category\_id UUID,

  description VARCHAR(200) NOT NULL,

  total\_amount DECIMAL(12,2) NOT NULL,

  purchase\_date DATE NOT NULL,

  installments INTEGER DEFAULT 1,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE credit\_card\_installments (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  purchase\_id UUID REFERENCES credit\_card\_purchases(id) ON DELETE CASCADE,

  installment\_number INTEGER NOT NULL,

  amount DECIMAL(12,2) NOT NULL,

  due\_date DATE NOT NULL,

  invoice\_month VARCHAR(7) NOT NULL, \-- YYYY-MM

  is\_paid BOOLEAN DEFAULT FALSE,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE invoices (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  credit\_card\_id UUID REFERENCES credit\_cards(id) ON DELETE CASCADE,

  month VARCHAR(7) NOT NULL, \-- YYYY-MM

  total\_amount DECIMAL(12,2) NOT NULL,

  status VARCHAR(20) NOT NULL, \-- 'open', 'closed', 'paid'

  closing\_date DATE NOT NULL,

  due\_date DATE NOT NULL,

  paid\_at TIMESTAMP,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE INDEX idx\_cards\_user\_id ON credit\_cards(user\_id);

CREATE INDEX idx\_purchases\_user\_id ON credit\_card\_purchases(user\_id);

CREATE INDEX idx\_purchases\_card\_id ON credit\_card\_purchases(credit\_card\_id);

CREATE INDEX idx\_installments\_purchase\_id ON credit\_card\_installments(purchase\_id);

CREATE INDEX idx\_installments\_due\_date ON credit\_card\_installments(due\_date);

CREATE INDEX idx\_invoices\_card\_id ON invoices(credit\_card\_id);

CREATE INDEX idx\_invoices\_month ON invoices(month);

**Eventos Publicados**:

- `card.created` → Novo cartão criado  
- `purchase.created` → Nova compra registrada  
- `invoice.closed` → Fatura fechada  
- `invoice.paid` → Fatura paga  
- `invoice.due_soon` → Fatura vence em breve

**Eventos Consumidos**:

- `user.deleted` → Excluir dados do usuário

**Escalabilidade**:

- Particionamento por user\_id  
- Cache de limites disponíveis  
- Cálculo de faturas em background job

---

### 2.4 AI Service (Serviço de IA)

**Responsabilidades**:

- Geração de relatórios financeiros com IA  
- Categorização automática de transações  
- Sugestões de economia  
- Análise de padrões de gastos  
- Previsão de saldo futuro

**Stack**:

- Python \+ FastAPI  
- PostgreSQL (read-only, acesso aos dados de transações)  
- Redis (cache de relatórios)  
- OpenAI API / Anthropic Claude / Google Gemini  
- Celery (processamento assíncrono)

**Endpoints**:

POST   /ai/report/generate     \# Gerar relatório IA

GET    /ai/report/:id          \# Buscar relatório gerado

GET    /ai/reports             \# Listar relatórios do usuário

POST   /ai/categorize          \# Sugerir categoria para transação

POST   /ai/categorize-batch    \# Categorizar múltiplas transações

POST   /ai/forecast            \# Prever saldo futuro

POST   /ai/insights            \# Gerar insights personalizados

**Banco de Dados**:

\-- ai\_db

CREATE TABLE ai\_reports (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  month VARCHAR(7) NOT NULL, \-- YYYY-MM

  content TEXT NOT NULL,

  model\_used VARCHAR(50),

  tokens\_used INTEGER,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE categorization\_cache (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  description\_hash VARCHAR(64) NOT NULL UNIQUE,

  suggested\_category VARCHAR(100) NOT NULL,

  confidence DECIMAL(3,2),

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE INDEX idx\_reports\_user\_id ON ai\_reports(user\_id);

CREATE INDEX idx\_reports\_month ON ai\_reports(month);

**Eventos Publicados**:

- `report.generated` → Relatório gerado com sucesso  
- `report.failed` → Erro ao gerar relatório

**Eventos Consumidos**:

- `transaction.created` → Sugerir categoria automaticamente  
- `user.deleted` → Excluir relatórios do usuário

**Escalabilidade**:

- Processamento assíncrono com Celery  
- Cache de categorizações comuns  
- Rate limiting para API de LLM  
- Queue para requisições de relatórios

**Exemplo de Prompt para Relatório**:

def generate\_report\_prompt(user\_data):

    return f"""

    Você é um consultor financeiro pessoal. Analise os dados abaixo e gere 

    um relatório financeiro personalizado em português brasileiro.

    

    Dados do usuário:

    \- Receitas do mês: R$ {user\_data\['income'\]}

    \- Despesas do mês: R$ {user\_data\['expenses'\]}

    \- Saldo do mês: R$ {user\_data\['balance'\]}

    \- Categorias mais gastas: {user\_data\['top\_categories'\]}

    \- Comparação com mês anterior: {user\_data\['comparison'\]}

    

    Gere um relatório com:

    1\. Resumo do mês

    2\. Análise de gastos

    3\. Alertas (gastos atípicos)

    4\. Sugestões de economia

    5\. Previsão para próximo mês

    

    Use linguagem amigável e personalizada.

    """

---

### 2.5 Notification Service (Serviço de Notificações)

**Responsabilidades**:

- Envio de e-mails  
- Envio de push notifications  
- Envio de notificações via WhatsApp  
- Lembretes de contas a pagar  
- Alertas de vencimento de faturas  
- Alertas de orçamento

**Stack**:

- Node.js \+ Express \+ TypeScript  
- PostgreSQL (tabela: notifications, preferences)  
- Redis (queue de notificações)  
- SendGrid (e-mails)  
- Firebase Cloud Messaging (push)  
- WhatsApp Business API (WhatsApp)

**Endpoints**:

GET    /notifications          \# Listar notificações do usuário

PUT    /notifications/:id/read \# Marcar como lida

DELETE /notifications/:id      \# Excluir notificação

GET    /preferences            \# Preferências de notificação

PUT    /preferences            \# Atualizar preferências

POST   /send/email             \# Enviar e-mail (interno)

POST   /send/push              \# Enviar push (interno)

POST   /send/whatsapp          \# Enviar WhatsApp (interno)

**Banco de Dados**:

\-- notification\_db

CREATE TABLE notifications (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  type VARCHAR(50) NOT NULL, \-- 'bill\_due', 'invoice\_due', 'budget\_alert'

  title VARCHAR(200) NOT NULL,

  message TEXT NOT NULL,

  is\_read BOOLEAN DEFAULT FALSE,

  metadata JSONB,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE notification\_preferences (

  user\_id UUID PRIMARY KEY,

  email\_enabled BOOLEAN DEFAULT TRUE,

  push\_enabled BOOLEAN DEFAULT TRUE,

  whatsapp\_enabled BOOLEAN DEFAULT FALSE,

  bill\_reminders BOOLEAN DEFAULT TRUE,

  invoice\_reminders BOOLEAN DEFAULT TRUE,

  budget\_alerts BOOLEAN DEFAULT TRUE,

  daily\_summary BOOLEAN DEFAULT FALSE,

  updated\_at TIMESTAMP DEFAULT NOW()

);

CREATE INDEX idx\_notifications\_user\_id ON notifications(user\_id);

CREATE INDEX idx\_notifications\_created\_at ON notifications(created\_at);

**Eventos Consumidos**:

- `transaction.created` → Verificar alertas de orçamento  
- `invoice.closed` → Enviar lembrete de vencimento  
- `invoice.due_soon` → Enviar lembrete urgente  
- `report.generated` → Notificar usuário  
- `user.registered` → Enviar e-mail de boas-vindas

**Escalabilidade**:

- Queue de notificações no Redis  
- Processamento em batch  
- Retry logic para falhas  
- Rate limiting por provedor

**Tipos de Notificações**:

enum NotificationType {

  BILL\_DUE\_SOON \= 'bill\_due\_soon',

  INVOICE\_DUE\_SOON \= 'invoice\_due\_soon',

  BUDGET\_EXCEEDED \= 'budget\_exceeded',

  REPORT\_READY \= 'report\_ready',

  WELCOME \= 'welcome',

  PASSWORD\_RESET \= 'password\_reset',

  DAILY\_SUMMARY \= 'daily\_summary'

}

---

### 2.6 Import Service (Serviço de Importação)

**Responsabilidades**:

- Importação de extratos bancários (OFX, XLS, CSV)  
- Importação de faturas de cartão (PDF)  
- Parsing de arquivos  
- Detecção de duplicatas  
- Categorização automática (via AI Service)

**Stack**:

- Node.js \+ Express \+ TypeScript  
- PostgreSQL (tabela: import\_jobs)  
- Redis (queue de importações)  
- AWS S3 (armazenamento de arquivos)  
- Bibliotecas: ofx-parser, xlsx, pdf-parse

**Endpoints**:

POST   /import/bank-statement  \# Importar extrato bancário

POST   /import/card-invoice    \# Importar fatura de cartão

GET    /import/jobs            \# Listar jobs de importação

GET    /import/jobs/:id        \# Status do job

POST   /import/jobs/:id/confirm \# Confirmar importação

DELETE /import/jobs/:id        \# Cancelar importação

**Banco de Dados**:

\-- import\_db

CREATE TABLE import\_jobs (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  type VARCHAR(50) NOT NULL, \-- 'bank\_statement', 'card\_invoice'

  file\_url VARCHAR(500) NOT NULL,

  status VARCHAR(20) NOT NULL, \-- 'processing', 'preview', 'completed', 'failed'

  total\_transactions INTEGER,

  imported\_transactions INTEGER,

  duplicates\_found INTEGER,

  error\_message TEXT,

  metadata JSONB,

  created\_at TIMESTAMP DEFAULT NOW(),

  completed\_at TIMESTAMP

);

CREATE TABLE import\_preview (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  job\_id UUID REFERENCES import\_jobs(id) ON DELETE CASCADE,

  date DATE NOT NULL,

  description VARCHAR(200) NOT NULL,

  amount DECIMAL(12,2) NOT NULL,

  type VARCHAR(20) NOT NULL,

  suggested\_category VARCHAR(100),

  is\_duplicate BOOLEAN DEFAULT FALSE,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE INDEX idx\_jobs\_user\_id ON import\_jobs(user\_id);

CREATE INDEX idx\_jobs\_status ON import\_jobs(status);

CREATE INDEX idx\_preview\_job\_id ON import\_preview(job\_id);

**Fluxo de Importação**:

1\. Upload do arquivo → S3

2\. Criar job de importação

3\. Processar arquivo (parsing)

4\. Detectar duplicatas

5\. Sugerir categorias (AI Service)

6\. Gerar preview

7\. Usuário confirma

8\. Criar transações (Transaction Service)

9\. Atualizar job como completed

**Eventos Publicados**:

- `import.started` → Importação iniciada  
- `import.preview_ready` → Preview pronto  
- `import.completed` → Importação concluída  
- `import.failed` → Erro na importação

**Escalabilidade**:

- Processamento assíncrono com queue  
- Timeout de 5 minutos por arquivo  
- Limite de 5 MB por arquivo  
- Retry logic para falhas

---

### 2.7 Report Service (Serviço de Relatórios)

**Responsabilidades**:

- Geração de relatórios mensais  
- Exportação para Excel  
- Exportação para PDF  
- Geração de gráficos  
- Estatísticas agregadas

**Stack**:

- Node.js \+ Express \+ TypeScript  
- PostgreSQL (read-only, acesso aos dados)  
- Redis (cache de relatórios)  
- Bibliotecas: exceljs, pdfkit, chart.js-node

**Endpoints**:

GET    /reports/monthly        \# Relatório mensal

GET    /reports/yearly         \# Relatório anual

GET    /reports/custom         \# Relatório customizado

POST   /export/excel           \# Exportar para Excel

POST   /export/pdf             \# Exportar para PDF

GET    /stats/overview         \# Estatísticas gerais

GET    /stats/trends           \# Tendências

GET    /stats/comparison       \# Comparação entre períodos

**Banco de Dados**:

\-- report\_db (cache)

CREATE TABLE report\_cache (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  report\_type VARCHAR(50) NOT NULL,

  period VARCHAR(20) NOT NULL, \-- '2025-12', '2025'

  data JSONB NOT NULL,

  created\_at TIMESTAMP DEFAULT NOW(),

  expires\_at TIMESTAMP NOT NULL

);

CREATE INDEX idx\_cache\_user\_id ON report\_cache(user\_id);

CREATE INDEX idx\_cache\_expires\_at ON report\_cache(expires\_at);

**Eventos Consumidos**:

- `transaction.created` → Invalidar cache  
- `transaction.updated` → Invalidar cache  
- `transaction.deleted` → Invalidar cache

**Escalabilidade**:

- Cache de relatórios (TTL: 1 hora)  
- Geração assíncrona para relatórios grandes  
- Read replicas para consultas

---

### 2.8 WhatsApp Service (Serviço de WhatsApp)

**Responsabilidades**:

- Vinculação de número de WhatsApp  
- Recebimento de mensagens  
- Processamento de linguagem natural  
- Envio de respostas  
- Comandos de consulta

**Stack**:

- Node.js \+ Express \+ TypeScript  
- PostgreSQL (tabela: whatsapp\_sessions)  
- Redis (cache de sessões)  
- WhatsApp Business API ou Baileys  
- Biblioteca de NLP (Compromise, NLP.js)

**Endpoints**:

POST   /whatsapp/link          \# Vincular número (gerar QR Code)

DELETE /whatsapp/unlink        \# Desvincular número

GET    /whatsapp/status        \# Status da conexão

POST   /webhook/message        \# Webhook para receber mensagens (interno)

**Banco de Dados**:

\-- whatsapp\_db

CREATE TABLE whatsapp\_sessions (

  user\_id UUID PRIMARY KEY,

  phone\_number VARCHAR(20) NOT NULL,

  session\_data JSONB,

  is\_active BOOLEAN DEFAULT TRUE,

  last\_message\_at TIMESTAMP,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE whatsapp\_messages (

  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

  user\_id UUID NOT NULL,

  direction VARCHAR(10) NOT NULL, \-- 'inbound', 'outbound'

  message\_type VARCHAR(20) NOT NULL, \-- 'text', 'audio', 'image'

  content TEXT,

  metadata JSONB,

  created\_at TIMESTAMP DEFAULT NOW()

);

CREATE INDEX idx\_sessions\_user\_id ON whatsapp\_sessions(user\_id);

CREATE INDEX idx\_messages\_user\_id ON whatsapp\_messages(user\_id);

CREATE INDEX idx\_messages\_created\_at ON whatsapp\_messages(created\_at);

**Processamento de Mensagens**:

// Exemplo de NLP para adicionar transação

async function processMessage(message: string, userId: string) {

  // Extrair informações

  const intent \= detectIntent(message); // 'add\_expense', 'add\_income', 'check\_balance'

  

  if (intent \=== 'add\_expense') {

    const amount \= extractAmount(message); // R$ 50,00

    const category \= extractCategory(message); // 'Mercado' → 'Alimentação'

    const description \= extractDescription(message); // 'Mercado'

    

    // Confirmar com usuário

    await sendConfirmation(userId, {

      type: 'expense',

      amount,

      category,

      description

    });

  }

  

  if (intent \=== 'check\_balance') {

    const balance \= await getBalance(userId);

    await sendMessage(userId, \`Seu saldo atual é R$ ${balance}\`);

  }

}

**Eventos Publicados**:

- `whatsapp.linked` → Número vinculado  
- `whatsapp.message_received` → Mensagem recebida  
- `whatsapp.transaction_requested` → Usuário quer adicionar transação

**Eventos Consumidos**:

- `transaction.created` → Enviar confirmação  
- `notification.*` → Enviar notificação via WhatsApp

**Escalabilidade**:

- Sessões armazenadas no Redis  
- Queue para processamento de mensagens  
- Rate limiting por usuário

---

## 3\. Comunicação Entre Serviços

### 3.1 Padrões de Comunicação

#### Síncrona (REST API)

**Quando usar**: Operações que precisam de resposta imediata

**Exemplo**:

Frontend → API Gateway → Auth Service (validar token)

Frontend → API Gateway → Transaction Service (listar transações)

#### Assíncrona (Message Broker)

**Quando usar**: Operações que não precisam de resposta imediata

**Exemplo**:

Transaction Service → RabbitMQ → Notification Service (enviar alerta)

Card Service → RabbitMQ → Notification Service (fatura vence em breve)

---

### 3.2 Message Broker (RabbitMQ)

**Exchanges**:

\- user.events        \# Eventos de usuário

\- transaction.events \# Eventos de transação

\- card.events        \# Eventos de cartão

\- notification.events \# Eventos de notificação

\- import.events      \# Eventos de importação

\- ai.events          \# Eventos de IA

**Queues**:

\- notification.email      \# E-mails a enviar

\- notification.push       \# Push notifications a enviar

\- notification.whatsapp   \# Mensagens WhatsApp a enviar

\- ai.categorize           \# Transações para categorizar

\- ai.report               \# Relatórios para gerar

\- import.process          \# Arquivos para processar

**Exemplo de Publicação**:

// Transaction Service publica evento

await messageQueue.publish('transaction.events', 'transaction.created', {

  userId: 'uuid',

  transactionId: 'uuid',

  type: 'expense',

  amount: 150.00,

  category: 'Alimentação',

  date: '2025-12-26'

});

**Exemplo de Consumo**:

// Notification Service consome evento

messageQueue.subscribe('transaction.events', 'transaction.created', async (data) \=\> {

  // Verificar se ultrapassou orçamento

  const budget \= await getBudget(data.userId, data.category);

  const spent \= await getSpent(data.userId, data.category);

  

  if (spent \> budget) {

    await sendNotification(data.userId, {

      type: 'budget\_exceeded',

      message: \`Você ultrapassou o orçamento de ${data.category}\`

    });

  }

});

---

### 3.3 Service Mesh (Istio)

**Benefícios**:

- Service discovery automático  
- Load balancing  
- Circuit breaker  
- Retry logic  
- Observabilidade (tracing, metrics)  
- mTLS entre serviços

**Configuração**:

\# istio-config.yaml

apiVersion: networking.istio.io/v1beta1

kind: VirtualService

metadata:

  name: transaction-service

spec:

  hosts:

  \- transaction-service

  http:

  \- route:

    \- destination:

        host: transaction-service

        subset: v1

      weight: 90

    \- destination:

        host: transaction-service

        subset: v2

      weight: 10

    retries:

      attempts: 3

      perTryTimeout: 2s

    timeout: 10s

---

## 4\. API Gateway

### 4.1 Responsabilidades

- **Roteamento**: Direcionar requisições para serviços corretos  
- **Autenticação**: Validar tokens JWT  
- **Rate Limiting**: Limitar requisições por usuário  
- **Load Balancing**: Distribuir carga entre instâncias  
- **Caching**: Cache de respostas  
- **Logging**: Log de todas as requisições  
- **CORS**: Configuração de CORS

### 4.2 Configuração (Kong)

\# kong.yaml

services:

  \- name: auth-service

    url: http://auth-service:3000

    routes:

      \- name: auth-routes

        paths:

          \- /auth

        methods:

          \- GET

          \- POST

          \- PUT

          \- DELETE

    plugins:

      \- name: rate-limiting

        config:

          minute: 100

          policy: local

  \- name: transaction-service

    url: http://transaction-service:3000

    routes:

      \- name: transaction-routes

        paths:

          \- /transactions

          \- /categories

          \- /accounts

          \- /stats

    plugins:

      \- name: jwt

        config:

          secret\_is\_base64: false

      \- name: rate-limiting

        config:

          minute: 200

      \- name: response-cache

        config:

          strategy: memory

          ttl: 60

  \- name: card-service

    url: http://card-service:3000

    routes:

      \- name: card-routes

        paths:

          \- /cards

          \- /purchases

          \- /invoices

          \- /installments

    plugins:

      \- name: jwt

      \- name: rate-limiting

        config:

          minute: 150

---

## 5\. Banco de Dados

### 5.1 Estratégia de Dados

**Database per Service**: Cada microsserviço tem seu próprio banco de dados

**Vantagens**:

- Isolamento total  
- Escalabilidade independente  
- Tecnologia específica por serviço  
- Falhas isoladas

**Desvantagens**:

- Sem transações distribuídas (usar Saga pattern)  
- Duplicação de dados (denormalização)  
- Complexidade de consultas cross-service

---

### 5.2 Bancos de Dados

auth\_db           → PostgreSQL (users, sessions)

transaction\_db    → PostgreSQL (transactions, categories, accounts)

card\_db           → PostgreSQL (cards, purchases, installments, invoices)

ai\_db             → PostgreSQL (reports, categorization\_cache)

notification\_db   → PostgreSQL (notifications, preferences)

import\_db         → PostgreSQL (import\_jobs, import\_preview)

report\_db         → PostgreSQL (report\_cache)

whatsapp\_db       → PostgreSQL (sessions, messages)

---

### 5.3 Replicação

**Master-Slave Replication**:

┌──────────────┐

│   Master     │ (writes)

│  PostgreSQL  │

└──────┬───────┘

       │

       ├──────────────┬──────────────┐

       │              │              │

┌──────▼───────┐ ┌────▼──────┐ ┌────▼──────┐

│   Replica 1  │ │ Replica 2 │ │ Replica 3 │

│  (reads)     │ │ (reads)   │ │ (reads)   │

└──────────────┘ └───────────┘ └───────────┘

**Configuração**:

- Master: Todas as escritas  
- Replicas: Apenas leituras (relatórios, estatísticas)  
- Replicação assíncrona  
- Lag máximo: 1 segundo

---

### 5.4 Particionamento (Sharding)

**Por user\_id**:

Shard 1: user\_id hash % 4 \= 0

Shard 2: user\_id hash % 4 \= 1

Shard 3: user\_id hash % 4 \= 2

Shard 4: user\_id hash % 4 \= 3

**Quando aplicar**: Quando atingir 1M+ usuários

---

## 6\. Cache (Redis)

### 6.1 Estratégias de Cache

**Cache-Aside**:

async function getBalance(userId: string) {

  // Tentar buscar do cache

  const cached \= await redis.get(\`balance:${userId}\`);

  if (cached) return JSON.parse(cached);

  

  // Se não estiver no cache, buscar do banco

  const balance \= await db.calculateBalance(userId);

  

  // Salvar no cache (TTL: 5 minutos)

  await redis.setex(\`balance:${userId}\`, 300, JSON.stringify(balance));

  

  return balance;

}

**Write-Through**:

async function createTransaction(data: Transaction) {

  // Salvar no banco

  const transaction \= await db.transactions.create(data);

  

  // Invalidar cache de saldo

  await redis.del(\`balance:${data.userId}\`);

  

  return transaction;

}

---

### 6.2 Dados Cacheados

\# Saldos

balance:{userId}                TTL: 5 minutos

\# Tokens JWT

token:{tokenHash}               TTL: 24 horas

token:blacklist:{tokenHash}     TTL: 24 horas

\# Limites de cartão

card:limit:{cardId}             TTL: 10 minutos

\# Relatórios

report:{userId}:{month}         TTL: 1 hora

\# Categorização

category:{descriptionHash}      TTL: 30 dias

\# Sessões WhatsApp

whatsapp:session:{userId}       TTL: 7 dias

\# Rate limiting

ratelimit:{userId}:{endpoint}   TTL: 1 minuto

---

## 7\. Observabilidade

### 7.1 Logging

**Stack**: ELK (Elasticsearch, Logstash, Kibana)

**Formato de Log**:

{

  "timestamp": "2025-12-26T10:30:00Z",

  "level": "info",

  "service": "transaction-service",

  "traceId": "abc123",

  "userId": "uuid",

  "method": "POST",

  "path": "/transactions",

  "statusCode": 201,

  "duration": 45,

  "message": "Transaction created successfully"

}

**Níveis de Log**:

- ERROR: Erros que precisam de atenção  
- WARN: Situações anormais mas não críticas  
- INFO: Eventos importantes (criação, edição, exclusão)  
- DEBUG: Informações detalhadas para debugging

---

### 7.2 Monitoring

**Stack**: Prometheus \+ Grafana

**Métricas**:

\# Request metrics

http\_requests\_total{service, method, path, status}

http\_request\_duration\_seconds{service, method, path}

\# Database metrics

db\_connections\_active{service, database}

db\_query\_duration\_seconds{service, query\_type}

\# Cache metrics

cache\_hits\_total{service, key\_pattern}

cache\_misses\_total{service, key\_pattern}

\# Business metrics

transactions\_created\_total{type}

users\_registered\_total

reports\_generated\_total

**Dashboards**:

- Overview: Visão geral de todos os serviços  
- Service-specific: Dashboard por serviço  
- Business: Métricas de negócio

---

### 7.3 Tracing

**Stack**: Jaeger

**Distributed Tracing**:

Request: POST /transactions

├─ API Gateway (5ms)

├─ Auth Service: Validate Token (10ms)

├─ Transaction Service: Create Transaction (30ms)

│  ├─ Database: Insert (15ms)

│  └─ Cache: Invalidate (5ms)

├─ AI Service: Suggest Category (50ms)

│  └─ OpenAI API (45ms)

└─ Notification Service: Send Alert (20ms)

   └─ SendGrid API (15ms)

Total: 115ms

---

### 7.4 Alertas

**Alertmanager (Prometheus)**:

\# alerts.yaml

groups:

  \- name: service\_alerts

    rules:

      \- alert: HighErrorRate

        expr: rate(http\_requests\_total{status=\~"5.."}\[5m\]) \> 0.05

        for: 5m

        annotations:

          summary: "High error rate on {{ $labels.service }}"

          

      \- alert: HighLatency

        expr: http\_request\_duration\_seconds{quantile="0.95"} \> 1

        for: 5m

        annotations:

          summary: "High latency on {{ $labels.service }}"

          

      \- alert: ServiceDown

        expr: up{job="services"} \== 0

        for: 1m

        annotations:

          summary: "Service {{ $labels.service }} is down"

---

## 8\. Segurança

### 8.1 Autenticação e Autorização

**JWT (JSON Web Token)**:

// Estrutura do token

{

  "sub": "user-uuid",

  "email": "user@example.com",

  "plan": "premium",

  "iat": 1703592000,

  "exp": 1703678400

}

**Fluxo**:

1\. Usuário faz login

2\. Auth Service valida credenciais

3\. Auth Service gera JWT

4\. Frontend armazena token (localStorage ou cookie httpOnly)

5\. Frontend envia token em todas as requisições (Authorization: Bearer \<token\>)

6\. API Gateway valida token

7\. API Gateway extrai userId e adiciona no header (X-User-Id)

8\. Serviços usam userId para autorização

---

### 8.2 Comunicação Segura

**mTLS (Mutual TLS)**: Comunicação entre serviços criptografada

**Configuração (Istio)**:

apiVersion: security.istio.io/v1beta1

kind: PeerAuthentication

metadata:

  name: default

spec:

  mtls:

    mode: STRICT

---

### 8.3 Secrets Management

**Vault (HashiCorp)**:

\# Secrets armazenados

\- Database credentials

\- API keys (OpenAI, SendGrid, Stripe)

\- JWT secret

\- Encryption keys

**Acesso**:

import vault from 'vault-client';

const dbPassword \= await vault.get('database/transaction-db/password');

const openaiKey \= await vault.get('api-keys/openai');

---

### 8.4 Rate Limiting

**Por Usuário**:

\- 100 requisições/minuto (geral)

\- 10 relatórios IA/dia (plano gratuito)

\- Ilimitado (plano premium)

**Por IP**:

\- 1000 requisições/minuto (evitar DDoS)

---

## 9\. Deployment

### 9.1 Containerização (Docker)

**Exemplo de Dockerfile**:

\# transaction-service/Dockerfile

FROM node:20-alpine AS builder

WORKDIR /app

COPY package\*.json ./

RUN npm ci \--only=production

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY \--from=builder /app/dist ./dist

COPY \--from=builder /app/node\_modules ./node\_modules

COPY \--from=builder /app/package.json ./

EXPOSE 3000

CMD \["node", "dist/index.js"\]

---

### 9.2 Orquestração (Kubernetes)

**Deployment**:

\# transaction-service-deployment.yaml

apiVersion: apps/v1

kind: Deployment

metadata:

  name: transaction-service

spec:

  replicas: 3

  selector:

    matchLabels:

      app: transaction-service

  template:

    metadata:

      labels:

        app: transaction-service

    spec:

      containers:

      \- name: transaction-service

        image: registry.example.com/transaction-service:latest

        ports:

        \- containerPort: 3000

        env:

        \- name: DATABASE\_URL

          valueFrom:

            secretKeyRef:

              name: transaction-db-secret

              key: url

        \- name: REDIS\_URL

          valueFrom:

            secretKeyRef:

              name: redis-secret

              key: url

        resources:

          requests:

            memory: "256Mi"

            cpu: "250m"

          limits:

            memory: "512Mi"

            cpu: "500m"

        livenessProbe:

          httpGet:

            path: /health

            port: 3000

          initialDelaySeconds: 30

          periodSeconds: 10

        readinessProbe:

          httpGet:

            path: /ready

            port: 3000

          initialDelaySeconds: 5

          periodSeconds: 5

**Service**:

\# transaction-service-service.yaml

apiVersion: v1

kind: Service

metadata:

  name: transaction-service

spec:

  selector:

    app: transaction-service

  ports:

  \- protocol: TCP

    port: 80

    targetPort: 3000

  type: ClusterIP

**HorizontalPodAutoscaler**:

\# transaction-service-hpa.yaml

apiVersion: autoscaling/v2

kind: HorizontalPodAutoscaler

metadata:

  name: transaction-service-hpa

spec:

  scaleTargetRef:

    apiVersion: apps/v1

    kind: Deployment

    name: transaction-service

  minReplicas: 3

  maxReplicas: 10

  metrics:

  \- type: Resource

    resource:

      name: cpu

      target:

        type: Utilization

        averageUtilization: 70

  \- type: Resource

    resource:

      name: memory

      target:

        type: Utilization

        averageUtilization: 80

---

### 9.3 CI/CD (GitHub Actions)

\# .github/workflows/transaction-service.yaml

name: Transaction Service CI/CD

on:

  push:

    branches: \[main\]

    paths:

      \- 'services/transaction/\*\*'

jobs:

  test:

    runs-on: ubuntu-latest

    steps:

      \- uses: actions/checkout@v3

      \- uses: actions/setup-node@v3

        with:

          node-version: '20'

      \- run: npm ci

      \- run: npm test

      \- run: npm run lint

  build:

    needs: test

    runs-on: ubuntu-latest

    steps:

      \- uses: actions/checkout@v3

      \- uses: docker/build-push-action@v4

        with:

          context: ./services/transaction

          push: true

          tags: registry.example.com/transaction-service:${{ github.sha }}

  deploy:

    needs: build

    runs-on: ubuntu-latest

    steps:

      \- uses: azure/k8s-set-context@v3

        with:

          kubeconfig: ${{ secrets.KUBE\_CONFIG }}

      \- run: |

          kubectl set image deployment/transaction-service \\

            transaction-service=registry.example.com/transaction-service:${{ github.sha }}

          kubectl rollout status deployment/transaction-service

---

## 10\. Resiliência

### 10.1 Circuit Breaker

**Padrão**: Evitar chamadas a serviços que estão falhando

import CircuitBreaker from 'opossum';

const options \= {

  timeout: 3000, // 3s

  errorThresholdPercentage: 50,

  resetTimeout: 30000 // 30s

};

const breaker \= new CircuitBreaker(callAIService, options);

breaker.fallback(() \=\> {

  return { category: 'Outros', confidence: 0 };

});

// Uso

const result \= await breaker.fire(transactionDescription);

**Estados**:

- **Closed**: Funcionando normalmente  
- **Open**: Muitas falhas, não faz chamadas  
- **Half-Open**: Testa se serviço voltou

---

### 10.2 Retry Logic

import retry from 'async-retry';

async function callExternalAPI(data: any) {

  return await retry(

    async (bail) \=\> {

      try {

        return await externalAPI.call(data);

      } catch (error) {

        if (error.statusCode \=== 400\) {

          // Erro do cliente, não tentar novamente

          bail(error);

        }

        // Erro do servidor, tentar novamente

        throw error;

      }

    },

    {

      retries: 3,

      minTimeout: 1000,

      maxTimeout: 5000,

      factor: 2

    }

  );

}

---

### 10.3 Bulkhead

**Padrão**: Isolar recursos para evitar que falha em um afete outros

// Pool de conexões separado por tipo de operação

const writePool \= new Pool({ max: 10 });

const readPool \= new Pool({ max: 20 });

// Operações de escrita usam writePool

async function createTransaction(data) {

  const client \= await writePool.connect();

  // ...

}

// Operações de leitura usam readPool

async function listTransactions(userId) {

  const client \= await readPool.connect();

  // ...

}

---

### 10.4 Timeout

// Timeout em todas as requisições

axios.defaults.timeout \= 10000; // 10s

// Timeout específico

await axios.get('/api/data', { timeout: 5000 });

---

## 11\. Escalabilidade

### 11.1 Horizontal Scaling

**Stateless Services**: Todos os serviços são stateless, podem escalar horizontalmente

**Auto-scaling**:

\- CPU \> 70% → Adicionar pod

\- CPU \< 30% → Remover pod

\- Min replicas: 3

\- Max replicas: 10

---

### 11.2 Vertical Scaling

**Quando usar**: Serviços com operações pesadas (AI Service, Import Service)

**Configuração**:

resources:

  requests:

    memory: "1Gi"

    cpu: "1000m"

  limits:

    memory: "2Gi"

    cpu: "2000m"

---

### 11.3 Database Scaling

**Read Replicas**: Para consultas pesadas

**Sharding**: Para distribuir dados (quando necessário)

**Connection Pooling**:

const pool \= new Pool({

  max: 20, // Máximo de conexões

  min: 5,  // Mínimo de conexões

  idleTimeoutMillis: 30000,

  connectionTimeoutMillis: 2000

});

---

## 12\. Disaster Recovery

### 12.1 Backup

**Banco de Dados**:

- Backup diário completo (3 AM)  
- Backup incremental a cada 6 horas  
- Retenção: 30 dias  
- Backup em região diferente (cross-region)

**Arquivos (S3)**:

- Versionamento habilitado  
- Replicação cross-region  
- Lifecycle policy (mover para Glacier após 90 dias)

---

### 12.2 Recovery

**RPO (Recovery Point Objective)**: 6 horas  
**RTO (Recovery Time Objective)**: 4 horas

**Plano de Recuperação**:

1. Detectar falha (alertas)  
2. Avaliar impacto  
3. Restaurar backup mais recente  
4. Aplicar logs de transação (point-in-time recovery)  
5. Validar integridade dos dados  
6. Redirecionar tráfego  
7. Monitorar

---

## 13\. Custos Estimados

### 13.1 Infraestrutura (AWS)

| Recurso | Especificação | Custo/mês |
| :---- | :---- | :---- |
| **Kubernetes (EKS)** | 3 nodes t3.large | $220 |
| **RDS PostgreSQL** | db.t3.large (Master \+ 2 Replicas) | $450 |
| **ElastiCache Redis** | cache.t3.medium | $80 |
| **S3** | 100 GB \+ transferência | $30 |
| **CloudFront** | CDN para frontend | $50 |
| **Load Balancer** | ALB | $25 |
| **NAT Gateway** | 2 AZs | $90 |
| **CloudWatch** | Logs e métricas | $50 |
| **Total Infraestrutura** |  | **$995/mês** |

### 13.2 Serviços Externos

| Serviço | Custo/mês |
| :---- | :---- |
| **OpenAI API** | $200 (estimado) |
| **SendGrid** | $15 (Essentials) |
| **WhatsApp Business API** | $100 (estimado) |
| **Stripe** | 2,9% \+ $0,30 por transação |
| **Total Serviços** | **$315/mês** |

### 13.3 Total

**Custo mensal**: \~$1.310/mês (\~R$ 6.550/mês)

**Custo por usuário** (3.000 usuários): \~R$ 2,18/mês

**Margem**: MRR R$ 42.000 \- Custo R$ 6.550 \= **R$ 35.450/mês** (84% de margem)

---

## 14\. Roadmap de Implementação

### Fase 1: MVP (Meses 1-2)

- [ ] Setup de infraestrutura (Kubernetes, RDS, Redis)  
- [ ] Auth Service  
- [ ] Transaction Service  
- [ ] API Gateway  
- [ ] Frontend básico

### Fase 2: Core Features (Meses 3-4)

- [ ] Card Service  
- [ ] Import Service  
- [ ] Report Service  
- [ ] Notification Service

### Fase 3: Diferenciação (Meses 5-6)

- [ ] AI Service  
- [ ] WhatsApp Service  
- [ ] Observabilidade completa

### Fase 4: Otimização (Meses 7-8)

- [ ] Performance tuning  
- [ ] Auto-scaling  
- [ ] Disaster recovery  
- [ ] Security hardening

---

## 15\. Conclusão

Esta arquitetura de microsserviços foi projetada para:

✅ **Escalabilidade**: Horizontal e vertical  
✅ **Resiliência**: Circuit breaker, retry, timeout  
✅ **Separação de responsabilidades**: 8 serviços independentes  
✅ **Observabilidade**: Logging, monitoring, tracing  
✅ **Segurança**: mTLS, JWT, secrets management  
✅ **Manutenibilidade**: Código limpo, testes, CI/CD

**Pronta para produção e crescimento de 0 a 100.000+ usuários\!** 🚀

---

**Versão**: 1.0  
**Data**: 26 de dezembro de 2025  
**Autor**: Equipe de Arquitetura  
