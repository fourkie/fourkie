"use client";

import { signOut } from "@/services/auth-services";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleLogout}>log out</button>;
};

export default Header;
