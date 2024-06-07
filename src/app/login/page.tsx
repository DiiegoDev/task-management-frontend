import { Metadata } from "next";
import { LoginForm } from "../../components/auth/login/login-form";
import { Authenticated } from "@/components/auth/authenticated";

export const metadata: Metadata = {
  title: "Login",
  description: "Entre na sua conta",
};

export default function Page() {
  return (
    <Authenticated>
      <main className="flex justify-center items-center flex-1">
        <LoginForm />
      </main>
    </Authenticated>
  );
}
