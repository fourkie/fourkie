"use client";

import { signOut } from "@/services/auth-services";

const Header = () => {
  return <div onClick={() => signOut()}>log out</div>;
};

export default Header;
