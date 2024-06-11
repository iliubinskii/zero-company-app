import type { AppState } from "../types";
import type { ExistingCompany } from "../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { dangerouslyAssumeWritable } from "../../utils";

const initialState: AppState["favoriteCompanies"] = {
  favoriteCompanies: [],
  favoriteCompaniesError: false,
  favoriteCompaniesLoading: true
};

const favoriteCompaniesSlice = createSlice({
  initialState,
  name: "favoriteCompanies",
  reducers: {
    addFavoriteCompany: (state, action: PayloadAction<ExistingCompany>) => {
      state.favoriteCompanies = [
        ...state.favoriteCompanies.filter(
          company => company._id !== action.payload._id
        ),
        dangerouslyAssumeWritable(action.payload)
      ];
    },
    clearFavoriteCompanies: state => {
      state.favoriteCompanies = [];
      state.favoriteCompaniesError = false;
      state.favoriteCompaniesLoading = true;
    },
    removeFavoriteCompany: (state, action: PayloadAction<ExistingCompany>) => {
      state.favoriteCompanies = state.favoriteCompanies.filter(
        company => company._id !== action.payload._id
      );
    },
    setFavoriteCompanies: (
      state,
      action: PayloadAction<readonly ExistingCompany[]>
    ) => {
      state.favoriteCompanies = dangerouslyAssumeWritable(action.payload);
      state.favoriteCompaniesError = false;
      state.favoriteCompaniesLoading = false;
    },
    setFavoriteCompaniesError: state => {
      state.favoriteCompanies = [];
      state.favoriteCompaniesError = true;
      state.favoriteCompaniesLoading = false;
    }
  }
});

export const favoriteCompaniesReducer = favoriteCompaniesSlice.reducer;

export const {
  addFavoriteCompany,
  clearFavoriteCompanies,
  removeFavoriteCompany,
  setFavoriteCompanies,
  setFavoriteCompaniesError
} = favoriteCompaniesSlice.actions;

/**
 * Selects the favoriteCompanies from the state.
 * @param state - The state of the app.
 * @returns The favoriteCompanies.
 */
export const selectFavoriteCompanies = (
  state: AppState
): readonly ExistingCompany[] => state.favoriteCompanies.favoriteCompanies;

/**
 * Selects whether the favoriteCompanies have been loaded.
 * @param state - The state of the app.
 * @returns Whether the favoriteCompanies have been loaded.
 */
export const selectFavoriteCompaniesLoading = (state: AppState): boolean =>
  state.favoriteCompanies.favoriteCompaniesLoading;

export type FavoriteCompaniesActions =
  | ReturnType<typeof addFavoriteCompany>
  | ReturnType<typeof clearFavoriteCompanies>
  | ReturnType<typeof removeFavoriteCompany>
  | ReturnType<typeof setFavoriteCompanies>
  | ReturnType<typeof setFavoriteCompaniesError>;
