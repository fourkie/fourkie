import HomeDate from "./(home)/components/home-date";
import HomeDiary from "./(home)/components/home-diary";

const HomePage = async () => {
  return (
    <div>
      <HomeDate />
      <HomeDiary />
    </div>
  );
};

export default HomePage;
