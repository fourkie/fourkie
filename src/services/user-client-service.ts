import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import createClient from "@/services/supabase-client-service";
import { toast } from "react-toastify";

// 클라이언트에서 현재 로그인한 사용자의 userId 를 가져오는 훅
// for 친구 신청 팝업
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
