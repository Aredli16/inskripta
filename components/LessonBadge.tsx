import React from "react";
import { Tables } from "@/types/database.types";
import { getDayOfWeekText } from "@/utils/getDayOfWeekText";

const LessonBadge = ({ lesson }: { lesson: Tables<"lessons"> }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 mr-1 mb-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset">
      {lesson.name} - {lesson.level}{" "}
      {lesson.day_of_week && `- ${getDayOfWeekText(lesson.day_of_week)}`}
    </span>
  );
};

export default LessonBadge;
