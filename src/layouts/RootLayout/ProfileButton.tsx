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
      {loaded && (
        <Link
          href={
            authUser
              ? "/profile"
              : `${API_URL}auth/login?successReturnUrl=/profile`
          }
        >
          {text}
        </Link>
      )}
    </Container>
  );
};

export default ProfileButton;

const Container = tw.div`flex`;

const Link = tw(AnimatedLink)`
  px-2 py-3
  whitespace-nowrap
  text-white
  py-3 px-5 rounded-lg border hover:text-black hover:bg-white
  transition-colors duration-150
`;
