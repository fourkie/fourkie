import ENV from "@/constants/env";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// 서버 전용 supabase
const supabaseServer = () => {
  const cookieStore = cookies();
  return createServerClient(
    ENV.SUPABASE_URL_SERVER!,
    ENV.SUPABASE_ANON_KEY_SERVER!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
};

export default supabaseServer;
