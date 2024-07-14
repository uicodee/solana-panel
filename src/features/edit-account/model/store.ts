import {create} from "zustand";
import {Account} from "@/shared/model/account";

interface EditAccountState {
    open: boolean;
    account: null | Account;
    setOpen: (open: boolean) => void;
    setAccount: (account: Account) => void;
}

export const useEditAccount = create<EditAccountState>()((set) => ({
    open: false,
    account: null,
    setOpen: (open) => set(() => ({open: open})),
    setAccount: (account: Account) => set(() => ({account: account})),
}));
