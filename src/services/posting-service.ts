// route에 요청을 보내는 함수
export const getAnalyzedPostEmotion = async (inputText: string) => {
  const response = await fetch("/api/posting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputText }),
  });

  const data = await response.json();

  if (!Array.isArray(data) || !data[0]) {
    throw new Error("감정 분석 실패");
  }

  return data[0][0].label;
};
