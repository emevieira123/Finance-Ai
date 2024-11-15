import { UpsertTransactionDialog } from "@/app/_components/shared/upsert-transaction-dialog";
import { Button } from "@/app/_components/ui/button";
import { Transaction } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useDialog } from "../_hooks/useDialog";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

export function EditTransactionButton({
  transaction,
}: EditTransactionButtonProps) {
  const { onOpenEdit, setTransaction } = useDialog();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => {
          onOpenEdit(true, transaction.id);
          setTransaction({
            ...transaction,
            amount: Number(transaction.amount),
          });
        }}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog />
    </>
  );
}
