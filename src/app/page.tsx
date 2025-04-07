import { getUserId } from "@/services/home-services";
import HomeCalendar from "./(home)/components/home-calendar";
import HomeDate from "./(home)/components/home-date";
//import HomeDiary from "./(home)/components/home-diary";

const HomePage = async () => {
  const userId: string | undefined = await getUserId();
  return (
    <div>
      <HomeDate />
      <HomeCalendar userId={userId} />
      {/* <HomeDiary /> */}
    </div>
  );
};

export default HomePage;
