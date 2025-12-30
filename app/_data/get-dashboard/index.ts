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
      [TransactionType.INVESTMENT]: 0,
    } as Record<TransactionType, number>,
  );

  const depositsTotal = totalsMap[TransactionType.DEPOSIT] || 0;
  const investmentsTotal = totalsMap[TransactionType.INVESTMENT] || 0;
  const expensesTotal = totalsMap[TransactionType.EXPENSE] || 0;
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal =
    depositsTotal + investmentsTotal + expensesTotal;

  // Helper function to safely calculate percentage and avoid NaN
  const safePercentage = (value: number, total: number): number => {
    if (!total || total === 0) return 0;
    const percentage = Math.round((value / total) * 100);
    return isNaN(percentage) ? 0 : percentage;
  };

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: safePercentage(depositsTotal, transactionsTotal),
    [TransactionType.EXPENSE]: safePercentage(expensesTotal, transactionsTotal),
    [TransactionType.INVESTMENT]: safePercentage(
      investmentsTotal,
      transactionsTotal,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] =
    expensesByCategory.map((category) => {
      const amount = Number(category._sum?.amount || 0);
      return {
        category: category.category,
        totalAmount: amount,
        percentageOfTotal: safePercentage(amount, expensesTotal),
      };
    });
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