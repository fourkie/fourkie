import createClient from "@/services/supabase-server-service";
import PostingForm from "./_components/posting-form";
import { redirect } from "next/navigation";

const Posting = async () => {
  const supabaseServer = createClient();

  const { data, error } = await supabaseServer.auth.getUser();
  if (error || !data.user) {
    redirect("/sign-in");
  }
  const nickname =
    data.user.user_metadata.user_nickname || data.user.user_metadata.name;

  return <PostingForm nickname={nickname} />;
};

export default Posting;
