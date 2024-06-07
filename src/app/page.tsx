import { Authenticated } from "@/components/auth/authenticated";
import { Footer } from "@/components/footer";
import { Content } from "@/components/landing-page/content";
import { Header } from "@/components/landing-page/header";

export default function Home() {
  return (
    <Authenticated>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Content />
        </main>
        <Footer />
      </div>
    </Authenticated>
  );
}
