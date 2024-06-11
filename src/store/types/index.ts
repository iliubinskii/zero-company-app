import type {
  AuthActions,
  CompanyRegistrationActions,
  DraftsActions,
  FavoriteCompaniesActions,
  LoadedActions,
  SnackbarActions,
  UserActions
} from "../slices";
import type {
  AuthUser,
  ExistingCategory,
  ExistingCompany,
  ExistingUser
} from "../../schema";
import type { TypedUseSelectorHook, useDispatch } from "react-redux";
import type { CREATE_COMPANY_STEP } from "../../consts";
import type { SetStateAction } from "../root-actions";
import type { ThunkAction } from "redux-thunk";
import type { store } from "../store";

export type AppAction =
  | SetStateAction
  | AuthActions
  | CompanyRegistrationActions
  | DraftsActions
  | FavoriteCompaniesActions
  | LoadedActions
  | SnackbarActions
  | UserActions;

export type AppDispatch = AppStore["dispatch"];

export interface AppState {
  readonly auth: {
    readonly authUser: AuthUser | null;
  };
  readonly companyRegistration: {
    readonly category?: ExistingCategory | undefined;
    readonly country?: string | undefined;
    readonly step: (typeof CREATE_COMPANY_STEP)[keyof typeof CREATE_COMPANY_STEP];
  };
  readonly drafts: {
    readonly drafts: readonly ExistingCompany[];
    readonly draftsError: boolean;
    readonly draftsLoading: boolean;
  };
  readonly favoriteCompanies: {
    readonly favoriteCompanies: readonly ExistingCompany[];
    readonly favoriteCompaniesError: boolean;
    readonly favoriteCompaniesLoading: boolean;
  };
  readonly loaded: boolean;
  readonly snackbar: {
    readonly isOpen: boolean;
    readonly message: string;
    readonly variant: SnackbarVariant;
  };
  readonly user: {
    readonly user?: ExistingUser | undefined;
  };
}

export type AppStore = typeof store;

export type AppThunk<T = void> = ThunkAction<
  Promise<T>,
  AppState,
  unknown,
  AppAction
>;

export type SnackbarVariant = "error" | "info" | "success";

export type UseAppDispatch = typeof useDispatch<AppDispatch>;

export type UseAppSelector = TypedUseSelectorHook<AppState>;
