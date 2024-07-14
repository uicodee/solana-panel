import { useCreateAccount } from "../model/store";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/shared/ui/credenza";
import { CreateAccountForm } from "./create-account-form";

export const CreateAccountModal = () => {
  const setOpen = useCreateAccount((state) => state.setOpen);
  const open = useCreateAccount((state) => state.open);
  return (
    <Credenza open={open} onOpenChange={() => setOpen(false)}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create account</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="mb-4">
          <CreateAccountForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
