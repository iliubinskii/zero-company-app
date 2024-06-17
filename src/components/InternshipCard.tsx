import type { FC } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import React from "react";

export const InternshipCard: FC<Props> = ({
  city,
  companyName,
  country,
  days,
  position,
  src
}) => (
  <div className="w-full flex flex-col p-4 gap-2 border-b hover:bg-light-gray-cold">
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center justify-start">
        <div className="w-6 h-6 overflow-hidden flex justify-center items-center rounded-full bg-white shadow">
          <img
            alt="Company logo"
            className="w-full h-full object-cover"
            src={src}
          />
        </div>
        <p>{companyName}</p>
      </div>
      <FaRegBookmark className="text-xl text-green-secondary" />
    </div>
    <p className="text-l">{position}</p>
    <div className="flex justify-between items-center text-sm text-gray-500">
      <p>{`${city}, ${country}`}</p>
      <p>{days}</p>
    </div>
  </div>
);

export interface Props {
  readonly city: string;
  readonly companyName: string;
  readonly country: string;
  readonly days: string;
  readonly position: string;
  readonly src: string;
}
