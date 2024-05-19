import { setJwtUser, useAppDispatch } from "../services";
import React from "react";
import { callAsync } from "../utils";
import { clientAPI } from "../api";

/**
 * JWT user updater.
 */
export function useJwtUserUpdater(): void {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    callAsync(async () => {
      const jwtUser = await clientAPI.getJwtUser();

      dispatch(setJwtUser(jwtUser));
    });
  }, [dispatch]);
}
