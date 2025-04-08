import "../globals.css";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import AdminLayout from "@/components/layout/AdminLayout";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", user!.id)
    .single();

  if (profile && profile.role !== "admin") {
    notFound();
  }

  return (
    <html lang={locale} className="h-full bg-gray-100">
      <body className="h-full">
        <NextIntlClientProvider>
          <AdminLayout>{children}</AdminLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};
export default Layout;
