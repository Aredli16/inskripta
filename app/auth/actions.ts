"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getTranslations } from "next-intl/server";

export type AuthState = {
  error?: string;
};

export async function signIn(
  previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    const t = await getTranslations("Auth.Errors");
    switch (error.code) {
      case "invalid_credentials":
        return {
          error: t("InvalidCredentials"),
        };

      default:
        console.error(error);
        return {
          error: error.code,
        };
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(
  previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const t = await getTranslations("Auth.Errors");

  if (password !== confirmPassword) {
    return {
      error: t("PasswordMismatch"),
    };
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    switch (error.code) {
      case "user_already_exists":
        return {
          error: t("UserAlreadyExists"),
        };

      case "weak_password":
        return {
          error: t("WeakPassword"),
        };

      default:
        console.error(error);
        return {
          error: error.code,
        };
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}
