import createClient from "@/services/supabase-server-service";
import PostingForm from "../_components/posting-form";
import { redirect } from "next/navigation";

const Edit = async ({ params }: { params: { id: string } }) => {
  const { id: postId } = params;

  const supabaseServer = createClient();
  const { data, error } = await supabaseServer.auth.getUser();
  if (error || !data.user) {
    redirect("/sign-in");
  }
  const userId = data.user.id;

  return <PostingForm postId={postId} userId={userId} />;
};

export default Edit;
