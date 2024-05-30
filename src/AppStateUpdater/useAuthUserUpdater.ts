import { callAsync, filterUndefinedProperties } from "../utils";
import { setAuthUser, updateAuthUser, useAppDispatch } from "../services";
import { AuthUserEssentialValidationSchema } from "../schema";
import React from "react";
import { useSearchParams } from "next/navigation";

/**
 * JWT user updater.
 */
export function useAuthUserUpdater(): void {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (searchParams) {
      const action = searchParams.get("action");
      const user = searchParams.get("user");

      if (action === "login" && typeof user === "string") {
        const authUser = AuthUserEssentialValidationSchema.safeParse(
          JSON.parse(user)
        );

        if (authUser.success)
          dispatch(setAuthUser(filterUndefinedProperties(authUser.data)));
      }

      if (action === "logout") dispatch(setAuthUser(undefined));

      callAsync(async () => {
        await dispatch(updateAuthUser());
      });
    }
  }, [dispatch, searchParams]);
}
