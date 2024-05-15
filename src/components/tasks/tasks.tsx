"use client";
import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import { SheetCreateTask } from "../sheet-create-task";
import { useState } from "react";

export function Tasks() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeIsOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Tasks</h1>
        <Button
          onClick={changeIsOpen}
          className="flex gap-1 bg-blue-100 hover:bg-blue-200 transition font-semibold"
        >
          <Plus size={18} />
          Add new
        </Button>
      </header>
      <SheetCreateTask isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
