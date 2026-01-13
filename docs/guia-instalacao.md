# Guia de Instalação e Setup - Monettis App

**Guia Completo para Configurar o Ambiente de Desenvolvimento**

**Versão**: 1.0
**Data**: Janeiro 2026
**Status**: Vigente

---

## 📋 Índice

1. [Pré-requisitos](#1-pré-requisitos)
2. [Instalação do Ambiente](#2-instalação-do-ambiente)
3. [Configuração do Projeto](#3-configuração-do-projeto)
4. [Configuração de Serviços Externos](#4-configuração-de-serviços-externos)
5. [Configuração do Banco de Dados](#5-configuração-do-banco-de-dados)
6. [Executando o Projeto](#6-executando-o-projeto)
7. [Verificação da Instalação](#7-verificação-da-instalação)
8. [Troubleshooting](#8-troubleshooting)
9. [Ambientes](#9-ambientes)
10. [Próximos Passos](#10-próximos-passos)

---

## 1. Pré-requisitos

### 1.1 Software Necessário

#### Node.js e npm

**Versão mínima**: Node.js 20.x

**Verificar versão instalada**:
```bash
node --version  # Deve ser >= v20.0.0
npm --version   # Deve ser >= 10.0.0
```

**Instalação**:

**Windows**:
1. Baixe o instalador em [nodejs.org](https://nodejs.org/)
2. Execute o instalador e siga as instruções
3. Reinicie o terminal

**macOS** (usando Homebrew):
```bash
brew install node@20
```

**Linux** (Ubuntu/Debian):
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Alternativa - nvm (recomendado)**:
```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node.js 20
nvm install 20
nvm use 20
nvm alias default 20
```

---

#### Git

**Verificar versão**:
```bash
git --version  # Qualquer versão recente
```

**Instalação**:

**Windows**:
- Baixe em [git-scm.com](https://git-scm.com/download/win)

**macOS**:
```bash
brew install git
```

**Linux**:
```bash
sudo apt-get install git
```

---

#### PostgreSQL 16

**Opção 1: PostgreSQL Local**

**Windows**:
1. Baixe em [postgresql.org](https://www.postgresql.org/download/windows/)
2. Execute o instalador
3. Anote a senha do usuário `postgres`

**macOS**:
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Linux**:
```bash
sudo apt-get install postgresql-16 postgresql-contrib-16
sudo systemctl start postgresql
```

**Opção 2: PostgreSQL na Nuvem (Recomendado)**

Use um dos seguintes serviços (plano gratuito disponível):

- **Neon** (recomendado): [neon.tech](https://neon.tech)
- **Supabase**: [supabase.com](https://supabase.com)
- **Railway**: [railway.app](https://railway.app)
- **Vercel Postgres**: [vercel.com/postgres](https://vercel.com/storage/postgres)

---

#### Editor de Código

**Recomendado**: Visual Studio Code

**Instalação**:
- Baixe em [code.visualstudio.com](https://code.visualstudio.com/)

**Extensões recomendadas**:
```
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension Prisma.prisma
```

---

### 1.2 Contas em Serviços Externos

#### Clerk (Autenticação)

1. Crie conta em [clerk.com](https://clerk.com)
2. Crie uma nova aplicação
3. Anote as chaves:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

#### Stripe (Pagamentos)

1. Crie conta em [stripe.com](https://stripe.com)
2. Acesse [Dashboard > Developers > API keys](https://dashboard.stripe.com/test/apikeys)
3. Anote as chaves de **teste**:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (começa com `pk_test_`)
   - `STRIPE_SECRET_KEY` (começa com `sk_test_`)
4. Crie um produto e price em [Dashboard > Products](https://dashboard.stripe.com/test/products)
5. Anote o `STRIPE_PREMIUM_PLAN_PRICE_ID` (começa com `price_`)
6. Configure webhook:
   - URL: `https://seu-dominio.com/api/webhooks/stripe` (use ngrok para desenvolvimento local)
   - Eventos: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`
   - Anote `STRIPE_WEBHOOK_SECRET` (começa com `whsec_`)

#### OpenAI (IA)

1. Crie conta em [openai.com](https://openai.com)
2. Acesse [API Keys](https://platform.openai.com/api-keys)
3. Crie uma nova chave
4. Anote `OPENAI_API_KEY` (começa com `sk-proj-`)
5. Adicione créditos (mínimo $5)

---

## 2. Instalação do Ambiente

### 2.1 Clonar o Repositório

```bash
# Clonar via HTTPS
git clone https://github.com/seu-usuario/monettis-app.git

# OU via SSH (se configurado)
git clone git@github.com:seu-usuario/monettis-app.git

# Entrar no diretório
cd monettis-app
```

---

### 2.2 Instalar Dependências

```bash
# Usando npm
npm install

# OU usando yarn
yarn install

# OU usando pnpm
pnpm install
```

**Tempo estimado**: 2-5 minutos

**Saída esperada**:
```
added 1234 packages, and audited 1235 packages in 2m

123 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

---

### 2.3 Verificar Instalação

```bash
# Listar scripts disponíveis
npm run

# Verificar versões
node --version
npm --version
npx --version
```

---

## 3. Configuração do Projeto

### 3.1 Arquivo de Variáveis de Ambiente

**Criar arquivo `.env`**:

```bash
# No diretório raiz do projeto
cp .env.example .env
```

**Editar `.env`** com suas credenciais:

```env
# ==============================================
# DATABASE
# ==============================================
# Para PostgreSQL local:
# DATABASE_URL="postgresql://postgres:senha@localhost:5432/monettis?schema=public"

# Para Neon (cloud):
DATABASE_URL="postgresql://usuario:senha@ep-xxx-xxx.us-east-1.aws.neon.tech/monettis?sslmode=require"

# ==============================================
# CLERK (Autenticação)
# ==============================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx"

# ==============================================
# STRIPE (Pagamentos)
# ==============================================
STRIPE_PREMIUM_PLAN_PRICE_ID="price_xxxxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL="https://billing.stripe.com/p/login/test_xxxxxxxxxx"

# ==============================================
# OPENAI (IA)
# ==============================================
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxx"

# ==============================================
# APPLICATION
# ==============================================
APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

### 3.2 Validar Variáveis de Ambiente

Crie um script de validação (opcional):

```bash
# Criar arquivo de teste
cat > .env.test.js << 'EOF'
require('dotenv').config();

const required = [
  'DATABASE_URL',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'STRIPE_SECRET_KEY',
  'OPENAI_API_KEY',
];

console.log('Validando variáveis de ambiente...\n');

let hasErrors = false;

required.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ ${key} não definida`);
    hasErrors = true;
  } else {
    console.log(`✅ ${key} definida`);
  }
});

if (hasErrors) {
  console.error('\n⚠️  Algumas variáveis estão faltando!');
  process.exit(1);
} else {
  console.log('\n✅ Todas as variáveis obrigatórias estão definidas!');
}
EOF

# Executar validação
node .env.test.js
```

---

## 4. Configuração de Serviços Externos

### 4.1 Clerk - Configuração Detalhada

#### Passo 1: Criar Aplicação

1. Acesse [dashboard.clerk.com](https://dashboard.clerk.com)
2. Clique em "Add application"
3. Nome: `Monettis App`
4. Selecione provedores de login:
   - ✅ Email
   - ✅ Google
   - ✅ GitHub (opcional)

#### Passo 2: Configurar URLs

Em **Settings > URLs**:

- **Home URL**: `http://localhost:3000`
- **Sign in URL**: `http://localhost:3000/login`
- **Sign up URL**: `http://localhost:3000/login`
- **After sign in**: `http://localhost:3000`
- **After sign up**: `http://localhost:3000`

#### Passo 3: Configurar Metadata

Em **Settings > User & Authentication > Metadata**:

Adicionar campo customizado:
```json
{
  "subscriptionPlan": "free"
}
```

#### Passo 4: Copiar Chaves

Em **API Keys**:
- Copie `Publishable key` → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Copie `Secret key` → `CLERK_SECRET_KEY`

---

### 4.2 Stripe - Configuração Detalhada

#### Passo 1: Criar Produto

1. Acesse [dashboard.stripe.com/test/products](https://dashboard.stripe.com/test/products)
2. Clique em "Add product"
3. Preencha:
   - **Name**: `Monettis Premium`
   - **Description**: `Plano Premium Individual`
   - **Pricing model**: `Standard pricing`
   - **Price**: `R$ 14,00`
   - **Billing period**: `Monthly`
4. Clique em "Save product"
5. Copie o `Price ID` (começa com `price_`)

#### Passo 2: Configurar Webhook (Desenvolvimento Local)

**Usando Stripe CLI**:

```bash
# Instalar Stripe CLI
# Windows (usando Scoop)
scoop install stripe

# macOS
brew install stripe/stripe-cli/stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/download/vX.X.X/stripe_X.X.X_linux_x86_64.tar.gz
tar -xvf stripe_X.X.X_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/

# Login no Stripe
stripe login

# Escutar webhooks (em um terminal separado)
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copiar o webhook secret que aparece (whsec_...)
```

**Usando ngrok (alternativa)**:

```bash
# Instalar ngrok
npm install -g ngrok

# Expor porta local
ngrok http 3000

# URL gerada: https://xxxx-xx-xx-xx-xx.ngrok.io
# Configurar webhook no Stripe Dashboard com:
# https://xxxx-xx-xx-xx-xx.ngrok.io/api/webhooks/stripe
```

#### Passo 3: Configurar Portal do Cliente

1. Acesse [Dashboard > Settings > Billing > Customer portal](https://dashboard.stripe.com/test/settings/billing/portal)
2. Clique em "Activate test link"
3. Copie a URL do portal → `NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL`

---

### 4.3 OpenAI - Configuração

#### Passo 1: Criar API Key

1. Acesse [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Clique em "Create new secret key"
3. Nome: `Monettis App`
4. Copie a chave (só aparece uma vez!)

#### Passo 2: Adicionar Créditos

1. Acesse [Billing](https://platform.openai.com/account/billing)
2. Adicione créditos (mínimo $5)

#### Passo 3: Testar API

```bash
# Criar script de teste
cat > test-openai.js << 'EOF'
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: 'Hello!' }],
  });

  console.log('✅ OpenAI funcionando!');
  console.log('Resposta:', response.choices[0].message.content);
}

test();
EOF

# Executar teste
node test-openai.js
```

---

## 5. Configuração do Banco de Dados

### 5.1 Criar Banco de Dados (PostgreSQL Local)

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco
CREATE DATABASE monettis;

# Verificar
\l

# Sair
\q
```

---

### 5.2 Executar Migrations

```bash
# Gerar Prisma Client
npx prisma generate

# Executar migrations
npx prisma migrate dev --name init

# Verificar tabelas criadas
npx prisma studio
```

**Saída esperada**:
```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "monettis"

Applying migration `20260115000000_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20260115000000_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client
```

---

### 5.3 Verificar Schema

```bash
# Abrir Prisma Studio (interface visual)
npx prisma studio
```

Acesse [http://localhost:5555](http://localhost:5555)

Deve aparecer:
- Tabela `Transaction`
- Enums: `TransactionType`, `TransactionCategory`, `TransactionPaymentMethod`

---

### 5.4 Popular com Dados de Teste (Opcional)

```bash
# Executar seed
npm run seed
```

**Arquivo de seed**: `prisma/seed.ts`

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes
  await prisma.transaction.deleteMany();

  // Criar transações de exemplo
  const userId = 'user_example'; // Substitua com userId real do Clerk

  await prisma.transaction.createMany({
    data: [
      {
        name: 'Salário Janeiro',
        type: 'DEPOSIT',
        amount: 5000,
        category: 'SALARY',
        paymentMethod: 'BANK_TRANSFER',
        date: new Date('2026-01-05'),
        userId,
      },
      {
        name: 'Supermercado',
        type: 'EXPENSE',
        amount: 450,
        category: 'FOOD',
        paymentMethod: 'CREDIT_CARD',
        date: new Date('2026-01-10'),
        userId,
      },
      {
        name: 'Gasolina',
        type: 'EXPENSE',
        amount: 200,
        category: 'TRANSPORTATION',
        paymentMethod: 'DEBIT_CARD',
        date: new Date('2026-01-12'),
        userId,
      },
    ],
  });

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 6. Executando o Projeto

### 6.1 Modo de Desenvolvimento

```bash
npm run dev
```

**Saída esperada**:
```
> monettis@0.1.0 dev
> next dev

  ▲ Next.js 14.2.16
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Ready in 2.3s
```

---

### 6.2 Acessar Aplicação

Abra o navegador em [http://localhost:3000](http://localhost:3000)

**Deve aparecer**:
- Página de login (Clerk)
- Após login: Dashboard

---

### 6.3 Build de Produção (Teste)

```bash
# Build
npm run build

# Start
npm run start
```

**Saída esperada (build)**:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    142 B          87.3 kB
├ ○ /_not-found                          142 B          87.3 kB
├ ƒ /api/webhooks/stripe                 0 B                0 B
├ ○ /login/[[...sign-in]]                142 B          87.3 kB
├ ○ /subscription                        142 B          87.3 kB
└ ○ /transactions                        142 B          87.3 kB

○  (Static)  prerendered as static content
ƒ  (Dynamic) server-rendered on demand

✓ Compiled successfully
```

---

## 7. Verificação da Instalação

### 7.1 Checklist Completo

Execute os seguintes testes:

#### ✅ Servidor rodando
```bash
curl http://localhost:3000
# Deve retornar HTML da página
```

#### ✅ Banco de dados conectado
```bash
npx prisma db pull
# Deve conectar sem erros
```

#### ✅ Clerk funcionando
1. Acesse http://localhost:3000
2. Clique em "Sign in"
3. Crie uma conta de teste
4. Deve redirecionar para dashboard

#### ✅ Transações funcionando
1. Após login, vá para "Transações"
2. Clique em "Adicionar transação"
3. Preencha formulário
4. Salve
5. Transação deve aparecer na lista

#### ✅ IA funcionando
1. No dashboard, clique em "Relatório IA"
2. Aguarde geração (5-10s)
3. Relatório deve aparecer em Markdown

#### ✅ Stripe funcionando
1. Vá para "Assinatura"
2. Clique em "Adquirir plano Premium"
3. Deve redirecionar para Stripe Checkout
4. Use cartão de teste: `4242 4242 4242 4242`
5. Após pagamento, deve atualizar subscription

---

### 7.2 Script de Verificação Automática

```bash
# Criar script
cat > verify-setup.sh << 'EOF'
#!/bin/bash

echo "🔍 Verificando instalação do Monettis App..."
echo ""

# Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js $(node --version)"
else
    echo "❌ Node.js não instalado"
fi

# npm
if command -v npm &> /dev/null; then
    echo "✅ npm $(npm --version)"
else
    echo "❌ npm não instalado"
fi

# Git
if command -v git &> /dev/null; then
    echo "✅ Git $(git --version)"
else
    echo "❌ Git não instalado"
fi

# .env existe
if [ -f .env ]; then
    echo "✅ Arquivo .env existe"
else
    echo "❌ Arquivo .env não encontrado"
fi

# node_modules existe
if [ -d node_modules ]; then
    echo "✅ Dependências instaladas"
else
    echo "❌ Dependências não instaladas (execute npm install)"
fi

# Prisma Client gerado
if [ -d node_modules/.prisma ]; then
    echo "✅ Prisma Client gerado"
else
    echo "❌ Prisma Client não gerado (execute npx prisma generate)"
fi

echo ""
echo "Verificação concluída!"
EOF

chmod +x verify-setup.sh
./verify-setup.sh
```

---

## 8. Troubleshooting

### 8.1 Erro: "Cannot find module"

**Problema**: Dependências não instaladas

**Solução**:
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

### 8.2 Erro: "Prisma Client not found"

**Problema**: Prisma Client não gerado

**Solução**:
```bash
npx prisma generate
```

---

### 8.3 Erro de Conexão com Banco de Dados

**Problema**: `DATABASE_URL` incorreta ou banco não acessível

**Diagnóstico**:
```bash
# Testar conexão
npx prisma db pull
```

**Soluções**:

1. Verificar `DATABASE_URL` no `.env`
2. Verificar se PostgreSQL está rodando:
   ```bash
   # macOS/Linux
   sudo systemctl status postgresql

   # macOS (Homebrew)
   brew services list
   ```
3. Verificar firewall/portas
4. Testar conexão manual:
   ```bash
   psql "postgresql://user:pass@host:5432/dbname"
   ```

---

### 8.4 Erro: "Clerk is not configured"

**Problema**: Chaves do Clerk ausentes ou incorretas

**Solução**:
1. Verificar `.env`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` presente
   - `CLERK_SECRET_KEY` presente
2. Reiniciar servidor dev
3. Limpar cache do navegador

---

### 8.5 Erro: "Stripe webhook signature invalid"

**Problema**: Webhook secret incorreto

**Solução (desenvolvimento local)**:
```bash
# Usar Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copiar o novo webhook secret que aparece
# Atualizar STRIPE_WEBHOOK_SECRET no .env
```

---

### 8.6 Erro: "OpenAI API key invalid"

**Problema**: Chave incorreta ou sem créditos

**Solução**:
1. Verificar chave em [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Verificar saldo em [Billing](https://platform.openai.com/account/billing)
3. Criar nova chave se necessário

---

### 8.7 Porta 3000 já em uso

**Problema**: Outra aplicação usando porta 3000

**Solução**:
```bash
# Usar outra porta
PORT=3001 npm run dev

# OU matar processo na porta 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 9. Ambientes

### 9.1 Desenvolvimento Local

```env
NODE_ENV=development
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost/monettis_dev
```

---

### 9.2 Staging (Vercel/Railway)

```env
NODE_ENV=production
APP_URL=https://monettis-staging.vercel.app
DATABASE_URL=<staging-database-url>
```

---

### 9.3 Produção

```env
NODE_ENV=production
APP_URL=https://monettis.com
DATABASE_URL=<production-database-url>

# Usar chaves de PRODUÇÃO do Stripe (pk_live_, sk_live_)
```

---

## 10. Próximos Passos

### 10.1 Após Instalação Bem-Sucedida

1. **Ler Documentação**:
   - [Arquitetura do Sistema](arquitetura-sistema.md)
   - [Guia de Desenvolvimento](guia-desenvolvimento.md)
   - [Padrões de Código](padroes-codigo.md)

2. **Explorar o Código**:
   - `app/` - Estrutura do Next.js
   - `prisma/schema.prisma` - Schema do banco
   - `app/_components/` - Componentes reutilizáveis

3. **Começar a Desenvolver**:
   - Escolha uma issue/tarefa
   - Crie uma branch
   - Implemente
   - Abra Pull Request

---

### 10.2 Deploy

**Vercel (Recomendado para Next.js)**:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

**Configurar variáveis de ambiente no Vercel**:
1. Dashboard > Project > Settings > Environment Variables
2. Adicionar todas as variáveis do `.env`
3. Redeploy

---

### 10.3 Monitoramento

Configurar ferramentas de monitoramento:

- **Vercel Analytics**: Automático no Vercel
- **Sentry**: Para error tracking
- **LogRocket**: Para session replay
- **Prisma Pulse**: Para monitorar queries

---

## 11. Recursos Adicionais

### 11.1 Links Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### 11.2 Comunidade

- Discord do projeto: [link]
- GitHub Discussions: [link]
- Stack Overflow tag: `monettis`

---

**Aprovado por**: [Nome]
**Data de Aprovação**: [Data]
**Próxima Revisão**: [Data]
