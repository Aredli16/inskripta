import "./globals.css";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const Layout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} className="h-full bg-white">
      <body className="h-full">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};
export default Layout;
