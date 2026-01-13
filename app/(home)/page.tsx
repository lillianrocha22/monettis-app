import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import YearSelect from "./_components/year-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";
import { getAvailableYears } from "../_data/get-available-years";

interface HomeProps {
  searchParams: {
    month: string;
    year: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentYear = currentDate.getFullYear();

  // Validação combinada (evita dois redirects)
  const monthIsInvalid = !month || !isMatch(month, "MM");
  const yearNumber = year ? parseInt(year, 10) : null;
  const yearIsInvalid = !year || isNaN(yearNumber!) || yearNumber! < 2000 || yearNumber! > currentYear + 1;

  if (monthIsInvalid || yearIsInvalid) {
    const validMonth = monthIsInvalid ? currentMonth : month;
    const validYear = yearIsInvalid ? currentYear : yearNumber;
    redirect(`?month=${validMonth}&year=${validYear}`);
  }

  const dashboard = await getDashboard(month, yearNumber!.toString());
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);
  const availableYears = await getAvailableYears();
  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-4 overflow-hidden p-4 md:space-y-6 md:p-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <YearSelect availableYears={availableYears} />
            <TimeSelect />
            <AiReportButton
              month={month}
              year={yearNumber!.toString()}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
          </div>
        </div>
        {/* GRID PRINCIPAL */}
        <div className="grid h-full grid-cols-1 gap-4 overflow-hidden md:gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-4 overflow-hidden md:gap-6">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid h-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;