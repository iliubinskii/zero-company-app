"use client";

import { APP_LOADING_CLASS, APP_LOADING_TIMEOUT_MS } from "../consts";
import type { FC, ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef
} from "react";
import { lang } from "../langs";
import { logger } from "../services";

export const AppLoadingProvider: FC<Props> = ({ children }) => {
  const params = useParams();

  const pathname = usePathname();

  const timeout = useRef<number | undefined>();

  const setLoading = useCallback(() => {
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      document.body.classList.add(APP_LOADING_CLASS);
    }, APP_LOADING_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    document.body.classList.remove(APP_LOADING_CLASS);
    window.clearTimeout(timeout.current);

    return () => {
      document.body.classList.remove(APP_LOADING_CLASS);
      window.clearTimeout(timeout.current);
    };
  }, [params, pathname]);

  return (
    <AppLoadingContext.Provider value={{ setLoading }}>
      {children}
    </AppLoadingContext.Provider>
  );
};

/**
 * Get the current user from the JWT token
 * @returns The current user from the JWT token or undefined if the user is not logged in
 */
export function useAppLoading(): Context {
  return useContext(AppLoadingContext);
}

export interface Context {
  readonly setLoading: () => void;
}

export interface Props {
  readonly children: ReactNode;
}

const AppLoadingContext = createContext<Context>({
  setLoading: () => {
    logger.error(lang.AppLoadingContextNotInitialized);
  }
});
