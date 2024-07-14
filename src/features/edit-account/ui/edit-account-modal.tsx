import { useEditAccount } from "../model/store";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/shared/ui/credenza";
import { EditAccountForm } from "./edit-account-form";

export const EditAccountModal = () => {
  const setOpen = useEditAccount((state) => state.setOpen);
  const open = useEditAccount((state) => state.open);
  return (
    <Credenza open={open} onOpenChange={() => setOpen(false)}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Edit account</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="mb-4">
          <EditAccountForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
