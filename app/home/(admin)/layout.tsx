import { ReactNode } from "react";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("super_admins")
    .select()
    .eq("id", user!.id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  return <SuperAdminLayout>{children}</SuperAdminLayout>;
};

export default Layout;
