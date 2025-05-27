"use client";

import { ReactNode, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Tables } from "@/types/database.types";
import { getDayOfWeekText } from "@/utils/getDayOfWeekText";

const LessonMultiSelect = ({
  children,
  lessons,
  initialSelected,
  disabled,
}: {
  children?: ReactNode;
  lessons: Tables<"lessons">[] | null;
  initialSelected: Tables<"lessons">[];
  disabled?: boolean;
}) => {
  const [selected, setSelected] =
    useState<Tables<"lessons">[]>(initialSelected);

  return (
    <>
      <Listbox
        value={selected}
        onChange={setSelected}
        multiple
        disabled={disabled}
      >
        {children && (
          <Label className="block text-sm/6 font-medium text-gray-900">
            {children}
          </Label>
        )}
        <div className="relative mt-2">
          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200">
            <span className="col-start-1 row-start-1 truncate pr-6">
              {selected.map((lesson) => (
                <span
                  key={lesson.id}
                  className="inline-flex items-center gap-x-0.5 mr-1 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset"
                >
                  {lesson.name} - {lesson.level}{" "}
                  {lesson.day_of_week &&
                    `- ${getDayOfWeekText(lesson.day_of_week)}`}
                  {!disabled && (
                    <span
                      className="group relative -mr-1 size-3.5 rounded-xs hover:bg-indigo-600/20"
                      onClick={() => {
                        setSelected((prev) =>
                          prev.filter((l) => l.id !== lesson.id),
                        );
                      }}
                    >
                      <span className="sr-only">Supprimer</span>
                      <svg
                        viewBox="0 0 14 14"
                        className="size-3.5 stroke-indigo-600/50 group-hover:stroke-indigo-600/75"
                      >
                        <path d="M4 4l6 6m0-6l-6 6" />
                      </svg>
                      <span className="absolute -inset-1" />
                    </span>
                  )}
                </span>
              ))}
            </span>
            {!disabled && (
              <ChevronUpDownIcon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            )}
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            {lessons?.map((lesson) => (
              <ListboxOption
                key={lesson.id}
                value={lesson}
                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
              >
                <span className="block truncate font-normal group-data-selected:font-semibold">
                  {lesson.name} - {lesson.level}
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {selected.map((value) => (
        <input key={value.id} type="hidden" name="lessons" value={value.id} />
      ))}
    </>
  );
};
export default LessonMultiSelect;
