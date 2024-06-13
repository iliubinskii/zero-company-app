import type { ExistingDocument } from "../schema";
import type { FC } from "react";
import React from "react";
import tw from "tailwind-styled-components";

export const DocumentCard: FC<Props> = ({ document }) => {
  ("");

  return <Card>{JSON.stringify(document)}</Card>;
};

const Card = tw.div`w-full max-w-sm rounded-lg p-6 bg-white shadow-lg`;

export default DocumentCard;

export interface Props {
  readonly document: ExistingDocument;
}
