"use client";

import { GRAVATAR_DEFAULT, GRAVATAR_RATING, GRAVATAR_SIZE } from "../consts";
import { DocType } from "../schema";
import type { FC } from "react";
import type { PopulatedDocument } from "../schema";
import React, { useMemo } from "react";
import gravatar from "gravatar";
import { lang } from "../langs";
import tw from "tailwind-styled-components";
import { useCompanyName } from "../hooks";

export const DocumentCard: FC<Props> = ({ document }) => {
  const companyName = useCompanyName(document.company);

  const documentTitle = useMemo(() => {
    // eslint-disable-next-line sonarjs/no-small-switch -- Ok
    switch (document.type) {
      case DocType.FoundingAgreement: {
        return lang.FoundingAgreement;
      }
    }
  }, [document.type]);

  return (
    <Container>
      <GridContainer>
        <DocumentInfo>
          <Title>{documentTitle}</Title>
          <CompanyName>{companyName}</CompanyName>
        </DocumentInfo>
        <SignatorySection>
          <AvatarContainer>
            {document.signatories.map((signatory, index) => (
              <Avatar
                alt={signatory.name ?? `${lang.Signatory} ${index + 1}`}
                key={signatory.email}
                src={gravatar.url(signatory.email, {
                  d: GRAVATAR_DEFAULT,
                  r: GRAVATAR_RATING,
                  s: GRAVATAR_SIZE
                })}
              />
            ))}
          </AvatarContainer>
          <NotSignedStatus>{lang.NotSigned}</NotSignedStatus>
        </SignatorySection>
        <SignatorySection>
          <AvatarContainer>
            {document.signatories.map((signatory, index) => (
              <Avatar
                alt={signatory.name ?? `${lang.Signatory} ${index + 1}`}
                key={signatory.email}
                src={gravatar.url(signatory.email, {
                  d: GRAVATAR_DEFAULT,
                  r: GRAVATAR_RATING,
                  s: GRAVATAR_SIZE
                })}
              />
            ))}
          </AvatarContainer>
          <SignedStatus>{lang.Signed}</SignedStatus>
        </SignatorySection>
      </GridContainer>
      <Buttons>
        <SignButton
          href={document.doc.embedSrc}
          rel="noreferrer"
          target="_blank"
        >
          {lang.Sign}
        </SignButton>
      </Buttons>
    </Container>
  );
};

export interface Props {
  readonly document: PopulatedDocument;
}

const Container = tw.div`p-6 flex items-center gap-6`;

const GridContainer = tw.div`grow grid grid-cols-3 gap-3`;

const DocumentInfo = tw.div`flex flex-col justify-center items-center`;

const Title = tw.h4`uppercase font-semibold`;

const CompanyName = tw.h3``;

const SignatorySection = tw.div`flex flex-col justify-center items-center gap-1`;

const NotSignedStatus = tw.div`text-error font-bold`;

const SignedStatus = tw.div`text-green-secondary font-bold`;

const AvatarContainer = tw.div`h-10 flex -space-x-5`;

const Avatar = tw.img`w-10 h-10 rounded-full border-2 border-white`;

const Buttons = tw.div``;

const SignButton = tw.a`primary-button`;
