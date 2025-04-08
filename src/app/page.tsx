import { getUserId } from "@/services/home-services";
import HomeCalendar from "./(home)/components/home-calendar";

const HomePage = async () => {
  const userId: string | undefined = await getUserId();
  return (
    <div>
      <HomeCalendar userId={userId} />
      <div>친구 컴포넌트 자리</div>
      <div>뮤직 컴포넌트 자리</div>
    </div>
  );
};

export default HomePage;
