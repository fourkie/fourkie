import MypageHeader from "./components/mypage-header";
import MypageProfile from "./components/mypage-profile";

const MyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MypageHeader />
      <MypageProfile />
    </div>
  );
};

export default MyPage;
