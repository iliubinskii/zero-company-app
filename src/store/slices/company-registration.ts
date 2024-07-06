import { type AppState } from "../types";
import { CREATE_COMPANY_STEP } from "../../consts";
import type { ExistingCategory } from "../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState["companyRegistration"] = {
  step: CREATE_COMPANY_STEP.SELECT_CATEGORY
};

const companyRegistrationSlice = createSlice({
  initialState,
  name: "companyRegistration",
  reducers: {
    prevCompanyRegistrationStep: state => {
      switch (state.step) {
        case CREATE_COMPANY_STEP.SELECT_CATEGORY: {
          break;
        }

        case CREATE_COMPANY_STEP.SELECT_COUNTRY: {
          state.step = CREATE_COMPANY_STEP.SELECT_CATEGORY;

          break;
        }

        case CREATE_COMPANY_STEP.REVIEW: {
          state.step = CREATE_COMPANY_STEP.SELECT_COUNTRY;

          break;
        }

        case CREATE_COMPANY_STEP.CREATE: {
          state.step = CREATE_COMPANY_STEP.REVIEW;

          break;
        }
      }
    },
    resetCompanyRegistration: state => {
      state.step = CREATE_COMPANY_STEP.SELECT_CATEGORY;
      delete state.category;
      delete state.country;
    },
    setCompanyCategory: (state, action: PayloadAction<ExistingCategory>) => {
      state.step = CREATE_COMPANY_STEP.SELECT_COUNTRY;
      state.category = action.payload;
    },
    setCompanyCountry: (state, action: PayloadAction<string>) => {
      state.step = CREATE_COMPANY_STEP.REVIEW;
      state.country = action.payload;
    },
    setCompanyCreateStep: state => {
      state.step = CREATE_COMPANY_STEP.CREATE;
    }
  }
});

export const companyRegistrationReducer = companyRegistrationSlice.reducer;

export const {
  prevCompanyRegistrationStep,
  resetCompanyRegistration,
  setCompanyCategory,
  setCompanyCountry,
  setCompanyCreateStep
} = companyRegistrationSlice.actions;

/**
 * Select the category of the company.
 * @param state - The app state.
 * @returns The category of the company.
 */
export const selectCompanyCategory = (
  state: AppState
): ExistingCategory | undefined => state.companyRegistration.category;

/**
 * Select the country of the company.
 * @param state - The app state.
 * @returns The country of the company.
 */
export const selectCompanyCountry = (state: AppState): string | undefined =>
  state.companyRegistration.country;

export const selectCompanyRegistrationStep = (
  state: AppState
): AppState["companyRegistration"]["step"] => state.companyRegistration.step;

export type CompanyRegistrationActions =
  | ReturnType<typeof prevCompanyRegistrationStep>
  | ReturnType<typeof resetCompanyRegistration>
  | ReturnType<typeof setCompanyCategory>
  | ReturnType<typeof setCompanyCountry>
  | ReturnType<typeof setCompanyCreateStep>;
