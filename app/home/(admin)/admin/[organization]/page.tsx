import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import OrganizationForm from "@/components/form/organization/OrganizationForm";
import { adminSupabase } from "@/utils/supabase/admin-supabase";

const Page = async ({
  params,
}: {
  params: Promise<{ organization: string }>;
}) => {
  const { organization } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("organizations")
    .select("*, organization_administration(*)")
    .eq("id", organization)
    .single();

  if (!data) {
    redirect("/admin");
  }

  const adminOrganizationUsers = [];
  for (const admin of data.organization_administration) {
    const {
      data: { user },
    } = await adminSupabase.auth.admin.getUserById(admin.user_id);
    if (user) {
      adminOrganizationUsers.push(user);
    }
  }

  return (
    <OrganizationForm
      defaultOrganization={data}
      organizationAdmin={adminOrganizationUsers}
    />
  );
};

export default Page;
