import clsx from "clsx";
import MainHeader from "@/components/layout/MainHeader";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const Page = async () => {
  const t = await getTranslations();

  return (
    <>
      <MainHeader />
      <main>
        <div className="mx-auto max-w-2xl pt-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-end mb-5">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {t("Registration.Create.Title")}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      {t("Registration.Create.NewStudent")}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      {t("Registration.Create.ExistingStudent")}
                    </Link>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
          <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
            <div className="flex sm:items-baseline sm:space-x-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Registration #54879
              </h1>
            </div>
            <p className="text-sm text-gray-600">
              Created at{" "}
              <time dateTime="2021-03-22" className="font-medium text-gray-900">
                March 22, 2021
              </time>
            </p>
          </div>

          <div className="mt-6">
            <div className="space-y-8">
              <div className="border-t border-b border-gray-200 bg-white shadow-xs sm:rounded-lg sm:border">
                <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                  <div className="sm:flex lg:col-span-7">
                    <div className="mt-6 sm:mt-0 sm:ml-6">
                      <h3 className="text-base font-medium text-gray-900">
                        <a href="#">Student ID</a>
                      </h3>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        Student Name
                      </p>
                      <p className="mt-3 text-sm text-gray-500">Description</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
                  <h4 className="sr-only">Status</h4>
                  <p className="text-sm font-medium text-gray-900">
                    Statut on{" "}
                    <time dateTime={new Date().toISOString()}>Date</time>
                  </p>
                  <div aria-hidden="true" className="mt-6">
                    <div className="overflow-hidden rounded-full bg-gray-200">
                      <div
                        style={{
                          width: `calc((${2} * 2 + 1) / 8 * 100%)`,
                        }}
                        className="h-2 rounded-full bg-indigo-600"
                      />
                    </div>
                    <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                      <div className="text-indigo-600">Pending</div>
                      <div
                        className={clsx(
                          2 > 0 ? "text-indigo-600" : "",
                          "text-center",
                        )}
                      >
                        Accepted
                      </div>
                      <div
                        className={clsx(
                          2 > 1 ? "text-indigo-600" : "",
                          "text-center",
                        )}
                      >
                        Paid
                      </div>
                      <div
                        className={clsx(
                          2 > 2 ? "text-indigo-600" : "",
                          "text-right",
                        )}
                      >
                        Registered
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Page;
