"use client";

import type { FC, HTMLAttributes } from "react";
import { selectAuthUser, selectLoaded, useAppSelector } from "../store";
import { API_URL } from "../config";
import { AnimatedLink } from "../components";
import React from "react";
import { lang } from "../langs";
import tw from "tailwind-styled-components";

const ProfileButton: FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const authUser = useAppSelector(selectAuthUser);

  const loaded = useAppSelector(selectLoaded);

  const text = authUser ? lang.Profile : lang.LogIn;

  return (
    <Container {...props}>
      {loaded && (
        <Link href={authUser ? "/profile" : `${API_URL}auth/login`}>
          {text}
        </Link>
      )}
    </Container>
  );
};

export default ProfileButton;

const Container = tw.div`w-16 flex justify-end`;

const Link = tw(AnimatedLink)`
  px-2 py-3
  whitespace-nowrap
  transition-colors duration-150 hover:text-green-800
`;
