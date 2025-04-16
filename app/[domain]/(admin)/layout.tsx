import "../../globals.css";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
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

  const locale = await getLocale();

  return (
    <html lang={locale} className="h-full bg-gray-100">
      <body className="h-full">
        <NextIntlClientProvider>
          <BaseAdminLayout navigation={[]} secondaryNavigation={[]}>
            {children}
          </BaseAdminLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;
