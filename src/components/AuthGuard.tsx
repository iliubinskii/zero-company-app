"use client";

import type { FC, ReactNode } from "react";
import {
  selectAuthUser,
  selectLoaded,
  useAppDispatch,
  useAppSelector
} from "../store";
import type { AppThunk } from "../store";
import { BigSpinner } from "./BigSpinner";
import React, { useEffect } from "react";
import { callAsync } from "../utils";
import tw from "tailwind-styled-components";
import { useRouter } from "next/navigation";

export const AuthGuard: FC<Props> = ({
  children,
  customLoading = false,
  customRefreshThunk
}) => {
  const authUser = useAppSelector(selectAuthUser);

  const dispatch = useAppDispatch();

  const loaded = useAppSelector(selectLoaded);

  const router = useRouter();

  useEffect(() => {
    if (loaded)
      if (authUser) {
        if (customRefreshThunk)
          callAsync(async () => {
            await dispatch(customRefreshThunk());
          });
      } else router.push("/");
  }, [authUser, customRefreshThunk, dispatch, loaded, router]);

  return (
    <Container>
      {children}
      {(loaded && !customLoading) || (
        <Overlay>
          <BigSpinner />
        </Overlay>
      )}
    </Container>
  );
};

export interface Props {
  readonly children?: ReactNode;
  readonly customLoading?: boolean | undefined;
  readonly customRefreshThunk?: (() => AppThunk) | undefined;
}

const Container = tw.div`relative`;

const Overlay = tw.div`
  z-10 absolute inset-0
  bg-white bg-opacity-25 backdrop-blur-sm
  flex justify-center items-center
`;
