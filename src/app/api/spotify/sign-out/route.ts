import { SPOTIFY } from "@/constants/spotify.constant";
import { NextResponse } from "next/server";

export const POST = async () => {
  const response = NextResponse.json({ success: true });

  response.cookies.set(SPOTIFY.ACCESS_TOKEN, "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === SPOTIFY.PRODUCTION,
    path: "/",
    sameSite: "lax",
    expires: new Date(0),
  });

  return response;
};
