import MypageGraph from "./components/mypage-graph";
import MypageMenuList from "./components/mypage-menu-list";
import MypageProfile from "./components/mypage-profile";

const MyPage = () => {
  return (
    <div className="min-h-screen bg-white px-4 pb-28 pt-20">
      <MypageProfile />
      <MypageGraph />
      <MypageMenuList />
    </div>
  );
};

export default MyPage;
