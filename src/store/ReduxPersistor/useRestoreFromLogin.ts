import type { AppState } from "../types";
import { AuthUserValidationSchema } from "../../schema";
import { REDUX_PERSIST_KEY } from "../../consts";
import { useSearchParams } from "next/navigation";

/**
 * Restore the app state from login query param.
 * @returns A function that restores the app state from login query param.
 */
export function useRestoreFromLogin(): (state: AppState) => AppState {
  const params = useSearchParams();

  return state => {
    const action = params.get("action");

    const user = params.get("user");

    if (action === "login" && typeof user === "string") {
      const authUser = AuthUserValidationSchema.safeParse(JSON.parse(user));

      if (authUser.success) {
        state = { ...state, auth: { authUser: authUser.data } };
        localStorage.setItem(REDUX_PERSIST_KEY, JSON.stringify(state));
      }
    }

    return state;
  };
}
