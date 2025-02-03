import React from "react";
import { PlaylistData, TrackData } from "../data";

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function Playlist({
  playlist,
  tracks,
}: {
  playlist: PlaylistData;
  tracks: TrackData[];
}) {
  return (
    <div className="playlist-container rounded-xl pt-4 mx-4 h-full flex-auto flex flex-col">
      <div className="flex items-end px-4 mb-4">
        <img
          src={playlist.images[0].url}
          alt={`${playlist.name} album cover`}
          className="playlist-image"
        />
        <div className="ml-6 text-left">
          <p className="font-bold text-xs uppercase">Playlist</p>
          <h1 className="text-3xl m-0 sm:text-5xl lg:text-6xl">
            {playlist.name}
          </h1>
          <div className="flex items-center text-base">
            <p className="font-bold">{playlist.owner.display_name}</p>
            <p className="tracks-total text-sm pt-1 opacity-80">
              {playlist.tracks.total} songs
            </p>
          </div>
        </div>
      </div>
      <div className="tracks-container opacity-70 px-4 w-full h-full flex-1 rounded-b-xl overflow-auto">
        {tracks && (
          <div className="w-full my-4">
            <table className="w-full">
              <tbody>
                <tr className="tracks-head w-full flex justify-between items-center uppercase text-xs pb-4">
                  <td>#</td>
                  <td>Title</td>
                  <td>Album</td>
                  <td>length</td>
                </tr>
                {tracks.map((song, i) => (
                  <tr
                    key={song.track.name}
                    className="w-full flex justify-between items-center text-sm mt-2"
                  >
                    <td>{i + 1}</td>
                    <td className="flex">
                      <img
                        src={song.track.album.images[0].url}
                        alt={`${song.track.album.name} album cover`}
                        className="mr-4 h-10 w-10"
                      />
                      <div className="song-title-info">
                        <p className="text-sm color-white">{song.track.name}</p>
                        <p className="text-xs">
                          {song.track.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </p>
                      </div>
                    </td>
                    <td>{song.track.album.name}</td>
                    <td>{formatTime(song.track.duration_ms)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
