import type { FC } from "react";
import React from "react";
import { lang } from "../langs";

export const InfoCard: FC<Props> = ({
  description,
  image,
  imageHeight,
  imageWidth,
  title
}) => (
  <div className="rounded-xl overflow-hidden shadow-lg">
    <img alt={title} height={imageHeight} src={image} width={imageWidth} />
    <div className="px-6 py-4 flex flex-col gap-3">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="grow text-gray-500">{description}</p>
      <button className="dark-button self-start">{lang.LearnMore}</button>
    </div>
  </div>
);

export interface Props {
  readonly description: string;
  readonly image: string;
  readonly imageHeight: number;
  readonly imageWidth: number;
  readonly title: string;
}
