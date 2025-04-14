"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

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
