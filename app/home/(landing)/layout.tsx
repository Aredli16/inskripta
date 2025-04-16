import "../../globals.css";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const Layout = async ({ children }: { children: ReactNode }) => {
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
