import type { CombinedFile, FileWithPreview } from "../../../../../components";
import type {
  CompanyUpdate,
  ExistingCategory,
  ExistingCompany,
  FieldError
} from "../../../../../schema";
import type { FormEventHandler } from "react";

export interface CustomCompanyUpdate
  extends Omit<CompanyUpdate, "images" | "logo"> {
  logo?: CombinedFile | null | undefined;
}

export interface CustomExistingCompany
  extends Omit<ExistingCompany, "images" | "logo"> {
  logo?: CombinedFile | null | undefined;
}

export interface ModuleProps {
  readonly categories: readonly ExistingCategory[];
  readonly company: CustomExistingCompany;
  readonly errorMessages: readonly FieldError[];
  readonly images: readonly CombinedFile[];
  readonly modified: boolean;
  readonly onAddImages: (images: readonly FileWithPreview[]) => void;
  readonly onRemoveImage: (image: CombinedFile) => void;
  readonly onResetErrors: (name?: string | undefined) => void;
  readonly onSave: FormEventHandler<HTMLFormElement>;
  readonly setCompany: (update: CustomCompanyUpdate) => void;
}
