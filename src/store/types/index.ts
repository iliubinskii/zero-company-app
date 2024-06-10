import type {
  AuthActions,
  CompanyRegistrationActions,
  DraftsActions,
  SnackbarActions
} from "../slices";
import type {
  AuthUser,
  AuthUserEssential,
  ExistingCategory,
  ExistingCompany
} from "../../schema";
import type { TypedUseSelectorHook, useDispatch } from "react-redux";
import type { CREATE_COMPANY_STEP } from "../../consts";
import type { SetStateAction } from "../root-actions";
import type { store } from "../store";

export type AppAction =
  | SetStateAction
  | AuthActions
  | CompanyRegistrationActions
  | DraftsActions
  | SnackbarActions;

export type AppDispatch = AppStore["dispatch"];

export interface AppState {
  readonly auth: {
    readonly authUser: AuthUser | AuthUserEssential | null;
  };
  readonly companyRegistration: {
    readonly category?: ExistingCategory | undefined;
    readonly country?: string | undefined;
    readonly step: (typeof CREATE_COMPANY_STEP)[keyof typeof CREATE_COMPANY_STEP];
  };
  readonly drafts: {
    readonly drafts: readonly ExistingCompany[];
    readonly draftsLoaded: boolean;
  };
  readonly loaded: boolean;
  readonly snackbar: {
    readonly isOpen: boolean;
    readonly message: string;
    readonly variant: SnackbarVariant;
  };
}

export type AppStore = typeof store;

export interface AppThunk<T = void> {
  (dispatch: AppDispatch): Promise<T>;
}

export type SnackbarVariant = "error" | "info" | "success";

export type UseAppDispatch = typeof useDispatch<AppDispatch>;

export type UseAppSelector = TypedUseSelectorHook<AppState>;
