import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/format-date";
import { returnStatus } from "@/utils/return-status";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EditTaskDialog } from "../edit-task-dialog";
import { Task } from "@/interfaces/task.interface";
import { useState } from "react";
import { deleteTask, updateStatus } from "@/services/api";

import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  task: Task;
}

export function TaskTableRow({ task }: Props) {
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const updateStatusMutation = useMutation({
    mutationFn: (status: string) => updateStatus(task.id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const onStatusChange = (status: string) => {
    updateStatusMutation.mutate(status);
  };

  const onDeleteTask = () => {
    deleteTaskMutation.mutate();
  };

  return (
    <>
      <TableRow className="text-sm">
        <TableCell className="w-[20px] p-0 pl-4">
          <Badge className="mr-[6px] bg-muted text-muted-foreground rounded font-normal px-[6px] py-[2px] hover:bg-muted">
            {task.label}
          </Badge>
        </TableCell>

        <TableCell className="pl-0">{task.title}</TableCell>

        <TableCell>{task.status}</TableCell>

        <TableCell>{task.priority}</TableCell>

        <TableCell>{`${formatDate(String(task.dueDate))}`}</TableCell>

        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center py-2 px-3 rounded hover:bg-zinc-800 transition">
              <DotsHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900">
              <DropdownMenuLabel>Minha tarefa</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                Editar
              </DropdownMenuItem>

              {task.status !== "Feita" && (
                <DropdownMenuItem
                  onClick={() =>
                    onStatusChange(returnStatus(task.status) as string)
                  }
                  className="cursor-pointer"
                >
                  Marcar como {returnStatus(task.status)}
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                onClick={onDeleteTask}
                className="cursor-pointer"
              >
                Apagar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditTaskDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            task={task}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
