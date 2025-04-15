import createClient from "@/services/supabase-server-service";
import PostingForm from "./_components/posting-form";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/ko";

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
  const nickname = user.user_metadata.user_nickname || user.user_metadata.name;

  dayjs.locale("ko");
  const dateWithDay = dayjs().format("D dddd");

  return (
    <>
      <div>{dateWithDay}</div>
      <PostingForm userId={userId} nickname={nickname} />
    </>
  );
};

export default Posting;
