import {z} from "zod";


export const formSchema = z.object({
    login: z
        .string({required_error: "Login is required"})
        .min(2, {message: "Login must be at least 2 characters"})
        .max(50, {message: "Login must be maximum 50 characters"}),
    password: z
        .string({required_error: "Password is required"})
        .min(6, {message: "Password must be at least 2 characters"})
        .max(50, {message: "Password must be maximum 50 characters"}),
});
