"use client";

import { JwtUser, JwtUserValidationSchema } from "../schema";
import { JWT_USER_STORAGE_KEY } from "../consts";
import React from "react";
import { clientAPI } from "../api";
import { filterUndefinedProperties } from "../utils";
import useSWR from "swr";

export const JwtUserProvider: React.FC<Props> = ({ children }) => {
  const { data: jwtUserLocal } = useSWR("/local/auth/me", () => {
    console.info("Fetching JWT user from local storage");

    return loadFromLocalStorage();
  });

  const { data: jwtUserSwr, isLoading } = useSWR("/auth/me", async () => {
    console.info("Fetching JWT user from API");

    const jwtUser = await clientAPI.getJwtUser();

    return jwtUser;
  });

  const jwtUser = isLoading ? jwtUserLocal : jwtUserSwr;

  React.useEffect(() => {
    if (isLoading) {
      // Wait for data
    } else saveToLocalStorage(jwtUserSwr);
  }, [jwtUserSwr, isLoading]);

  return (
    <JwtUserContext.Provider value={{ isLoading, jwtUser }}>
      {children}
    </JwtUserContext.Provider>
  );
};

/**
 * Get the current user from the JWT token
 * @returns The current user from the JWT token or undefined if the user is not logged in
 */
export function useJwtUser(): Context {
  return React.useContext(JwtUserContext);
}

export interface Context {
  readonly isLoading: boolean;
  readonly jwtUser: JwtUser | undefined;
}

export interface Props {
  readonly children: React.ReactNode;
}

const JwtUserContext = React.createContext<Context>({
  isLoading: false,
  jwtUser: undefined
});

/**
 * Get cached JWT user from local storage.
 * @returns The cached JWT user or undefined if the user is not logged in
 */
function loadFromLocalStorage(): JwtUser | undefined {
  const dataStr = localStorage.getItem(JWT_USER_STORAGE_KEY);

  if (typeof dataStr === "string") {
    const data = JSON.parse(dataStr) as unknown;

    const result = JwtUserValidationSchema.safeParse(data);

    if (result.success) return filterUndefinedProperties(result.data);
  }

  return undefined;
}

/**
 * Cache JWT user to local storage.
 * @param jwtUser - The JWT user to cache
 */
function saveToLocalStorage(jwtUser: JwtUser | undefined): void {
  if (jwtUser)
    localStorage.setItem(JWT_USER_STORAGE_KEY, JSON.stringify(jwtUser));
  else localStorage.removeItem(JWT_USER_STORAGE_KEY);
}
