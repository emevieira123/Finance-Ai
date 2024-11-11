import { TRANSACTION_TYPE } from "@/app/_components/shared/enums";
import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

export function TypeBadge({ transaction }: { transaction: Transaction }) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        {TRANSACTION_TYPE.DEPOSIT}
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        {TRANSACTION_TYPE.EXPENSE}
      </Badge>
    );
  }
  return (
    <Badge className="bg-white bg-opacity-10 font-bold text-white">
      <CircleIcon className="mr-2 fill-white" size={10} />
      {TRANSACTION_TYPE.INVESTIMENT}
    </Badge>
  );
}
