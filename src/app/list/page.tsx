import supabaseServer from "@/services/supabase-server-service";
import { redirect } from "next/navigation";
import ListCardContainer from "./_components/list-card-container";

const List = async () => {
  const supabase = supabaseServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <ListCardContainer userId={user!.id} />
    </div>
  );
};

export default List;
