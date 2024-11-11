import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { FieldPath, useFormContext } from "react-hook-form";
import { TransactionRequestType } from "../_types/transaction-request";

type optionType = {
  label: string;
  value: string;
};

interface SelectTransactionProps {
  name: FieldPath<TransactionRequestType>;
  label?: string;
  options: optionType[];
  placeholder?: string;
}

export function TransactionSelect({
  name,
  options,
  label,
  placeholder,
}: SelectTransactionProps) {
  const { control } = useFormContext<TransactionRequestType>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ?? "Selecione"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
