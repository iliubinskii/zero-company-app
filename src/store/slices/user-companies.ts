import type { AppState } from "../types";
import { type ExistingCompany } from "../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { dangerouslyAssumeWritable } from "../../utils";

const initialState: AppState["userCompanies"] = {
  companies: [],
  companiesError: false,
  companiesLoading: true
};

const userCompaniesSlice = createSlice({
  initialState,
  name: "companies",
  reducers: {
    addCompany: (state, action: PayloadAction<ExistingCompany>) => {
      state.companies = [
        ...state.companies.filter(
          company => company._id !== action.payload._id
        ),
        dangerouslyAssumeWritable(action.payload)
      ];
    },
    clearCompanies: state => {
      state.companies = [];
      state.companiesError = false;
      state.companiesLoading = true;
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(
        company => company._id !== action.payload
      );
    },
    setCompanies: (
      state,
      action: PayloadAction<readonly ExistingCompany[]>
    ) => {
      state.companies = dangerouslyAssumeWritable(action.payload);
      state.companiesError = false;
      state.companiesLoading = false;
    },
    setCompaniesError: state => {
      state.companies = [];
      state.companiesError = true;
      state.companiesLoading = false;
    }
  }
});

export const userCompaniesReducer = userCompaniesSlice.reducer;

export const {
  addCompany,
  clearCompanies,
  removeCompany,
  setCompanies,
  setCompaniesError
} = userCompaniesSlice.actions;

/**
 * Selects the companies from the state.
 * @param state - The state of the app.
 * @returns The companies.
 */
export const selectCompanies = (state: AppState): readonly ExistingCompany[] =>
  state.userCompanies.companies;

/**
 * Selects whether the companies have been loaded.
 * @param state - The state of the app.
 * @returns Whether the companies have been loaded.
 */
export const selectCompaniesLoading = (state: AppState): boolean =>
  state.userCompanies.companiesLoading;

export type UserCompaniesActions =
  | ReturnType<typeof addCompany>
  | ReturnType<typeof clearCompanies>
  | ReturnType<typeof removeCompany>
  | ReturnType<typeof setCompanies>
  | ReturnType<typeof setCompaniesError>;
