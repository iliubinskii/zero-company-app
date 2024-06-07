"use client";

import type { FC, ReactElement, ReactNode } from "react";
import { selectAuthUser, selectLoaded, useAppSelector } from "../store";
import { Loading } from "./Loading";
import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/navigation";

export const AuthGuard: FC<Props> = ({ children }): ReactElement => {
  const authUser = useAppSelector(selectAuthUser);

  const loaded = useAppSelector(selectLoaded);

  const router = useRouter();

  useEffect(() => {
    if (loaded && !authUser) router.push("/");
  }, [authUser, loaded, router]);

  return (
    <Container>
      {children}
      {loaded || (
        <Overlay>
          <Loading />
        </Overlay>
      )}
    </Container>
  );
};

export interface Props {
  readonly children: ReactNode;
}

const Container = tw.div`relative`;

const Overlay = tw.div`
  z-10 absolute inset-0
  bg-white bg-opacity-25 backdrop-blur-sm
  flex justify-center items-center
`;
