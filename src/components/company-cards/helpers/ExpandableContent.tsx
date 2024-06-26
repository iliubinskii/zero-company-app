import type { ExistingCategory, ExistingCompany } from "../../../schema";
import { BadgeButton } from "../../buttons";
import type { FC } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import React from "react";
import { lang } from "../../../langs";
import { useCompanyCategory } from "../../../hooks";

export const ExpandableContent: FC<Props> = ({ categories, company }) => {
  const category = useCompanyCategory(company, categories);

  const countryName =
    lang.countries[
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
      company.country as keyof typeof lang.countries
    ];

  return (
    <div className="px-2 flex gap-4">
      <div className="w-10 min-w-10" />
      <div className="grow flex flex-col">
        <p className="pt-3 leading-7 tracking-wide">{company.description}</p>
        <div className="flex gap-3 justify-start items-center mt-3">
          <BadgeButton>
            {category ? category.name : lang.NoCategory}
          </BadgeButton>
          <BadgeButton>{countryName}</BadgeButton>
        </div>
      </div>
      <FaRegBookmark className="text-lg opacity-0 pointer-events-none select-none" />
    </div>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly company: ExistingCompany;
}
