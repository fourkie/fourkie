import { AI } from "@/constants/ai";
import { TOAST_MESSAGE } from "@/constants/toast-message";
import { NextRequest, NextResponse } from "next/server";

// AI의 감정 분석 API를 호출하는 함수
export const POST = async (req: NextRequest) => {
  const { inputText } = await req.json();

  try {
    const response = await fetch(AI.HUGGING_FACE.KLUE_BERT_BASE_SENTIMENT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
      body: JSON.stringify({ inputs: inputText }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("HuggingFace API 요청 실패", error);

    return NextResponse.json(
      { error: TOAST_MESSAGE.AI.HUGGINGFACE.SERVER_ERROR },
      { status: 500 },
    );
  }
};
