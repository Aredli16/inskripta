import { ReactNode } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const Layout = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("Domain.Admin.Settings");

  const tabs = [
    { name: t("Tabs.Registration"), href: "/admin/settings", current: true },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {t("Title")}
      </h1>
      <div className="py-6">
        <div className="grid grid-cols-1 lg:hidden">
          <select
            defaultValue={tabs.find((tab) => tab.current)?.name}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
          />
        </div>
        <div className="hidden lg:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={clsx(
                    tab.current
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap",
                  )}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {children}
      </div>
    </>
  );
};

export default Layout;
