import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import BaseAdminLayout from "@/components/layout/BaseAdminLayout";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ domain: string }>;
}) => {
  const { domain } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: organization, error } = await supabase
    .from("organizations")
    .select("*, organization_administration(*)")
    .eq("name", domain)
    .eq("organization_administration.user_id", user!.id)
    .maybeSingle();

  if (
    error ||
    !organization ||
    !organization.organization_administration ||
    organization.organization_administration.length === 0
  ) {
    notFound();
  }

  return (
    <BaseAdminLayout navigation={[]} secondaryNavigation={[]}>
      {children}
    </BaseAdminLayout>
  );
};

export default Layout;
