import { SPOTIFY } from "@/constants/spotify.constant";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export async function POST() {
//   const cookieStore = cookies();

//   // accessToken 쿠키 삭제
//   cookieStore.set(SPOTIFY.ACCESS_TOKEN, "", {
//     path: "/",
//     expires: new Date(0), // 즉시 만료
//   });

//   // refreshToken은 삭제하지 않음 (또는 삭제하려면 아래 주석 해제)
//   // cookieStore.set(SPOTIFY.REFRESH_TOKEN, "", {
//   //   path: "/",
//   //   expires: new Date(0),
//   // });

//   return NextResponse.json({ message: "로그아웃 완료" });
// }

// 임시 로그아웃 요청이고, 추후에 위 POST로 변경할 예정입니다.
export async function GET() {
  const cookieStore = cookies();

  cookieStore.set(SPOTIFY.ACCESS_TOKEN, "", {
    path: "/",
    expires: new Date(0),
  });

  // 로그아웃 후 `/` 페이지로 이동
  return NextResponse.redirect("http://localhost:3000");
}
