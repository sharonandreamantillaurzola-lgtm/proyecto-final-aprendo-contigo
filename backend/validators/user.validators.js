import z from "zod";


export const createUserValidator = z.object({
    nombre: z.string().trim().min(1),
    email: z.string().email(),
    password: z.string().min(8),
});

export const updateNameValidator = z.object({
    nombre: z.string().trim().min(1),
});

export const loginValidator = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
