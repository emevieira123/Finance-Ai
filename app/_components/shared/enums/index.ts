import { TransactionPaymentMethod } from "@prisma/client";

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TransactionPaymentMethod.CASH]: "money.svg",
  [TransactionPaymentMethod.PIX]: "pix.svg",
  [TransactionPaymentMethod.OTHER]: "other.svg",
};

export enum TRANSACTION_CATEGORY_LABELS {
  EDUCATION = "Educação",
  ENTERTAINMENT = "Entreterimento",
  FOOD = "Alimentação",
  HEALTH = "Saúde",
  HOUSING = "Moradia",
  OTHER = "Outros",
  SALARY = "Salário",
  TRANSPORTATION = "Transporte",
  UTILITY = "Utilidades",
}

export enum TRANSACTION_PAYMENT_METHOD_LABELS {
  BANK_TRANSFER = "Transferência Bancária",
  BANK_SLIP = "Boleto Bancário",
  CASH = "Dinheiro",
  CREDIT_CARD = "Cartão de crédito",
  DEBIT_CARD = "Cartão de débito",
  OTHER = "Outros",
  PIX = "Pix",
}

export enum TRANSACTION_TYPE {
  EXPENSE = "Despesa",
  DEPOSIT = "Depósito",
  INVESTIMENT = "Investimento",
}
