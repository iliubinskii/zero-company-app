"use client";

import {
  AccordionFlatContainer,
  AccordionJunction,
  AuthGuard,
  IconAccordionItem,
  ProgressAccordionItem
} from "../../../../components";
import type { ExistingCategory, FieldError } from "../../../../schema";
import type { FC, FormEventHandler } from "react";
import { addCompany, logError, useAppDispatch } from "../../../../store";
import {
  buildFormData,
  draftProgress,
  removeUndefined
} from "../../../../utils";
import {
  useAsyncCallback,
  useAuthGuardedLoader,
  useCompanyCategory
} from "../../../../hooks";
import { Basics } from "./Basics";
import { type CustomCompanyUpdate } from "./helpers";
import type { FileWithPreview } from "../../../../components/form/FileInputElement";
import { PiSignatureBold } from "react-icons/pi";
import { ProfileLayout } from "../../../../layouts";
import { Public } from "./Public";
import React, { useCallback, useEffect, useState } from "react";
import { Signing } from "./Signing";
import { Team } from "./Team";
import { api } from "../../../../api";
import { lang } from "../../../../langs";

export const ClientPage: FC<Props> = ({ categories, id }) => {
  const {
    isLoading,
    resource: company,
    setResource: setCompany
  } = useAuthGuardedLoader(async () => api.getCompany(id), [id], {
    redirectOnNotFound: "/profile/drafts"
  });

  const [addImages, setAddImages] = useState<readonly FileWithPreview[]>([]);

  const category = useCompanyCategory(company, categories);

  const [errorMessages, setErrorMessages] = useState<readonly FieldError[]>([]);

  const dispatch = useAppDispatch();

  const [removeImages, setRemoveImages] = useState<readonly string[]>([]);

  const [update, setUpdate] = useState<CustomCompanyUpdate>({});

  const updatedCompany = company
    ? { ...company, ...removeUndefined(update) }
    : undefined;

  const { basicProgress, publicProgress, teamProgress } =
    draftProgress(company);

  const { callback: submit, isLoading: isSubmitting } =
    useAsyncCallback(async () => {
      const data = buildFormData(update);

      for (const image of addImages) data.append("addImages", image);

      for (const assetId of removeImages)
        data.append("removeImages[]", assetId);

      const response = await api.putCompany(id, data);

      if ("error" in response)
        if (
          "data" in response &&
          response.data.some(error => error.path.length)
        )
          setErrorMessages(prepareErrors(response.data));
        else logError({ error: response, message: response.errorMessage });
      else {
        dispatch(addCompany(response));
        setCompany(response);
        setUpdate({});
        setAddImages([]);
        setRemoveImages([]);
      }
    }, [addImages, update, dispatch, id, removeImages, setCompany]);

  const modified =
    Object.keys(update).length > 0 ||
    addImages.length > 0 ||
    removeImages.length > 0;

  const modules = [
    {
      Component: Basics,
      description: lang.app.profile.drafts.draft.Basics.description,
      progress: basicProgress,
      title: lang.app.profile.drafts.draft.Basics.title
    },
    {
      Component: Team,
      description: lang.app.profile.drafts.draft.Team.description,
      progress: teamProgress,
      title: lang.app.profile.drafts.draft.Team.title
    },
    {
      Component: Public,
      description: lang.app.profile.drafts.draft.Public.description,
      progress: publicProgress,
      title: lang.app.profile.drafts.draft.Public.title
    }
  ];

  const onSave = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      submit();
    },
    [submit]
  );

  useEffect(() => {
    setUpdate({});
    setAddImages([]);
    setRemoveImages([]);
  }, [id]);

  return (
    <AuthGuard customLoading={isLoading}>
      <ProfileLayout>
        <h2 className="text-2xl text-gray-700 font-bold">
          {category
            ? `${category.name} ${lang.projectDraft}`
            : lang.EditProjectDraft}
        </h2>
        <div>
          <AccordionFlatContainer>
            {modules.map(
              ({ Component, description, progress, title }, index) => (
                <ProgressAccordionItem
                  description={description}
                  key={index}
                  progress={Math.round(100 * progress)}
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
                      isSubmitting={isSubmitting}
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
                      setCompany={setCompany}
                      setUpdate={nextUpdate => {
                        setUpdate(prev => {
                          return { ...prev, ...nextUpdate };
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
            <IconAccordionItem
              Icon={PiSignatureBold}
              description={lang.app.profile.drafts.draft.Signing.description}
              title={lang.app.profile.drafts.draft.Signing.title}
            >
              {company && (
                <Signing
                  company={company}
                  modified={modified}
                  setCompany={setCompany}
                />
              )}
            </IconAccordionItem>
          </AccordionFlatContainer>
        </div>
      </ProfileLayout>
    </AuthGuard>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly id: string;
}

/**
 * Prepares the errors for display.
 * @param errors - The errors to prepare.
 * @returns The prepared errors.
 */
function prepareErrors(errors: readonly FieldError[]): readonly FieldError[] {
  const result: FieldError[] = [];

  for (const error of errors)
    switch (error.path) {
      case "categories": {
        result.push({
          message: error.message,
          path: "categories[0]"
        });

        break;
      }

      case "founders": {
        result.push(
          {
            message: error.message,
            path: "founders[0].email"
          },
          {
            message: error.message,
            path: "founders[0].firstName"
          },
          {
            message: error.message,
            path: "founders[0].lastName"
          },
          {
            message: error.message,
            path: "founders[0].share"
          }
        );

        break;
      }

      default: {
        result.push(error);
      }
    }

  return result;
}
