"use client";

import EmotionGraph from "@/ui/common/emotion-graph.common";
import { motion } from "framer-motion";
import MypageMenuList from "./mypage-menu-list";
import MypageProfile from "./mypage-profile";

const MypageContainer = ({ userId }: { userId: string }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-5 md:mb-5 md:flex-row md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0 },
          }}
          viewport={{ once: true }}
          className="relative w-full rounded-2xl border border-primary-50 bg-white py-5 md:flex md:h-[300px] md:w-[600px] md:items-center md:justify-center"
        >
          <MypageProfile userId={userId} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 },
          }}
          viewport={{ once: true }}
          className="w-full"
        >
          <EmotionGraph isListPage={false} userId={userId} openPopup={true} />
        </motion.div>
      </div>
      <MypageMenuList />
    </>
  );
};

export default MypageContainer;
