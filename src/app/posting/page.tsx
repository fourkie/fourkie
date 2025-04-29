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
      <div className="flex items-center justify-between text-grey-8">
        <p
          className="flex items-center gap-2"
          aria-label={`오늘은 ${day}요일, ${date}일입니다`}
        >
          <span className="text-xl md:text-2xl" style={{ lineHeight: 1 }}>
            {date}
          </span>
          <span className="text-lg md:text-xl" style={{ lineHeight: 1 }}>
            {day}
          </span>
        </p>
        <PostingButton
          className={"hidden h-7 md:block"}
          aria-label="게시글 작성 완료"
        />
      </div>
      <hr
        className="my-2.5 w-full border-grey-0 mb-12"
        role="presentation"
        aria-hidden="true"
      />
      <PostingForm userId={userId} />
    </>
  );
};

export default Posting;
