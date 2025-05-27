import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/form/SubmitButton";

const Page = async ({ params }: { params: Promise<{ domain: string }> }) => {
  const { domain } = await params;
  const t = await getTranslations("Domain.Home.Registration.StudentForm");

  return (
    <form
      action={async (formData) => {
        "use server";

        const supabase = await createClient();

        const { data: organization, error: organizationError } = await supabase
          .from("organizations")
          .select()
          .eq("name", domain)
          .single();

        if (organizationError) {
          throw organizationError;
        }

        const { data: student, error: studentError } = await supabase
          .from("students")
          .insert([
            {
              first_name: formData.get("first-name") as string,
              last_name: formData.get("last-name") as string,
              organization_id: organization.id,
            },
          ])
          .select()
          .single();

        if (studentError) {
          throw studentError;
        }

        const { data: schoolYear, error: schoolYearError } = await supabase
          .from("school_years")
          .select("*")
          .eq("current", true)
          .eq("organization_id", organization.id)
          .single();

        if (schoolYearError) {
          throw schoolYearError;
        }

        const { data: registration, error: registrationError } = await supabase
          .from("registrations")
          .insert([
            {
              student_id: student.id,
              school_year_id: schoolYear.id,
            },
          ])
          .select()
          .single();

        if (registrationError) {
          throw registrationError;
        }

        revalidatePath("/");
        redirect("/register/lessons?registration=" + registration.id);
      }}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base/7 font-semibold text-gray-900">
              {t("Title")}
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">{t("Description")}</p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("LastName")}
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("FirstName")}
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link href="/" className="text-sm/6 font-semibold text-gray-900">
          {t("Cancel")}
        </Link>
        <SubmitButton className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {t("Next")}
        </SubmitButton>
      </div>
    </form>
  );
};

export default Page;
