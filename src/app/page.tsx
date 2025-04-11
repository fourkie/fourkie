import { getUserId, getUserNickname } from "@/services/home-service";
import HomeCalendar from "./(home)/components/home-calendar";
import HomeHeader from "./(home)/components/home-header";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const userId: string | undefined = await getUserId();
  const nickname: string | undefined = await getUserNickname();
  if (!userId || !nickname) {
    redirect("/sign-in");
  }
  return (
    <div>
      <HomeHeader nickname={nickname} />
      <HomeCalendar userId={userId} />
      <div>친구 컴포넌트 자리</div>
      <div>뮤직 컴포넌트 자리</div>
    </div>
  );
};

export default HomePage;
