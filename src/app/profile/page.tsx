"use client";

import { AnimatedLink, AuthGuard } from "../../components";
import {
  refreshCompanies,
  selectCompaniesLoading,
  selectDocumentsLoading,
  selectFavoriteCompaniesLoading,
  useAppSelector
} from "../../store";
import {
  useSortedCompanies,
  useSortedDocuments,
  useSortedDrafts,
  useSortedFavoriteCompanies
} from "../../hooks";
import type { NextPage } from "next";
import { ProfileLayout } from "../../layouts";
import React from "react";
import tw from "tailwind-styled-components";

const Page: NextPage = () => {
  const companies = useSortedCompanies();

  const companiesLoading = useAppSelector(selectCompaniesLoading);

  const documents = useSortedDocuments();

  const documentsLoading = useAppSelector(selectDocumentsLoading);

  const drafts = useSortedDrafts();

  const favoriteCompanies = useSortedFavoriteCompanies();

  const favoriteCompaniesLoading = useAppSelector(
    selectFavoriteCompaniesLoading
  );

  return (
    <AuthGuard
      customLoading={
        companiesLoading || documentsLoading || favoriteCompaniesLoading
      }
      customRefreshThunk={refreshCompanies}
    >
      <ProfileLayout>
        <GridContainer>
          <Card>
            <Image src="/profile/company.png" />
            <Info>
              <Title>Companies</Title>
              <Description>
                You have founded {companies.length} companies
              </Description>
              <Link>
                <AnimatedLink href="/profile/companies">View all</AnimatedLink>
              </Link>
            </Info>
          </Card>
          <Card>
            <Image src="/profile/document.png" />
            <Info>
              <Title>Documents</Title>
              <Description>
                You have {documents.length} documents to sign
              </Description>
              <Link>
                <AnimatedLink href="/profile/documents">View all</AnimatedLink>
              </Link>
            </Info>
          </Card>
          <Card>
            <Image src="/profile/draft.png" />
            <Info>
              <Title>Drafts</Title>
              <Description>
                You have {drafts.length} unfinished draft
              </Description>
              <Link>
                <AnimatedLink href="/profile/drafts">View all</AnimatedLink>
              </Link>
            </Info>
          </Card>
          <Card>
            <Image src="/profile/favorite.png" />
            <Info>
              <Title>Bookmarked</Title>
              <Description>
                You have bookmarked {favoriteCompanies.length} companies
              </Description>
              <Link>
                <AnimatedLink href="/profile/bookmarks">View all</AnimatedLink>
              </Link>
            </Info>
          </Card>
        </GridContainer>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;

const GridContainer = tw.div`grid grid-cols-1 lg:grid-cols-2 gap-9`;

const Card = tw.div`border border-gray-300 flex p-3 gap-4`;

const Image = tw.img`w-40 h-40`;

const Info = tw.div`p-2 flex flex-col gap-3`;

const Title = tw.h2`text-xl`;

const Description = tw.div`text-sm`;

const Link = tw.div`grow text-sm text-blue-700 flex flex-col justify-end`;
