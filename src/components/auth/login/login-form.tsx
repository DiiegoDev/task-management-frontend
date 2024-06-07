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
import { useMutation } from "@tanstack/react-query";
import { onLogin } from "@/services/api";
import { useRouter } from "next/navigation";
import { TokenProps } from "@/interfaces/token.interface";
import { verifyJwt } from "@/utils/verify-jwt";
import { getCookies } from "cookies-next";

export function LoginForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formLoginSchema>) => onLogin(data),
    onSuccess: () => router.push("/app/tasks"),
  });

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formLoginSchema>) => {
    mutation.mutate(data);
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

            <Button
              className="mt-4 font-semibold"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
