# 🚨 ALERTA DE SEGURANÇA - AÇÃO IMEDIATA NECESSÁRIA

## Situação Identificada

O arquivo `.env` com credenciais sensíveis foi commitado ao Git e enviado ao repositório público do GitHub.

### Linha do Tempo da Exposição

1. **28/Nov/2025** (commit `c1563cb`) - Primeiro commit com `.env` contendo:
   - DATABASE_URL (PostgreSQL/Neon)

2. **28/Nov/2025** (commit `501a683`) - Adicionadas credenciais do Clerk:
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY

3. **22/Dez/2025** (commit `933d12e`) - Adicionadas credenciais do Stripe:
   - STRIPE_SECRET_KEY
   - STRIPE_PREMIUM_PLAN_PRICE_ID
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - STRIPE_WEBHOOK_SECRET
   - NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL

4. **24/Dez/2025** (commit `a15407e`) - `.env` removido do tracking
   - ✅ Arquivo não é mais rastreado
   - ⚠️ **MAS credenciais ainda estão no histórico público**

### Credenciais Expostas

Atualmente expostas no histórico do GitHub (`https://github.com/lillianrocha22/monettis-app.git`):

- ✅ **DATABASE_URL**: `postgresql://neondb_owner:npg_CbvD0lPiZ4tE@ep-curly-fog-add0mz8w-pooler...`
- ✅ **CLERK_SECRET_KEY**: `sk_test_rNH2Ew33D75vAuhiBSOJFqUNWIuIFwZ1FxweaqTqpy`
- ✅ **STRIPE_SECRET_KEY**: `sk_test_51Sg4BGLvhGB2cXt6H9FKo6NV4l2D7jUcYsvx1bR...`
- ✅ **STRIPE_WEBHOOK_SECRET**: `whsec_763a12d506cf662e0c118e5aa283b223c40dbf52d80dd1c3828c481a4ed24db2`
- ✅ **OPENAI_API_KEY**: `sk-proj-LeO86rjwjoup5DWLxnSqJwzbbGH_T8r9JYFPUUu_Ys1F...`

---

## ⚠️ AÇÕES IMEDIATAS NECESSÁRIAS

### 1. Rotacionar TODAS as Credenciais (PRIORIDADE CRÍTICA)

#### a) Banco de Dados (Neon)
1. Acesse: https://console.neon.tech/
2. Navegue até seu projeto
3. Vá em **Settings** → **Reset Password**
4. Ou crie um novo database e migre os dados
5. Atualize `DATABASE_URL` no seu `.env` local

#### b) Clerk (Autenticação)
1. Acesse: https://dashboard.clerk.com/
2. Vá em **API Keys**
3. Clique em **Regenerate** para a Secret Key
4. Atualize `CLERK_SECRET_KEY` no `.env` local
5. A Publishable Key pode permanecer (não é sensível)

#### c) Stripe (Pagamentos)
1. Acesse: https://dashboard.stripe.com/test/apikeys
2. Role até **Secret Key** → Clique em **Roll key**
3. Vá em **Developers** → **Webhooks**
4. Delete o webhook antigo e crie um novo
5. Copie o novo webhook secret
6. Atualize no `.env` local:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`

#### d) OpenAI
1. Acesse: https://platform.openai.com/api-keys
2. **REVOGUE** a chave antiga imediatamente
3. Crie uma nova API key
4. Atualize `OPENAI_API_KEY` no `.env` local

### 2. Verificar Uso Não Autorizado

Antes de rotacionar, verifique se houve uso malicioso:

- **Neon**: Verifique queries suspeitas no dashboard
- **Clerk**: Verifique logs de autenticação em https://dashboard.clerk.com/
- **Stripe**: Verifique transações em https://dashboard.stripe.com/test/payments
- **OpenAI**: Verifique usage em https://platform.openai.com/usage

### 3. Limpar Histórico do Git (OPCIONAL MAS RECOMENDADO)

#### Opção A: BFG Repo-Cleaner (Mais Fácil)
```bash
# Instalar BFG
# Windows: scoop install bfg
# Mac: brew install bfg

# Criar backup
git clone --mirror https://github.com/lillianrocha22/monettis-app.git monettis-backup.git

# Remover .env do histórico
bfg --delete-files .env monettis-app.git

# Limpar
cd monettis-app.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (CUIDADO!)
git push --force
```

#### Opção B: Git Filter-Branch
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

git push --force --all
```

⚠️ **AVISO**: Force push reescreve o histórico. Coordene com outros colaboradores.

### 4. Atualizar Variáveis de Ambiente em Produção

Se você deployou em alguma plataforma (Vercel, Netlify, etc):

1. Acesse o dashboard da plataforma
2. Vá em **Environment Variables** ou **Settings**
3. Atualize TODAS as variáveis com os novos valores
4. Redeploy a aplicação

---

## ✅ Correções Já Aplicadas

- ✅ `.env` está no `.gitignore` (linha 30)
- ✅ `.env` removido do tracking ativo do Git
- ✅ Criado `.env.example` como template
- ✅ Documentação de segurança criada

---

## 📋 Checklist de Segurança

- [ ] Rotacionar DATABASE_URL (Neon)
- [ ] Rotacionar CLERK_SECRET_KEY
- [ ] Rotacionar STRIPE_SECRET_KEY
- [ ] Rotacionar STRIPE_WEBHOOK_SECRET
- [ ] Rotacionar OPENAI_API_KEY
- [ ] Verificar logs de uso suspeito em todos os serviços
- [ ] Atualizar `.env` local com novas credenciais
- [ ] Atualizar variáveis de ambiente em produção
- [ ] (Opcional) Limpar histórico do Git com BFG
- [ ] Testar aplicação com novas credenciais
- [ ] Configurar alertas de segurança no GitHub

---

## Prevenção Futura

1. **Nunca** commite arquivos `.env`
2. Use `.env.example` para documentar variáveis necessárias
3. Configure **GitHub Secret Scanning** no repositório
4. Use ferramentas como `git-secrets` para prevenir commits acidentais
5. Configure pre-commit hooks para validação

---

## Recursos

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [Neon Security Best Practices](https://neon.tech/docs/security/security-overview)
- [Stripe API Key Security](https://stripe.com/docs/keys)

---

**Data do Alerta**: 29/Dezembro/2025
**Severidade**: 🔴 CRÍTICA
