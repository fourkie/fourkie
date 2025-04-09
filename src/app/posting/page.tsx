import supabaseServer from "@/services/supabase-server";
import PostingForm from "./_components/posting-form";
import { redirect } from "next/navigation";

const Posting = async () => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/sign-in");
  }

  return <PostingForm />;
};

export default Posting;
