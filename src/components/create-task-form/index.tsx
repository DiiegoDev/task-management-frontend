"use client";
import { getCookies } from "cookies-next";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/schemas/create-task-schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { api } from "@/services/api";
import { useToast } from "../ui/use-toast";
import { SheetClose, SheetFooter } from "../ui/sheet";

interface CreateTaskReq {
  userId: string | undefined;
  title: string;
  label: string;
  priority: string;
  dueDate: Date;
}

interface Props {
  setIsOpen: (value: boolean) => void;
}

export function CreateTaskForm({ setIsOpen }: Props) {
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      label: "",
      priority: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof createTaskSchema>) => {
    try {
      const { authorization, userId } = getCookies();

      const data: CreateTaskReq = {
        userId,
        title: values.title,
        label: values.label,
        priority: values.priority,
        dueDate: values.dueDate,
      };

      await api.post("task/create", data, {
        headers: {
          Authorization: `Bearer ${authorization}`,
          "Content-Type": "application/json",
        },
      });
      setIsOpen(false);
      toast({ description: "Tarefa criada com sucesso" });
    } catch (error) {
      console.log(error);
    }
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
              <FormControl>
                <Input placeholder="Type your task title" {...field} />
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
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a label" />
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
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage className="text-red-300 font-light text-[12px]" />
            </FormItem>
          )}
        />

        <SheetFooter className="mt-4">
          <Button
            onClick={() => setIsOpen(false)}
            variant={"outline"}
            type="button"
          >
            Close
          </Button>

          <Button type="submit">Create task</Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
