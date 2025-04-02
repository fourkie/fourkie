import React from "react";
import { getUserPostData } from "./home/utils/home-emotion.util";

const HomePage = async () => {
  const a = await getUserPostData();
  console.log(a);
  return <div>HomePage</div>;
};

export default HomePage;
