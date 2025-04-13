import { SPOTIFY } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  // ① Spotify 자격 증명
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(TOAST_MESSAGE.SPOTIFY.CLIENT_ERROR, {
      status: 500,
    });
  }

  // ② 토큰 발급 요청
  const tokenEndpoint = SPOTIFY.TOKEN_ENDPOINT;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const tokenResponse = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": SPOTIFY.CONTENT_TYPE,
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({ grant_type: SPOTIFY.CLIENT_CREDENTIALS }),
  });

  // ③ 토큰 요청 실패 처리
  if (!tokenResponse.ok) {
    return new NextResponse(TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR, {
      status: 500,
    });
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;
  const expiresIn = tokenData.expires_in;

  // ④ 토큰 쿠키 저장
  const response = new NextResponse(
    JSON.stringify({
      accessToken: accessToken,
      expiresIn,
      success: true,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  response.cookies.set(SPOTIFY.ACCESS_TOKEN, accessToken, {
    httpOnly: false, // 클라이언트 접근 허용 (보안 고려)
    secure: process.env.NODE_ENV === SPOTIFY.PRODUCTION,
    maxAge: expiresIn,
    path: "/",
    sameSite: "lax",
  });

  return response;
};
