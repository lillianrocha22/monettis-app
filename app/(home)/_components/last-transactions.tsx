import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }
    return "text-muted-foreground";
  };
  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };
  return (
    <ScrollArea className="order-last rounded-md border lg:order-none">
      <CardHeader className="flex-row items-center justify-between p-4 md:p-6">
        <CardTitle className="text-base font-bold md:text-lg">
          Últimas Transações
        </CardTitle>
        <Button
          variant="outline"
          className="h-8 rounded-full px-3 text-xs font-bold md:h-10 md:px-4 md:text-sm"
          asChild
        >
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 md:space-y-6 md:p-6 md:pt-0">
        {lastTransactions.slice(0, 10).map((transaction, index) => (
          <div
            key={transaction.id}
            className={`flex items-center justify-between ${
              index >= 5 ? "hidden md:flex" : ""
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-2 text-muted-foreground md:p-3">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  height={16}
                  width={16}
                  alt="Método de pagamento"
                  className="h-4 w-4 md:h-5 md:w-5"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold md:text-sm">
                  {transaction.name}
                </p>
                <p className="text-xs text-muted-foreground md:text-sm">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p
              className={`whitespace-nowrap text-xs font-bold md:text-sm ${getAmountColor(transaction)}`}
            >
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;