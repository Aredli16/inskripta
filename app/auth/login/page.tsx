"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import ValidationInput from "@/components/form/ValidationInput";
import SubmitButton from "@/components/form/SubmitButton";
import { useTranslations } from "next-intl";
import { login } from "@/app/auth/login/login.action";

const Page = () => {
  const t = useTranslations("Auth");
  const [state, action] = useActionState(login, {});

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Logo"
            src="/Logo.png"
            className="mx-auto"
            width={200}
            height={200}
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {t("Login.Title")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            <form action={action} className="space-y-6">
              <ValidationInput name="email" type="email" error={state.error}>
                {t("Email")}
              </ValidationInput>

              <ValidationInput
                name="password"
                type="password"
                autoComplete="current-password"
              >
                {t("Password")}
              </ValidationInput>

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="remember-me"
                    className="block text-sm/6 text-gray-900"
                  >
                    {t("Login.Remember")}
                  </label>
                </div>

                <div className="text-sm/6">
                  <Link
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {t("Login.ForgotPassword")}
                  </Link>
                </div>
              </div>

              <SubmitButton className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {t("Login.Login")}
              </SubmitButton>
            </form>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {t("Login.NoAccount")}{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t("Login.Register")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
