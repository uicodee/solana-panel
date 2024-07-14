import {z} from "zod";


export const formSchema = z.object({
    title: z
        .string({required_error: "Name is required"})
        .min(2, {message: "Name must be at least 2 characters"})
        .max(50, {message: "Name must be maximum 50 characters"}),
    account: z
        .string({required_error: "Account is required"})
        .min(2, {message: "Name must be at least 2 characters"})
});
