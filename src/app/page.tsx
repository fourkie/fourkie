import { getUserId } from "@/services/home-service";
import ScrollZero from "@/ui/common/scrollzero.common";
import { redirect } from "next/navigation";
import { HomePageShell } from "./(home)/components/home-loading";

const HomePage = async () => {
  const userId: string | undefined = await getUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <ScrollZero />
      <HomePageShell userId={userId} />
    </>
  );
};

export default HomePage;
