import { InputElement, SelectElement } from "../../../../components";
import { COMPANY_TARGET_VALUE_STEP } from "../../../../consts";
import type { FC } from "react";
import type { ModuleProps } from "./helpers";
import React from "react";
import { lang } from "../../../../langs";

export const Basics: FC<ModuleProps> = ({
  categories,
  company,
  errorMessages,
  modified,
  onResetErrors,
  onSave,
  setUpdate
}) => (
  <form className="flex flex-col gap-11" onSubmit={onSave}>
    {/* Category */}
    <SelectElement
      errorMessages={errorMessages}
      name="categories[0]"
      onChange={value => {
        setUpdate({
          categories:
            value.length > 0
              ? [value, ...company.categories.slice(1)]
              : company.categories.slice(1)
        });
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
        setUpdate({
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

        setUpdate({
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

    {/* Save button */}
    <div className="flex justify-end">
      <button className="primary-button" disabled={!modified} type="submit">
        {lang.Save}
      </button>
    </div>
    {/* Save button END */}
  </form>
);
