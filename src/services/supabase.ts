import ENV from "@/constants/env";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  ENV.SUPABASE_URL_CLIENT,
  ENV.SUPABASE_ANON_KEY_CLIENT,
);

export default supabase;
