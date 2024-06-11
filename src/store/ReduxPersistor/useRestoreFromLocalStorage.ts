import type { AppState } from "../types";
import { REDUX_PERSIST_KEY } from "../../consts";
import { isAppState } from "../root-actions";

/**
 * Restore the app state from local storage.
 * @returns A function that restores the app state from local storage.
 */
export function useRestoreFromLocalStorage(): (state: AppState) => AppState {
  return state => {
    const stored = localStorage.getItem(REDUX_PERSIST_KEY);

    if (typeof stored === "string") {
      const json = JSON.parse(stored) as unknown;

      if (isAppState(json)) state = json;
    }

    return state;
  };
}
