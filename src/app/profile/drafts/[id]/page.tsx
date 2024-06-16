"use client";

import {
  AccordionFlatContainer,
  AccordionJunction,
  AuthGuard,
  IconAccordionItem,
  ProgressAccordionItem
} from "../../../../components";
import { type CustomCompanyUpdate, draftProgress } from "./helpers";
import { addCompany, logError, useAppDispatch } from "../../../../store";
import {
  assertDefined,
  buildFormData,
  callAsync,
  removeUndefined
} from "../../../../utils";
import { useAuthGuardedLoader, useCompanyCategory } from "../../../../hooks";
import { Basics } from "./Basics";
import { ERROR } from "../../../../consts";
import { type FieldError } from "../../../../schema";
import type { FileWithPreview } from "../../../../components/form/FileInputElement";
import type { FormEventHandler } from "react";
import type { NextPage } from "next";
import type { NextPageProps } from "../../../../types";
import { PiSignatureBold } from "react-icons/pi";
import { ProfileLayout } from "../../../../layouts";
import { Public } from "./Public";
import React, { useCallback, useEffect, useState } from "react";
import { Signing } from "./Signing";
import { Team } from "./Team";
import { api } from "../../../../api";
import { lang } from "../../../../langs";
import { useCategories } from "../../../../contexts";

const Page: NextPage<NextPageProps> = ({ params = {} }) => {
  const id = assertDefined(params["id"], ERROR.EXPECTING_DRAFT_ID_PARAM);

  const {
    isLoading,
    resource: company,
    setResource: setCompany
  } = useAuthGuardedLoader(async () => api.getCompany(id), [id], {
    redirectOnNotFound: "/profile/drafts"
  });

  const [addImages, setAddImages] = useState<readonly FileWithPreview[]>([]);

  const categories = useCategories();

  const category = useCompanyCategory(company);

  const [errorMessages, setErrorMessages] = useState<readonly FieldError[]>([]);

  const dispatch = useAppDispatch();

  const [removeImages, setRemoveImages] = useState<readonly string[]>([]);

  const [update, setUpdate] = useState<CustomCompanyUpdate>({});

  const updatedCompany = company
    ? { ...company, ...removeUndefined(update) }
    : undefined;

  const { basicProgress, publicProgress, teamProgress } =
    draftProgress(company);

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

      const data = buildFormData(update);

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
          else logError({ error: response, message: response.errorMessage });
        else {
          dispatch(addCompany(response));
          setCompany(response);
          setUpdate({});
          setAddImages([]);
          setRemoveImages([]);
        }
      });
    },
    [addImages, update, dispatch, id, removeImages, setCompany]
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

export default Page;
