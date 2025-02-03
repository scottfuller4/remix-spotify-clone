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
    <div className="playlist-container rounded-xl py-4 mr-4 h-full max-h-full overflow-hidden flex-auto">
      <div className="flex items-end px-4 mb-4">
        <img
          src={playlist.images[0].url}
          alt={`${playlist.name} album cover`}
          className="playlist-image"
        />
        <div className="ml-6 text-left">
          <p className="font-bold text-xs uppercase">Playlist</p>
          <h1 className="text-8xl m-0">{playlist.name}</h1>
          <div className="flex items-center text-base">
            <p className="font-bold">{playlist.owner.display_name}</p>
            <p className="tracks-total text-sm pt-1 opacity-80">
              {playlist.tracks.total} songs
            </p>
          </div>
        </div>
      </div>
      <div className="tracks-container opacity-70 px-4 w-full h-full overflow-scroll">
        {tracks && (
          <div className="w-full my-4">
            <table className="w-full overflow-scroll">
              <th className="tracks-head w-full flex justify-between items-center uppercase text-xs pb-4">
                <td>#</td>
                <td>Title</td>
                <td>Album</td>
                <td>length</td>
              </th>
              {tracks.map((song, i) => (
                <tr
                  key={song.id}
                  className="w-full flex justify-between items-center text-sm my-2"
                >
                  <td>{i + 1}</td>
                  <td className="flex">
                    <img
                      src={song.track.album.images[0].url}
                      // TODO: add alt text
                      alt=""
                      className="mr-4 h-10 w-10"
                    />
                    <div className="song-title-info">
                      <p className="text-sm color-white">{song.track?.name}</p>
                      <p className="text-xs">
                        {song.track.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                    </div>
                  </td>
                  <td>{song.track.album?.name}</td>
                  <td>{formatTime(song.track.duration_ms)}</td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
