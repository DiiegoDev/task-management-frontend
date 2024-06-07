import { Authenticated } from "@/components/auth/authenticated";
import { SignUpForm } from "@/components/auth/signup/singup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastre-se",
  description: "Cadastre seu usuário",
};

export default function Page() {
  return (
    <Authenticated>
      <main className="flex justify-center items-center flex-1">
        <SignUpForm />
      </main>
    </Authenticated>
  );
}
