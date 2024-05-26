import * as z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(5, {
    message: "Campo obrigatório",
  }),

  label: z.string().min(3, {
    message: "Campo obrigatório",
  }),

  priority: z.string().min(3, {
    message: "Campo obrigatório",
  }),

  dueDate: z.date({
    message: "Campo obrigatório",
  }),
});
