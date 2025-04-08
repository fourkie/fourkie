import ListCardContainer from "./_components/list-card-container";
import supabaseServer from "@/services/supabase-server";

const List = async () => {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <ListCardContainer userId={user!.id} />
    </div>
  );
};

export default List;
