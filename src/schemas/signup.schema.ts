import * as z from "zod";

export const formSignupSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve conter ao menos 2 caracteres",
  }),

  email: z.string().email({
    message: "Insira um email válido",
  }),

  password: z.string().min(6, {
    message: "A senha deve conter ao menos 6 caracteres",
  }),
});
