/* eslint-disable react/no-unescaped-entities */
import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CreateTaskForm } from "../create-task-form";

interface Props {
  children: ReactNode;
}

export function SheetCreateTask({ children }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new task</SheetTitle>
          <SheetDescription>
            Create a new task here. Click create when you're done.
          </SheetDescription>
        </SheetHeader>
        <CreateTaskForm />
      </SheetContent>
    </Sheet>
  );
}
