"use client";

import { FaBookmark, FaRegBookmark, FaRegClock } from "react-icons/fa6";
import {
  SnackbarVariant,
  logError,
  selectAuthUser,
  selectUser,
  showSnackbar,
  toggleFavorite,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import { callAsync, getCompanyImage, getCompanyLogo } from "../../../utils";
import { ERROR } from "../../../consts";
import type { ExistingCompany } from "../../../schema";
import type { FC } from "react";
import { HeartIcon } from "../../icons";
import React from "react";
import { SafeImage } from "../../SafeImage";
import { format } from "date-fns";
import { lang } from "../../../langs";

export const MainContent: FC<Props> = ({ company }) => {
  const authUser = useAppSelector(selectAuthUser);

  const dispatch = useAppDispatch();

  const image = getCompanyImage(company);

  const logo = getCompanyLogo(company);

  const user = useAppSelector(selectUser);

  const toggleFavoriteClickHandler = (): void => {
    if (user)
      callAsync(async () => {
        await dispatch(toggleFavorite(company, user));
      });
    else if (authUser)
      dispatch(
        logError({
          error: ERROR.REDUX_STORE_DESYNCRONIZATION,
          message: lang.ReduxStoreDesynchronization
        })
      );
    else
      dispatch(
        showSnackbar({
          message: lang.LogInToBookmarkCompany,
          variant: SnackbarVariant.warning
        })
      );
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
        <div className="grow flex flex-col gap-1">
          <div>
            <HeartIcon className="mr-1 float-left" />
            <h2 className="text-xl">{company.name}</h2>
          </div>
          <p className="text-gray-400 text-xs pl-1">
            {company.founders.length} team member(s)
          </p>
          <div className="flex gap-1 items-center">
            <FaRegClock className="text-gray-400 text-xl" />
            <p className="text-gray-500 text-sm">
              Founded on{" "}
              {format(company.foundedAt ?? company.createdAt, "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="cursor-pointer" onClick={toggleFavoriteClickHandler}>
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
