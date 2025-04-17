"use client";

import { signOut } from "@/services/auth-service";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default Header;
