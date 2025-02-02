import React from "react";
import { PlaylistData, TrackData } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Playlist({
  playlist,
  tracks,
}: {
  playlist: PlaylistData;
  tracks: TrackData[];
}) {
  return (
    <div className="playlist-container">
      <div className="header-container">
        <img src={playlist.images[0].url} alt="" className="header-image" />
        <div className="title-container">
          <p className="page-type">Playlist</p>
          <h1 className="playlist-title">{playlist.name}</h1>
          <div className="title-info-container">
            <p className="playlist-owner">{playlist.owner.display_name}</p>
            <p className="tracks">{playlist.tracks.total} songs</p>
          </div>
        </div>
      </div>
      <div className="tracks-container">
        <div className="icon-container">
          <FontAwesomeIcon icon={faPlay} className="play-icon" />
        </div>
        {tracks && (
          <div>
            <table>
              <th>
                <td>#</td>
                <td>Title</td>
                <td>Album</td>
                <td>Date added</td>
                <td>length</td>
              </th>
              {tracks.map((song, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td className="song-title">
                    <img
                      src={song.track.album.images[0].url}
                      alt=""
                      className="song-cover"
                    />
                    <div className="song-title-info">
                      <p className="song-title-name">{song.track?.name}</p>
                      <p className="song-title-artists">
                        {song.track.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                    </div>
                  </td>
                  <td>{song.track.album?.name}</td>
                  <td>{song.added_at}</td>
                  <td>{song.track.duration_ms}</td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
