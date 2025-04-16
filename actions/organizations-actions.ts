"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type OrganizationState = {
  success?: boolean;
  errors?: {
    name?: string;
  };
};

export const saveOrganization = async (formData: FormData) => {
  const organizationId = formData.get("organizationId") as string;
  const rawName = (formData.get("name") as string).toLowerCase();
  const name = rawName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9- ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!/^[a-z0-9-]+$/.test(name)) {
    throw Error("Invalid organization name");
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .upsert({ id: organizationId ?? undefined, name })
    .select()
    .single();

  if (!data) {
    throw error;
  }

  revalidatePath("/admin");
  redirect("/admin/" + data.id);
};

export const addOrganizationAdmin = async (
  prevState: OrganizationState,
  formData: FormData,
): Promise<OrganizationState> => {
  const organizationId = formData.get("organizationId") as string;
  const userId = formData.get("user_id") as string;

  const supabase = await createClient();
  const { error } = await supabase
    .from("organization_administration")
    .upsert({ organization_id: organizationId, user_id: userId });

  if (error) {
    return {
      success: false,
    };
  }

  revalidatePath("/admin");
  return {
    success: true,
  };
};

export const searchUserByEmail = async (email: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_user_by_email", {
    search_email: email,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const removeOrganizationAdmin = async (
  userId: string,
): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("organization_administration")
    .delete()
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  revalidatePath("/admin");
};

export const deleteOrganization = async (organizationId: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("organizations")
    .delete()
    .eq("id", organizationId);

  if (error) {
    throw error;
  }

  revalidatePath("/admin");
  redirect("/admin");
};
