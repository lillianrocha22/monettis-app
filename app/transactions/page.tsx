import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import TransactionCardList from "./_components/transaction-card-list";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          {/* Botão visível apenas em tablet/desktop */}
          <div className="hidden md:block">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        </div>

        {/* Tabela para tablet/desktop com scroll horizontal */}
        <div className="hidden md:block">
          <ScrollArea className="h-full">
            <div className="overflow-x-auto">
              <DataTable
                columns={transactionColumns}
                data={JSON.parse(JSON.stringify(transactions))}
              />
            </div>
          </ScrollArea>
        </div>

        {/* Cards para mobile */}
        <div className="md:hidden">
          <ScrollArea className="h-full">
            <TransactionCardList
              transactions={JSON.parse(JSON.stringify(transactions))}
            />
          </ScrollArea>
        </div>
      </div>

      {/* FAB para mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <AddTransactionButton
          userCanAddTransaction={userCanAddTransaction}
          variant="mobile"
        />
      </div>
    </>
  );
};

export default TransactionsPage;