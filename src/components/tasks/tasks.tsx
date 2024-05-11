"use client";
import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import { SheetCreateTask } from "../sheet-create-task";

export function Tasks() {
  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Tasks</h1>
        <SheetCreateTask>
          <Button className="flex gap-1 bg-blue-300">
            <Plus size={18} />
            Create
          </Button>
        </SheetCreateTask>
      </header>
    </>
  );
}
