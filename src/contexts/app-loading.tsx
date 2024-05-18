"use client";

import { APP_LOADING_CLASS, APP_LOADING_TIMEOUT_MS } from "../consts";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export const AppLoadingProvider: React.FC<Props> = ({ children }) => {
  const params = useParams();

  const pathname = usePathname();

  const timeout = React.useRef<number | undefined>();

  React.useEffect(() => {
    document.body.classList.remove(APP_LOADING_CLASS);
    window.clearTimeout(timeout.current);

    return () => {
      document.body.classList.remove(APP_LOADING_CLASS);
      window.clearTimeout(timeout.current);
    };
  }, [params, pathname]);

  return (
    <AppLoadingContext.Provider
      value={{
        setLoading: () => {
          window.clearTimeout(timeout.current);
          timeout.current = window.setTimeout(() => {
            document.body.classList.add(APP_LOADING_CLASS);
          }, APP_LOADING_TIMEOUT_MS);
        }
      }}
    >
      {children}
    </AppLoadingContext.Provider>
  );
};

/**
 * Get the current user from the JWT token
 * @returns The current user from the JWT token or undefined if the user is not logged in
 */
export function useAppLoading(): Context {
  return React.useContext(AppLoadingContext);
}

export interface Context {
  readonly setLoading: () => void;
}

export interface Props {
  readonly children: React.ReactNode;
}

const AppLoadingContext = React.createContext<Context>({
  setLoading: () => {
    // Do nothing
  }
});
