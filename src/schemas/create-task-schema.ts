import * as z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(5, {
    message: "Título é obrigatório",
  }),

  label: z.string().min(3, {
    message: "Label é obrigatória",
  }),

  priority: z.string().min(3, {
    message: "Prioridade é obrigatória",
  }),

  dueDate: z.date({
    message: "Data de entrega é obrigatória",
  }),
});
