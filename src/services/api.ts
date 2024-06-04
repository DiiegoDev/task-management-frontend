import { toast } from "@/components/ui/use-toast";
import { AuthError } from "@/errors/auth.error";
import { CreateTaskReq, Task } from "@/interfaces/task.interface";
import { createTaskSchema } from "@/schemas/create-task-schema";
import { formLoginSchema } from "@/schemas/login.schema";
import { formSignupSchema } from "@/schemas/signup.schema";
import { updateTaskSchema } from "@/schemas/update-task-schema";
import axios, { AxiosError, isAxiosError } from "axios";
import { getCookies, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
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

export async function onLogin(values: z.infer<typeof formLoginSchema>) {
  try {
    const response = await api.post("auth/login", {
      email: values.email,
      password: values.password,
    });

    const data = response.data;

    setCookie("authorization", data.token, { maxAge: data.exp });
    setCookie("userId", data.id, { maxAge: data.exp });
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError;

      const errorResponse = axiosError.response?.data as AuthError;

      toast({ description: errorResponse.message });
    }
    throw error;
  }
}

export async function onSignup(values: z.infer<typeof formSignupSchema>) {
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
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError;

      const errorResponse = axiosError.response?.data as AuthError;

      toast({ description: errorResponse.message });
    }
    throw error;
  }
}
