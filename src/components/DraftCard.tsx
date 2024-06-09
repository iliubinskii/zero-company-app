/* eslint-disable i18n-text/no-en -- Temp */

import { FaDraftingCompass, FaPlus } from "react-icons/fa";
import { GRAVATAR_DEFAULT, GRAVATAR_RATING, GRAVATAR_SIZE } from "../consts";
import { deleteDraft, useAppDispatch } from "../store";
import type { ExistingCompany } from "../schema";
import type { FC } from "react";
import React from "react";
import { callAsync } from "../utils";
import gravatar from "gravatar";
import tw from "tailwind-styled-components";

export const DraftCard: FC<Props> = ({ company }) => {
  const dispatch = useAppDispatch();

  const deleteButtonClickHandler = (): void => {
    callAsync(async () => {
      await dispatch(deleteDraft(company._id));
    });
  };

  return (
    <Card>
      <button onClick={deleteButtonClickHandler}>X</button>
      <Title>{company.name ?? "Edit title"}</Title>
      <Header>
        <AvatarContainer>
          {company.founders.map(founder => (
            <Avatar
              alt={`${founder.firstName} ${founder.lastName}`}
              key={founder.email}
              src={gravatar.url(founder.email, {
                d: GRAVATAR_DEFAULT,
                r: GRAVATAR_RATING,
                s: GRAVATAR_SIZE
              })}
            />
          ))}
          <AddCollaboratorButton
            onClick={() => {
              // eslint-disable-next-line no-alert -- Temp
              alert("Add collaborator");
            }}
          >
            <FaPlus />
          </AddCollaboratorButton>
        </AvatarContainer>
        <Status>
          <FaDraftingCompass className="text-gray-500 mr-2" />
          Draft
        </Status>
      </Header>
      <Body>
        <ProgressContainer>
          <Progress>
            <ProgressBar style={{ width: "70%" }} />
          </Progress>
          <ProgressText>70% filled</ProgressText>
        </ProgressContainer>
        <Info>
          <Badge className="bg-blue-100 text-blue-800">{company.country}</Badge>
          {company.categories.map((category, index) => (
            <Badge className="bg-green-100 text-green-800" key={index}>
              {category}
            </Badge>
          ))}
        </Info>
      </Body>
    </Card>
  );
};

const Card = tw.div`w-full max-w-sm rounded-lg p-6 bg-white shadow-lg`;

const Title = tw.h2`text-2xl font-semibold mb-4`;

const Header = tw.div`flex items-center justify-between mb-4`;
const AvatarContainer = tw.div`flex -space-x-2`;
const Avatar = tw.img`w-10 h-10 rounded-full border-2 border-white`;
const AddCollaboratorButton = tw.button`
  w-10 h-10 rounded-full border-2 border-white bg-gray-200 text-gray-600
  flex items-center justify-center
  hover:bg-gray-300 hover:text-gray-700
  transition-colors duration-200
`;
const Status = tw.div`flex items-center text-sm text-gray-500`;
const Body = tw.div``;
const ProgressContainer = tw.div`mb-4 relative`;
const Progress = tw.div`w-full bg-gray-200 rounded-full h-2.5 overflow-hidden relative`;
const ProgressBar = tw.div`h-full bg-blue-600 relative overflow-hidden`;
const ProgressText = tw.span`absolute right-0 top-0 transform translate-x-full -translate-y-1/2 text-sm text-gray-700`;
const Info = tw.div`flex flex-wrap space-x-2 text-sm text-gray-700 mt-4`;
const Badge = tw.div`px-2 py-1 rounded-full text-xs font-semibold`;

export default DraftCard;

export interface Props {
  readonly company: ExistingCompany;
}
