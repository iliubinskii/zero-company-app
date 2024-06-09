"use client";

import { AccordionFlatContainer, AuthGuard } from "../../../../components";
import { assertDefined, createPage } from "../../../../utils";
import { Basics } from "./Basics";
import { CircularAccordionItem } from "./CircularAccordionItem";
import { ERROR } from "../../../../consts";
import { ProfileLayout } from "../../../../layouts";
import React, { useMemo } from "react";
import { api } from "../../../../api";
import { lang } from "../../../../langs";
import { useAuthGuardedLoader } from "../../../../hooks";
import { useCategories } from "../../../../contexts";

const Page = createPage("/profile/drafts/[id]", ({ params = {} }) => {
  const id = assertDefined(params["id"], ERROR.EXPECTING_DRAFT_ID_PARAM);

  const { isLoading, resource: company } = useAuthGuardedLoader(
    () => api.getCompany(id),
    [],
    { redirectOnNotFound: "/profile/drafts" }
  );

  const categories = useCategories();

  const category = useMemo(() => {
    if (company) {
      const companyCategory = company.categories[0];

      if (typeof companyCategory === "string")
        return categories.find(({ _id }) => _id === companyCategory);
    }

    return undefined;
  }, [categories, company]);

  return (
    <AuthGuard customLoaded={!isLoading}>
      <ProfileLayout>
        <h2 className="text-2xl text-gray-700 font-bold">
          {category
            ? `${category.name} ${lang.projectDraft}`
            : lang.EditYourProjectDraft}
        </h2>
        <AccordionFlatContainer>
          <CircularAccordionItem
            description={lang.app.profile.drafts.draft.Basics.description}
            progress={34}
            title={lang.app.profile.drafts.draft.Basics.title}
          >
            {company && <Basics categories={categories} company={company} />}
          </CircularAccordionItem>
          <CircularAccordionItem
            description={lang.app.profile.drafts.draft.Team.description}
            progress={59}
            title={lang.app.profile.drafts.draft.Team.title}
          >
            {company && <Basics categories={categories} company={company} />}
          </CircularAccordionItem>
          <CircularAccordionItem
            description={lang.app.profile.drafts.draft.Public.description}
            progress={59}
            title={lang.app.profile.drafts.draft.Public.title}
          >
            {company && <Basics categories={categories} company={company} />}
          </CircularAccordionItem>
          <CircularAccordionItem
            description={lang.app.profile.drafts.draft.Management.description}
            progress={59}
            title={lang.app.profile.drafts.draft.Management.title}
          >
            {company && <Basics categories={categories} company={company} />}
          </CircularAccordionItem>
        </AccordionFlatContainer>
      </ProfileLayout>
    </AuthGuard>
  );
});

export default Page;
