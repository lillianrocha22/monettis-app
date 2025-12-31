import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Obtém o userId do ambiente ou usa um padrão
  const userId = process.env.SEED_USER_ID;

  if (!userId) {
    console.error("❌ ERRO: Forneça o SEED_USER_ID");
    console.log("\nPara obter seu User ID:");
    console.log("1. Faça login na aplicação");
    console.log("2. Abra o DevTools (F12)");
    console.log("3. Execute: window.Clerk.user.id");
    console.log("4. Copie o ID retornado");
    console.log(
      "\nExecute: SEED_USER_ID=seu_user_id_aqui npm run seed\n",
    );
    process.exit(1);
  }

  console.log("🌱 Iniciando seed do banco de dados...\n");

  // Data base - usando UTC para evitar problemas de timezone
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11 (0 = Janeiro, 11 = Dezembro)
  const currentYear = now.getFullYear();

  // Helper para criar datas em UTC ao meio-dia (evita problemas de timezone)
  const createDate = (year: number, month: number, day: number) => {
    return new Date(Date.UTC(year, month, day, 12, 0, 0));
  };

  // Limpar transações existentes do usuário (opcional)
  const deleted = await prisma.transaction.deleteMany({
    where: { userId },
  });
  console.log(`🗑️  Removidas ${deleted.count} transações antigas\n`);

  // Criar transações de exemplo
  const transactions = [
    // RECEITAS (DEPOSIT)
    {
      name: "Salário Dezembro",
      type: "DEPOSIT" as const,
      amount: 5000.0,
      category: "SALARY" as const,
      paymentMethod: "BANK_TRANSFER" as const,
      date: createDate(currentYear, currentMonth, 1),
      userId,
    },
    {
      name: "Freelance - Projeto Website",
      type: "DEPOSIT" as const,
      amount: 1500.0,
      category: "OTHER" as const,
      paymentMethod: "PIX" as const,
      date: createDate(currentYear, currentMonth, 15),
      userId,
    },

    // DESPESAS (EXPENSE)
    {
      name: "Aluguel",
      type: "EXPENSE" as const,
      amount: 1200.0,
      category: "HOUSING" as const,
      paymentMethod: "BANK_TRANSFER" as const,
      date: createDate(currentYear, currentMonth, 5),
      userId,
    },
    {
      name: "Conta de Luz",
      type: "EXPENSE" as const,
      amount: 150.0,
      category: "UTILITY" as const,
      paymentMethod: "BANK_SLIP" as const,
      date: createDate(currentYear, currentMonth, 10),
      userId,
    },
    {
      name: "Internet",
      type: "EXPENSE" as const,
      amount: 99.9,
      category: "UTILITY" as const,
      paymentMethod: "CREDIT_CARD" as const,
      date: createDate(currentYear, currentMonth, 8),
      userId,
    },
    {
      name: "Supermercado",
      type: "EXPENSE" as const,
      amount: 450.0,
      category: "FOOD" as const,
      paymentMethod: "DEBIT_CARD" as const,
      date: createDate(currentYear, currentMonth, 12),
      userId,
    },
    {
      name: "Restaurante",
      type: "EXPENSE" as const,
      amount: 85.5,
      category: "FOOD" as const,
      paymentMethod: "CREDIT_CARD" as const,
      date: createDate(currentYear, currentMonth, 18),
      userId,
    },
    {
      name: "Uber",
      type: "EXPENSE" as const,
      amount: 32.0,
      category: "TRANSPORTATION" as const,
      paymentMethod: "CREDIT_CARD" as const,
      date: createDate(currentYear, currentMonth, 14),
      userId,
    },
    {
      name: "Gasolina",
      type: "EXPENSE" as const,
      amount: 250.0,
      category: "TRANSPORTATION" as const,
      paymentMethod: "DEBIT_CARD" as const,
      date: createDate(currentYear, currentMonth, 20),
      userId,
    },
    {
      name: "Netflix",
      type: "EXPENSE" as const,
      amount: 39.9,
      category: "ENTERTAINMENT" as const,
      paymentMethod: "CREDIT_CARD" as const,
      date: createDate(currentYear, currentMonth, 7),
      userId,
    },
    {
      name: "Cinema",
      type: "EXPENSE" as const,
      amount: 60.0,
      category: "ENTERTAINMENT" as const,
      paymentMethod: "PIX" as const,
      date: createDate(currentYear, currentMonth, 22),
      userId,
    },
    {
      name: "Academia",
      type: "EXPENSE" as const,
      amount: 120.0,
      category: "HEALTH" as const,
      paymentMethod: "CREDIT_CARD" as const,
      date: createDate(currentYear, currentMonth, 3),
      userId,
    },
    {
      name: "Farmácia",
      type: "EXPENSE" as const,
      amount: 45.0,
      category: "HEALTH" as const,
      paymentMethod: "DEBIT_CARD" as const,
      date: createDate(currentYear, currentMonth, 16),
      userId,
    },
    {
      name: "Curso Online",
      type: "EXPENSE" as const,
      amount: 200.0,
      category: "EDUCATION" as const,
      paymentMethod: "CREDIT_CARD" as const,
      date: createDate(currentYear, currentMonth, 11),
      userId,
    },

    // INVESTIMENTOS (INVESTMENT)
    {
      name: "Tesouro Direto",
      type: "INVESTMENT" as const,
      amount: 500.0,
      category: "OTHER" as const,
      paymentMethod: "BANK_TRANSFER" as const,
      date: createDate(currentYear, currentMonth, 6),
      userId,
    },
    {
      name: "Ações - XYZ",
      type: "INVESTMENT" as const,
      amount: 800.0,
      category: "OTHER" as const,
      paymentMethod: "BANK_TRANSFER" as const,
      date: createDate(currentYear, currentMonth, 13),
      userId,
    },

    // Mês anterior (Novembro)
    {
      name: "Salário Novembro",
      type: "DEPOSIT" as const,
      amount: 5000.0,
      category: "SALARY" as const,
      paymentMethod: "BANK_TRANSFER" as const,
      date: createDate(currentYear, currentMonth - 1, 1),
      userId,
    },
    {
      name: "Aluguel Novembro",
      type: "EXPENSE" as const,
      amount: 1200.0,
      category: "HOUSING" as const,
      paymentMethod: "BANK_TRANSFER" as const,
      date: createDate(currentYear, currentMonth - 1, 5),
      userId,
    },
    {
      name: "Supermercado Novembro",
      type: "EXPENSE" as const,
      amount: 480.0,
      category: "FOOD" as const,
      paymentMethod: "DEBIT_CARD" as const,
      date: createDate(currentYear, currentMonth - 1, 12),
      userId,
    },
    {
      name: "Investimento Novembro",
      type: "INVESTMENT" as const,
      amount: 600.0,
      category: "OTHER" as const,
      paymentMethod: "BANK_TRANSFER" as const,
      date: createDate(currentYear, currentMonth - 1, 15),
      userId,
    },
  ];

  console.log(`📝 Criando ${transactions.length} transações...\n`);

  let created = 0;
  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    });
    created++;
    console.log(
      `✅ ${created}/${transactions.length} - ${transaction.name} (${transaction.type})`,
    );
  }

  console.log(`\n✨ Seed concluído! ${created} transações criadas com sucesso.`);
  console.log(
    `\n💡 Acesse http://localhost:3000 para ver os dados no dashboard.\n`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
