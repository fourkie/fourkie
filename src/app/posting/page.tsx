import createClient from "@/services/supabase-server-service";
import PostingForm from "./_components/posting-form";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useGetUserByIdQuery } from "@/hooks/queries/use-get-user-by-id-query";

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

  dayjs.locale("ko");
  const date = dayjs().format("D");
  const day = dayjs().format("dddd");

  return (
    <div className="ml-5 mr-6">
      <div className="flex gap-2 pt-4 font-bold">
        <span className="text-xl">{date}</span>
        <span className="text-lg">{day}</span>
      </div>
      <hr className="my-2.5 w-full border-grey-0 " />

      <PostingForm userId={userId} />
    </div>
  );
};

export default Posting;
