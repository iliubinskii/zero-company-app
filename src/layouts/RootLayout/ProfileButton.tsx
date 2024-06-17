"use client";

import { selectAuthUser, selectLoaded, useAppSelector } from "../../store";
import { API_URL } from "../../config";
import { AnimatedLink } from "../../components";
import type { FC } from "react";
import React from "react";
import { lang } from "../../langs";
import tw from "tailwind-styled-components";

const ProfileButton: FC = () => {
  const authUser = useAppSelector(selectAuthUser);

  const loaded = useAppSelector(selectLoaded);

  const text = authUser ? lang.Profile : lang.LogIn;

  return (
    <Container
      className={loaded ? undefined : "opacity-50 pointer-events-none"}
    >
      <AnimatedLink
        className="
          rounded-lg border px-5 py-2
          whitespace-nowrap text-white
          hover:bg-white hover:text-black
          transition text-sm
        "
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
      </AnimatedLink>
    </Container>
  );
};

export default ProfileButton;

const Container = tw.div`flex`;
