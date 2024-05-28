import { CompanyReg, type RootState } from "../types";
import type { ExistingCategory } from "../../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: RootState["companyRegistration"] = {
  currentStep: CompanyReg.Start
};

const companyRegistrationSlice = createSlice({
  initialState,
  name: "companyRegistration",
  reducers: {
    resetCompanyRegistration: state => {
      state.currentStep = CompanyReg.Start;
      delete state.country;
      delete state.category;
    },
    setCompanyCategory: (state, action: PayloadAction<ExistingCategory>) => {
      state.currentStep = CompanyReg.SelectCountry;
      state.category = action.payload;
    },
    setCompanyCountry: (state, action: PayloadAction<string>) => {
      state.currentStep = CompanyReg.Login;
      state.country = action.payload;
    },
    startCompanyRegistration: state => {
      state.currentStep = CompanyReg.SelectCategory;
    }
  }
});

export const companyRegistrationReducer = companyRegistrationSlice.reducer;

export const {
  resetCompanyRegistration,
  setCompanyCategory,
  setCompanyCountry,
  startCompanyRegistration
} = companyRegistrationSlice.actions;

/**
 * Select the category of the company.
 * @param state - The root state.
 * @returns The category of the company.
 */
export const selectCategory = (
  state: RootState
): ExistingCategory | undefined => state.companyRegistration.category;

/**
 * Select the country of the company.
 * @param state - The root state.
 * @returns The country of the company.
 */
export const selectCountry = (state: RootState): string | undefined =>
  state.companyRegistration.country;

/**
 * Select the current step of the company registration.
 * @param state - The root state.
 * @returns The current step of the company registration.
 */
export const selectStep = (state: RootState): CompanyReg =>
  state.companyRegistration.currentStep;
