import { getUserId } from "@/services/home-service";
import HomeCalendar from "./(home)/components/home-calendar";
import { redirect } from "next/navigation";
import HomeFriend from "./(home)/components/home-friend";
import HomeMusic from "./(home)/components/home-music";

const HomePage = async () => {
  const userId: string | undefined = await getUserId();

  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <div className="px-4">
      <HomeCalendar userId={userId} />
      <HomeFriend userId={userId} />
      <HomeMusic />
    </div>
  );
};

export default HomePage;
