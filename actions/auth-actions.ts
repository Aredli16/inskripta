"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";

type LoginState = {
  error?: string;
};

export const login = async (
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    const t = await getTranslations("Auth.Login.Error");
    switch (error.code) {
      case "invalid_credentials":
        return {
          error: t("InvalidCredentials"),
        };
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
};

type RegisterState = {
  error?: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export const register = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const t = await getTranslations("Auth.Register.Error");
  const password = formData.get("password") as string;

  if (password !== (formData.get("confirmPassword") as string)) {
    return {
      error: {
        confirmPassword: t("PasswordMismatch"),
      },
    };
  }

  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    switch (error.code) {
      case "user_already_exists":
        return {
          error: {
            email: t("UserAlreadyExists"),
          },
        };
      case "weak_password":
        return {
          error: {
            password: t("WeakPassword"),
          },
        };
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
};
