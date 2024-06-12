export const APP_LOADING_CLASS = "app-loading";

export const APP_LOADING_TIMEOUT_MS = 200;

export const CAROUSEL_SCROLL_STEP = 200;

export const CIRCULAR_SIZE = 50;

export const CIRCULAR_STROKE_WIDTH = 4;

export const COMPANY_LIMIT = 9;

export const COMPANY_SHARE_STEP = 100;

export const COMPANY_TARGET_VALUE_STEP = 1000;

export const CREATE_COMPANY_STEP = {
  REVIEW: 3,
  SELECT_CATEGORY: 1,
  SELECT_COUNTRY: 2
} as const;

export const CREATE_COMPANY_TOTAL_STEPS = 3;

export const ERROR = {
  COMPANY_HAS_NO_IMAGE: "Company has no image",
  COMPANY_HAS_NO_LOGO: "Company has no logo",
  EXPECTING_API_URL_ENV: "Expecting API URL environment variable",
  EXPECTING_CATEGORY_ID_PARAM: "Expecting category ID param",
  EXPECTING_DRAFT_ID_PARAM: "Expecting draft ID param",
  EXPECTING_IMAGE: "Expecting at least one image",
  EXPECTING_VALID_FOUNDERS_ARRAY_INDEX: "Expecting valid founders array index",
  EXPECTINT_EVENT_TARGET_AS_HTML_FORM_ELEMENT:
    "Expecting event target as HTMLFormElement"
} as const;

export const GRAVATAR_DEFAULT = "retro";

export const GRAVATAR_MP = "mp";

export const GRAVATAR_RATING = "pg";

export const GRAVATAR_SIZE = "200";

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
