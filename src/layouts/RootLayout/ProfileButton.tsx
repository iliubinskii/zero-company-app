"use client";

import { selectAuthUser, selectLoaded, useAppSelector } from "../../store";
import { API_URL } from "../../config";
import { AnimatedLink } from "../../components";
import type { FC } from "react";
import { FaRegUser } from "react-icons/fa";
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
          hover:text-gray-300 rounded-lg
          whitespace-nowrap text-white transition
          xl:px-5 xl:py-3
          xl:hover:bg-white xl:hover:text-black
        "
        href={
          authUser
            ? "/profile"
            : `${API_URL}auth/login?successReturnUrl=/profile`
        }
      >
        <FaRegUser className="text-3xl xl:hidden" />
        <div className="hidden xl:block">
          <div>{text}</div>
          <div className="h-0 overflow-hidden">
            <div>{lang.Profile}</div>
            <div>{lang.LogIn}</div>
          </div>
        </div>
      </AnimatedLink>
    </Container>
  );
};

export default ProfileButton;

const Container = tw.div`flex`;
