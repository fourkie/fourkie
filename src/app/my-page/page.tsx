import createClient from "@/services/supabase-server-service";
import { redirect } from "next/navigation";
import MypageContainer from "./components/mypage-container";

const MyPage = async () => {
  const supabaseClient = createClient();
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();
  if (error || !user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex w-full flex-col justify-center gap-5">
      <MypageContainer userId={user.id} />
    </div>
  );
};

export default MyPage;
