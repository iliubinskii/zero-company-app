"use client";

import {
  AuthGuard,
  DocumentCard,
  DocumentCards,
  MarketOverview
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

const Page: NextPage = () => {
  const documents = useAppSelector(selectDocuments);

  const documentsLoading = useAppSelector(selectDocumentsLoading);

  return (
    <AuthGuard
      customLoading={documentsLoading}
      customRefreshThunk={refreshDocuments}
    >
      <ProfileLayout info={<MarketOverview />}>
        <DocumentCards>
          {documents.map(document => (
            <DocumentCard document={document} key={document._id} />
          ))}
        </DocumentCards>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
