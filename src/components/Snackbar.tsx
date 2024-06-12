"use client";

import { MdCheckCircle, MdClose, MdError, MdInfo } from "react-icons/md";
import type { FC } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { SHOW_SNACKBAR_DURATION_MS } from "../consts";
import type { SnackbarVariant } from "../store";
import { noop } from "lodash";
import tw from "tailwind-styled-components";

export const Snackbar: FC<Props> = ({
  duration = SHOW_SNACKBAR_DURATION_MS,
  isOpen,
  message,
  onClose = noop,
  variant = "info"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const Surface = useMemo(() => {
    switch (variant) {
      case "error": {
        return SurfaceError;
      }
      case "info": {
        return SurfaceInfo;
      }
      case "success": {
        return SurfaceSuccess;
      }
    }
  }, [variant]);

  const Icon = useMemo(() => {
    switch (variant) {
      case "error": {
        return IconError;
      }

      case "info": {
        return IconInfo;
      }

      case "success": {
        return IconSuccess;
      }
    }
  }, [variant]);

  const CloseIcon = useMemo(() => {
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
  }, [variant]);

  useEffect(() => {
    if (isHovered) return;

    const timer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, isHovered, onClose]);

  return (
    <Container
      className={isOpen ? undefined : "pointer-events-none"}
      onClick={e => {
        e.stopPropagation();
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <OpacityTransition className={isOpen ? undefined : "opacity-0"}>
        <ScaleTransformTransition
          className={isHovered ? "scale-110" : undefined}
        >
          <Surface>
            <Icon />
            {message}
            <CloseIcon onClick={onClose} />
          </Surface>
        </ScaleTransformTransition>
      </OpacityTransition>
    </Container>
  );
};

export interface Props {
  readonly duration?: number | undefined;
  readonly isOpen: boolean;
  readonly message: string;
  readonly onClose?: (() => void) | undefined;
  readonly variant: SnackbarVariant;
}

const Container = tw.div`z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2`;

const OpacityTransition = tw.div`transition-opacity duration-300`;

const ScaleTransformTransition = tw.div`transition-transform duration-300`;

const SurfaceBase = tw.div`rounded shadow-lg pl-4 pr-10 py-4 flex items-center gap-4`;

const SurfaceError = tw(SurfaceBase)`bg-error text-red-50`;

const SurfaceInfo = tw(SurfaceBase)`bg-gray-800 text-gray-50`;

const SurfaceSuccess = tw(SurfaceBase)`bg-success text-green-50`;

const IconError = tw(MdError)`text-red-100 text-2xl`;

const IconInfo = tw(MdInfo)`text-gray-500 text-2xl`;

const IconSuccess = tw(MdCheckCircle)`text-green-100 text-2xl`;

const CloseIconBase = tw(MdClose)`
  absolute top-0.5 right-0.5
  p-1
  text-2xl
  cursor-pointer
`;

const CloseIconError = tw(CloseIconBase)`text-red-100 hover:text-white`;

const CloseIconInfo = tw(CloseIconBase)`text-gray-500 hover:text-gray-100`;

const CloseIconSuccess = tw(CloseIconBase)`text-green-100 hover:text-white`;
