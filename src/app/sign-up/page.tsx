import createClient from "@/services/supabase-server-service";
import { redirect } from "next/navigation";
import SignUpForm from "./_components/sign-up-form";

const SignUp = async () => {
  const supabaseServer = createClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  if (user) {
    redirect("/");
  }

  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
