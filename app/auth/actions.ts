"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type AuthState = {
  error?: string;
};

export async function login(
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
    return {
      error: error.code,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function register(
  previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return {
      error: "passwords do not match",
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
    return {
      error: error.code,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
