import Link from "next/link";
import DataTable, { Column } from "@/components/DataTable";
import { Enums, Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { getDayOfWeekText } from "@/utils/getDayOfWeekText";
import EditLessonButton from "@/app/[domain]/admin/lessons/_components/EditLessonButton";
import AddLessonButton from "@/app/[domain]/admin/lessons/_components/AddLessonButton";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ domain: string }> }) => {
  const { domain } = await params;
  const supabase = await createClient();

  const { data: organization } = await supabase
    .from("organizations")
    .select()
    .eq("name", domain)
    .single();

  if (!organization) {
    redirect("/admin");
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*, organizations(*)")
    .eq("organizations.name", organization.name);

  const columns: Column<
    Tables<"lessons"> & { organizations: Tables<"organizations"> }
  >[] = [
    {
      id: "name",
      label: "Nom du cours",
      bold: true,
    },
    {
      id: "level",
      label: "Niveau du cours",
    },
    {
      id: "day_of_week",
      label: "Jour de la semaine",
      render: (value) => getDayOfWeekText(value as Enums<"day_of_week">),
    },
    {
      id: "start_time",
      label: "Heure de début",
    },
    {
      id: "end_time",
      label: "Heure de fin",
    },
    {
      label: "Actions",
      type: "actions",
      render: (_, row) => (
        <div className="space-x-2">
          <EditLessonButton lesson={row} />
          <Link href="#" className="text-indigo-600 hover:text-indigo-900">
            Détail
            <span className="sr-only">, {row.id}</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Les cours</h1>
          <p className="mt-2 text-sm text-gray-700">
            La liste de tous les cours de l&#39;organisme. Vous pouvez ajouter,
            modifier ou supprimer des cours.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <AddLessonButton organization={organization} />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <DataTable columns={columns} data={lessons} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
