"use client";

import { useState } from "react";
import LessonDialog from "./LessonDialog";
import { createLesson } from "@/app/[domain]/admin/lessons/lessons.action";
import { Tables } from "@/types/database.types";

const AddLessonButton = ({
  organization,
}: {
  organization: Tables<"organizations">;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LessonDialog
        open={open}
        setOpen={setOpen}
        title="Créer un nouveau cours"
        action={createLesson}
        organization={organization}
      />
      <button
        onClick={() => setOpen(true)}
        className="block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
      >
        Ajouter un cours
      </button>
    </>
  );
};

export default AddLessonButton;
