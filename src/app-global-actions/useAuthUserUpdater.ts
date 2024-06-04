import { callAsync, filterUndefinedProperties } from "../utils";
import { setAuthUser, updateAuthUser, useAppDispatch } from "../store";
import { AuthUserEssentialValidationSchema } from "../schema";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Hook to update the auth user.
 */
export function useAuthUserUpdater(): void {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  useEffect(() => {
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

    // Send request to /auth/me route to update auth state based on the httpOnly cookie.
    callAsync(async () => {
      await dispatch(updateAuthUser());
    });
  }, [dispatch, searchParams]);
}
