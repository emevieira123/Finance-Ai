"use client";

import { upsertTransaction } from "@/app/_actions/add-transaction";
import { TransactionSelect } from "@/app/transactions/_components/transaction-select";
import { useDialog } from "@/app/transactions/_hooks/useDialog";
import {
  TransactionRequestType,
  defaultValues,
  transactionRequestSchema,
} from "@/app/transactions/_types/transaction-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
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
import { useEffect } from "react";

export function UpsertTransactionDialog() {
  const { isOpen, onOpen, onClose, id, transaction, setTransaction } =
    useDialog();
  const methods = useForm<TransactionRequestType>({
    resolver: zodResolver(transactionRequestSchema),
  });

  const { reset } = methods;

  useEffect(() => {
    if (transaction) {
      reset({
        ...transaction,
        amount: Number(transaction.amount),
      });
    }
  }, [reset, transaction]);

  async function onSubmit(data: TransactionRequestType) {
    try {
      await upsertTransaction({ ...data, id });
      onClose(false);
      methods.reset(defaultValues);
      setTransaction(undefined);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpen(open);
        if (!open) {
          methods.reset(defaultValues);
          setTransaction(undefined);
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {id ? "Atualizar transação" : "Adicionar transação"}
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={methods.control}
              name="amount"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <MoneyInput
                        placeholder="Digite o valor..."
                        onValueChange={({ floatValue }) =>
                          field.onChange(floatValue)
                        }
                        // {...field}
                        value={Number(field.value)}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
              control={methods.control}
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
              <Button type="submit">{id ? "Atualizar" : "Adicionar"}</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
