import type { AppState } from "../types";
import type { ExistingCompany } from "../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { dangerouslyAssumeWritable } from "../../utils";

const initialState: AppState["drafts"] = { drafts: [], draftsLoaded: false };

const draftsSlice = createSlice({
  initialState,
  name: "drafts",
  reducers: {
    clearDrafts: state => {
      state.drafts = [];
      state.draftsLoaded = false;
    },
    setDrafts: (state, action: PayloadAction<readonly ExistingCompany[]>) => {
      state.drafts = dangerouslyAssumeWritable(action.payload);
      state.draftsLoaded = true;
    }
  }
});

export const draftsReducer = draftsSlice.reducer;

export const { clearDrafts, setDrafts } = draftsSlice.actions;

/**
 * Selects the drafts from the state.
 * @param state - The state of the app.
 * @returns The drafts.
 */
export const selectDrafts = (state: AppState): readonly ExistingCompany[] =>
  state.drafts.drafts;

/**
 * Selects whether the drafts have been loaded.
 * @param state - The state of the app.
 * @returns Whether the drafts have been loaded.
 */
export const selectDraftsLoaded = (state: AppState): boolean =>
  state.drafts.draftsLoaded;

export type DraftsActions =
  | ReturnType<typeof clearDrafts>
  | ReturnType<typeof setDrafts>;
