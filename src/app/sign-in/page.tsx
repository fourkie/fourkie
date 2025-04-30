import createClient from "@/services/supabase-server-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignInForm from "./_components/sign-in-form";

const SignIn = async () => {
  const cookieStore = cookies();
  const hasSeenTutorial = cookieStore.get("hasSeenTutorial")?.value;

  if (!hasSeenTutorial || hasSeenTutorial !== "true") {
    redirect("/tutorial");
  }

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
