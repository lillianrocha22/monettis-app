# Ambiente de Desenvolvimento com Docker

Este guia explica como configurar e usar o PostgreSQL via Docker para desenvolvimento local.

## Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando

## Configuração Inicial

### 1. Copiar arquivo de ambiente

```bash
cp .env.local.example .env.local
```

### 2. Configurar variáveis de ambiente no `.env.local`

Edite o arquivo `.env.local` e configure as chaves necessárias (Clerk, Stripe, OpenAI).

**Importante:** A `DATABASE_URL` já está configurada para o PostgreSQL do Docker:
```
DATABASE_URL="postgresql://monettis:monettis_dev_password@localhost:5432/monettis_dev"
```

### 3. Iniciar o banco de dados

```bash
docker-compose up -d
```

Comandos úteis:
- `docker-compose up -d` - Inicia o container em background
- `docker-compose down` - Para e remove o container
- `docker-compose logs -f` - Visualiza os logs
- `docker-compose ps` - Lista containers rodando

### 4. Executar migrations

```bash
npx prisma migrate dev
```

### 5. (Opcional) Seed do banco de dados

```bash
npx prisma db seed
```

## Estrutura do Docker Compose

O arquivo `docker-compose.yml` configura:

- **Imagem:** PostgreSQL 16 Alpine (leve e rápida)
- **Porta:** 5432 (padrão PostgreSQL)
- **Credenciais:**
  - Usuário: `monettis`
  - Senha: `monettis_dev_password`
  - Database: `monettis_dev`
- **Volume:** `postgres_data` para persistência dos dados
- **Health check:** Verifica se o banco está pronto

## Persistência de Dados

Os dados são armazenados em um volume Docker chamado `postgres_data`. Isso significa que:

- ✅ Dados persistem entre reinicializações do container
- ✅ Dados não são perdidos ao parar o container
- ⚠️ Para **limpar** os dados: `docker-compose down -v`

## Comandos Úteis

### Acessar o banco via CLI

```bash
docker exec -it monettis-postgres-dev psql -U monettis -d monettis_dev
```

### Ver logs do PostgreSQL

```bash
docker-compose logs -f postgres
```

### Resetar banco de dados

```bash
# Opção 1: Apenas limpar dados (mantém o schema)
npx prisma migrate reset

# Opção 2: Remover tudo e recomeçar
docker-compose down -v
docker-compose up -d
npx prisma migrate dev
```

### Backup do banco

```bash
docker exec monettis-postgres-dev pg_dump -U monettis monettis_dev > backup.sql
```

### Restore do banco

```bash
docker exec -i monettis-postgres-dev psql -U monettis monettis_dev < backup.sql
```

## Troubleshooting

### Porta 5432 já está em uso

Se você já tem PostgreSQL instalado localmente, pode:

1. Parar o PostgreSQL local: `net stop postgresql-x64-XX` (Windows)
2. Ou mudar a porta no `docker-compose.yml`:
   ```yaml
   ports:
     - "5433:5432"  # Usar porta 5433 localmente
   ```
   E atualizar a `DATABASE_URL` no `.env.local`:
   ```
   DATABASE_URL="postgresql://monettis:monettis_dev_password@localhost:5433/monettis_dev"
   ```

### Container não inicia

```bash
# Ver logs completos
docker-compose logs postgres

# Remover e recriar
docker-compose down -v
docker-compose up -d
```

### Erro de conexão no Prisma

1. Verificar se o container está rodando: `docker-compose ps`
2. Verificar se o banco está saudável: `docker-compose ps` (deve mostrar "healthy")
3. Testar conexão manual: `docker exec -it monettis-postgres-dev psql -U monettis -d monettis_dev`

## Separação de Ambientes

### Desenvolvimento Local (Docker)
- Arquivo: `.env.local`
- Database: `monettis_dev` (Docker)
- URL: `postgresql://monettis:monettis_dev_password@localhost:5432/monettis_dev`

### Produção (Neon)
- Arquivo: `.env`
- Database: Neon (cloud)
- URL: Configurada no Neon

O Next.js carrega variáveis de ambiente na seguinte ordem de prioridade:
1. `.env.local` (maior prioridade)
2. `.env.development` / `.env.production`
3. `.env`

Isso significa que quando você tem `.env.local`, ele sobrescreve `.env` automaticamente.

## Segurança

⚠️ **Importante:**
- Nunca commite `.env.local` no Git (já está no `.gitignore`)
- As credenciais do Docker são apenas para desenvolvimento local
- Use senhas fortes em produção
