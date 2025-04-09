import { getUserId, getUserNickname } from "@/services/home-services";
import HomeCalendar from "./(home)/components/home-calendar";
import HomeDate from "./(home)/components/home-date";
import HomeHeader from "./(home)/components/home-header";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const userId: string | undefined = await getUserId();
  const nickname: string | undefined = await getUserNickname();
  if (userId || nickname === null) {
    redirect("/sign-in");
  }
  return (
    <div>
      <HomeHeader nickname={nickname} />
      <HomeDate />
      <HomeCalendar userId={userId} />
    </div>
  );
};

export default HomePage;
