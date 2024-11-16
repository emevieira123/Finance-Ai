import { AddTransactionButton } from "@/app/_components/shared/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";

interface SumaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactElement;
  size?: "small" | "large";
}

export function SumaryCard({
  title,
  amount,
  icon,
  size = "small",
}: SumaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={
            size === "small" ? "text-muted-foreground" : "text-white opacity-70"
          }
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
}
