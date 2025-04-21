import { getUserId } from "@/services/home-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeCalendar from "./(home)/components/home-calendar";
import HomeFriend from "./(home)/components/home-friend";
import HomeMusic from "./(home)/components/home-music";

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
    <div className="px-5 pb-32 pt-16">
      <HomeCalendar userId={userId} />
      <HomeFriend userId={userId} />
      <HomeMusic userId={userId} />
    </div>
  );
};

export default HomePage;
