import {
  ChangeEvent,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

const ValidationInput = ({
  children,
  name,
  type,
  autoComplete,
  error,
  onChange,
  value,
  required,
  defaultValue,
}: {
  children: ReactNode;
  name: string;
  type: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | readonly string[] | number;
  required?: boolean;
  defaultValue?: string | readonly string[] | number;
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {children}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className={clsx(
            error
              ? "text-red-900 outline-red-300 placeholder:text-red-300 focus:outline-red-600"
              : "text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600",
            "col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6",
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        />
        {error && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
          />
        )}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default ValidationInput;
