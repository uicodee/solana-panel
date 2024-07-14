"use client";

import {formSchema} from "../model/form-schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form.tsx";
import {Input} from "@/shared/ui/input.tsx";
import {Button} from "@/shared/ui/button.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useCreateAccount} from "../model/store";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {getAddress} from "@/shared/api/generated/address/address.ts";
import {Address} from "@/shared/api/model";

export const CreateAccountForm = () => {
    const queryClient = useQueryClient()
    const setOpen = useCreateAccount((state) => state.setOpen);
    const mutation = useMutation({
        mutationFn: (address: Address) => getAddress().newAddressAddressNewPost(address),
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey: ["accounts"]}).then(() => setOpen(false))
        }
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate({title: values.title, address: values.account})
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="CAT 10 for example"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="account"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Account address</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Create
                </Button>
            </form>
        </Form>
    );
};
