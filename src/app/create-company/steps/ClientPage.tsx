"use client";

import { CREATE_COMPANY_STEP, CREATE_COMPANY_STEPS } from "../../../consts";
import { selectCompanyRegistrationStep, useAppSelector } from "../../../store";
import type { ExistingCategory } from "../../../schema";
import type { FC } from "react";
import { PageLayout } from "../../../layouts";
import React, { useMemo } from "react";
import { Review } from "./Review";
import { SelectCategory } from "./SelectCategory";
import { SelectCountry } from "./SelectCountry";
import { Stepper } from "../../../components/Stepper";

export const ClientPage: FC<Props> = ({ categories }) => {
  const step = useAppSelector(selectCompanyRegistrationStep);

  const Component = useMemo(() => {
    switch (step) {
      case CREATE_COMPANY_STEP.SELECT_CATEGORY: {
        return SelectCategory;
      }

      case CREATE_COMPANY_STEP.SELECT_COUNTRY: {
        return SelectCountry;
      }

      case CREATE_COMPANY_STEP.CREATE:
      case CREATE_COMPANY_STEP.REVIEW: {
        return Review;
      }
    }
  }, [step]);

  return (
    <PageLayout>
      <div className="py-8 flex flex-col gap-12">
        <Stepper step={step} steps={CREATE_COMPANY_STEPS} />
        <Component categories={categories} />
      </div>
    </PageLayout>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
}
