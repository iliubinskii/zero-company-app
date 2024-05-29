"use client";

import { CompanyReg, selectStep, useAppSelector } from "../../services";
import type { ExistingCategory, MultipleDocsResponse } from "../../schema";
import React from "react";
import { SelectCategory } from "./SelectCategory";
import { SelectCountry } from "./SelectCountry";
import { Start } from "./Start";

export const SyncPage: React.FC<Props> = ({ categories }) => {
  const step = useAppSelector(selectStep);

  // For `EditDraft` step continue showing `SelectCountry` component to avoid flickering before redirecting.
  switch (step) {
    case CompanyReg.SelectCategory: {
      return <SelectCategory categories={categories} />;
    }

    case CompanyReg.SelectCountry:
    case CompanyReg.EditDraft: {
      return <SelectCountry />;
    }

    default: {
      return <Start />;
    }
  }
};

export interface Props {
  readonly categories: MultipleDocsResponse<ExistingCategory>;
}
