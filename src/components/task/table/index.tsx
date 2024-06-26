"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

import { TaskTableRow } from "../table-row";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/services/api";
import { getCookies } from "cookies-next";
import { EmptyTasks } from "../empty-tasks";
import { TaskSkeleton } from "../task-skeleton";

export function TasksTable() {
  const { authorization, userId } = getCookies();

  const { data, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(authorization as string, userId as string),
  });

  if (isPending) {
    return <TaskSkeleton />;
  }

  if (data?.length === 0) {
    return <EmptyTasks />;
  }

  return (
    <Table className="border rounded mt-10 overflow-scroll">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30px] p-0"></TableHead>
          <TableHead className="w-[35%] min-w-48">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.map((task) => (
          <TaskTableRow key={task.id} task={task} />
        ))}
      </TableBody>
    </Table>
  );
}
