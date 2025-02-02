import React from "react";
import { UserData } from "../data";

export default function Header({ user }: { user: UserData }) {
  return (
    <>
      <div className="header-bar">
        <div className="buttonContainer">
          <button className="buttonLeft">
            <font-awesome-icon icon="chevron-left" className="icon" />
          </button>
          <button>
            <font-awesome-icon icon="chevron-right" className="icon" />
          </button>
        </div>
        <div className="navDropdown">
          {/* <!-- <div className="userPhoto"></div> --> */}
          {/* <img :src="user.images[0].url" alt="" className="userPhoto" /> */}
          <p className="userName">{user.display_name}</p>
          <font-awesome-icon icon="caret-down" />
        </div>
      </div>
    </>
  );
}
