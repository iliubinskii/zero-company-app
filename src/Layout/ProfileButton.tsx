"use client";

import type { FC, HTMLAttributes } from "react";
import { selectAuthUser, useAppSelector } from "../services";
import { API_URL } from "../config";
import { AnimatedLink } from "../components";
import React from "react";
import { lang } from "../langs";

const ProfileButton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const authUser = useAppSelector(selectAuthUser);

  return (
    <div className={`w-30 flex justify-end ${className}`.trim()} {...props}>
      <AnimatedLink
        className="px-2 py-3 transition-colors duration-150 hover:text-green-800 whitespace-nowrap"
        href={authUser ? "/profile" : `${API_URL}auth/login`}
      >
        {authUser ? lang.Profile : lang.LogIn}
      </AnimatedLink>
    </div>
  );
};

export default ProfileButton;
