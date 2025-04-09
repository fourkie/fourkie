import { getUserId, getUserNickname } from "@/services/home-services";
import HomeCalendar from "./(home)/components/home-calendar";
import HomeDate from "./(home)/components/home-date";
import HomeHeader from "./(home)/components/home-header";

const HomePage = async () => {
  const userId: string | undefined = await getUserId();
  const nickname: string | undefined = await getUserNickname();
  return (
    <div>
      <HomeHeader nickname={nickname} />
      <HomeDate />
      <HomeCalendar userId={userId} />
    </div>
  );
};

export default HomePage;
