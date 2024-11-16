import { isMatch } from "date-fns";
import { Navbar } from "../_components/shared/navbar";
import { validateAuthentication } from "../_utils/validateAuthentication";
import { SumaryCards } from "./_components/sumary-cards";
import { TimeSelect } from "./_components/time-select";
import { redirect } from "next/navigation";

interface HomeProps {
  searchParams: { month: string };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  validateAuthentication();

  const monthIdInvalid = !month || !isMatch(month, "MM");
  if (monthIdInvalid) {
    redirect("/?month=1");
  }

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SumaryCards month={month} />
      </div>
    </>
  );
}
