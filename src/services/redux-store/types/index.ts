import type {
  AuthUser,
  AuthUserEssential,
  ExistingCategory
} from "../../../schema";
import type { TypedUseSelectorHook, useDispatch } from "react-redux";
import type { store } from "../store";

/**
 * The company registration step.
 */
export enum CompanyReg {
  EditDraft = "EditDraft",
  SelectCategory = "SelectCategory",
  SelectCountry = "SelectCountry",
  Start = "Start"
}

export type AppDispatch = (typeof store)["dispatch"];

export interface AppThunk<T = void> {
  (): (dispatch: AppDispatch) => Promise<T>;
}

export interface AppState {
  readonly auth: {
    readonly authUser?: AuthUser | AuthUserEssential;
  };
  readonly companyRegistration: {
    readonly category?: ExistingCategory;
    readonly country?: string;
    readonly currentStep: CompanyReg;
  };
  readonly loaded: boolean;
}

export type UseAppDispatch = typeof useDispatch<AppDispatch>;

export type UseAppSelector = TypedUseSelectorHook<AppState>;
