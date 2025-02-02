import React from "react";
import { PlaylistData, UserData } from "../data";
import { Link } from "@remix-run/react";

export default function NavBar({ playlists }: { playlists: PlaylistData[] }) {
  return (
    <>
      <div className="nav-bar">
        <p className="nav-bar-title">Your Library</p>
        <ul className="playlists">
          {playlists.map((playlist) => (
            <li className="playlists-item" key={playlist.id}>
              <Link to={`/playlist/${playlist.id}`}>
                <span className="playlists-link">
                  <img
                    src={playlist.images[0].url}
                    className="playlist-image"
                  />
                  <p className="playlist-name">{playlist.name}</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
