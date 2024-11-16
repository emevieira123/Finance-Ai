import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { SumaryCard } from "./sumary-card";
import { db } from "@/app/_lib/prisma";

interface SumaryCardsProps {
  month: string;
}

export async function SumaryCards({ month }: SumaryCardsProps) {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        _sum: { amount: true },
        where: { ...where, type: "DEPOSIT" },
      })
    )?._sum?.amount,
  );
  const investimentTotal = Number(
    (
      await db.transaction.aggregate({
        _sum: { amount: true },
        where: { ...where, type: "INVESTIMENT" },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        _sum: { amount: true },
        where: { ...where, type: "EXPENSE" },
      })
    )?._sum?.amount,
  );

  const balance = depositsTotal - investimentTotal - expensesTotal;

  return (
    <div className="space-y-6">
      <SumaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SumaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investimentTotal}
        />
        <SumaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SumaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
}
