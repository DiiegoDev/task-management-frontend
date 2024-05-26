import * as z from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(5, {
    message: "Campo obrigatório",
  }),

  label: z.string().min(3, {
    message: "Campo obrigatório",
  }),

  status: z.string().min(3, {
    message: "Campo obrigatório",
  }),

  priority: z.string().min(3, {
    message: "Campo obrigatório",
  }),

  dueDate: z.date({
    message: "Campo obrigatório",
  }),
});
