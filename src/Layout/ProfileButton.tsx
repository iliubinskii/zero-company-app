"use client";

import type { FC, HTMLAttributes } from "react";
import { selectAuthUser, selectLoaded, useAppSelector } from "../store";
import { API_URL } from "../config";
import { AnimatedLink } from "../components";
import React from "react";
import { lang } from "../langs";

const ProfileButton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const authUser = useAppSelector(selectAuthUser);

  const loaded = useAppSelector(selectLoaded);

  return (
    <div className={`w-20 flex justify-end ${className}`.trim()} {...props}>
      {loaded && (
        <AnimatedLink
          className="px-2 py-3 whitespace-nowrap transition-colors duration-150 hover:text-green-800"
          href={authUser ? "/profile" : `${API_URL}auth/login`}
        >
          {authUser ? lang.Profile : lang.LogIn}
        </AnimatedLink>
      )}
    </div>
  );
};

export default ProfileButton;
