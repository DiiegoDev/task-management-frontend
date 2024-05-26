/* eslint-disable react/no-unescaped-entities */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UpdateTaskForm } from "../update-task-form";
import { Task } from "@/interfaces/task.interface";

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  task: Task;
}

export function EditTaskDialog({ isDialogOpen, setIsDialogOpen, task }: Props) {
  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edite sua tarefa</DialogTitle>
          <DialogDescription>
            Edite sua tarefa aqui. Clique em salvar quando todos os campos forem
            preenchidos.
          </DialogDescription>
        </DialogHeader>
        <UpdateTaskForm setIsOpen={setIsDialogOpen} task={task} />
      </DialogContent>
    </Dialog>
  );
}
