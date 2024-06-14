"use client";

import {
  AuthGuard,
  DocumentCard,
  DocumentCards,
  NoContent
} from "../../../components";
import {
  refreshDocuments,
  selectDocuments,
  selectDocumentsLoading,
  useAppSelector
} from "../../../store";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { lang } from "../../../langs";

const Page: NextPage = () => {
  const documents = useAppSelector(selectDocuments);

  const documentsLoading = useAppSelector(selectDocumentsLoading);

  return (
    <AuthGuard
      customLoading={documentsLoading}
      customRefreshThunk={refreshDocuments}
    >
      <ProfileLayout loading={documentsLoading}>
        {documents.length > 0 ? (
          <DocumentCards>
            {documents.map(document => (
              <DocumentCard document={document} key={document._id} />
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
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
