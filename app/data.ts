interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}

export interface UserData {
  display_name: string;
  images: SpotifyImage[];
  id: string;
}

export interface PlaylistData {
  name: string;
  id: string;
  owner: UserData;
  images: SpotifyImage[];
  tracks: {
    href: string;
    total: number;
  };
}

export interface ArtistData {
  name: string;
}

export interface TrackData {
  track: {
    name: string;
    artists: ArtistData[];
    album: {
      images: SpotifyImage[];
      name: string;
    };
    duration_ms: number;
  };
  added_at: string;
  id: string;
}

export async function getUserData(accessToken: string) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
}

export async function getPlaylists(accessToken: string) {
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlists data");
  }

  return response.json();
}

export async function getPlaylist(accessToken: string, playlistId: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlist data");
  }

  return response.json();
}

export async function getPlaylistTracks(
  accessToken: string,
  playlistId: string
) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlist tracks data");
  }

  return response.json();
}
