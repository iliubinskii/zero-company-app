import type { AppState } from "../types";
import { REDUX_PERSIST_KEY } from "../../consts";
import { useSearchParams } from "next/navigation";

/**
 * Restore the app state from logout query param.
 * @returns A function that restores the app state from logout query param.
 */
export function useRestoreFromLogout(): (state: AppState) => AppState {
  const params = useSearchParams();

  return state => {
    const action = params.get("action");

    if (action === "logout") {
      const updatedState = { ...state, auth: { authUser: null } };

      localStorage.setItem(REDUX_PERSIST_KEY, JSON.stringify(state));

      return updatedState;
    }

    return state;
  };
}
