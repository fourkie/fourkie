import { SPOTIFY } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Spotify 자격 증명 가져오기
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    // 클라이언트 ID 또는 시크릿이 없으면 에러 응답 반환
    if (!clientId || !clientSecret) {
      return new NextResponse(TOAST_MESSAGE.SPOTIFY.CLIENT_ERROR, {
        status: 500,
      });
    }

    // 토큰 발급을 위한 기본 정보 준비
    const tokenEndpoint = SPOTIFY.TOKEN_ENDPOINT;

    // client_id:client_secret 형태를 base64로 인코딩 → Authorization 헤더용
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    // access_token 요청 (Client Credentials 방식)
    const tokenResponse = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": SPOTIFY.CONTENT_TYPE,
        Authorization: `Basic ${credentials}`, // Base64 인코딩된 자격 증명 사용
      },
      body: new URLSearchParams({ grant_type: SPOTIFY.CLIENT_CREDENTIALS }),
    });

    // 요청 실패 시 에러 처리
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();

      const errorMessage =
        errorData?.error_description ||
        errorData?.error ||
        TOAST_MESSAGE.SPOTIFY.CLIENT_ERROR;

      return new NextResponse(errorMessage, { status: tokenResponse.status });
    }

    // access_token과 만료 시간 정보 추출
    const tokenData = await tokenResponse.json();

    const { access_token: accessToken, expires_in: expiresIn } = tokenData;

    // access_token 반환 + 쿠키 저장
    const response = new NextResponse(
      JSON.stringify({ accessToken, expiresIn, success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // 토큰 쿠키 저장
    response.cookies.set(SPOTIFY.ACCESS_TOKEN, accessToken, {
      httpOnly: false, // 클라이언트에서도 읽을 수 있도록 설정
      secure: process.env.NODE_ENV === SPOTIFY.PRODUCTION,
      maxAge: expiresIn, // 기본 1시간
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error: unknown) {
    // 에러 발생 시 응답 반환
    let errorMessage = TOAST_MESSAGE.SPOTIFY.CLIENT_ERROR;

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new NextResponse(errorMessage, { status: 500 });
  }
};
