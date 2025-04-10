import { NextResponse } from "next/server";
import createClient from "@/services/supabase-server";
import { cookies } from "next/headers";
import { MS_IN_HOUR, REFRESH_TOKEN_EXPIRE_MS } from "@/constants/spotify";

export const GET = async (request: Request) => {
  // 요청에서 URL과 쿼리 파라미터 추출
  const { searchParams, origin } = new URL(request.url);

  // Spotify에서 반환한 OAuth 인증 코드
  const authorizationCode = searchParams.get("code");

  // 인증 후 리디렉트할 경로
  const redirectPath = searchParams.get("next") ?? "/";

  const cookieStore = cookies();

  // 인증 코드가 없을 경우, 에러 페이지로 리디렉트
  if (!authorizationCode) {
    console.error("authorizationCode가 없습니다.");

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabaseServer = createClient();

  const { data, error } = await supabaseServer.auth.exchangeCodeForSession(
    authorizationCode,
  );

  // 인증 코드 교환 실패 시, 에러 페이지로 리디렉트
  if (error || !data?.session) {
    console.error("Supabase 세션 교환 실패 : ", error);

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // 인증 후 제공되는 OAuth 토큰 추출
  const {
    provider_token: spotifyAccessToken,
    provider_refresh_token: spotifyRefreshToken,
  } = data.session;

  // 토큰이 정상적으로 제공되지 않았을 경우, 에러 페이지로 리디렉트
  if (!spotifyAccessToken || !spotifyRefreshToken) {
    console.error("provider 토큰이 없습니다.");

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const isLocalEnv = process.env.NODE_ENV === "development";

  // 클라이언트에서 읽을 수 있도록 액세스 토큰 저장
  cookieStore.set("spotify_provider_token", spotifyAccessToken, {
    path: "/",
    httpOnly: false, // 클라이언트에서도 읽을 수 있도록 설정
    secure: !isLocalEnv, // 개발 환경에서는 secure 옵션 비활성화
    expires: new Date(Date.now() + MS_IN_HOUR), // 1시간
  });

  // 보안을 위해 httpOnly 설정된 리프레시 토큰 저장
  cookieStore.set("spotify_provider_refresh_token", spotifyRefreshToken, {
    path: "/",
    httpOnly: true, // 보안 강화를 위해 클라이언트에서 읽을 수 없도록 설정
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
};
