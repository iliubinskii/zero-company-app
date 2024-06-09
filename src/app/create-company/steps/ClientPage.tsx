"use client";

import {
  CREATE_COMPANY_STEP,
  CREATE_COMPANY_TOTAL_STEPS
} from "../../../consts";
import type { ExistingCategory, MultipleDocsResponse } from "../../../schema";
import { selectCompanyRegistrationStep, useAppSelector } from "../../../store";
import type { FC } from "react";
import { PageLayout } from "../../../layouts";
import React from "react";
import { Review } from "./Review";
import { SelectCategory } from "./SelectCategory";
import { SelectCountry } from "./SelectCountry";
import { Stepper } from "../../../components/Stepper";

export const ClientPage: FC<Props> = ({ categories }) => {
  const step = useAppSelector(selectCompanyRegistrationStep);

  return (
    <PageLayout>
      <div className="py-8 flex flex-col gap-12">
        <Stepper step={step} totalSteps={CREATE_COMPANY_TOTAL_STEPS} />
        {(() => {
          switch (step) {
            case CREATE_COMPANY_STEP.SELECT_CATEGORY: {
              return <SelectCategory categories={categories} />;
            }

            case CREATE_COMPANY_STEP.SELECT_COUNTRY: {
              return <SelectCountry />;
            }

            case CREATE_COMPANY_STEP.REVIEW: {
              return <Review />;
            }
          }
        })()}
      </div>
    </PageLayout>
  );
};

export interface Props {
  readonly categories: MultipleDocsResponse<ExistingCategory>;
}
