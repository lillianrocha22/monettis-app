import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { cn } from "@/app/_lib/utils";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
  className?: string;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransaction,
  className,
}: SummaryCardProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center gap-2 md:gap-4">
        {icon}
        <p className="text-sm text-muted-foreground md:text-base">{title}</p>
      </CardHeader>
      <CardContent
        className={cn(
          "flex",
          size === "large"
            ? "flex-col gap-4 md:flex-row md:items-center md:justify-between"
            : "justify-between"
        )}
      >
        <p
          className={cn(
            "font-bold",
            size === "small"
              ? "text-xl md:text-2xl"
              : "text-2xl md:text-4xl"
          )}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton
            userCanAddTransaction={userCanAddTransaction}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
