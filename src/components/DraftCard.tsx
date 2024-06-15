import { GRAVATAR_DEFAULT, GRAVATAR_RATING, GRAVATAR_SIZE } from "../consts";
import { useCompanyCategory, useCompanyName } from "../hooks";
import type { ExistingCompany } from "../schema";
import type { FC } from "react";
import React from "react";
import gravatar from "gravatar";
import { lang } from "../langs";
import tw from "tailwind-styled-components";

export const DraftCard: FC<Props> = ({ company }) => {
  const companyName = useCompanyName(company);

  const category = useCompanyCategory(company);

  return (
    <Container>
      <GridContainer>
        <CompanySection>
          <CompanyName>{companyName}</CompanyName>
          <CompanyCategory>
            {category ? category.name : lang.NoCategory}
          </CompanyCategory>
        </CompanySection>
        <FoundersSection>
          <AvatarContainer>
            {company.founders.map((founder, index) => (
              <Avatar
                alt={founder.name ?? `${lang.Signatory} ${index + 1}`}
                key={founder.email}
                src={gravatar.url(founder.email, {
                  d: GRAVATAR_DEFAULT,
                  r: GRAVATAR_RATING,
                  s: GRAVATAR_SIZE
                })}
              />
            ))}
          </AvatarContainer>
        </FoundersSection>
        <ProgressSection>
          <ProgressBlock>
            <ProgressTitle>Next milestone:</ProgressTitle>
            <ProgressInfo>First phase MVP</ProgressInfo>
            <ProgressInfo>5 July 2024</ProgressInfo>
          </ProgressBlock>
        </ProgressSection>
      </GridContainer>
      <Buttons>
        <SignButton href={`/profile/drafts/${company._id}`}>
          {lang.Sign}
        </SignButton>
      </Buttons>
    </Container>
  );
};

export interface Props {
  readonly company: ExistingCompany;
}

const Container = tw.div`p-6 flex items-center gap-6`;

const GridContainer = tw.div`grow grid grid-cols-3 gap-3`;

const CompanySection = tw.div`flex flex-col justify-center items-center`;

const CompanyName = tw.h4`uppercase font-semibold`;

const CompanyCategory = tw.h3``;

const FoundersSection = tw.div`flex flex-col justify-center items-center gap-1`;

const AvatarContainer = tw.div`h-10 flex -space-x-5`;

const Avatar = tw.img`w-10 h-10 rounded-full border-2 border-white`;

const ProgressSection = tw.div`flex flex-col justify-center items-center`;

const ProgressBlock = tw.div`flex flex-col items-start`;

const ProgressTitle = tw.div`text-xs uppercase font-semibold`;

const ProgressInfo = tw.div`text-xs`;

const Buttons = tw.div``;

const SignButton = tw.a`primary-button`;
