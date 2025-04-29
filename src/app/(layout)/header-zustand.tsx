"use client";

import { useLoginStore } from "@/hooks/zustand/store";
import HeaderMobile from "./header-mobile";

const HeaderWithZustand = () => {
  const loginStateKey = useLoginStore((state) => state.loginStateKey);
  return <HeaderMobile key={loginStateKey} />;
};

export default HeaderWithZustand;
