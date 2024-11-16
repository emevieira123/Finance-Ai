import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { SumaryCard } from "./sumary-card";

interface SumaryCardsProps {
  month: string;
  balance: number;
  investimentTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

export async function SumaryCards({
  // month,
  balance,
  investimentTotal,
  depositsTotal,
  expensesTotal,
}: SumaryCardsProps) {
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
