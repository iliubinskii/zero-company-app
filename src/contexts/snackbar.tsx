"use client";

import type { FC, ReactNode } from "react";
import {
  hideSnackbar,
  selectSnackbarIsOpen,
  selectSnackbarMessage,
  selectSnackbarVariant,
  useAppDispatch,
  useAppSelector
} from "../store";
import React from "react";
import { Snackbar } from "../components";

export const SnackbarProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectSnackbarIsOpen);

  const message = useAppSelector(selectSnackbarMessage);

  const variant = useAppSelector(selectSnackbarVariant);

  return (
    <>
      {children}
      <Snackbar
        isOpen={isOpen}
        message={message}
        onClose={() => {
          dispatch(hideSnackbar());
        }}
        variant={variant}
      />
    </>
  );
};

export interface Props {
  children?: ReactNode | undefined;
}
