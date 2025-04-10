"use client";

import { signOut } from "@/services/auth-services";
import { useRouter } from "next/navigation";
import SpotifyLogin from "../music/components/spotify-login";

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

  return (
    <div>
      <button onClick={handleLogout}>log out</button>
      <SpotifyLogin />
    </div>
  );
};

export default Header;
