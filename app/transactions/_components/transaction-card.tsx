import { Transaction } from "@prisma/client";
import TransactionTypeBadge from "./type-badge";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import EditTransactionButton from "./edit-transaction-button";
import DeleteTransactionButton from "./delete-transaction-button";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const formattedDate = new Date(transaction.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(transaction.amount));

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="font-bold text-foreground">{transaction.name}</h3>

      <div className="mt-1">
        <TransactionTypeBadge transaction={transaction} />
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {TRANSACTION_CATEGORY_LABELS[transaction.category]} ·{" "}
        {TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]}
      </p>

      <p className="text-sm text-muted-foreground">{formattedDate}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-semibold">{formattedAmount}</span>
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
