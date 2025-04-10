"use client";

import createClient from "@/services/supabase-client";

const SpotifyLogin = () => {
  const handleSpotifyLogin = () => {
    const supabaseClient = createClient();

    supabaseClient.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: "http://localhost:3000/api/spotify/callback",
      },
    });
  };

  return (
    <div>
      <button onClick={handleSpotifyLogin} aria-label="Spotify 계정 로그인">
        Spotify Login
      </button>
    </div>
  );
};

export default SpotifyLogin;
