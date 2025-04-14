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
