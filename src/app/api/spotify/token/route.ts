import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  DEFAULT_ACCESS_TOKEN_EXPIRE_SEC,
  MS_IN_SECOND,
  SPOTIFY,
} from "@/constants/spotify";
import { TOAST_MESSAGE } from "@/constants/toast-message";

export async function GET() {
  try {
    // 쿠키 객체를 가져온 후, spotify_access_token과 spotify_refresh_token 값 꺼내기
    // 둘 다 없으면 사용자 인증이 안된 상태
    const cookieStore = cookies();

    const accessToken = cookieStore.get(SPOTIFY.ACCESS_TOKEN)?.value;
    const refreshToken = cookieStore.get(SPOTIFY.REFRESH_TOKEN)?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.json(
        { error: TOAST_MESSAGE.SPOTIFY.ERROR },
        { status: 401 },
      );
    }

    // Access Token이 없고, Refresh Token이 있는 경우 : 갱신 요청
    if (!accessToken && refreshToken) {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

      // 클라이언트 정보가 없을 경우
      if (!clientId || !clientSecret) {
        return NextResponse.json(
          { error: TOAST_MESSAGE.SPOTIFY.CLIENT_ERROR },
          { status: 500 },
        );
      }

      // Access Token을 새로 발급받기 위한 요청
      const authOptions = {
        method: "POST",
        headers: {
          "Content-Type": SPOTIFY.CONTENT_TYPE,
          Authorization:
            "Basic " +
            Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      };

      const response = await fetch(SPOTIFY.TOKEN_ENDPOINT, authOptions);

      if (!response.ok) {
        return NextResponse.json(
          { error: TOAST_MESSAGE.SPOTIFY.REFRESH_TOKEN_ERROR },
          { status: response.status },
        );
      }

      const data = await response.json();

      const accessToken = data.access_token;

      if (!accessToken) {
        console.error("No access token received in refresh response");

        return NextResponse.json(
          { error: TOAST_MESSAGE.SPOTIFY.ERROR },
          { status: 400 },
        );
      }

      const expiresIn = data.expires_in || DEFAULT_ACCESS_TOKEN_EXPIRE_SEC;
      const expiresDate = new Date(Date.now() + expiresIn * MS_IN_SECOND);

      // 새로운 Access Token을 쿠키에 저장 (쿠키 만료 시간 명확히 설정)
      if (accessToken) {
        cookieStore.set({
          name: SPOTIFY.ACCESS_TOKEN,
          value: accessToken,
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === SPOTIFY.PRODUCTION,
          expires: expiresDate,
        });
      }
    }

    return NextResponse.json({ access_token: accessToken });
  } catch (error) {
    console.error("Internal Server Error:", error);

    return NextResponse.json(
      { error: TOAST_MESSAGE.SPOTIFY.ERROR },
      { status: 500 },
    );
  }
}
