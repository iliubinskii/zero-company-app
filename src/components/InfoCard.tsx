import React from "react";
import { lang } from "../langs";

export const InfoCard: React.FC<Props> = ({
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
      <p className="flex-grow text-gray-500">{description}</p>
      <button className="self-start rounded px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
        {lang.LearnMore}
      </button>
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
