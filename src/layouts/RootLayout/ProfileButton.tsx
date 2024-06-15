"use client";

import type { FC, HTMLAttributes } from "react";
import { selectAuthUser, selectLoaded, useAppSelector } from "../../store";
import { API_URL } from "../../config";
import { AnimatedLink } from "../../components";
import React from "react";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

const ProfileButton: FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const authUser = useAppSelector(selectAuthUser);

  const loaded = useAppSelector(selectLoaded);

  const text = authUser ? lang.Profile : lang.LogIn;

  return (
    <Container {...props}>
      <Link
        className={loaded ? "" : "opacity-50 pointer-events-none"}
        href={
          authUser
            ? "/profile"
            : `${API_URL}auth/login?successReturnUrl=/profile`
        }
      >
        <div>{text}</div>
        <div className="h-0 overflow-hidden">
          <div>{lang.Profile}</div>
          <div>{lang.LogIn}</div>
        </div>
      </Link>
    </Container>
  );
};

export default ProfileButton;

const Container = tw.div`flex`;

const Link = tw(AnimatedLink)`
  rounded-lg border px-5 py-3
  whitespace-nowrap text-white
  hover:bg-white hover:text-black
  transition
`;
