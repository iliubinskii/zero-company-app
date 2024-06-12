import type { AppState } from "../types";
import type { ExistingCompany } from "../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { dangerouslyAssumeWritable } from "../../utils";

const initialState: AppState["drafts"] = {
  drafts: [],
  draftsError: false,
  draftsLoading: true
};

const draftsSlice = createSlice({
  initialState,
  name: "drafts",
  reducers: {
    addDraft: (state, action: PayloadAction<ExistingCompany>) => {
      state.drafts = [
        ...state.drafts.filter(draft => draft._id !== action.payload._id),
        dangerouslyAssumeWritable(action.payload)
      ];
    },
    clearDrafts: state => {
      state.drafts = [];
      state.draftsError = false;
      state.draftsLoading = true;
    },
    removeDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter(draft => draft._id !== action.payload);
    },
    setDrafts: (state, action: PayloadAction<readonly ExistingCompany[]>) => {
      state.drafts = dangerouslyAssumeWritable(action.payload);
      state.draftsError = false;
      state.draftsLoading = false;
    },
    setDraftsError: state => {
      state.drafts = [];
      state.draftsError = true;
      state.draftsLoading = false;
    }
  }
});

export const draftsReducer = draftsSlice.reducer;

export const { addDraft, clearDrafts, removeDraft, setDrafts, setDraftsError } =
  draftsSlice.actions;

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
export const selectDraftsLoading = (state: AppState): boolean =>
  state.drafts.draftsLoading;

export type DraftsActions =
  | ReturnType<typeof addDraft>
  | ReturnType<typeof clearDrafts>
  | ReturnType<typeof removeDraft>
  | ReturnType<typeof setDrafts>
  | ReturnType<typeof setDraftsError>;
