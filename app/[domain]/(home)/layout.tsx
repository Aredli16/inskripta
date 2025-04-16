import "../../globals.css";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
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

  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;
