import { toast } from "@/components/ui/use-toast";
import { CreateTaskReq, Task } from "@/interfaces/task.interface";
import { createTaskSchema } from "@/schemas/create-task-schema";
import { updateTaskSchema } from "@/schemas/update-task-schema";
import axios from "axios";
import { getCookies } from "cookies-next";
import * as z from "zod";

const url = "http://localhost:5000/api/";

export const api = axios.create({
  baseURL: url,
});

export async function fetchTasks(
  token: string,
  userId: string
): Promise<Task[]> {
  try {
    const response = await api.get(`tasks/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createTask(
  values: z.infer<typeof createTaskSchema>
): Promise<void> {
  try {
    const { authorization, userId } = getCookies();

    const data: CreateTaskReq = {
      userId,
      title: values.title,
      label: values.label,
      priority: values.priority,
      dueDate: values.dueDate,
    };

    await api.post("task/create", data, {
      headers: {
        Authorization: `Bearer ${authorization}`,
        "Content-Type": "application/json",
      },
    });
    toast({ description: "Tarefa criada!" });
  } catch (error) {
    throw error;
  }
}

export async function updateTask(
  data: z.infer<typeof updateTaskSchema>,
  taskId: string
) {
  try {
    const { authorization } = getCookies();
    await api.put(`task/update/${taskId}`, data, {
      headers: {
        Authorization: `Bearer ${authorization}`,
        "Content-Type": "application/json",
      },
    });
    toast({ description: "Tarefa atualizada!" });
  } catch (error) {
    throw error;
  }
}

export async function updateStatus(taskId: string, status: string) {
  try {
    const { authorization } = getCookies();
    await api.put(
      `task/update/${taskId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast({ description: "Status atualizado!" });
  } catch (error) {
    throw error;
  }
}

export async function deleteTask(taskId: string) {
  try {
    const { authorization } = getCookies();
    await api.delete(`task/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${authorization}`,
        "Content-Type": "application/json",
      },
    });
    toast({ description: "Tarefa excluída!" });
  } catch (error) {
    throw error;
  }
}
