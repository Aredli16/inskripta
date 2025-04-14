import "../globals.css";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const Page = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();

  return (
    <html className="h-full bg-gray-100" lang={locale}>
      <body className="h-full">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};
export default Page;
