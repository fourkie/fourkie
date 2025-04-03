import { Posts } from "@/types/posts.types";

const ListCard = ({ post }: { post: Posts }) => {
  const { post_title, post_content } = post;
  console.log(post);

  return (
    <div>
      <div>{post_title}</div>
      <div>{post_content}</div>
    </div>
  );
};

export default ListCard;
