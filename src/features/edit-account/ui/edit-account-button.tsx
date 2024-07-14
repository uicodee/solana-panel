import {Button} from "@/shared/ui/button";
import {useEditAccount} from "../model/store";
import {Pencil} from "lucide-react";
import {Account} from "@/shared/model/account";

interface EditAccountButtonProps {
    account: Account;
}

export const EditAccountButton = ({account}: EditAccountButtonProps) => {
    const setOpen = useEditAccount((state) => state.setOpen);
    const setAccount = useEditAccount((state) => state.setAccount);
    return (
        <Button variant="outline" size="icon" onClick={() => {
            setOpen(true)
            setAccount(account)
        }}>
            <Pencil className="size-4"/>
        </Button>
    )
}