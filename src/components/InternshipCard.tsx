import { BiBell } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import React from "react";

export const InternshipCard: React.FC<Props> = ({
  city,
  companyName,
  days,
  position
}) => (
  <div className="w-full flex flex-col p-6 gap-6 border rounded-l shadow bg-light-gray-cold/50">
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center justify-start">
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white shadow">
          <BiBell className="text-xl text-green-secondary" />
        </div>
        <p>{companyName}</p>
      </div>
      <FaRegBookmark className="text-xl text-green-secondary" />
    </div>
    <p className="text-xl">{position}</p>
    <div className="flex justify-between items-center text-base text-gray-400">
      <p>{city}</p>
      <p>{days}</p>
    </div>
  </div>
);

export interface Props {
  readonly city: string;
  readonly companyName: string;
  readonly days: string;
  readonly position: string;
}
