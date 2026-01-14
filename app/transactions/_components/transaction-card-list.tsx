import { Transaction } from "@prisma/client";
import TransactionCard from "./transaction-card";

interface TransactionCardListProps {
  transactions: Transaction[];
}

const TransactionCardList = ({ transactions }: TransactionCardListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="flex h-24 items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">Nenhuma transação encontrada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionCardList;
