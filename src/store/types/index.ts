import type {
  AuthUser,
  AuthUserEssential,
  ExistingCategory
} from "../../schema";
import type { TypedUseSelectorHook, useDispatch } from "react-redux";
import type { CREATE_COMPANY_STEP } from "../../consts";
import type { store } from "../store";

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
    readonly step: (typeof CREATE_COMPANY_STEP)[keyof typeof CREATE_COMPANY_STEP];
  };
  readonly loaded: boolean;
}

export type UseAppDispatch = typeof useDispatch<AppDispatch>;

export type UseAppSelector = TypedUseSelectorHook<AppState>;
