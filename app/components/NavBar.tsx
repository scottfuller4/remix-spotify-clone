import React from "react";
import { PlaylistData, UserData } from "../data";
import { Link } from "@remix-run/react";
import Folder from "./svg/Folder";

export default function NavBar({ playlists }: { playlists: PlaylistData[] }) {
  return (
    <>
      <div className="nav-bar flex flex-col items-start flex-none rounded-lg px-2 pt-4 mx-4 max-h-full">
        <div className="flex items-end ml-2 mb-2">
          <Folder />
          <p className="text-base font-bold pl-2">Your Playlists</p>
        </div>
        <ul className="overflow-scroll">
          {playlists.map((playlist) => (
            <li className="p-2" key={playlist.id}>
              <Link to={`/playlist/${playlist.id}`}>
                <span className="flex">
                  <img
                    src={playlist.images[0].url}
                    className="rounded-sm w-12"
                  />
                  <p className="pl-4 text-base font-normal">{playlist.name}</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
