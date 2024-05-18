"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

export const AppLoadingProvider: React.FC<Props> = ({ children }) => {
  const params = useParams();

  const pathname = usePathname();

  React.useEffect(() => {
    document.body.classList.remove("app-loading");
  }, [params, pathname]);

  return (
    <AppLoadingContext.Provider
      value={{
        setLoading: () => {
          document.body.classList.add("app-loading");
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
