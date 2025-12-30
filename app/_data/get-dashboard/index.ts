import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { startOfMonth, endOfMonth } from "date-fns";

export const getDashboard = async (month: string, year: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const referenceDate = new Date(`${year}-${month}-01`);
  const where = {
    userId,
    date: {
      gte: startOfMonth(referenceDate),
      lt: endOfMonth(referenceDate),
    },
  };
  // Execute 3 queries in parallel using $transaction (reduced from 6 sequential queries)
  const [transactionsByType, expensesByCategory, lastTransactions] =
    await db.$transaction([
      // Query 1: GroupBy type to get totals for each transaction type
      db.transaction.groupBy({
        by: ["type"],
        where,
        _sum: { amount: true },
        orderBy: { type: "asc" },
      }),
      // Query 2: GroupBy category for expense breakdown
      db.transaction.groupBy({
        by: ["category"],
        where: {
          ...where,
          type: TransactionType.EXPENSE,
        },
        _sum: { amount: true },
        orderBy: { category: "asc" },
      }),
      // Query 3: Last 15 transactions
      db.transaction.findMany({
        where,
        orderBy: { date: "desc" },
        take: 15,
      }),
    ]);

  // Extract totals from transactionsByType groupBy result
  const totalsMap = transactionsByType.reduce(
    (acc, item) => {
      acc[item.type] = Number(item._sum?.amount || 0);
      return acc;
    },
    {
      [TransactionType.DEPOSIT]: 0,
      [TransactionType.EXPENSE]: 0,
      [TransactionType.INVESTIMENT]: 0,
    } as Record<TransactionType, number>,
  );

  const depositsTotal = totalsMap[TransactionType.DEPOSIT];
  const investmentsTotal = totalsMap[TransactionType.INVESTIMENT];
  const expensesTotal = totalsMap[TransactionType.EXPENSE];
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal =
    depositsTotal + investmentsTotal + expensesTotal;

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (depositsTotal / (transactionsTotal || 1)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (expensesTotal / (transactionsTotal || 1)) * 100,
    ),
    [TransactionType.INVESTIMENT]: Math.round(
      (investmentsTotal / (transactionsTotal || 1)) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] =
    expensesByCategory.map((category) => ({
      category: category.category,
      totalAmount: Number(category._sum?.amount || 0),
      percentageOfTotal: Math.round(
        (Number(category._sum?.amount || 0) / (expensesTotal || 1)) * 100,
      ),
    }));
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
};