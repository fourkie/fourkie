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
    <div className="flex w-full flex-col justify-center border border-red-500 px-4 pb-28 pt-20">
      <div className="flex border border-red-500">
        <MypageProfile userId={user!.id} />
        <MypageGraph />
      </div>
      <MypageMenuList />
    </div>
  );
};

export default MyPage;
