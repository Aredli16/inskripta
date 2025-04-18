import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ domain: string }>;
}) => {
  const { domain } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("organizations")
    .select()
    .eq("name", domain)
    .single();

  if (!data) {
    notFound();
  }

  return children;
};

export default Layout;
