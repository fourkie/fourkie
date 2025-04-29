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
      <div className="flex flex-col items-center gap-5 md:mb-5 md:flex-row md:gap-10">
        <MypageProfile userId={user!.id} />
        <div className="w-full">
          <EmotionGraph isListPage={false} userId={user!.id} openPopup={true} />
        </div>
      </div>
      <MypageMenuList />
    </div>
  );
};

export default MyPage;
