import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import SchoolYearSelect from "@/app/[domain]/admin/settings/_components/SchoolYearSelect";
import { CalendarDateRangeIcon } from "@heroicons/react/16/solid";
import SubmitButton from "@/components/form/SubmitButton";
import { revalidatePath } from "next/cache";

const Page = async ({ params }: { params: Promise<{ domain: string }> }) => {
  const { domain } = await params;
  const supabase = await createClient();
  const { data: organization } = await supabase
    .from("organizations")
    .select()
    .eq("name", domain)
    .single();
  const { data: schoolYears } = await supabase
    .from("school_years")
    .select()
    .eq("organization_id", organization!.id);

  const t = await getTranslations("Domain.Admin.Settings");

  return (
    <section className="mt-6">
      <div className="shadow-sm sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
          <div>
            <h2 className="text-lg/6 font-medium text-gray-900">
              {t("Registration.SchoolYears.Title")}
            </h2>
          </div>

          <form
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-0"
            action={async (formData) => {
              "use server";

              const formDataObj = Object.fromEntries(formData.entries());
              const supabase = await createClient();
              const { error } = await supabase.from("school_years").insert({
                start_date: formDataObj["start-date"] as string,
                end_date: formDataObj["end-date"] as string,
                current: formDataObj["current"] === "on",
                organization_id: formDataObj["organization_id"] as string,
              });

              if (error) {
                throw error;
              }

              revalidatePath("/admin/settings");
            }}
          >
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("Registration.SchoolYears.New.StartDate")}
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="start-date"
                  name="start-date"
                  type="date"
                  className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
                  required
                />
                <CalendarDateRangeIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="end-date"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("Registration.SchoolYears.New.EndDate")}
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="end-date"
                  name="end-date"
                  type="date"
                  className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
                  required
                />
                <CalendarDateRangeIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                />
              </div>
            </div>
            <div className="flex gap-3 items-end">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    id="current"
                    name="current"
                    type="checkbox"
                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                  />
                  <svg
                    fill="none"
                    viewBox="0 0 14 14"
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-checked:opacity-100"
                    />
                    <path
                      d="M3 7H11"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-indeterminate:opacity-100"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm/6">
                <label htmlFor="current" className="font-medium text-gray-900">
                  {t("Registration.SchoolYears.New.Current")}
                </label>
              </div>
            </div>
            <input
              type="hidden"
              name="organization_id"
              value={organization!.id}
            />
            <SubmitButton className="w-fit self-end rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {t("Registration.SchoolYears.New.Save")}
            </SubmitButton>
          </form>

          <SchoolYearSelect schoolYears={schoolYears} />
        </div>
      </div>
    </section>
  );
};

export default Page;
