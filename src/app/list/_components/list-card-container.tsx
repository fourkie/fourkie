"use client";

import { useGetAllPostsQuery } from "@/hooks/queries/use-get-all-posts-query";
import ListCard from "./list-card";

const ListCardContainer = () => {
  const { data } = useGetAllPostsQuery();
  console.log(data);

  return (
    <div>
      {" "}
      <ListCard />
    </div>
  );
};

export default ListCardContainer;
