import createClient from "@/services/supabase-server-service";
import MypageGraph from "./components/mypage-graph";
import MypageMenuList from "./components/mypage-menu-list";
import MypageProfile from "./components/mypage-profile";

const MyPage = async () => {
  const supabaseClient = createClient();
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  return (
    <div className="min-h-screen bg-white px-4 pb-28 pt-20">
      <MypageProfile userId={user?.id} />
      <MypageGraph />
      <MypageMenuList />
    </div>
  );
};

export default MyPage;
