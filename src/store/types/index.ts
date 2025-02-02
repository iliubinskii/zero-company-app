import type {
  AuthActions,
  CompanyRegistrationActions,
  FavoriteCompaniesActions,
  LoadedActions,
  SnackbarActions,
  UserActions,
  UserCompaniesActions,
  UserDocumentsActions
} from "../slices";
import type {
  AuthUser,
  ExistingCategory,
  ExistingCompany,
  ExistingUser,
  PopulatedDocument
} from "../../schema";
import {
  AuthUserValidationSchema,
  ExistingCategoryValidationSchema,
  ExistingCompanyValidationSchema,
  ExistingUserValidationSchema,
  PopulatedDocumentValidationSchema
} from "../../schema";
import type { TypedUseSelectorHook, useDispatch } from "react-redux";
import { CREATE_COMPANY_STEP } from "../../consts";
import type { SetStateAction } from "../root-actions";
import type { ThunkAction } from "redux-thunk";
import type { store } from "../store";
import zod from "zod";

export const SnackbarVariant = {
  error: "error",
  info: "info",
  success: "success",
  warning: "warning"
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
      SnackbarVariant.error,
      SnackbarVariant.info,
      SnackbarVariant.success
    ])
  }),
  user: zod.object({
    user: ExistingUserValidationSchema.optional()
  }),
  userCompanies: zod.object({
    companies: zod.array(ExistingCompanyValidationSchema),
    companiesError: zod.boolean(),
    companiesLoading: zod.boolean()
  }),
  userDocuments: zod.object({
    documents: zod.array(PopulatedDocumentValidationSchema),
    documentsError: zod.boolean(),
    documentsLoading: zod.boolean()
  })
});

export type AppAction =
  | SetStateAction
  | AuthActions
  | CompanyRegistrationActions
  | FavoriteCompaniesActions
  | LoadedActions
  | SnackbarActions
  | UserActions
  | UserCompaniesActions
  | UserDocumentsActions;

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
  readonly userCompanies: {
    readonly companies: readonly ExistingCompany[];
    readonly companiesError: boolean;
    readonly companiesLoading: boolean;
  };
  readonly userDocuments: {
    readonly documents: readonly PopulatedDocument[];
    readonly documentsError: boolean;
    readonly documentsLoading: boolean;
  };
}

export type AppStore = typeof store;

export type AppThunk<T = void> = ThunkAction<
  Promise<T>,
  AppState,
  unknown,
  AppAction
>;

export type SnackbarVariant =
  (typeof SnackbarVariant)[keyof typeof SnackbarVariant];

export type UseAppDispatch = typeof useDispatch<AppDispatch>;

export type UseAppSelector = TypedUseSelectorHook<AppState>;
