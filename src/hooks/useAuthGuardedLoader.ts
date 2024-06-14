import {
  logError,
  selectAuthUser,
  selectLoaded,
  useAppDispatch,
  useAppSelector
} from "../store";
import { useCallback, useEffect, useState } from "react";
import type { DependencyList } from "react";
import { ErrorCode } from "../schema";
import type { ErrorResponse } from "../schema";
import { callAsync } from "../utils";
import { lang } from "../langs";
import { useRouter } from "next/navigation";

/**
 * Hook to load a guarded resource.
 * @param loader - The loader function.
 * @param deps - The dependencies.
 * @param options - The options.
 * @param options.redirectOnNotFound - The redirect on not found.
 * @returns The guarded resource.
 */
export function useAuthGuardedLoader<T extends object>(
  loader: () => Promise<T | ErrorResponse<ErrorCode>>,
  deps: DependencyList,
  { redirectOnNotFound }: Options = {}
): GuardedLoaderState<T> {
  const authUser = useAppSelector(selectAuthUser);

  const dispatch = useAppDispatch();

  const loaded = useAppSelector(selectLoaded);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- Ok
  const memorizedLoader = useCallback(loader, deps);

  const router = useRouter();

  const [state, setState] = useState<
    Omit<GuardedLoaderState<T>, "setResource">
  >({
    isError: false,
    isLoading: true
  });

  const setResource = useCallback((resource?: T) => {
    setState({
      isError: false,
      isLoading: false,
      resource
    });
  }, []);

  useEffect(() => {
    if (loaded && authUser)
      callAsync(async () => {
        try {
          const resource = await memorizedLoader();

          if ("error" in resource)
            if (resource.error === ErrorCode.NotFound)
              router.push(redirectOnNotFound ?? "/not-found");
            else {
              setState({
                isError: true,
                isLoading: false
              });
              dispatch(
                logError({
                  error: resource,
                  message: resource.errorMessage
                })
              );
            }
          else
            setState({
              isError: false,
              isLoading: false,
              resource
            });
        } catch (err) {
          setState({
            isError: true,
            isLoading: false
          });
          dispatch(
            logError({
              error: err,
              message: lang.ErrorLoadingData
            })
          );
        }
      });
  }, [authUser, dispatch, loaded, memorizedLoader, redirectOnNotFound, router]);

  return { ...state, setResource };
}

export interface Options {
  readonly redirectOnNotFound?: string | undefined;
}

interface GuardedLoaderState<T extends object> {
  readonly error?: string | undefined;
  readonly isError: boolean;
  readonly isLoading: boolean;
  readonly resource?: T | undefined;
  readonly setResource: (resource?: T) => void;
}
