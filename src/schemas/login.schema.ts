import * as z from "zod";

export const formLoginSchema = z.z.object({
  email: z.string().email({
    message: "Insira um email válido",
  }),
  password: z.string().min(6, {
    message: "A senha deve conter ao menos 6 caracteres",
  }),
});
