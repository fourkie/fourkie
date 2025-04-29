import { getUserId } from "@/services/home-service";
import ScrollZero from "@/ui/common/scrollzero.common";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HomePageShell } from "./(home)/components/home-loading";

const HomePage = async () => {
  const cookieStore = cookies();
  const hasSeenTutorial = cookieStore.get("hasSeenTutorial")?.value;

  if (!hasSeenTutorial || hasSeenTutorial !== "true") {
    redirect("/tutorial");
  }

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
