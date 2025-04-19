import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("Domain.Home");
  const supabase = await createClient();
  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, students(*)");

  return (
    <>
      <header>
        <Disclosure as="nav" className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">
                    {t("Layout.Navigation.Title")}
                  </span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <Image alt="Logo" src="/Logo.png" width={60} height={60} />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {/* No-Current: "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link
                    href="#"
                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    {t("Layout.Navigation.Registrations")}
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">
                        {t("Layout.Navigation.UserMenu.Title")}
                      </span>
                      <Image
                        alt=""
                        src="/user.png"
                        className="rounded-full"
                        width={30}
                        height={30}
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <form
                      action={async () => {
                        "use server";

                        const supabase = await createClient();
                        await supabase.auth.signOut();

                        revalidatePath("/");
                        redirect("/");
                      }}
                    >
                      <MenuItem>
                        <button
                          type="submit"
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          {t("Layout.Navigation.UserMenu.Logout")}
                        </button>
                      </MenuItem>
                    </form>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {/* No-Current: "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 */}
              <DisclosureButton
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
              >
                {t("Layout.Navigation.Registrations")}
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </header>
      <main className="mx-auto max-w-7xl sm:px-2 lg:px-8 mt-16">
        <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                {t("Registration.Create.Title")}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
              </div>
            </MenuItems>
          </Menu>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">{t("Registration.List.Title")}</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {registrations.map((registration) => (
                <div
                  key={registration.id}
                  className="border-t border-b border-gray-200 bg-white shadow-xs sm:rounded-lg sm:border"
                >
                  <h3 className="sr-only">
                    {t("Registration.List.CreatedAt")}{" "}
                    <time dateTime={registration.created_at}>
                      {registration.created_at}
                    </time>
                  </h3>

                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">
                          {t("Registration.List.ID")}
                        </dt>
                        <dd className="mt-1 text-gray-500">
                          {registration.id}
                        </dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">
                          {t("Registration.List.CreatedAt")}
                        </dt>
                        <dd className="mt-1 text-gray-500">
                          <time dateTime={registration.created_at}>
                            {new Date(registration.created_at).toLocaleString()}
                          </time>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <ul role="list" className="divide-y divide-gray-200">
                    <li className="p-4 sm:p-6">
                      <div className="flex items-center sm:items-start">
                        <div className="flex-1 text-sm">
                          <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                            <h5>
                              {registration.students.last_name}{" "}
                              {registration.students.first_name}
                            </h5>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 sm:flex sm:justify-between">
                        <div className="flex items-center">
                          <CheckCircleIcon
                            aria-hidden="true"
                            className="size-5 text-green-500"
                          />
                          <p className="ml-2 text-sm font-medium text-gray-500">
                            Delivered on{" "}
                            <time dateTime={registration.created_at}>
                              {registration.created_at}
                            </time>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
