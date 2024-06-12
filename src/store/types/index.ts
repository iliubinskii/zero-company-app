import type {
  AuthActions,
  CompanyRegistrationActions,
  DraftsActions,
  FavoriteCompaniesActions,
  LoadedActions,
  SnackbarActions,
  UserActions
} from "../slices";
import {
  type AuthUser,
  AuthUserValidationSchema,
  type ExistingCategory,
  ExistingCategoryValidationSchema,
  type ExistingCompany,
  ExistingCompanyValidationSchema,
  type ExistingUser,
  ExistingUserValidationSchema
} from "../../schema";
import type { TypedUseSelectorHook, useDispatch } from "react-redux";
import { CREATE_COMPANY_STEP } from "../../consts";
import type { SetStateAction } from "../root-actions";
import type { ThunkAction } from "redux-thunk";
import type { store } from "../store";
import zod from "zod";

export const SNACKBAR_VARIANT = {
  error: "error",
  info: "info",
  success: "success"
} as const;

export const AppStateValidationSchema = zod.object({
  auth: zod.object({
    authUser: AuthUserValidationSchema.nullable()
  }),
  companyRegistration: zod.object({
    category: ExistingCategoryValidationSchema.optional(),
    country: zod.string().optional(),
    step: zod.enum([
      CREATE_COMPANY_STEP.REVIEW,
      CREATE_COMPANY_STEP.SELECT_CATEGORY,
      CREATE_COMPANY_STEP.SELECT_COUNTRY
    ])
  }),
  drafts: zod.object({
    drafts: zod.array(ExistingCompanyValidationSchema),
    draftsError: zod.boolean(),
    draftsLoading: zod.boolean()
  }),
  favoriteCompanies: zod.object({
    favoriteCompanies: zod.array(ExistingCompanyValidationSchema),
    favoriteCompaniesError: zod.boolean(),
    favoriteCompaniesLoading: zod.boolean()
  }),
  loaded: zod.boolean(),
  snackbar: zod.object({
    isOpen: zod.boolean(),
    message: zod.string(),
    variant: zod.enum([
      SNACKBAR_VARIANT.error,
      SNACKBAR_VARIANT.info,
      SNACKBAR_VARIANT.success
    ])
  }),
  user: zod.object({
    user: ExistingUserValidationSchema.optional()
  })
});

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
    readonly step: CREATE_COMPANY_STEP;
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
    readonly variant: SNACKBAR_VARIANT;
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

export type SNACKBAR_VARIANT =
  (typeof SNACKBAR_VARIANT)[keyof typeof SNACKBAR_VARIANT];

export type UseAppDispatch = typeof useDispatch<AppDispatch>;

export type UseAppSelector = TypedUseSelectorHook<AppState>;
