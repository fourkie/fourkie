import createClient from "@/services/supabase-server-service";
import PostingForm from "../_components/posting-form";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const Edit = async ({ params }: { params: { id: string } }) => {
  const { id: postId } = params;

  const supabaseServer = createClient();
  const {
    data: { user },
    error,
  } = await supabaseServer.auth.getUser();
  if (error || !user) {
    redirect("/sign-in");
  }
  const userId = user.id;

  dayjs.locale("ko");
  const dateWithDay = dayjs().format("D dddd");

  return (
    <>
      <div>{dateWithDay}</div>
      <PostingForm postId={postId} userId={userId} />
    </>
  );
};

export default Edit;
