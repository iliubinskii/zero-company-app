export const CompanyStatus = {
  draft: "draft",
  founded: "founded",
  signing: "signing"
} as const;

export const DocType = {
  FoundingAgreement: "FoundingAgreement"
} as const;

export const ErrorCode = {
  AlreadyExists: "AlreadyExists",
  AuthenticationFailed: "AuthenticationFailed",
  BadRequest: "BadRequest",
  InternalServerError: "InternalServerError",
  InvalidData: "InvalidData",
  InvalidIdParam: "InvalidIdParam",
  InvalidQuery: "InvalidQuery",
  MethodNotAllowed: "MethodNotAllowed",
  NotFound: "NotFound",
  OK: "OK",
  Unauthorized: "Unauthorized"
} as const;

export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus];

export interface DeleteResponse {
  readonly affectedRows: number;
}

export interface DigitalDocument {
  readonly assetId: string;
  readonly secureUrl: string;
  readonly signatures: readonly string[];
  readonly url: string;
}

export type DocType = (typeof DocType)[keyof typeof DocType];

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export interface ErrorResponse<E extends ErrorCode> {
  readonly error: E;
  readonly errorMessage: string;
}

export interface ErrorResponseWithData<E extends ErrorCode> {
  readonly data: readonly FieldError[];
  readonly error: E;
  readonly errorMessage: string;
}

export interface FieldError {
  readonly message: string;
  readonly path: string;
}

export interface MultipleDocsResponse<T> {
  readonly count: number;
  readonly docs: readonly T[];
  readonly nextCursor?: readonly [string, string] | undefined;
  readonly total: number;
}

export interface Signatory {
  readonly email: string;
  readonly firstName?: string | undefined;
  readonly lastName?: string | undefined;
}

export type Update<T> = {
  [K in keyof T]?: undefined extends T[K]
    ? T[K] | undefined | null
    : T[K] | undefined;
};

export interface WebAccessibleImage {
  readonly assetId: string;
  readonly height: number;
  readonly secureUrl: string;
  readonly url: string;
  readonly width: number;
}
