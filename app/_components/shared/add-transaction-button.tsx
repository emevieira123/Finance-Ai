"use client";

import { ArrowDownUp } from "lucide-react";
import { Button } from "../ui/button";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";
import { useDialog } from "@/app/transactions/_hooks/useDialog";

export function AddTransactionButton() {
  const { onOpen } = useDialog();

  return (
    <>
      <Button className="rounded-full font-bold" onClick={() => onOpen(true)}>
        Adicionar transação
        <ArrowDownUp className="ml-2" />
      </Button>
      <UpsertTransactionDialog />
    </>
  );
}
