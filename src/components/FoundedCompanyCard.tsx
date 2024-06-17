import type { ExistingCategory, ExistingCompany } from "../schema";
import { GRAVATAR_DEFAULT, GRAVATAR_RATING, GRAVATAR_SIZE } from "../consts";
import { useCompanyCategory, useCompanyName } from "../hooks";
import { DarkIconButton } from "./buttons";
import type { FC } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import React from "react";
import gravatar from "gravatar";
import { lang } from "../langs";
import tw from "tailwind-styled-components";

export const FoundedCompanyCard: FC<Props> = ({ categories, company }) => {
  const category = useCompanyCategory(company, categories);

  const companyName = useCompanyName(company, categories);

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
        <MilestoneSection>
          <MilestoneHeader>Next Milestone</MilestoneHeader>
          <MilestoneText>MVP release</MilestoneText>
          <MilestoneText> 10 Aug 2024</MilestoneText>
        </MilestoneSection>
      </GridContainer>
      <Buttons>
        <DarkIconButton
          Icon={IoDocumentAttach}
          href={`/profile/documents/${company.foundingAgreement}`}
        />
      </Buttons>
    </Container>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
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

const MilestoneSection = tw.div`flex flex-col items-center`;

const MilestoneHeader = tw.div`text-sm uppercase font-semibold`;

const MilestoneText = tw.div`text-sm`;

const Buttons = tw.div`flex gap-2`;
