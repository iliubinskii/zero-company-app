import type { AuthUser, PopulatedDocument } from "../schema";
import { GRAVATAR_DEFAULT, GRAVATAR_RATING, GRAVATAR_SIZE } from "../consts";
import { refreshDocument, useAppDispatch } from "../store";
import { DocType } from "../schema";
import type { FC } from "react";
import React, { useMemo } from "react";
import { callAsync } from "../utils";
import gravatar from "gravatar";
import { lang } from "../langs";
import tw from "tailwind-styled-components";
import { useCompanyName } from "../hooks";

export const DocumentCard: FC<Props> = ({ authUser, document }) => {
  const companyName = useCompanyName(document.company);

  const completedEmails = new Set(
    document.doc.signatures
      .filter(signature => signature.status === "completed")
      .map(signature => signature.email)
  );

  const dispatch = useAppDispatch();

  const documentTitle = useMemo(() => {
    // eslint-disable-next-line sonarjs/no-small-switch -- Ok
    switch (document.type) {
      case DocType.FoundingAgreement: {
        return lang.FoundingAgreement;
      }
    }
  }, [document.type]);

  const notSigned = document.signatories.filter(
    signatory => !completedEmails.has(signatory.email)
  );

  const signed = document.signatories.filter(signatory =>
    completedEmails.has(signatory.email)
  );

  return (
    <Container>
      <GridContainer>
        <DocumentSection>
          <Title>{documentTitle}</Title>
          <CompanyName>{companyName}</CompanyName>
        </DocumentSection>
        <SignatorySection>
          {notSigned.length > 0 && (
            <>
              <AvatarContainer>
                {notSigned.map((signatory, index) => (
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
            </>
          )}
        </SignatorySection>
        <SignatorySection>
          {signed.length > 0 && (
            <>
              <AvatarContainer>
                {signed.map((signatory, index) => (
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
            </>
          )}
        </SignatorySection>
      </GridContainer>
      <Buttons>
        {document.doc.signatures
          .filter(signature => signature.email === authUser.email)
          .map(signature => (
            <SignButton
              href={signature.embedSrc}
              key={signature.embedSrc}
              rel="noreferrer"
              target="_blank"
            >
              {lang.Sign}
            </SignButton>
          ))}
        <SignButton
          className="cursor-pointer"
          onClick={() => {
            callAsync(async () => {
              await dispatch(refreshDocument(document._id));
            });
          }}
        >
          {lang.Refresh}
        </SignButton>
      </Buttons>
    </Container>
  );
};

export interface Props {
  readonly authUser: AuthUser;
  readonly document: PopulatedDocument;
}

const Container = tw.div`p-6 flex items-center gap-6`;

const GridContainer = tw.div`grow grid grid-cols-3 gap-3`;

const DocumentSection = tw.div`flex flex-col justify-center items-center`;

const Title = tw.h4`uppercase font-semibold`;

const CompanyName = tw.h3``;

const SignatorySection = tw.div`flex flex-col justify-center items-center gap-1`;

const NotSignedStatus = tw.div`text-error font-bold`;

const SignedStatus = tw.div`text-green-secondary font-bold`;

const AvatarContainer = tw.div`h-10 flex -space-x-5`;

const Avatar = tw.img`w-10 h-10 rounded-full border-2 border-white`;

const Buttons = tw.div``;

const SignButton = tw.a`primary-button`;
