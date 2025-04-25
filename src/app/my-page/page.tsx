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
    <div className="flex w-full flex-col justify-center gap-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-11 md:pb-5">
        <MypageProfile userId={user!.id} />
        <MypageGraph />
      </div>
      <MypageMenuList />
    </div>
  );
};

export default MyPage;
