import { getUserId } from "@/services/home-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeCalendar from "./(home)/components/home-calendar";
import HomeFriend from "./(home)/components/home-friend";
import HomeMusic from "./(home)/components/home-music";
import HomePosting from "./(home)/components/home-posting";

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
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
        <div className="flex hidden w-[30%] flex-col gap-5 lg:flex">
          <div className="flex-[2]">
            <HomeFriend userId={userId} />
          </div>
          <div className="flex-[3]">
            <HomeFriend userId={userId} />
          </div>
          <div className="flex-[1]">
            <HomeMusic userId={userId} />
          </div>
        </div>

        <div className="w-full flex-1 lg:w-[70%]">
          <HomePosting userId={userId} />
          <HomeCalendar userId={userId} />

          {/* 모바일 */}
          <div className="mt-5 flex flex-col gap-5 lg:hidden">
            <HomeFriend userId={userId} />
            <HomeMusic userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
