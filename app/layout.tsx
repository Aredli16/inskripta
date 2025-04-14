import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";

const Layout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} className="h-full bg-gray-50">
      <body className="h-full">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};
export default Layout;
