"use client";

import {
  AuthGuard,
  DocumentCard,
  DocumentCards,
  NoContent
} from "../../../components";
import {
  refreshDocuments,
  selectAuthUser,
  selectDocumentsLoading,
  useAppSelector
} from "../../../store";
import type { ExistingCategory } from "../../../schema";
import type { FC } from "react";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { lang } from "../../../langs";
import { useSortedDocuments } from "../../../hooks";

export const ClientPage: FC<Props> = ({ categories }) => {
  const authUser = useAppSelector(selectAuthUser);

  const documents = useSortedDocuments();

  const documentsLoading = useAppSelector(selectDocumentsLoading);

  return (
    <AuthGuard
      customLoading={documentsLoading}
      customRefreshThunk={refreshDocuments}
    >
      <ProfileLayout loading={documentsLoading}>
        {authUser && (
          <>
            {documents.length > 0 ? (
              <DocumentCards>
                {documents.map(document => (
                  <DocumentCard
                    authUser={authUser}
                    categories={categories}
                    document={document}
                    key={document._id}
                  />
                ))}
              </DocumentCards>
            ) : (
              <NoContent
                buttonText={lang.app.profile.documents.NoContent.buttonText}
                href="/create-company"
                text={lang.app.profile.documents.NoContent.text}
                title={lang.app.profile.documents.NoContent.title}
              />
            )}
          </>
        )}
      </ProfileLayout>
    </AuthGuard>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
}
