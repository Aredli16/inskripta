import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LessonMultiSelect from "@/components/LessonMultiSelect";
import Link from "next/link";
import SubmitButton from "@/components/form/SubmitButton";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ registration?: string }>;
}) => {
  const { registration } = await searchParams;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("*, lessons(*)")
    .eq("id", registration ?? "")
    .maybeSingle();

  if (error || !data) {
    redirect("/register");
  }

  const { data: lessons } = await supabase.from("lessons").select();

  return (
    <form
      action={async (formData) => {
        "use server";

        const supabase = await createClient();
        const lessons = formData.getAll("lessons") as string[];
        const registration = formData.get("registration-id") as string;

        const { error } = await supabase
          .from("registrations_lessons")
          .delete()
          .eq("registration_id", registration);

        if (error) {
          console.error("Error deleting previous lessons:", error);
          throw error;
        }

        for (const lesson of lessons) {
          const { error } = await supabase
            .from("registrations_lessons")
            .insert({
              registration_id: registration,
              lesson_id: lesson,
            });

          if (error) {
            console.error("Error inserting lesson:", error);
            throw error;
          }
        }

        redirect("/");
      }}
    >
      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10">
          <LessonMultiSelect lessons={lessons} initialSelected={data.lessons}>
            Choisissez les cours auxquels vous souhaitez inscrire l&#39;élève
          </LessonMultiSelect>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link href="/" className="text-sm/6 font-semibold text-gray-900">
          Annuler
        </Link>
        <SubmitButton className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Suivant
        </SubmitButton>
      </div>
      <input type="hidden" name="registration-id" value={data.id} />
    </form>
  );
};

export default Page;
