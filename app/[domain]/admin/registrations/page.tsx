import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import DataTable, { Column } from "@/components/DataTable";
import { Tables } from "@/types/database.types";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ domain: string }> }) => {
  const { domain } = await params;
  const t = await getTranslations("Domain.Admin.Registrations");
  const supabase = await createClient();
  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, students!inner(*, organizations!inner(*))")
    .eq("students.organizations.name", domain);

  const columns: Column<
    Tables<"registrations"> & { students: Tables<"students"> }
  >[] = [
    {
      id: "id",
      label: t("List.Header.ID"),
      bold: true,
    },
    {
      label: t("List.Header.Student"),
      render: (_, row) => {
        const student = row.students;
        return `${student?.first_name ?? ""} ${student?.last_name ?? ""}`;
      },
    },
    {
      id: "created_at",
      label: t("List.Header.CreatedAt"),
      render: (_, row) => new Date(row.created_at ?? "").toLocaleString(),
    },
    {
      label: "Actions",
      type: "actions",
      render: (_, student) => (
        <Link
          href={`/admin/registrations/${student.id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          {t("List.Actions.View")}
          <span className="sr-only">, {student.id}</span>
        </Link>
      ),
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            {t("Title")}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{t("Description")}</p>
        </div>
        {/*<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("Add.Title")}
          </button>
        </div>*/}
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <DataTable columns={columns} data={registrations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
