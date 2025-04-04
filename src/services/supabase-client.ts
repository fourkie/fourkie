import ENV from "@/constants/env";
import { createBrowserClient } from "@supabase/ssr";

// 클라이언트 전용 supabase
const supabaseClient = createBrowserClient(
  ENV.SUPABASE_URL_CLIENT!,
  ENV.SUPABASE_ANON_KEY_CLIENT!,
);

export default supabaseClient;
