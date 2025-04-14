import "../globals.css";
import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const Layout = async ({ children }: { children: ReactNode }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const locale = await getLocale();

  if (user) {
    redirect("/");
  }

  return (
    <html lang={locale} className="h-full bg-gray-50">
      <body className="h-full">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;
