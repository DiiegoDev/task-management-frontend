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
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function SheetCreateTask({ isOpen, setIsOpen }: Props) {
  return (
    <Sheet open={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new task</SheetTitle>
          <SheetDescription>
            Create a new task here. Click create when you're done.
          </SheetDescription>
        </SheetHeader>
        <CreateTaskForm setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}
