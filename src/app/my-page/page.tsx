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
    <div className="mx-auto flex w-full min-w-[393px] max-w-[1024px] flex-col justify-center border px-4 pb-28 pt-20">
      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        <MypageProfile userId={user!.id} />
        <MypageGraph />
      </div>
      <MypageMenuList />
    </div>
  );
};

export default MyPage;
