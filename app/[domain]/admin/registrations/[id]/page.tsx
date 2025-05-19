import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; domain: string }>;
}) => {
  const { id, domain } = await params;
  const supabase = await createClient();
  const { data: registration } = await supabase
    .from("registrations")
    .select("*, students!inner(*, organizations!inner(*))")
    .eq("students.organizations.name", domain)
    .eq("id", id)
    .maybeSingle();

  if (!registration) {
    redirect("/admin/registrations");
  }

  const t = await getTranslations("Domain.Admin.Registrations.View");

  return (
    <div className="divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold text-gray-900">
            {t("SystemInformation")}
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            {t("SystemInformationDescription")}
          </p>
        </div>

        <div className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="id"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t("ID")}
                </label>
                <div className="mt-2">
                  <input
                    id="id"
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 read-only:cursor-not-allowed read-only:bg-gray-50 read-only:text-gray-500 read-only:outline-gray-200"
                    defaultValue={registration.id ?? ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="created-at"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t("CreatedAt")}
                </label>
                <div className="mt-2">
                  <input
                    id="createdAt"
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 read-only:cursor-not-allowed read-only:bg-gray-50 read-only:text-gray-500 read-only:outline-gray-200"
                    defaultValue={new Date(
                      registration.created_at ?? "",
                    ).toLocaleString()}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold text-gray-900">
            {t("StudentInformation")}
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            {t("StudentInformationDescription")}
          </p>
        </div>

        <div className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="id"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t("ID")}
                </label>
                <div className="mt-2">
                  <input
                    id="id"
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 read-only:cursor-not-allowed read-only:bg-gray-50 read-only:text-gray-500 read-only:outline-gray-200"
                    defaultValue={registration.students.id ?? ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="created-at"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t("CreatedAt")}
                </label>
                <div className="mt-2">
                  <input
                    id="createdAt"
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 read-only:cursor-not-allowed read-only:bg-gray-50 read-only:text-gray-500 read-only:outline-gray-200"
                    defaultValue={new Date(
                      registration.students.created_at ?? "",
                    ).toLocaleString()}
                    readOnly
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
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 read-only:cursor-not-allowed read-only:bg-gray-50 read-only:text-gray-500 read-only:outline-gray-200"
                    defaultValue={registration.students.first_name ?? ""}
                    readOnly
                  />
                </div>
              </div>

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
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 read-only:cursor-not-allowed read-only:bg-gray-50 read-only:text-gray-500 read-only:outline-gray-200"
                    defaultValue={registration.students.last_name ?? ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
