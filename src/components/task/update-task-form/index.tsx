import { updateTask } from "@/services/api";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { returnDefaultValues } from "@/utils/return-default-values";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { updateTaskSchema } from "@/schemas/update-task-schema";
import { Task } from "@/interfaces/task.interface";

interface Props {
  setIsOpen: (value: boolean) => void;
  task: Task;
}

export function UpdateTaskForm({ setIsOpen, task }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedTask: z.infer<typeof updateTaskSchema>) =>
      updateTask(updatedTask, task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsOpen(false);
    },
  });

  const defaultValues = returnDefaultValues(task);

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof updateTaskSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título da tarefa" {...field} />
              </FormControl>
              <FormMessage className="text-red-300 font-light text-[12px]" />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Label" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Labels</SelectLabel>
                        <SelectItem value="feat">Feat</SelectItem>
                        <SelectItem value="doc">Doc</SelectItem>
                        <SelectItem value="bug">Bug</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage className="text-red-300 font-light text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Prioridade</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Prioridade</SelectLabel>
                        <SelectItem value="Baixa">Baixa</SelectItem>
                        <SelectItem value="Media">Média</SelectItem>
                        <SelectItem value="Alta">Alta</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage className="text-red-300 font-light text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Andamento">Andamento</SelectItem>
                        <SelectItem value="Feita">Feita</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage className="text-red-300 font-light text-[12px]" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de entrega</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Due date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex-1">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage className="text-red-300 font-light text-[12px]" />
            </FormItem>
          )}
        />

        <div className="mt-4 flex gap-2 justify-end">
          <Button
            onClick={() => setIsOpen(false)}
            variant={"outline"}
            type="button"
          >
            Fechar
          </Button>

          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  );
}
