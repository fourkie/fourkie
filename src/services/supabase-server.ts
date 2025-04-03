import ENV from "@/constants/env";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function createServer() {
  const cookieStore = cookies();

  return createServerClient(
    ENV.SUPABASE_URL_SERVER!,
    ENV.SUPABASE_ANON_KEY_SERVER!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    }
  );
}

export default createServer;
