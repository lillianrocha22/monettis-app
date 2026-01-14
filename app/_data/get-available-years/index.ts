import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getAvailableYears = async (): Promise<number[]> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Query SQL otimizada para PostgreSQL
  const result = await db.$queryRaw<Array<{ year: number }>>`
    SELECT DISTINCT EXTRACT(YEAR FROM date)::integer as year
    FROM "Transaction"
    WHERE "userId" = ${userId}
    ORDER BY year DESC
  `;

  const years = result.map((r) => r.year);
  const currentYear = new Date().getFullYear();

  // Sempre incluir o ano atual na lista
  if (!years.includes(currentYear)) {
    years.push(currentYear);
  }

  // Ordenar em ordem decrescente (ano mais recente primeiro)
  return years.sort((a, b) => b - a);
};
