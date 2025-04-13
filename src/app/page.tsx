import { getUserId } from "@/services/home-service";
import HomeCalendar from "./(home)/components/home-calendar";
import { redirect } from "next/navigation";
import HomeFriend from "./(home)/components/home-friend";

const HomePage = async () => {
  const userId: string | undefined = await getUserId();

  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <div>
      <HomeCalendar userId={userId} />
      <HomeFriend userId={userId} />
      <div>뮤직 컴포넌트 자리</div>
    </div>
  );
};

export default HomePage;
