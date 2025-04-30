import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import createClient from "@/services/supabase-client-service";
import { toast } from "react-toastify";

export const getUserForClient = async () => {
  try {
    const supabaseClient = createClient();
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (user?.id) {
      return { userId: user?.id };
    }
  } catch {
    toast.error(TOAST_MESSAGE.ERROR.AUTH_ERROR);
  }
};
