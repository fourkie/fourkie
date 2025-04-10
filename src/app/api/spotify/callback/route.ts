import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  DEFAULT_ACCESS_TOKEN_EXPIRE_SEC,
  MS_IN_SECOND,
  REFRESH_TOKEN_EXPIRE_MS,
  SPOTIFY,
} from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";

export async function GET(request: Request) {
  // 요청 URL에서 쿼리 파라미터 가져오기
  const { searchParams } = new URL(request.url);

  // Spotify가 반환한 Authorization Code 추출
  const code = searchParams.get("code");

  // code가 없을 경우 : 인증 실패
  if (!code) {
    return NextResponse.json(
      { error: TOAST_MESSAGE.SPOTIFY.CODE_ERROR },
      { status: 400 },
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // 필수 정보가 없을 경우 : 서버 설정 에러
  if (!clientId || !clientSecret) {
    console.error("Missing Spotify credentials in environment variables.");

    return NextResponse.json(
      { error: TOAST_MESSAGE.SPOTIFY.CLIENT_ERROR },
      { status: 500 },
    );
  }

  // Spotify 토큰 발급 API에 보낼 요청 옵션 정의
  const authOptions = {
    method: "POST",
    headers: {
      // Spotify는 x-www-form-urlencoded 형식의 데이터를 받는다.
      "Content-Type": SPOTIFY.CONTENT_TYPE,
      // Authorization 헤더에 clientId:clientSecret를 base64로 인코딩해 포함
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    // 요청 본문에는 authorization_code 방식에 필요한 값들을 담는다.
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: SPOTIFY.REDIRECT_URL,
    }),
  };

  try {
    // Spotify 토큰 발급 API 요청
    const response = await fetch(
      SPOTIFY.TOKEN_ENDPOINT, // 액세스 토큰을 교환할 API
      authOptions,
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: TOAST_MESSAGE.SPOTIFY.RES_ERROR },
        { status: response.status },
      );
    }

    const data = await response.json();

    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    // access_token이 없다면 실패 처리
    if (!accessToken) {
      return NextResponse.json(
        { error: TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR },
        { status: 400 },
      );
    }

    // Next.js 서버 쿠키 저장 객체 생성
    const cookieStore = cookies();

    // 액세스 토큰 만료 시간 설정 (기본 3600초 = 1시간)
    const expiresIn = data.expires_in || DEFAULT_ACCESS_TOKEN_EXPIRE_SEC;
    const accessExpiresDate = new Date(Date.now() + expiresIn * MS_IN_SECOND); // 1시간
    const refreshExpiresDate = new Date(Date.now() + REFRESH_TOKEN_EXPIRE_MS); // 14일

    // 액세스 토큰 : 쿠키 저장 (로그아웃 시 즉시 만료)
    cookieStore.set(SPOTIFY.ACCESS_TOKEN, accessToken, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === SPOTIFY.PRODUCTION,
      expires: accessExpiresDate,
    });

    // 리프레시 토큰 : 쿠키 저장 (14일 유효)
    if (refreshToken) {
      cookieStore.set(SPOTIFY.REFRESH_TOKEN, refreshToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === SPOTIFY.PRODUCTION,
        expires: refreshExpiresDate,
      });
    }

    // 토큰 저장 후 `/music` 페이지로 이동
    return NextResponse.redirect("http://localhost:3000/music");
  } catch (error) {
    console.error("Error fetching Spotify access token : ", error);

    return NextResponse.json(
      { error: TOAST_MESSAGE.SPOTIFY.ACCESS_TOKEN_ERROR },
      { status: 500 },
    );
  }
}

// 코드 흐름
// 1. 사용자가 Spotify 로그인 → /authorize?client_id=... 호출됨
// 2. Spotify에서 인증 성공 후 code를 포함하여 redirect_uri로 리다이렉트
// 3. 위 API에서 해당 code를 받아 Access Token & Refresh Token 발급
// 4. 이를 쿠키에 저장 후 "/music" 으로 리디렉션
// 5. 이후 필요한 API에 토큰을 붙여 사용자 정보를 요청할 수 있음
