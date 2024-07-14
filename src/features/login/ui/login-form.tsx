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
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {getAuthentication} from "@/shared/api/generated/authentication/authentication.ts";
import {LoginUser} from "@/shared/api/model";

export const LoginForm = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (loginUser: LoginUser) => getAuthentication().loginUserLoginPost(loginUser),
        onSuccess: (response) => {
            console.log(response)
            localStorage.setItem("accessToken", response.data.accessToken)
        }
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate({email: values.login, password: values.password})
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="login"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Login</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </Form>
    );
};
