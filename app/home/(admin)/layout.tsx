import "../../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import SuperAdminLayout from "@/components/layout/SuperAdminLayout";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();
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

  return (
    <html lang={locale} className="h-full bg-gray-100">
      <body className="h-full">
        <NextIntlClientProvider>
          <SuperAdminLayout>{children}</SuperAdminLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;
