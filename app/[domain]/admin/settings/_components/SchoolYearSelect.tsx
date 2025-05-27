"use client";

import { Tables } from "@/types/database.types";
import { useState, useTransition } from "react";
import { createClient } from "@/utils/supabase/client";

const SchoolYearSelect = ({
  schoolYears,
}: {
  schoolYears: Tables<"school_years">[] | null;
}) => {
  const [isPending, startTransition] = useTransition();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleChange = async (newCurrentId: string) => {
    setUpdatingId(newCurrentId);
    startTransition(async () => {
      if (!schoolYears) return;

      const supabase = createClient();

      const { error } = await supabase
        .from("school_years")
        .update({ current: true })
        .eq("id", newCurrentId);

      if (error) {
        throw error;
      }

      setUpdatingId(null);
    });
  };

  return (
    <fieldset className="relative -space-y-px rounded-md bg-white">
      {schoolYears?.map((schoolYear) => (
        <label
          key={schoolYear.id}
          aria-label={schoolYear.id}
          className="group flex cursor-pointer flex-col border border-gray-200 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-200 has-checked:bg-indigo-50 md:grid md:grid-cols-3 md:pr-6 md:pl-4"
        >
          <span className="flex items-center gap-3 text-sm">
            <input
              defaultValue={schoolYear.id}
              defaultChecked={schoolYear.current}
              name="selected-school-year"
              type="radio"
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
              onChange={() => handleChange(schoolYear.id)}
            />
            <span className="font-medium text-gray-900 group-has-checked:text-indigo-900">
              {new Date(schoolYear.start_date).toLocaleDateString()} -{" "}
              {new Date(schoolYear.end_date).toLocaleDateString()}
              {isPending && schoolYear.id === updatingId && (
                <span className="ml-2 text-sm text-indigo-600">
                  (Mise à jour...)
                </span>
              )}
            </span>
          </span>
        </label>
      ))}
    </fieldset>
  );
};

export default SchoolYearSelect;
