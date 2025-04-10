import supabaseServer from "@/services/supabase-server-service";
import PostingForm from "./_components/posting-form";
import { redirect } from "next/navigation";

const Posting = async () => {
  const supabase = supabaseServer();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/sign-in");
  }

  const nickname = data.user.user_metadata.user_nickname;

  return <PostingForm nickname={nickname} />;
};

export default Posting;
