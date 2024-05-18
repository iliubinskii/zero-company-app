"use client";

import { CLIENT_API_URL } from "../config";
import Link from "next/link";
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
      <Link
        className="px-2 py-3 transition-colors duration-150 hover:text-green-800"
        href={jwtUser ? "/profile" : `${CLIENT_API_URL}auth/login`}
      >
        {jwtUser ? lang.Profile : lang.LogIn}
      </Link>
    </div>
  );
};

export default ProfileButton;
