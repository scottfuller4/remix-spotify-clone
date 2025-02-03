import React from "react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import cookie from "cookie";

import { getPlaylist, getPlaylistTracks } from "../data";

import Playlist from "../components/Playlist";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.playlistId, "Missing playlistId param");

  const cookieHeader = request.headers.get("Cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const accessToken = cookies.access_token;

  invariant(accessToken, "Missing accessToken param");

  const playlist = await getPlaylist(accessToken, params.playlistId);
  const tracks = await getPlaylistTracks(accessToken, params.playlistId);
  return json({ playlist, tracks });
};

export default function PlaylistPage() {
  const { playlist, tracks } = useLoaderData<typeof loader>();

  return (
    <>{playlist && <Playlist playlist={playlist} tracks={tracks.items} />}</>
  );
}
