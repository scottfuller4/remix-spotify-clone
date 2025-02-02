import React from "react";
import { UserData } from "../data";

export default function PlayerBar() {
  return (
    <div className="player-bar">
      <div className="player-bar-top">
        <div className="current-song">
          <div v-if="currentSong">
            <img
              // :src="currentSong?.item.album.images[0].url"
              className="current-song-image"
              alt=""
            />
          </div>
          {/* <div className="song-info">
          <p className="song-name">{{ currentSong?.item.name }}</p>
          <p className="song-artists">{{ artists }}</p>
        </div> */}
        </div>
        <div className="player-controls">
          <div className="player-controls-buttons">
            <font-awesome-icon icon="random" className="icon" />
            <font-awesome-icon icon="backward" className="icon" />
            <div className="icon-center-container">
              <font-awesome-icon icon="play" className="icon icon-center" />
            </div>
            <font-awesome-icon icon="forward" className="icon" />
            <font-awesome-icon icon="redo" className="icon" />
          </div>
          <div className="player-controls-progress"></div>
        </div>
        <div className="volume-container">
          <font-awesome-icon icon="volume-up" className="icon" />
          <div className="volume-control"></div>
        </div>
      </div>
      <div
        className="currently-playing-bar"
        v-if="currentSong && currentSong.is_playing"
      >
        <div className="currently-playing-bar-container">
          <font-awesome-icon icon="volume-up" className="icon" />
          {/* <p>Listening on {{ currentSong?.device.name }}</p> */}
        </div>
      </div>
    </div>
  );
}
