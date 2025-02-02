import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import { getPlaylist, getPlaylistTracks, PlaylistData } from "../data";
import invariant from "tiny-invariant";
import cookie from "cookie";
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
  // console.log({ playlist });
  // console.log({ tracks });

  return (
    <>{playlist && <Playlist playlist={playlist} tracks={tracks.items} />}</>
  );
}
