"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Database } from "@/types/database.types";
import { searchUserByEmail } from "@/actions/organizations-actions";

const UserCombobox = ({ placeholder }: { placeholder?: string }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [users, setUsers] = useState<
    Database["public"]["Functions"]["get_user_by_email"]["Returns"]
  >([]);
  const [selected, setSelected] = useState<
    Database["public"]["Functions"]["get_user_by_email"]["Returns"][0] | null
  >(null);

  useEffect(() => {
    if (!debouncedQuery) return;

    searchUserByEmail(debouncedQuery).then((data) => {
      setUsers(data ?? []);
    });
  }, [debouncedQuery]);

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={(user) => {
        setSelected(user);
      }}
    >
      <div className="relative mt-2">
        <ComboboxInput
          className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(user: { email: string }) => user?.email || ""}
          placeholder={placeholder}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
          <ChevronUpDownIcon
            className="size-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>

        {users.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
            {users.map((user) => (
              <ComboboxOption
                key={user.id}
                value={user}
                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
              >
                <span className="block truncate group-data-selected:font-semibold">
                  {user.email}
                </span>
                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-focus:text-white group-data-selected:flex">
                  <CheckIcon className="size-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>

      <input type="hidden" name="user_id" value={selected?.id || ""} />
    </Combobox>
  );
};

export default UserCombobox;
