import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import LoginForm from "@/components/form/LoginForm";

const Page = async () => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (user) {
        redirect("/")
    }

    return <LoginForm/>;
};

export default Page;