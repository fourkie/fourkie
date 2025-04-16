import MypageMenuList from "./components/mypage-menu-list";
import MypageProfile from "./components/mypage-profile";

const MyPage = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <MypageProfile />
      {/* 감정 통계 그래프 자리 */}
      <MypageMenuList />
    </div>
  );
};

export default MyPage;
