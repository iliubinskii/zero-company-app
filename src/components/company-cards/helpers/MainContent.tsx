"use client";

import { getSafeImage, getSafeLogo } from "../../../utils";
import type { ExistingCompany } from "../../../schema";
import type { FC } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { HeartIcon } from "../../icons";
import React from "react";

export const MainContent: FC<Props> = ({ company }) => {
  const image = getSafeImage(company);

  const logo = getSafeLogo(company);

  return (
    <div className="flex flex-col gap-3">
      <img
        alt={company.name ?? undefined}
        className="w-full h-full object-cover rounded-md aspect-video"
        src={image.secureUrl}
      />
      <div className="px-2 flex gap-4">
        <img
          alt={company.name ?? undefined}
          className="w-10 h-10 object-cover rounded-full"
          src={logo.secureUrl}
        />
        <div className="grow flex flex-col">
          <div>
            <HeartIcon className="mr-1 float-left" />
            <h2 className="text-xl">{company.name}</h2>
          </div>
          <p className="text-gray-400 text-xs pl-1">{company.name}</p>
          <div className="flex gap-2 items-center">
            <FaRegClock className="text-gray-400 text-xl" />
            <p className="text-gray-500 text-sm">10 days before presentation</p>
          </div>
        </div>
        <FaRegBookmark className="text-lg" />
      </div>
    </div>
  );
};

export interface Props {
  readonly company: ExistingCompany;
}
