"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionSchema) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Verify ownership before deletion
  const transaction = await db.transaction.findUnique({
    where: {
      id: transactionId,
    },
    select: {
      userId: true,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  if (transaction.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });
  revalidatePath("/transactions");
  revalidatePath("/");
};