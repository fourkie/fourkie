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
      <div className="flex items-center justify-between text-grey-7">
        <p
          className="flex items-center gap-2"
          aria-label={`오늘은 ${day}요일, ${date}일입니다`}
        >
          <strong className="text-xl md:text-2xl" style={{ lineHeight: 1 }}>
            {date}
          </strong>
          <strong className="text-lg md:text-xl" style={{ lineHeight: 1 }}>
            {day}
          </strong>
        </p>
        <PostingButton
          className={"hidden h-7 md:block"}
          aria-label="게시글 작성 완료"
        />
      </div>
      <hr
        className="mb-5 mt-2.5 w-full border-grey-0 md:my-3"
        role="presentation"
        aria-hidden="true"
      />
      <PostingForm postId={postId} userId={userId} />
    </>
  );
};

export default Edit;
