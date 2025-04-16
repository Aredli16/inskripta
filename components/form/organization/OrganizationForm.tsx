"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Tables } from "@/types/database.types";
import SubmitButton from "@/components/form/SubmitButton";
import { useActionState, useEffect, useState } from "react";
import {
  addOrganizationAdmin,
  deleteOrganization,
  removeOrganizationAdmin,
  saveOrganization,
} from "@/actions/organizations-actions";
import { User } from "@supabase/auth-js";
import {
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ExclamationTriangleIcon, PlusIcon } from "@heroicons/react/24/outline";
import UserCombobox from "@/components/UserCombobox";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/20/solid";
import BaseModal from "@/components/BaseModal";

const OrganizationForm = ({
  defaultOrganization,
  organizationAdmin,
}: {
  defaultOrganization?: Tables<"organizations">;
  organizationAdmin?: User[];
}) => {
  const t = useTranslations("SuperAdmin.Organizations");
  const [searchUserOpen, setSearchUserOpen] = useState(false);
  const [addOrganizationAdminState, addOrganizationAdminAction] =
    useActionState(addOrganizationAdmin, {});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (addOrganizationAdminState.success) {
      setSearchUserOpen(false);
    }
  }, [addOrganizationAdminState.success]);

  return (
    <>
      {defaultOrganization && (
        <>
          <BaseModal open={searchUserOpen} onClose={setSearchUserOpen}>
            <form
              action={addOrganizationAdminAction}
              className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <DialogPanel
                transition
                className="relative transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div>
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                    <PlusIcon
                      aria-hidden="true"
                      className="size-6 text-green-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      {t("View.Admin.Add.Title")}
                    </DialogTitle>
                    <div className="mt-2">
                      <UserCombobox
                        placeholder={t("View.Admin.Add.Placeholder")}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <SubmitButton className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">
                    {t("View.Admin.Add.Submit")}
                  </SubmitButton>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setSearchUserOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    {t("View.Admin.Add.Cancel")}
                  </button>
                </div>
              </DialogPanel>
              <input
                type="hidden"
                name="organizationId"
                value={defaultOrganization?.id}
              />
            </form>
          </BaseModal>

          <BaseModal open={confirmDelete} onClose={setConfirmDelete}>
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      {t("Delete.Title")}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {t("Delete.Description")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteOrganization(defaultOrganization.id);
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    {t("Delete.Submit")}
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setConfirmDelete(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    {t("Delete.Cancel")}
                  </button>
                </div>
              </DialogPanel>
            </div>
          </BaseModal>

          <div className="flex justify-end mb-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => setConfirmDelete(true)}
            >
              <TrashIcon aria-hidden="true" className="-ml-0.5 size-5" />
              {t("Delete.Title")}
            </button>
          </div>
        </>
      )}

      <form action={saveOrganization}>
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">
                {defaultOrganization ? t("View.Title") : t("View.Description")}
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                {defaultOrganization ? t("Add.Title") : t("Add.Description")}
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t("Form.Name")}
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={defaultOrganization?.name}
                  />
                </div>
              </div>
            </div>
          </div>

          {defaultOrganization && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">
                  {t("View.Admin.Title")}
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  {t("View.Admin.Description")}
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="mb-3 flex justify-end">
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setSearchUserOpen(true)}
                  >
                    {t("View.Admin.Add.Title")}
                  </button>
                </div>
                <ul
                  role="list"
                  className="divide-y divide-gray-100 bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl"
                >
                  {organizationAdmin?.map((admin) => (
                    <li
                      key={admin.id}
                      className="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm/6 font-semibold text-gray-900">
                            <Link
                              href={`mailto:${admin.email}`}
                              className="truncate hover:underline"
                            >
                              {admin.email}
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-x-6">
                        <Menu as="div" className="relative flex-none">
                          <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon
                              aria-hidden="true"
                              className="size-5"
                            />
                          </MenuButton>
                          <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                          >
                            <MenuItem>
                              <button
                                type="button"
                                className="block w-full text-left px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                onClick={async () => {
                                  await removeOrganizationAdmin(admin.id);
                                }}
                              >
                                {t("View.Admin.Remove")}
                                <span className="sr-only">, {admin.email}</span>
                              </button>
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/admin" className="text-sm/6 font-semibold text-gray-900">
            {t("Form.Cancel")}
          </Link>
          <SubmitButton className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {t("Form.Submit")}
          </SubmitButton>
        </div>
        {defaultOrganization && (
          <input
            type="hidden"
            name="organizationId"
            value={defaultOrganization.id}
          />
        )}
      </form>
    </>
  );
};

export default OrganizationForm;
