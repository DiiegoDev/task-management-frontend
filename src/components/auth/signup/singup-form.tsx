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
} from "../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Link from "next/link";
import { onSignup } from "@/services/api";
import { useToast } from "../../ui/use-toast";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export function SignUpForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSignupSchema>) => onSignup(data),
    onSuccess: () => router.push("/login"),
  });

  const form = useForm<z.infer<typeof formSignupSchema>>({
    resolver: zodResolver(formSignupSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSignupSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Card className="w-4/5 max-w-[352px]">
      <CardHeader>
        <CardTitle className="">Crie sua conta</CardTitle>
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
                  <FormLabel className="">Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nome do usuário"
                      className="bg-transparent"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="email@email.com"
                      className="bg-transparent"
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      className="bg-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300 font-normal" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className=" transition mt-4"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Criando..." : "Criar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
