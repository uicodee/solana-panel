import {create} from "zustand";

interface CreateAccountState {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const useCreateAccount = create<CreateAccountState>()((set) => ({
    open: false,
    setOpen: (open) => set(() => ({open: open})),
}));
