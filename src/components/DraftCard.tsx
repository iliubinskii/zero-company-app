import type { ExistingCategory, ExistingCompany } from "../schema";
import { GRAVATAR_DEFAULT, GRAVATAR_RATING, GRAVATAR_SIZE } from "../consts";
import { useCompanyCategory, useCompanyName } from "../hooks";
import { DarkIconButton } from "./buttons";
import type { FC } from "react";
import { ProgressBar } from "./ProgressBar";
import React from "react";
import { RiDraftFill } from "react-icons/ri";
import gravatar from "gravatar";
import { lang } from "../langs";
import tw from "tailwind-styled-components";

export const DraftCard: FC<Props> = ({ categories, draft }) => {
  const companyName = useCompanyName(draft, categories);

  const category = useCompanyCategory(draft, categories);

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
            {draft.founders.map((founder, index) => (
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
          <ProgressContainer>
            <ProgressBar className="w-1/2" progress={32} />
            <ProgressText>32% done</ProgressText>
          </ProgressContainer>
        </ProgressSection>
      </GridContainer>
      <Buttons>
        <DarkIconButton
          Icon={RiDraftFill}
          href={`/profile/drafts/${draft._id}`}
        />
      </Buttons>
    </Container>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly draft: ExistingCompany;
}

const Container = tw.div`p-6 flex items-center gap-6`;

const GridContainer = tw.div`grow grid grid-cols-3 gap-3`;

const CompanySection = tw.div`flex flex-col justify-center items-center`;

const CompanyName = tw.h4`uppercase font-semibold`;

const CompanyCategory = tw.h3``;

const FoundersSection = tw.div`flex flex-col justify-center items-center gap-1`;

const AvatarContainer = tw.div`h-10 flex -space-x-5`;

const Avatar = tw.img`w-10 h-10 rounded-full border-2 border-white`;

const ProgressSection = tw.div`flex items-center`;

const ProgressContainer = tw.div`relative grow flex justify-center`;

const ProgressText = tw.div`absolute -bottom-1 translate-y-full text-xs`;

const Buttons = tw.div`flex gap-2`;
