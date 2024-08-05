export const APP_LOADING_CLASS = "app-loading";

export const APP_LOADING_TIMEOUT_MS = 200;

export const CAROUSEL_SCROLL_STEP = 200;

export const CIRCULAR_SIZE = 50;

export const CIRCULAR_STROKE_WIDTH = 4;

export const COMPANY_LIMIT = 9;

export const COMPANY_SHARE_STEP = 100;

export const COMPANY_TARGET_VALUE_STEP = 1000;

export const CREATE_COMPANY_STEP = {
  CREATE: "CREATE",
  REVIEW: "REVIEW",
  SELECT_CATEGORY: "SELECT_CATEGORY",
  SELECT_COUNTRY: "SELECT_COUNTRY"
} as const;

export const CREATE_COMPANY_STEPS = [
  CREATE_COMPANY_STEP.SELECT_CATEGORY,
  CREATE_COMPANY_STEP.SELECT_COUNTRY,
  CREATE_COMPANY_STEP.REVIEW,
  CREATE_COMPANY_STEP.CREATE
];

export const ERROR = {
  COMPANY_HAS_NO_IMAGE: "Company has no image",
  COMPANY_HAS_NO_LOGO: "Company has no logo",
  EXPECTING_API_URL_ENV: "Expecting API URL environment variable",
  EXPECTING_CATEGORY_ID_PARAM: "Expecting category ID param",
  EXPECTING_DOCUMENT_ID_PARAM: "Expecting document ID param",
  EXPECTING_DRAFT_ID_PARAM: "Expecting draft ID param",
  EXPECTING_IMAGE: "Expecting at least one image",
  EXPECTING_VALID_FOUNDERS_ARRAY_INDEX: "Expecting valid founders array index",
  EXPECTING_VALID_LOG_ERROR_SNACKBAR_ENV:
    "Expecting valid log error snackbar environment variable",
  FAILED_TO_RESTORE_APP_STATE: "Failed to restore app state",
  REDUX_STORE_DESYNCHRONIZATION: "Redux store desynchronization"
} as const;

export const GRAVATAR_DEFAULT = "retro";

export const GRAVATAR_MP = "mp";

export const GRAVATAR_RATING = "pg";

export const GRAVATAR_SIZE = "200";

export const BREAKPOINT = {
  md: 768
};

export const MOCK_STATS = {
  INTERNSHIP_POSITIONS: 6054,
  LOOKING_FOR_COFOUNDER: 4711,
  TEAMS_JOINED: 31_514
} as const;

export const MOTION = {
  ANIMATE: { opacity: 1, scale: 1 },
  EXIT: { opacity: 0, scale: 0.9 }
} as const;

export const PLACEHOLDER_EMAIL = "placeholder@email.com";

export const REDUX_PERSIST_KEY = "app-state";

export const SHOW_SNACKBAR_DURATION_MS = 3000;

export type CREATE_COMPANY_STEP =
  (typeof CREATE_COMPANY_STEP)[keyof typeof CREATE_COMPANY_STEP];

export type ERROR = (typeof ERROR)[keyof typeof ERROR];
