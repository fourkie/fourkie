import createClient from "@/services/supabase-server-service";
import { redirect } from "next/navigation";
import SignInForm from "./_components/sign-in-form";

const SignIn = async () => {
  const supabaseServer = createClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  if (user) {
    redirect("/");
  }

  return <SignInForm />;
};

export default SignIn;
