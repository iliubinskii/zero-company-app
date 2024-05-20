import { updateJwtUser, useAppDispatch } from "../services";
import React from "react";
import { callAsync } from "../utils";

/**
 * JWT user updater.
 */
export function useJwtUserUpdater(): void {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    callAsync(async () => {
      await dispatch(updateJwtUser());
    });
  }, [dispatch]);
}
