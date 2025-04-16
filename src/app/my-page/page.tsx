import { useEffect, useState } from "react";
import MypageMenuList from "./components/mypage-menu-list";
import MypageProfile from "./components/mypage-profile";
import EmotionGraph from "@/ui/common/emotion-graph";

const MyPage = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <MypageProfile />
      {/* 그래프 자리 */}
      {/* {openPopup && (
          <EmotionGraph
            page="list"
            openPopup={openPopup}
            setOpenPopup={() => setOpenPopup(!openPopup)}
            userId={user_id}
            nickname={user?.user_nickname}
          />
        )} */}
      <MypageMenuList />
    </div>
  );
};

export default MyPage;
