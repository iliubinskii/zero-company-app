import type {
  AuthUser,
  AuthUserEssential,
  ExistingCategory
} from "../../../schema";
import type { TypedUseSelectorHook, useDispatch } from "react-redux";
import type { createdPersistedStore } from "../store";

/**
 * The company registration step.
 */
export enum CompanyReg {
  Category = "Category",
  Country = "Country",
  Login = "Login",
  Start = "Start"
}

export type AppDispatch = ReturnType<
  typeof createdPersistedStore
>["store"]["dispatch"];

export interface AppThunk<T = void> {
  (): (dispatch: AppDispatch) => Promise<T>;
}

export interface RootState {
  readonly auth: {
    readonly authUser?: AuthUser | AuthUserEssential;
  };
  readonly companyRegistration: {
    readonly category?: ExistingCategory;
    readonly country?: string;
    readonly currentStep: CompanyReg;
  };
}

export type UseAppDispatch = typeof useDispatch<AppDispatch>;

export type UseAppSelector = TypedUseSelectorHook<RootState>;
