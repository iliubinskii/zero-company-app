"use client";

import type { FC } from "react";
import { MdClose } from "react-icons/md";
import React, { useEffect } from "react";
import { SHOW_SNACKBAR_DURATION_MS } from "../consts";
import { noop } from "lodash";
import tw from "tailwind-styled-components";

export const Snackbar: FC<Props> = ({
  duration = SHOW_SNACKBAR_DURATION_MS,
  isOpen,
  message,
  onClose = noop,
  variant = "info"
}) => {
  const Container = (() => {
    switch (variant) {
      case "error": {
        return ContainerError;
      }
      case "info": {
        return ContainerInfo;
      }
      case "success": {
        return ContainerSuccess;
      }
    }
  })();

  const CloseIcon = (() => {
    switch (variant) {
      case "error": {
        return CloseIconError;
      }
      case "info": {
        return CloseIconInfo;
      }
      case "success": {
        return CloseIconSuccess;
      }
    }
  })();

  useEffect(() => {
    const timer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <Container
      className={isOpen ? undefined : "pointer-events-none opacity-0"}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <span>{message}</span>
      <CloseIcon onClick={onClose} />
    </Container>
  );
};

export interface Props {
  readonly duration?: number;
  readonly isOpen: boolean;
  readonly message: string;
  readonly onClose?: () => void;
  readonly variant?: "error" | "info" | "success";
}

const CloseIconBase = tw(MdClose)`
  absolute top-0.5 right-0.5
  p-1
  text-2xl
  cursor-pointer
`;

const CloseIconError = tw(CloseIconBase)`text-red-100 hover:text-white`;

const CloseIconInfo = tw(CloseIconBase)`text-gray-500 hover:text-gray-100`;

const CloseIconSuccess = tw(CloseIconBase)`text-green-100 hover:text-white`;

const ContainerBase = tw.div`
  z-50
  fixed bottom-4 left-1/2 transform -translate-x-1/2
  rounded shadow-lg
  px-10 py-4
  transition-opacity duration-300
`;

const ContainerError = tw(ContainerBase)`bg-error text-red-50`;

const ContainerInfo = tw(ContainerBase)`bg-gray-800 text-gray-50`;

const ContainerSuccess = tw(ContainerBase)`bg-success text-green-50`;
