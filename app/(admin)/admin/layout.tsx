import { ReactNode } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { getSubdomain } from "@/utils/domain";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const organizationName = await getSubdomain();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: organization } = await supabase
    .from("organizations")
    .select()
    .eq("name", organizationName)
    .single();

  if (!organization) {
    notFound();
  }

  const { data } = await supabase
    .from("organization_administration")
    .select()
    .eq("organization_id", organization.id)
    .eq("user_id", user!.id)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <AdminLayout navigation={[]} secondaryNavigation={[]}>
      {children}
    </AdminLayout>
  );
};

export default Layout;
