import { isMatch } from "date-fns";
import { Navbar } from "../_components/shared/navbar";
import { validateAuthentication } from "../_utils/validateAuthentication";
import { SumaryCards } from "./_components/sumary-cards";
import { TimeSelect } from "./_components/time-select";
import { redirect } from "next/navigation";
import { getDashboard } from "../_data/get-dashboard";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import { LastTransactions } from "./_components/last-transactions";

interface HomeProps {
  searchParams: { month: string };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  validateAuthentication();

  const monthIdInvalid = !month || !isMatch(month, "MM");
  if (monthIdInvalid) {
    redirect("/?month=1");
  }

  const dashboard = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SumaryCards month={month} {...dashboard} />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          {/* LastTransations */}
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
}
