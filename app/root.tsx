import React from "react";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import {
  getPlaylists,
  getPlaylistTracks,
  getUserData,
  PlaylistData,
  UserData,
} from "./data";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import invariant from "tiny-invariant";
import cookie from "cookie";
import Logo from "./components/svg/Logo";

// @ts-ignore expected import path for remix
import styles from "./app.css?url";
// @ts-ignore expected import path for remix
import tailwindcss from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: tailwindcss },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const accessToken = cookies.access_token;

  if (!accessToken) {
    return json({ user: null, playlists: null });
  }

  const user: UserData = await getUserData(accessToken);
  const playlists = await getPlaylists(accessToken);
  invariant(playlists, "Missing playlists");
  invariant(user, "Missing user");

  const playlistItems: PlaylistData[] = playlists ? playlists.items : null;
  return json({ user, playlists: playlistItems });
};

export default function App() {
  const { user, playlists } = useLoaderData<typeof loader>();
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="app">
          {user && playlists ? (
            <>
              <div className="flex flex-col justify-between max-h-screen h-screen">
                <Header user={user} />
                <main className="flex flex-1 mb-4 overflow-hidden">
                  <NavBar playlists={playlists} />
                  <Outlet />
                </main>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="font-bold text-3xl mb-4">Spotify Web Clone</h1>
              <Logo />
              <button className="cursor-pointer btn-primary">
                <a href="http://localhost:8888/login">Log in to Spotify</a>
              </button>
            </div>
          )}
        </div>
        <Scripts />
      </body>
    </html>
  );
}
