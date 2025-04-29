import { getPostTodayEmotionById } from "@/services/post-service";
import createClient from "@/services/supabase-server-service";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { redirect } from "next/navigation";
import PostingButton from "./_components/posting-button";
import PostingForm from "./_components/posting-form";

const Posting = async () => {
  const supabaseServer = createClient();
  const {
    data: { user },
    error,
  } = await supabaseServer.auth.getUser();
  if (error || !user) {
    redirect("/sign-in");
  }

  const userId = user.id;

  const todayPosts = await getPostTodayEmotionById(userId);

  if (todayPosts && todayPosts.length > 0) {
    redirect("/");
  }

  dayjs.locale("ko");
  const date = dayjs().format("D");
  const day = dayjs().format("dddd");

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="flex gap-2">
          <span className="text-xl">{date}</span>
          <span className="text-xl">{day}</span>
        </p>
        <PostingButton className={"hidden h-7 md:block"} />
      </div>
      <hr className="my-2.5 w-full border-grey-0" />
      <PostingForm userId={userId} />
    </>
  );
};

export default Posting;
