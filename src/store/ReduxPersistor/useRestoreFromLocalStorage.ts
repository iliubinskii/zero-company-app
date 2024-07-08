import { type AppState, AppStateValidationSchema } from "../types";
import { ERROR, REDUX_PERSIST_KEY } from "../../consts";
import { logger } from "../../services";

/**
 * Restore the app state from local storage.
 * @returns A function that restores the app state from local storage.
 */
export function useRestoreFromLocalStorage(): (state: AppState) => AppState {
  return state => {
    const stored = localStorage.getItem(REDUX_PERSIST_KEY);

    if (typeof stored === "string") {
      const json = JSON.parse(stored) as unknown;

      const storedState = AppStateValidationSchema.safeParse(json);

      if (storedState.data) return storedState.data;

      localStorage.removeItem(REDUX_PERSIST_KEY);
      logger.error(ERROR.FAILED_TO_RESTORE_APP_STATE, storedState.error.errors);
    }

    return state;
  };
}
