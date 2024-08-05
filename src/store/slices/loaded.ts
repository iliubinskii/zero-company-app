import type { AppState } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState["loaded"] = false;

const loadedSlice = createSlice({
  initialState,
  name: "loaded",
  reducers: {
    setLoaded: (_state, action: PayloadAction<boolean>) => action.payload
  }
});

export const loadedReducer = loadedSlice.reducer;

export const { setLoaded } = loadedSlice.actions;

/**
 * Select the loaded state.
 * @param state - The app state.
 * @returns The loaded state.
 */
export const selectLoaded = (state: AppState): boolean => state.loaded;

export type LoadedActions = ReturnType<typeof setLoaded>;
