import { create } from "zustand";
import { TransactionRequestType } from "../_types/transaction-request";

interface State {
  isOpen: boolean;
  id?: string;
  transaction?: TransactionRequestType;
  onOpen: (isOpen: boolean) => void;
  onClose: (isOpen: boolean) => void;
  onOpenEdit: (isOpen: boolean, id?: string) => void;
  setTransaction: (transaction?: TransactionRequestType) => void;
}

export const useDialog = create<State>((set) => ({
  isOpen: false,
  onOpen: (isOpen) => set((state) => ({ ...state, isOpen })),
  onClose: (isOpen) => set((state) => ({ ...state, isOpen })),
  onOpenEdit: (isOpen, id) => set((state) => ({ ...state, isOpen, id })),
  setTransaction: (transaction) => set((state) => ({ ...state, transaction })),
}));
