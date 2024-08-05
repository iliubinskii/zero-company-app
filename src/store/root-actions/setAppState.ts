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

export interface SetStateAction {
  readonly payload: AppState;
  readonly type: typeof SET_STATE;
}
