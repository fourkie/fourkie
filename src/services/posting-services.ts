import { PostingResponse } from "@/app/posting/type";

export const postEmotion = async (inputText: string) => {
  const response = await fetch("/api/posting", {
    method: "POST",
    body: JSON.stringify({ inputText }),
  });

  const data = await response.json();
  if (!Array.isArray(data) || !data[0]) {
    throw new Error("감정 분석 실패");
  }

  return data[0].slice(0, 5).map((item: PostingResponse) => item.label);
};
