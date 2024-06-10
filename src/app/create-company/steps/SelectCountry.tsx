"use client";

import { BackButton, SelectElement } from "../../../components";
import {
  prevCompanyRegistrationStep,
  setCompanyCountry,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import type { FC } from "react";
import React, { useState } from "react";
import type { SelectOption } from "../../../components";
import { lang } from "../../../langs";

export const SelectCountry: FC = () => {
  const initialCountry = useAppSelector(
    state => state.companyRegistration.country
  );

  const [country, setCountry] = useState(initialCountry);

  const dispatch = useAppDispatch();

  return (
    <form
      className="flex flex-col gap-20"
      onSubmit={e => {
        e.preventDefault();

        if (country) dispatch(setCompanyCountry(country));
      }}
    >
      <SelectElement
        onChange={setCountry}
        options={options}
        placeholder={lang.SelectCountry}
        value={country}
      />
      <div className="flex justify-between">
        <BackButton
          onClick={() => {
            dispatch(prevCompanyRegistrationStep());
          }}
        >
          {lang.Category}
        </BackButton>
        <button className="primary-button" disabled={!country} type="submit">
          {lang.Next}: {lang.CreateDraft}
        </button>
      </div>
    </form>
  );
};

const options: SelectOption[] = [
  {
    label: lang.countries.us,
    value: "us"
  },
  {
    label: lang.countries.il,
    value: "il"
  }
];
