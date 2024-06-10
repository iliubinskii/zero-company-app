import type { AppState } from "../types";
import type { Reducer } from "@reduxjs/toolkit";

export const SET_STATE = "SET_STATE";

/**
 * Sets the redux state.
 * @param state The state to set.
 * @returns The action.
 */
export function setAppState(state: AppState): SetStateAction {
  return {
    payload: state,
    type: SET_STATE
  };
}

export const setAppStateReducer: Reducer<AppState, SetStateAction> = (
  _state,
  action
): AppState => action.payload;

/**
 * Type guard for AppState.
 * @param value The value to check.
 * @returns True if the value is a AppState.
 */
export function isAppState(value: unknown): value is AppState {
  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Complete the implementation
  return typeof value === "object" && value !== null;
}

export interface SetStateAction {
  payload: AppState;
  type: typeof SET_STATE;
}
