"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { ArrowDownUp } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { MoneyInput } from "./money-input";
import {
  TRANSACTON_CATEGORY_OPTIONS,
  TRANSACTON_PAYMENT_METHOD_OPTIONS,
  TRANSACTON_TYPE_OPTIONS,
} from "./options";
import {
  TransactionRequestType,
  transactionRequestSchema,
} from "@/app/transactions/_types/transaction-request";
import { TransactionSelect } from "@/app/transactions/_components/transaction-select";
import { DatePicker } from "../ui/date-picker";
import { addTransaction } from "@/app/_actions/add-transaction";
import { useState } from "react";

export function AddTransactionButton() {
  const [isOpen, onClose] = useState<boolean>(false);
  const form = useForm<TransactionRequestType>({
    resolver: zodResolver(transactionRequestSchema),
    defaultValues: {
      amount: 0,
      category: TransactionCategory.OTHER,
      date: new Date(),
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE,
    },
  });

  async function onSubmit(data: TransactionRequestType) {
    try {
      await addTransaction(data);
      onClose(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onClose(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger>
        <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUp className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <TransactionSelect
              name="type"
              label="Tipo"
              options={TRANSACTON_TYPE_OPTIONS}
              placeholder="Selecione um tipo"
            />
            <TransactionSelect
              name="paymentMethod"
              label="Método de pagamento"
              options={TRANSACTON_PAYMENT_METHOD_OPTIONS}
              placeholder="Selecione um método de pagamento"
            />
            <TransactionSelect
              name="category"
              label="Categoria"
              options={TRANSACTON_CATEGORY_OPTIONS}
              placeholder="Selecione uma categoria"
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
