"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useActionState, useEffect, useState } from "react";
import ValidationInput from "@/components/form/ValidationInput";
import SubmitButton from "@/components/form/SubmitButton";
import { Constants, Tables } from "@/types/database.types";
import { getDayOfWeekText } from "@/utils/getDayOfWeekText";

interface LessonDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  defaultValues?: Tables<"lessons">;
  action: (
    prevState: { success: boolean },
    formData: FormData,
  ) => Promise<{ success: boolean }>;
  organization: Tables<"organizations">;
}

export default function LessonDialog({
  open,
  setOpen,
  title,
  defaultValues,
  action,
  organization,
}: LessonDialogProps) {
  const [state, formAction] = useActionState(action, { success: false });
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    if (state.success && wasSubmitted) {
      setOpen(false);
      setWasSubmitted(false);
    }
  }, [setOpen, state.success, wasSubmitted]);

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <form
          action={(formData) => {
            setWasSubmitted(true);
            return formAction(formData);
          }}
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
              <PlusIcon className="size-6 text-green-600" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <DialogTitle className="text-base font-semibold text-gray-900">
                {title}
              </DialogTitle>
              <div className="mt-2 space-y-4">
                <ValidationInput
                  name="name"
                  type="text"
                  required
                  defaultValue={defaultValues?.name}
                >
                  Nom du cours
                </ValidationInput>
                <ValidationInput
                  name="level"
                  type="text"
                  required
                  defaultValue={defaultValues?.level}
                >
                  Niveau du cours
                </ValidationInput>
                <div>
                  <label
                    htmlFor="day_of_week"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Jour de la semaine
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="day_of_week"
                      name="day_of_week"
                      defaultValue=""
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option value="" disabled hidden></option>
                      {Constants.public.Enums.day_of_week.map((day, index) => (
                        <option key={index} value={day}>
                          {getDayOfWeekText(day)}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>
                <div className="flex w-full gap-3">
                  <ValidationInput
                    name="start_time"
                    type="time"
                    defaultValue={defaultValues?.start_time || ""}
                  >
                    Heure de début
                  </ValidationInput>
                  <ValidationInput
                    name="end_time"
                    type="time"
                    defaultValue={defaultValues?.end_time || ""}
                  >
                    Heure de fin
                  </ValidationInput>
                </div>
                {organization && (
                  <input
                    type="hidden"
                    name="organization_id"
                    value={organization.id}
                  />
                )}
                {defaultValues?.id && (
                  <input type="hidden" name="id" value={defaultValues.id} />
                )}
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <SubmitButton className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:col-start-2">
                Sauvegarder
              </SubmitButton>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Annuler
              </button>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
}
