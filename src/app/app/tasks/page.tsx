import { Header } from "@/components/task/header";
import { TasksTable } from "@/components/task/table";

export default async function Page() {
  return (
    <main className="py-5 border-l flex-1 max-w-full flex justify-center">
      <div className="w-4/5">
        <Header />
        <TasksTable />
      </div>
    </main>
  );
}
