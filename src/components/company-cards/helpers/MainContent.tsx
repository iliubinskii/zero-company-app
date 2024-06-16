"use client";

import { FaBookmark, FaRegBookmark, FaRegClock } from "react-icons/fa6";
import { callAsync, getCompanyImage, getCompanyLogo } from "../../../utils";
import {
  selectUser,
  toggleFavorite,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import type { ExistingCompany } from "../../../schema";
import type { FC } from "react";
import { HeartIcon } from "../../icons";
import React from "react";
import { SafeImage } from "../../SafeImage";

export const MainContent: FC<Props> = ({ company }) => {
  const dispatch = useAppDispatch();

  const image = getCompanyImage(company);

  const logo = getCompanyLogo(company);

  const user = useAppSelector(selectUser);

  const toggleFavoriteClickHandler = (): void => {
    if (user)
      callAsync(async () => {
        await dispatch(toggleFavorite(company, user));
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <SafeImage
        alt={company.name ?? undefined}
        className="w-full h-full object-cover rounded-md aspect-video"
        src={image.secureUrl}
      />
      <div className="px-2 flex gap-4">
        <SafeImage
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
        <div
          className={user ? "cursor-pointer" : undefined}
          onClick={toggleFavoriteClickHandler}
        >
          {user && user.favoriteCompanies.includes(company._id) ? (
            <FaBookmark className="text-lg" />
          ) : (
            <FaRegBookmark className="text-lg" />
          )}
        </div>
      </div>
    </div>
  );
};

export interface Props {
  readonly company: ExistingCompany;
}
