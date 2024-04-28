"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSignupSchema } from "@/schemas/signup.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSignupSchema>>({
    resolver: zodResolver(formSignupSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  const onSubmit = () => {};

  return (
    <Card className="w-4/5 max-w-96 bg-transparent border-zinc-700">
      <CardHeader>
        <CardTitle className="text-zinc-200">Crie sua conta</CardTitle>
        <CardDescription>
          Já possui uma conta?{" "}
          <Link href="/login" className="underline">
            faça o login
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nome do usuário"
                      className="bg-transparent border-zinc-700 text-zinc-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 font-normal" />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="email@email.com"
                      className="bg-transparent border-zinc-700 text-zinc-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 font-normal" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      className="bg-transparent border-zinc-700 text-zinc-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 font-normal" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-700 transition mt-4 text-zinc-300"
            >
              Criar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
