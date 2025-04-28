import { getUserId } from "@/services/home-service";
import ScrollZero from "@/ui/common/scrollzero.common";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeCalendar from "./(home)/components/home-calendar";
import HomeFriend from "./(home)/components/home-friend";
import HomeMusic from "./(home)/components/home-music";
import HomePosting from "./(home)/components/home-posting";
import HomeStack from "./(home)/components/home-stack";

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
    <div>
      <ScrollZero />
      <div className="flex flex-col md:max-h-[702px] md:flex-row md:gap-10">
        <div className="mt-[3rem] hidden h-full w-[32%] flex-col md:flex md:max-w-[334px]">
          <div className="flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-3">
              <HomeStack userId={userId} />
              <HomeFriend userId={userId} />
            </div>
            <div>
              <HomeMusic userId={userId} />
            </div>
          </div>
        </div>

        <div className="w-full flex-1 md:max-h-[702px] md:w-[68%] md:max-w-[620px]">
          <HomePosting userId={userId} />
          <HomeCalendar userId={userId} />

          {/* 모바일 */}
          <div className="mt-5 flex flex-col gap-5 md:hidden">
            <HomeFriend userId={userId} />
            <HomeMusic userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
