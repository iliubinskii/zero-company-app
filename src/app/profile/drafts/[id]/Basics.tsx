import type {
  CompanyUpdate,
  ExistingCategory,
  ExistingCompany,
  FieldError
} from "../../../../schema";
import type { FC, FormEventHandler } from "react";
import { InputElement, SelectElement } from "../../../../components";
import { COMPANY_TARGET_VALUE_STEP } from "../../../../consts";
import React from "react";
import { lang } from "../../../../langs";

export const Basics: FC<Props> = ({
  categories,
  company,
  errorMessages,
  modified,
  onResetErrors,
  onSave,
  setCompany
}) => (
  <form className="flex flex-col gap-11" onSubmit={onSave}>
    {/* Category */}
    <SelectElement
      errorMessages={errorMessages}
      name="categories[0]"
      onChange={value => {
        const companyCategories = [...company.categories];

        companyCategories[0] = value;

        setCompany({ categories: companyCategories });
      }}
      onResetErrors={onResetErrors}
      options={categories.map(({ _id: value, name: label }) => {
        return { label, value };
      })}
      placeholder={lang.SelectCategory}
      value={company.categories[0]}
    />
    {/* Category END */}

    {/* Name */}
    <InputElement
      errorMessages={errorMessages}
      name="name"
      onChange={value => {
        setCompany({
          name: value.length > 0 ? value : null
        });
      }}
      onResetErrors={onResetErrors}
      placeholder={lang.Name}
      type="text"
      value={company.name ?? ""}
    />
    {/* Name END */}

    {/* Target value */}
    <InputElement
      errorMessages={errorMessages}
      min={COMPANY_TARGET_VALUE_STEP}
      name="targetValue"
      onChange={value => {
        const targetValue = value.length > 0 ? Number(value) : Number.NaN;

        setCompany({
          targetValue: Number.isNaN(targetValue) ? null : targetValue
        });
      }}
      onResetErrors={onResetErrors}
      placeholder={lang.TargetValue}
      step={COMPANY_TARGET_VALUE_STEP}
      type="number"
      value={company.targetValue ?? ""}
    />
    {/* Target value END */}

    {/* Submit button */}
    <div className="flex justify-end">
      <button className="primary-button" disabled={!modified} type="submit">
        {lang.Save}
      </button>
    </div>
    {/* Submit button END */}
  </form>
);

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly company: ExistingCompany;
  readonly errorMessages: readonly FieldError[];
  readonly modified: boolean;
  readonly onResetErrors: (name?: string | undefined) => void;
  readonly onSave: FormEventHandler<HTMLFormElement>;
  readonly setCompany: (update: CompanyUpdate) => void;
}
