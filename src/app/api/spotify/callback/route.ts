import { SPOTIFY } from "@/constants/spotify.constant";
import { TOAST_MESSAGE } from "@/constants/toast-message.constant";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return new NextResponse(TOAST_MESSAGE.SPOTIFY.CLIENT_ERROR, {
        status: 500,
      });
    }

    const tokenEndpoint = SPOTIFY.TOKEN_ENDPOINT;

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    const tokenResponse = await fetch(tokenEndpoint, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": SPOTIFY.CONTENT_TYPE,
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({ grant_type: SPOTIFY.CLIENT_CREDENTIALS }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();

      const errorMessage =
        errorData?.error_description ||
        errorData?.error ||
        TOAST_MESSAGE.SPOTIFY.CLIENT_ERROR;

      return new NextResponse(errorMessage, { status: tokenResponse.status });
    }

    const tokenData = await tokenResponse.json();

    const { access_token: accessToken, expires_in: expiresIn } = tokenData;

    const response = new NextResponse(
      JSON.stringify({ accessToken, expiresIn, success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    response.cookies.set(SPOTIFY.ACCESS_TOKEN, accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === SPOTIFY.PRODUCTION,
      maxAge: expiresIn,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error: unknown) {
    let errorMessage = TOAST_MESSAGE.SPOTIFY.CLIENT_ERROR;

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new NextResponse(errorMessage, { status: 500 });
  }
};
