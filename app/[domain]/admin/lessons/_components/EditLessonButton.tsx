"use client";

import { useState } from "react";
import LessonDialog from "./LessonDialog";
import { Tables } from "@/types/database.types";
import { editLesson } from "@/app/[domain]/admin/lessons/lessons.action";

const EditLessonButton = ({
  lesson,
}: {
  lesson: Tables<"lessons"> & { organizations: Tables<"organizations"> };
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <LessonDialog
        open={open}
        setOpen={setOpen}
        title="Modifier un cours"
        defaultValues={lesson}
        action={editLesson}
        organization={lesson.organizations}
      />
      <button
        onClick={() => setOpen(true)}
        className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
      >
        Modifier
      </button>
    </>
  );
};

export default EditLessonButton;
