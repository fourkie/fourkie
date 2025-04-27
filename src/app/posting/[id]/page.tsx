import createClient from "@/services/supabase-server-service";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { redirect } from "next/navigation";
import PostingButton from "../_components/posting-button";
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
    <>
      <strong className="flex items-center justify-between text-grey-8">
        <p className="flex gap-2">
          <span className="text-xl">{date}</span>
          <span className="text-xl">{day}</span>
        </p>
        <PostingButton className={"hidden h-7 md:block"} />
      </strong>
      <hr className="my-2.5 w-full border-grey-0" />
      <PostingForm postId={postId} userId={userId} />
    </>
  );
};

export default Edit;
