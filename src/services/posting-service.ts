import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

export const getAnalyzedPostEmotion = async (inputText: string) => {
  try {
    const response = await fetch("/api/posting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputText }),
    });

    const data = await response.json();

    if (!Array.isArray(data) || !data[0]) {
      throw new Error(TOAST_MESSAGE.AI.HUGGINGFACE.ERROR);
    }

    return data[0][0].label;
  } catch (error) {
    console.error(error);
    throw new Error(TOAST_MESSAGE.AI.HUGGINGFACE.ERROR);
  }
};
