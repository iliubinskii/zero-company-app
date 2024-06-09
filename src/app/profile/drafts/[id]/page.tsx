"use client";

import { AccordionFlatContainer, AuthGuard } from "../../../../components";
import type {
  CompanyUpdate,
  ExistingCompany,
  FieldError
} from "../../../../schema";
import { assertDefined, buildFormData, callAsync } from "../../../../utils";
import { isUndefined, omitBy } from "lodash";
import { showSnackbar, useAppDispatch } from "../../../../store";
import { Basics } from "./Basics";
import { CircularAccordionItem } from "./CircularAccordionItem";
import { ERROR } from "../../../../consts";
import type { FormEventHandler } from "react";
import { Management } from "./Management";
import type { NextPage } from "next";
import type { NextPageProps } from "../../../../types";
import { ProfileLayout } from "../../../../layouts";
import { Public } from "./Public";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Team } from "./Team";
import { api } from "../../../../api";
import { lang } from "../../../../langs";
import { useAuthGuardedLoader } from "../../../../hooks";
import { useCategories } from "../../../../contexts";

const Page: NextPage<NextPageProps> = ({ params = {} }) => {
  const id = assertDefined(params["id"], ERROR.EXPECTING_DRAFT_ID_PARAM);

  const {
    isLoading,
    resource: company,
    setResource
  } = useAuthGuardedLoader(() => api.getCompany(id), [], {
    redirectOnNotFound: "/profile/drafts"
  });

  const categories = useCategories();

  const category = useMemo(() => {
    if (company) {
      const categoryId = company.categories[0];

      if (typeof categoryId === "string")
        return categories.find(({ _id }) => _id === categoryId);
    }

    return undefined;
  }, [categories, company]);

  const [companyUpdate, setCompanyUpdate] = useState<CompanyUpdate>({});

  const [errorMessages, setErrorMessages] = useState<readonly FieldError[]>([]);

  const dispatch = useAppDispatch();

  const updatedCompany = useMemo(
    (): ExistingCompany | undefined =>
      company
        ? {
            ...company,
            ...omitBy(companyUpdate, isUndefined)
          }
        : undefined,
    [company, companyUpdate]
  );

  const onSave = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Postponed
      const { founders, images, logo, ...rest } = companyUpdate;
      const data = buildFormData(rest);

      callAsync(async () => {
        const response = await api.putCompany(id, data);

        if ("error" in response)
          if ("data" in response && response.data.some(x => x.path.length))
            setErrorMessages([
              ...(function* prepareErrors(): Generator<FieldError> {
                for (const error of response.data)
                  if (error.path === "founders") {
                    yield {
                      message: error.message,
                      path: "founders[0].email"
                    };
                    yield {
                      message: error.message,
                      path: "founders[0].firstName"
                    };
                    yield {
                      message: error.message,
                      path: "founders[0].lastName"
                    };
                    yield {
                      message: error.message,
                      path: "founders[0].share"
                    };
                  } else yield error;
              })()
            ]);
          else
            dispatch(
              showSnackbar({
                message: response.errorMessage,
                variant: "error"
              })
            );
        else {
          setResource(response);
          setCompanyUpdate({});
        }
      });
    },
    [companyUpdate, dispatch, id, setResource]
  );

  useEffect(() => {
    setCompanyUpdate({});
  }, [company]);

  return (
    <AuthGuard customLoaded={!isLoading}>
      <ProfileLayout>
        <h2 className="text-2xl text-gray-700 font-bold">
          {category
            ? `${category.name} ${lang.projectDraft}`
            : lang.EditYourProjectDraft}
        </h2>
        <AccordionFlatContainer>
          {modules.map(({ Component, description, progress, title }, index) => (
            <CircularAccordionItem
              description={description}
              key={index}
              progress={progress}
              title={title}
            >
              {updatedCompany && (
                <Component
                  categories={categories}
                  company={updatedCompany}
                  errorMessages={errorMessages}
                  modified={Object.keys(companyUpdate).length > 0}
                  onResetErrors={(path): void => {
                    setErrorMessages(prev =>
                      prev.filter(error => error.path !== path)
                    );
                  }}
                  onSave={onSave}
                  setCompany={update => {
                    setCompanyUpdate(prev => {
                      return {
                        ...prev,
                        ...update
                      };
                    });
                  }}
                />
              )}
            </CircularAccordionItem>
          ))}
        </AccordionFlatContainer>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;

const modules = [
  {
    Component: Basics,
    description: lang.app.profile.drafts.draft.Basics.description,
    progress: 34,
    title: lang.app.profile.drafts.draft.Basics.title
  },
  {
    Component: Team,
    description: lang.app.profile.drafts.draft.Team.description,
    progress: 59,
    title: lang.app.profile.drafts.draft.Team.title
  },
  {
    Component: Public,
    description: lang.app.profile.drafts.draft.Public.description,
    progress: 12,
    title: lang.app.profile.drafts.draft.Public.title
  },
  {
    Component: Management,
    description: lang.app.profile.drafts.draft.Management.description,
    progress: 80,
    title: lang.app.profile.drafts.draft.Management.title
  }
];
