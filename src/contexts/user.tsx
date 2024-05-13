import { ExistingUser, ExistingUserValidationSchema } from "../schema";
import React from "react";
import { USER_STORAGE_KEY } from "../consts";
import { clientAPI } from "../api";
import useSWR from "swr";

export const UserProvider: React.FC<Props> = ({ children }) => {
  const { data: userLocal } = useSWR("/local/me", loadFromLocalStorage);

  const { data: userSwr, isLoading } = useSWR("/me", clientAPI.getUser);

  const user = isLoading ? userLocal : userSwr;

  React.useEffect(() => {
    if (isLoading) {
      // Wait for data
    } else saveToLocalStorage(userSwr);
  }, [userSwr, isLoading]);

  return (
    <UserContext.Provider value={{ isLoading, user }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Get the current user from the JWT token
 * @returns The current user from the JWT token or undefined if the user is not logged in
 */
export function useUser(): Context {
  return React.useContext(UserContext);
}

export interface Context {
  readonly isLoading: boolean;
  readonly user: ExistingUser | undefined;
}

export interface Props {
  readonly children: React.ReactNode;
}

const UserContext = React.createContext<Context>({
  isLoading: false,
  user: undefined
});

/**
 * Get cached JWT user from local storage.
 * @returns The cached JWT user or undefined if the user is not logged in
 */
function loadFromLocalStorage(): ExistingUser | undefined {
  const dataStr = localStorage.getItem(USER_STORAGE_KEY);

  if (typeof dataStr === "string") {
    const data = JSON.parse(dataStr) as unknown;

    const result = ExistingUserValidationSchema.safeParse(data);

    if (result.success) return result.data;
  }

  return undefined;
}

/**
 * Cache user to local storage
 * @param user - The user to cache
 */
function saveToLocalStorage(user: ExistingUser | undefined): void {
  if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_STORAGE_KEY);
}
