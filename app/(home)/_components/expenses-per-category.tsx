import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-1 h-full max-h-[300px] rounded-md border pb-6 md:col-span-2 md:max-h-none">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-base font-bold md:text-lg">
          Gastos por Categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-4 pt-0 md:space-y-6 md:p-6 md:pt-0">
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-xs font-bold md:text-sm">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-xs font-bold md:text-sm">
                {category.percentageOfTotal}%
              </p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;