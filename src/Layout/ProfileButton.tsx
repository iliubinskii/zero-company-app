"use client";

import { AnimatedLink } from "../components";
import { CLIENT_API_URL } from "../config";
import React from "react";
import { lang } from "../langs";
import { useJwtUser } from "../contexts";

const ProfileButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const { jwtUser } = useJwtUser();

  return (
    <div className={`w-30 flex justify-end ${className}`.trim()} {...props}>
      <AnimatedLink
        className="px-2 py-3 transition-colors duration-150 hover:text-green-800"
        href={jwtUser ? "/profile" : `${CLIENT_API_URL}auth/login`}
      >
        {jwtUser ? lang.Profile : lang.LogIn}
      </AnimatedLink>
    </div>
  );
};

export default ProfileButton;
