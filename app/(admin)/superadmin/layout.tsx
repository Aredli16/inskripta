import AdminLayout from "@/components/layout/AdminLayout";
import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("id", user!.id)
    .single();

  if (data && data.role !== "super_admin") {
    notFound();
  }

  return (
    <AdminLayout navigation={[]} secondaryNavigation={[]}>
      {children}
    </AdminLayout>
  );
};

export default Layout;
