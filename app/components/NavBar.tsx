import React from "react";
import { Link, NavLink } from "@remix-run/react";

import { PlaylistData } from "../data";

import Folder from "./svg/Folder";

export default function NavBar({ playlists }: { playlists: PlaylistData[] }) {
  return (
    <>
      <div className="nav-bar flex-col items-start flex-none rounded-lg px-2 pt-4 ml-4 max-h-full hidden lg:flex">
        <div className="flex items-end ml-2 mb-2">
          <Folder />
          <p className="text-base font-bold pl-2">Your Playlists</p>
        </div>
        <ul className="overflow-scroll">
          {playlists.map((playlist) => (
            <li className="p-2" key={playlist.id}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-active rounded-sm" : ""
                }
                to={`/playlist/${playlist.id}`}
              >
                <span className="flex rounded-sm">
                  <img
                    src={playlist.images[0].url}
                    className="rounded-sm w-12"
                    alt={`${playlist.name} album cover`}
                  />
                  <p className="pl-4 pt-1 text-base font-normal">
                    {playlist.name}
                  </p>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
