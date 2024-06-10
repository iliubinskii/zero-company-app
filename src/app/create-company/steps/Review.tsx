"use client";

import { BackButton, Navigate } from "../../../components";
import {
  prevCompanyRegistrationStep,
  selectAuthUser,
  selectCompanyCategory,
  selectCompanyCountry,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import { API_URL } from "../../../config";
import type { FC } from "react";
import React from "react";
import { countryName } from "../../../utils";
import { lang } from "../../../langs";
import { useRouter } from "next/navigation";

export const Review: FC = () => {
  const authUser = useAppSelector(selectAuthUser);

  const category = useAppSelector(selectCompanyCategory);

  const country = useAppSelector(selectCompanyCountry);

  const dispatch = useAppDispatch();

  const router = useRouter();

  return category && typeof country === "string" ? (
    <form
      className="flex flex-col gap-20"
      onSubmit={e => {
        e.preventDefault();
        router.push(
          authUser
            ? "/create-company/create-draft"
            : `${API_URL}auth/login?successReturnUrl=/create-company/create-draft`
        );
      }}
    >
      <div className="flex gap-6 items-center">
        <div className="badge-outlined">{category.name}</div>
        <div className="badge-outlined">{countryName(country)}</div>
      </div>
      <div className="flex justify-between items-center">
        <BackButton
          onClick={() => {
            dispatch(prevCompanyRegistrationStep());
          }}
        >
          {lang.Country}
        </BackButton>
        <button className="primary-button" type="submit">
          {authUser ? lang.CreateDraft : lang.LoginToCreateDraft}
        </button>
      </div>
    </form>
  ) : (
    <Navigate to="/create-company" />
  );
};
