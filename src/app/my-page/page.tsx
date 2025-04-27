import createClient from "@/services/supabase-server-service";
import EmotionGraph from "@/ui/common/emotion-graph.common";
import { redirect } from "next/navigation";
import MypageMenuList from "./components/mypage-menu-list";
import MypageProfile from "./components/mypage-profile";

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
      <div className="flex flex-col gap-5 md:mb-5 md:flex-row items-center md:gap-11">
        <MypageProfile userId={user!.id} />
        <EmotionGraph isListPage={false} userId={user!.id} openPopup={true} />
      </div>
      <MypageMenuList />
    </div>
  );
};

export default MyPage;
