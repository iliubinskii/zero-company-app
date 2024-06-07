"use client";

import type { ComponentProps, FC, ReactNode } from "react";
import React, { createContext, useCallback, useContext, useState } from "react";
import { Snackbar } from "../components";
import { lang } from "../langs";
import { logger } from "../services";

export const SnackbarProvider: FC<Props> = ({ children }) => {
  const [isSnackbarActive, setIsSnackbarActive] = useState(false);

  const [message, setMessage] = useState("");

  const [variant, setVariant] =
    useState<ComponentProps<typeof Snackbar>["variant"]>();

  const showSnackbar = useCallback<Context["showSnackbar"]>(
    (nextMessage, nextVariant) => {
      setIsSnackbarActive(true);
      setMessage(nextMessage);
      setVariant(nextVariant);
    },
    []
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        isOpen={isSnackbarActive}
        message={message}
        onClose={() => {
          setIsSnackbarActive(false);
        }}
        variant={variant}
      />
    </SnackbarContext.Provider>
  );
};

/**
 * Custom hook to use the snackbar context
 * @returns The snackbar context
 */
export function useSnackbar(): Context {
  return useContext(SnackbarContext);
}

export interface Context {
  readonly showSnackbar: (
    message: string,
    variant?: ComponentProps<typeof Snackbar>["variant"]
  ) => void;
}

export interface Props {
  readonly children: ReactNode;
}

const SnackbarContext = createContext<Context>({
  showSnackbar: () => {
    logger.error(lang.SnackbarContextNotInitialized);
  }
});
