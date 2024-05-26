export interface Task {
  id: string;
  title: string;
  label: string;
  status: string;
  priority: string;
  dueDate: Date;
}

export interface CreateTaskReq {
  userId?: string | undefined;
  title: string;
  label: string;
  priority: string;
  dueDate?: Date;
}

export interface UpdateTaskReq {
  title: string;
  label: string;
  status: string;
  priority: string;
  dueDate: Date;
}
