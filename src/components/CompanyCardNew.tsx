/* eslint-disable i18n-text/no-en -- Temp */

"use client";

import { CardButton } from "./CardButton";
import type { Company } from "../schema";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi2";
import React from "react";
import { assertDefined } from "../utils";
import { images } from "../images";

// eslint-disable-next-line complexity -- Ok
export const CompanyCardNew: React.FC<Props> = ({ company, isExpandable }) => {
  const [isHovering, setIsHovering] = React.useState(false);

  const tempCompany = assertDefined(company, "Expecting company");
  const image = assertDefined(company.images[0], "Expecting image");
  const logo = assertDefined(company.logo, "Expecting logo");

  return (
    <div
      className={isExpandable && isHovering ? "-m-6 relative z-10" : ""}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <div
        className={`w-full flex flex-col gap-4 ${isExpandable && isHovering ? "p-6 bg-white rounded-t-md shadow-lg" : ""}`}
      >
        <img
          alt={tempCompany.name ?? undefined}
          className="w-full h-full object-cover rounded-t-xl aspect-video"
          src={image.secureUrl}
        />
        <div className="px-3 grid grid-cols-card-description-grid-container gap-4">
          <img
            alt={"company_logo"}
            className="w-10 h-10 object-cover rounded-full"
            src={logo ? logo.secureUrl : images.noImage.src}
          />
          <div className="flex flex-col">
            <div>
              <span className="w-6 h-6 pt-[2px] mr-1 rounded-full flex bg-green-primary/70 justify-center items-center float-left">
                <HiOutlineHeart className="text-xl" />
              </span>
              <h2 className="text-xl">{tempCompany.name}</h2>
            </div>
            <p className="text-gray-400 text-sm pl-1">{tempCompany.name}</p>
            <div className="flex gap-1 items-center">
              <FaRegClock className="text-gray-400 text-xl" />
              <p className="text-gray-500 text-base pt-1">
                10 days before presentation
              </p>
            </div>
          </div>
          <FaRegBookmark className="text-lg" />
        </div>
      </div>
      <div className="relative">
        <div
          className={`pl-[68px] pr-11 ${!isHovering && isExpandable ? "hidden" : ""} ${isHovering && isExpandable ? "pl-[92px] pr-[68px] absolute w-full left-0 right-0 -top-6 rounded-b-md pb-6 bg-white shadow-lg" : ""}`}
        >
          <p className="pt-3 leading-7 tracking-wide">
            {tempCompany.description}
          </p>
          <div className="flex gap-3 justify-start items-center mt-3">
            <CardButton>Web & Mobile</CardButton>
            <CardButton>San-Francisco, USA</CardButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface Props {
  readonly company: Company;
  readonly isExpandable: boolean;
}
