"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formLoginSchema } from "@/schemas/login.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

export function LoginForm() {
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <Card className="w-4/5 max-w-96 bg-transparent border-zinc-700">
      <CardHeader>
        <CardTitle className="text-zinc-200">Bem vindo</CardTitle>
        <CardDescription className="text-zinc-300">
          Ainda não possui uma conta?{" "}
          <Link href="/signup" className="underline">
            cadastre-se
          </Link>{" "}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 items-start">
                  <FormLabel className="text-sm font-normal text-zinc-200">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@email.com"
                      type="email"
                      {...field}
                      className="bg-transparent border-zinc-700 mt-0 text-zinc-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 font-normal" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 items-start">
                  <FormLabel className="text-sm font-normal text-zinc-200">
                    Passaword
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      className="bg-transparent border-zinc-700 mt-0 text-zinc-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 font-normal" />
                </FormItem>
              )}
            />

            <Button
              className="mt-4 bg-zinc-800 hover:bg-zinc-700 transition text-zinc-200 font-medium"
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </Form>

        <Button className="w-full border border-zinc-700 mt-3">
          Entre com o google
        </Button>
      </CardContent>
    </Card>
  );
}
