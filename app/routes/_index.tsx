import React from "react";
import { getPlaylists, getPlaylistTracks, PlaylistData } from "../data";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Playlist from "../components/Playlist";
import invariant from "tiny-invariant";
import cookie from "cookie";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const accessToken = cookies.access_token;
  const refreshToken = cookies.refresh_token;

  if (!accessToken || !refreshToken) {
    return json({ playlists: null });
  }

  const playlists = await getPlaylists(accessToken, refreshToken);
  invariant(playlists, "Missing playlists");
  const playlistItems: PlaylistData[] = playlists ? playlists.items : null;
  const tracks = await getPlaylistTracks(accessToken, playlistItems[0].id);
  invariant(tracks, "Missing tracks");

  return json({ playlists: playlistItems, tracks });
};

export default function Index() {
  const { playlists, tracks } = useLoaderData<typeof loader>();

  return (
    <>
      {playlists && <Playlist playlist={playlists[0]} tracks={tracks.items} />}
    </>
  );
}
