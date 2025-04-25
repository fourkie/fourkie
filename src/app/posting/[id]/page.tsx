import createClient from "@/services/supabase-server-service";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { redirect } from "next/navigation";
import PostingForm from "../_components/posting-form";

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
  const date = dayjs().format("D");
  const day = dayjs().format("dddd");

  return (
    <div className="ml-5 mr-6 mt-14">
      <div className="flex gap-2 pt-4 font-bold text-grey-7">
        <span className="text-xl">{date}</span>
        <span className="text-lg">{day}</span>
      </div>
      <hr className="my-2.5 w-full border-grey-0" />

      <PostingForm postId={postId} userId={userId} />
    </div>
  );
};

export default Edit;
