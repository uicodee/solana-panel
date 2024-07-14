import {Button} from "@/shared/ui/button";
import {useCreateAccount} from "../model/store";
import {CirclePlus} from "lucide-react";

export const CreateAccountButton = () => {
    const setOpen = useCreateAccount((state) => state.setOpen);
    return (
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            <CirclePlus className="w-4 h-4 mr-2" strokeWidth={1.75}/>
            New
        </Button>
    )
}