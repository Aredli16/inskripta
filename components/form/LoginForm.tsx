"use client";

import { useActionState, useState } from "react";
import { AuthState, signIn, signUp } from "@/app/(main)/auth/actions";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { PulseLoader } from "react-spinners";
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const toggleMode = () => setMode(mode === "login" ? "register" : "login");
  const [state, action, pending] = useActionState(
    (state: AuthState, payload: FormData) =>
      mode === "login" ? signIn(state, payload) : signUp(state, payload),
    {},
  );
  const t = useTranslations("Auth");

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto"
          width="50"
          height="50"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {mode === "login" ? t("SignIn") : t("SignUp")}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={action} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              {t("Email")}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              {t("Password")}
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <AnimatePresence>
            {mode === "register" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-900"
                >
                  {t("ConfirmPassword")}
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={mode === "register"}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {pending ? (
                <PulseLoader color="#312c85" />
              ) : mode === "login" ? (
                t("Login")
              ) : (
                t("Register")
              )}
            </button>

            {state?.error && (
              <div className="mt-4 text-sm text-red-600 text-center">
                {state.error}
              </div>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {mode === "login" ? t("DontHaveAccount") : t("AlreadyHaveAccount")}{" "}
          <button
            onClick={toggleMode}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {mode === "login" ? t("SignUpNow") : t("SignInNow")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
