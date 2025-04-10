import {
  DEFAULT_PROVIDER_TOKEN_EXPIRE_SEC,
  REFRESH_TOKEN_EXPIRE_MS,
  SPOTIFY,
} from "@/constants/spotify.constant";
import createClient from "@/services/supabase-server-service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 요청 URL에서 쿼리 파라미터 가져오기
  const { searchParams } = new URL(request.url);

  // Spotify에서 반환한 OAuth 인증 코드
  const authorizationCode = searchParams.get("code");

  // 인증 후 리디렉트할 경로
  const redirectPath = searchParams.get("next") ?? "/";

  // 인증 코드가 없을 경우, 에러 페이지로 리디렉트
  if (!authorizationCode) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabaseServer = createClient();

  const { data, error } = await supabaseServer.auth.exchangeCodeForSession(
    authorizationCode,
  );

  // 인증 코드 교환 실패 시, 에러 페이지로 리디렉트
  if (error || !data?.session) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // 인증 후 제공되는 OAuth 토큰 추출
  const {
    provider_token: spotifyProviderToken,
    provider_refresh_token: spotifyProviderRefreshToken,
  } = data.session;

  // 토큰이 정상적으로 제공되지 않았을 경우, 에러 페이지로 리디렉트
  if (!spotifyProviderToken || !spotifyProviderRefreshToken) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const cookieStore = cookies();
  const isLocalEnv = process.env.NODE_ENV === "development";

  cookieStore.set(SPOTIFY.PROVIDER_TOKEN, spotifyProviderToken, {
    path: "/",
    httpOnly: false,
    secure: !isLocalEnv,
    expires: new Date(Date.now() + DEFAULT_PROVIDER_TOKEN_EXPIRE_SEC), // 1시간
  });

  cookieStore.set(SPOTIFY.PROVIDER_REFRESH_TOKEN, spotifyProviderRefreshToken, {
    path: "/",
    httpOnly: true,
    secure: !isLocalEnv,
    expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRE_MS), // 14일
  });

  // 배포 환경에서 리디렉트 주소 처리 (프록시 사용 고려)
  const forwardedHost = request.headers.get("x-forwarded-host");

  const redirectUrl = isLocalEnv
    ? `${origin}${redirectPath}`
    : forwardedHost
    ? `https://${forwardedHost}${redirectPath}`
    : `${origin}${redirectPath}`;

  return NextResponse.redirect(redirectUrl);
}
