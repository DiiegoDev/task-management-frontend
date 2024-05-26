import { Header } from "@/components/task/header";
import { TasksTable } from "@/components/task/table";
import { Task } from "@/interfaces/task.interface";

import { api } from "@/services/api";
import { cookies } from "next/headers";

async function fetchData() {
  try {
    const cookieStore = cookies();

    const userId = cookieStore.get("userId");
    const token = cookieStore.get("authorization");

    const response = await api.get(`tasks/${userId?.value}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const data: Task[] = await fetchData();

  return (
    <main className="py-5 px-24 border-l">
      <Header />
      <TasksTable />
    </main>
  );
}
