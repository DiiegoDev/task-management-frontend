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
import { api } from "@/services/api";
import { useToast } from "../../ui/use-toast";
import { AxiosError, isAxiosError } from "axios";
import { AuthError } from "@/errors/auth.error";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSignupSchema>>({
    resolver: zodResolver(formSignupSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSignupSchema>) => {
    try {
      const { email, name, password } = values;

      await api.post("/users/create", {
        email,
        name,
        password,
      });

      toast({
        title: "Usuário cadastrado",
        description: "Faça login para entrar",
      });

      router.push("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;

        const errorResponse = axiosError.response?.data as AuthError;

        toast({ description: errorResponse.message });
      }
    }
  };

  return (
    <Card className="w-4/5 max-w-[352px] bg-transparent">
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
              className="bg-blue-300 hover:bg-blue-200 transition mt-4 text-zinc-900"
            >
              Criar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
