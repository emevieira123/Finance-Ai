import { auth } from "@clerk/nextjs/server";
import { AddTransactionButton } from "../_components/shared/add-transaction-button";
import { Navbar } from "../_components/shared/navbar";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { validateAuthentication } from "../_utils/validateAuthentication";
import { transactionColumns } from "./_columns";

export default async function TransactionsPage() {
  validateAuthentication();
  const { userId } = await auth();

  const transactions = await db.transaction.findMany({
    where: { userId: userId as string },
    orderBy: { name: "desc" },
  });

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>

        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
}
