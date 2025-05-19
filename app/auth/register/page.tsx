"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import ValidationInput from "@/components/form/ValidationInput";
import SubmitButton from "@/components/form/SubmitButton";
import { useTranslations } from "next-intl";
import { register } from "@/app/auth/register/register.action";

const Page = () => {
  const t = useTranslations("Auth");
  const [state, action] = useActionState(register, {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            {t("Register.Title")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            <form action={action} className="space-y-6">
              <ValidationInput
                name="email"
                autoComplete="email"
                type="email"
                error={state.error?.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                {t("Email")}
              </ValidationInput>

              <ValidationInput
                name="password"
                autoComplete="current-password"
                type="password"
                error={state.error?.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
                {t("Password")}
              </ValidationInput>

              <ValidationInput
                name="confirmPassword"
                type="password"
                error={state.error?.confirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              >
                {t("Register.ConfirmPassword")}
              </ValidationInput>

              <SubmitButton className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {t("Register.Title")}
              </SubmitButton>
            </form>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            <Link href="/auth/login">{t("Register.Login")}</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
