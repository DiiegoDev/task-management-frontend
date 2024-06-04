import { Header } from "@/components/task/header";
import { TasksTable } from "@/components/task/table";

export default async function Page() {
  return (
    <main className="py-5 px-10 border-l flex-1 max-w-full">
      <Header />
      <TasksTable />
    </main>
  );
}
