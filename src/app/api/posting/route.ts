import { AI } from "@/constants/ai.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { inputText } = await req.json();

  try {
    const response = await fetch(AI.HUGGING_FACE.KLUE_BERT_BASE_SENTIMENT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: inputText,
        options: {
          wait_for_model: true,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HuggingFace API 응답 실패:", errorText);
      return NextResponse.json(
        { error: TOAST_MESSAGE.AI.HUGGINGFACE.SERVER_ERROR },
        { status: 500 },
      );
    }

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
