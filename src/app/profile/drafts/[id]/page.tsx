"use client";

import {
  AccordionFlatContainer,
  AccordionJunction,
  AuthGuard,
  ProgressAccordionItem
} from "../../../../components";
import type { CustomCompanyUpdate, CustomExistingCompany } from "./helpers";
import {
  assertDefined,
  buildFormData,
  callAsync,
  removeUndefined
} from "../../../../utils";
import { showSnackbar, useAppDispatch } from "../../../../store";
import { Basics } from "./Basics";
import { ERROR } from "../../../../consts";
import type { FieldError } from "../../../../schema";
import type { FileWithPreview } from "../../../../components/form/FileInputElement";
import type { FormEventHandler } from "react";
import type { NextPage } from "next";
import type { NextPageProps } from "../../../../types";
import { ProfileLayout } from "../../../../layouts";
import { Public } from "./Public";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Signing } from "./Signing";
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

  const [addImages, setAddImages] = useState<readonly FileWithPreview[]>([]);

  const categories = useCategories();

  const category = useMemo(() => {
    if (company) {
      const categoryId = company.categories[0];

      if (typeof categoryId === "string")
        return categories.find(({ _id }) => _id === categoryId);
    }

    return undefined;
  }, [categories, company]);

  const [companyUpdate, setCompanyUpdate] = useState<CustomCompanyUpdate>({});

  const [errorMessages, setErrorMessages] = useState<readonly FieldError[]>([]);

  const dispatch = useAppDispatch();

  const [removeImages, setRemoveImages] = useState<readonly string[]>([]);

  const updatedCompany = useMemo(
    (): CustomExistingCompany | undefined =>
      company
        ? {
            ...company,
            ...removeUndefined(companyUpdate)
          }
        : undefined,
    [company, companyUpdate]
  );

  const modified =
    Object.keys(companyUpdate).length > 0 ||
    addImages.length > 0 ||
    removeImages.length > 0;

  const onSave = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      const data = buildFormData(companyUpdate);

      for (const image of addImages) data.append("addImages", image);

      for (const assetId of removeImages)
        data.append("removeImages[]", assetId);

      callAsync(async () => {
        const response = await api.putCompany(id, data);

        if ("error" in response)
          if ("data" in response && response.data.some(x => x.path.length))
            setErrorMessages([
              ...(function* prepareErrors(): Generator<FieldError> {
                for (const error of response.data)
                  switch (error.path) {
                    case "categories": {
                      yield {
                        message: error.message,
                        path: "categories[0]"
                      };

                      break;
                    }

                    case "founders": {
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

                      break;
                    }

                    default: {
                      yield error;
                    }
                  }
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
          setAddImages([]);
          setRemoveImages([]);
        }
      });
    },
    [addImages, companyUpdate, dispatch, id, removeImages, setResource]
  );

  useEffect(() => {
    setCompanyUpdate({});
  }, [company]);

  return (
    <AuthGuard customLoading={isLoading}>
      <ProfileLayout>
        <h2 className="text-2xl text-gray-700 font-bold">
          {category
            ? `${category.name} ${lang.projectDraft}`
            : lang.EditYourProjectDraft}
        </h2>
        <div>
          <AccordionFlatContainer>
            {modules.map(
              ({ Component, description, progress, title }, index) => (
                <ProgressAccordionItem
                  description={description}
                  key={index}
                  progress={progress}
                  title={title}
                >
                  {company && updatedCompany && (
                    <Component
                      categories={categories}
                      company={updatedCompany}
                      errorMessages={errorMessages}
                      images={[
                        ...company.images.filter(
                          image => !removeImages.includes(image.assetId)
                        ),
                        ...addImages
                      ]}
                      modified={modified}
                      onAddImages={images => {
                        setAddImages(prev => [...prev, ...images]);
                      }}
                      onRemoveImage={image => {
                        if ("preview" in image)
                          setAddImages(prev => prev.filter(x => x !== image));
                        else setRemoveImages(prev => [...prev, image.assetId]);
                      }}
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
                </ProgressAccordionItem>
              )
            )}
          </AccordionFlatContainer>
          <AccordionJunction />
          <AccordionFlatContainer>
            <ProgressAccordionItem
              description={lang.app.profile.drafts.draft.Signing.description}
              progress={0}
              title={lang.app.profile.drafts.draft.Signing.title}
            >
              {company && <Signing company={company} modified={modified} />}
            </ProgressAccordionItem>
          </AccordionFlatContainer>
        </div>
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
  }
];
