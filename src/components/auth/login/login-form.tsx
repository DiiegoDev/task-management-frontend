"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginSchema } from "@/schemas/login.schema";

import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { api } from "@/services/api";
import { AxiosError, isAxiosError } from "axios";
import { AuthError } from "@/errors/auth.error";
import { useToast } from "../../ui/use-toast";

export function LoginForm() {
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    try {
      const response = await api.post("auth/login", {
        email: values.email,
        password: values.password,
      });

      const data = response.data;

      setCookie("authorization", data.token, { maxAge: data.exp });
      setCookie("userId", data.id, { maxAge: data.exp });

      router.push("/app/tasks");
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;

        const errorResponse = axiosError.response?.data as AuthError;

        toast({ description: errorResponse.message });
      }
    }
  };

  return (
    <Card className="w-4/5 max-w-[352px]">
      <CardHeader>
        <CardTitle>Bem vindo</CardTitle>
        <CardDescription>
          Ainda não possui uma conta?{" "}
          <Link href="/signup" className="underline">
            cadastre-se
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
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 items-start">
                  <FormLabel className="text-sm font-normal">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@email.com"
                      type="email"
                      {...field}
                      className="bg-transparent"
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
                  <FormLabel className="text-sm font-normal">
                    Passaword
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      className="bg-transparent"
                    />
                  </FormControl>

                  <FormMessage className="text-red-300 font-normal" />
                </FormItem>
              )}
            />

            <Button className="mt-4 font-semibold" type="submit">
              Entrar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
