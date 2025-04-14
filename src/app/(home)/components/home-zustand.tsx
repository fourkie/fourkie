"use client";

import { useLoginStore } from "@/hooks/zustand/store";
import HomeHeader from "./home-header";

const HeaderWithZustand = () => {
  const loginStateKey = useLoginStore((state) => state.loginStateKey);

  return <HomeHeader key={loginStateKey} />;
};

export default HeaderWithZustand;
