"use client";

import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  SVGProps,
  useState,
} from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const navigation: {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    PropsWithoutRef<SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & RefAttributes<SVGSVGElement>
  >;
  current: boolean;
}[] = [];
const secondaryNavigation: {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    PropsWithoutRef<SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & RefAttributes<SVGSVGElement>
  >;
  current: boolean;
}[] = [];

const Page = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("Admin.Layout");

  return (
    <>
      <div className="min-h-full">
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-600/75 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs flex-1 transform flex-col bg-indigo-700 pt-5 pb-4 transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 right-0 -mr-12 pt-2 duration-300 ease-in-out data-closed:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="relative ml-1 flex size-10 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">{t("CloseSidebar")}</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex shrink-0 items-center px-4">
                <img
                  alt="Easywire logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=300"
                  className="h-8 w-auto"
                />
              </div>
              <nav
                aria-label="Sidebar"
                className="mt-5 h-full shrink-0 divide-y divide-indigo-800 overflow-y-auto"
              >
                <div className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={clsx(
                        item.current
                          ? "bg-indigo-800 text-white"
                          : "text-indigo-100 hover:bg-indigo-600 hover:text-white",
                        "group flex items-center rounded-md px-2 py-2 text-base font-medium",
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className="mr-4 size-6 shrink-0 text-indigo-200"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="space-y-1 px-2">
                    {secondaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={clsx(
                          item.current
                            ? "bg-indigo-800 text-white"
                            : "text-indigo-100 hover:bg-indigo-600 hover:text-white",
                          "group flex items-center rounded-md px-2 py-2 text-base font-medium",
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="mr-4 size-6 text-indigo-200"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </DialogPanel>
            <div aria-hidden="true" className="w-14 shrink-0">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col overflow-y-auto bg-indigo-700 pt-5 pb-4">
            <div className="flex shrink-0 items-center px-4">
              <img
                alt="Easywire logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=300"
                className="h-8 w-auto"
              />
            </div>
            <nav
              aria-label="Sidebar"
              className="mt-5 flex flex-1 flex-col divide-y divide-indigo-800 overflow-y-auto"
            >
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={clsx(
                      item.current
                        ? "bg-indigo-800 text-white"
                        : "text-indigo-100 hover:bg-indigo-600 hover:text-white",
                      "group flex items-center rounded-md px-2 py-2 text-sm/6 font-medium",
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className="mr-4 size-6 shrink-0 text-indigo-200"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="space-y-1 px-2">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={clsx(
                        item.current
                          ? "bg-indigo-800 text-white"
                          : "text-indigo-100 hover:bg-indigo-600 hover:text-white",
                        "group flex items-center rounded-md px-2 py-2 text-sm/6 font-medium",
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className="mr-4 size-6 text-indigo-200"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 shrink-0 border-b border-gray-200 bg-white lg:border-none">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="border-r border-gray-200 px-4 text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset lg:hidden"
            >
              <span className="sr-only">{t("OpenSidebar")}</span>
              <Bars3CenterLeftIcon aria-hidden="true" className="size-6" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-end px-4 sm:px-6 lg:mx-auto lg:px-8">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                      <span className="absolute -inset-1.5 lg:hidden" />
                      <Image
                        alt=""
                        src="/utilisateur.png"
                        className="rounded-full"
                        width="32"
                        height="32"
                      />
                      <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                        {t("MyAccount")}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-1 hidden size-5 shrink-0 text-gray-400 lg:block"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <button
                        onClick={async () => {
                          const client = createClient();

                          await client.auth.signOut();
                          router.refresh();
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden w-full text-start"
                      >
                        {t("Logout")}
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">{children}</main>
        </div>
      </div>
    </>
  );
};
export default Page;
