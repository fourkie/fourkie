import { getUserId } from "@/services/home-service";
import HomeCalendar from "./(home)/components/home-calendar";
import { redirect } from "next/navigation";
import HomeFriend from "./(home)/components/home-friend";

const HomePage = async () => {
  const userId: string | undefined = await getUserId();

  //const nickname: string | undefined = await getUserNickname();
  //if (!userId || !nickname) {
  //스포티파이 구현까지 검사 로직 잠궈두기

  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <div>
      {/* <HomeHeader nickname={nickname} /> */}
      <HomeCalendar userId={userId} />
      <HomeFriend userId={userId} />
      <div>뮤직 컴포넌트 자리</div>
    </div>
  );
};

export default HomePage;
