import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "@/components/form/LoginForm";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { redirectTo } = await searchParams;

  if (user) {
    redirect(redirectTo ?? "/");
  }

  return <LoginForm redirectTo={redirectTo} />;
};

export default Page;
