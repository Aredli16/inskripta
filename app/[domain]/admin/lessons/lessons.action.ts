"use server";

import { createClient } from "@/utils/supabase/server";
import { Enums } from "@/types/database.types";
import { revalidatePath } from "next/cache";

export const createLesson = async (
  prevState: { success: boolean },
  formData: FormData,
) => {
  const supabase = await createClient();
  const { error } = await supabase.from("lessons").insert({
    name: formData.get("name") as string,
    level: formData.get("level") as string,
    day_of_week: formData.get("day_of_week") as Enums<"day_of_week">,
    start_time:
      formData.get("start_time") === ""
        ? null
        : (formData.get("start_time") as string),
    end_time:
      formData.get("end_time") === ""
        ? null
        : (formData.get("end_time") as string),
    organization_id: formData.get("organization_id") as string,
  });

  if (error) {
    throw error;
  }

  revalidatePath("/admin/lessons");
  return { success: true };
};

export const editLesson = async (
  prevState: { success: boolean },
  formData: FormData,
) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("lessons")
    .update({
      name: formData.get("name") as string,
      level: formData.get("level") as string,
      day_of_week: formData.get("day_of_week") as Enums<"day_of_week">,
      start_time:
        formData.get("start_time") === ""
          ? null
          : (formData.get("start_time") as string),
      end_time:
        formData.get("end_time") === ""
          ? null
          : (formData.get("end_time") as string),
    })
    .eq("id", formData.get("id") as string);

  if (error) {
    throw error;
  }

  revalidatePath("/admin/lessons");
  return { success: true };
};
