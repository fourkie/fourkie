import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// 서버 전용 supabase
const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            throw new Error(
              "서버 컴포넌트에서는 cookies().set() 메서드를 사용할 수 없습니다.",
            );
          }
        },
      },
    },
  );
};

export default createClient;
