import React from "react";

import { UserData } from "../data";

import Logo from "./svg/Logo";

export default function Header({ user }: { user: UserData }) {
  return (
    <>
      <div className="flex justify-between align-center px-4 my-2">
        <div className="max-h-full size-10">
          <Logo />
        </div>
        <div className="user flex items-center p-2 rounded-full">
          <img
            src={user.images[0].url}
            alt={`${user.display_name} profile photo`}
            className="user-photo rounded-full"
          />
          <p className="text-sm font-bold px-2">{user.display_name}</p>
        </div>
      </div>
    </>
  );
}
