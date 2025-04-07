import { SPOTIFY } from "@/constants/spotify";
import { TOAST_MESSAGE } from "@/constants/toast-message";
import { NextResponse } from "next/server";

export async function GET() {
  // 앱을 구분하기 위한 식별자
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    console.error("SPOTIFY_CLIENT_ID is not defined in environment variables.");

    return NextResponse.json(
      { error: TOAST_MESSAGE.SPOTIFY.CLIENT_ID_ERROR },
      { status: 500 },
    );
  }

  // Spotify 인증 URL 구성 : OAuth 2.0 Authorization Code Flow 시작 지점
  const authUrl = new URL(SPOTIFY.AUTH_URL);

  // 쿼리 파라미터로 전달할 인증 관련 값들을 객체로 만들기
  const params = {
    response_type: "code", // Spotify가 인증 후 반환할 값의 형식 (Authorization Code)
    client_id: clientId, // 앱을 식별할 Client ID
    scope: SPOTIFY.SCOPE, // 요청하는 권한 목록 (스페이스로 구분)
    redirect_uri: SPOTIFY.REDIRECT_URL, // 사용자가 인증 완료 후 돌아올 주소 : Spotify Developer Dashboard에 등록된 주소
  };

  // `undefined` 값이 섞여 있을 경우를 대비하여 필터링 처리
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  // URL에 쿼리 문자열 붙히기 (ex: ?client_id=...&redirect_uri=...)
  authUrl.search = new URLSearchParams(filteredParams).toString();

  // Spotify 인증 페이지로 사용자를 리다이렉트한 후, 해당 URL 이동
  return NextResponse.redirect(authUrl.toString());
}

// 로그인 버튼을 이용하지 않고, 주소로 로그인하는 로직이라 URL 남겨놓습니다.
// http://localhost:3000/api/spotify/login

// 추후에 리팩토링할 때 로그인 버튼으로 설정할 예정입니다.
// 스포티파이 로그인이 아닌 supabase 로그인일 경우는 아직 못 했습니다.

// 인증 코드 플로우의 주요 단계
// 1. 사용자 인증 요청 : 사용자를 Spotify의 인증 페이지로 리디렉션하여 애플리케이션에 대한 액세스를 승인하도록 합니다.​
// 2. 인증 코드 수신 : 사용자가 액세스를 승인하면, Spotify는 애플리케이션의 리디렉션 URI로 인증 코드를 전달합니다.​
// 3. 액세스 토큰 요청 : 애플리케이션은 수신한 인증 코드를 사용하여 Spotify의 토큰 엔드포인트에 액세스 토큰을 요청합니다.​
// 4. API 요청 수행 : 획득한 액세스 토큰을 사용하여 Spotify의 API에 요청을 보냅니다.
