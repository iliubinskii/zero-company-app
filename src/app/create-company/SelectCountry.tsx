import {
  selectAuthUser,
  setCompanyCountry,
  useAppDispatch,
  useAppSelector
} from "../../store";
import { BlocksLayout } from "../../components/layouts/BlocksLayout";
import type { FC } from "react";
import React, { useState } from "react";
import { SelectElement } from "../../components";
import type { SelectOption } from "../../components";
import { lang } from "../../langs";
import { useRouter } from "next/navigation";

export const SelectCountry: FC = () => {
  const authUser = useAppSelector(selectAuthUser);

  const initialCountry = useAppSelector(
    state => state.companyRegistration.country
  );

  const [country, setCountry] = useState(initialCountry);

  const dispatch = useAppDispatch();

  const router = useRouter();

  return (
    <BlocksLayout>
      <form
        className="py-32 flex flex-col gap-10"
        onSubmit={e => {
          e.preventDefault();

          if (country)
            dispatch(setCompanyCountry({ authUser, country, router }));
        }}
      >
        <SelectElement
          onChange={setCountry}
          options={options}
          placeholder={lang.SelectCountry}
          value={country}
        />
        <div className="flex justify-end">
          <button className="dark-button" disabled={!country} type="submit">
            {lang.Continue}
          </button>
        </div>
      </form>
    </BlocksLayout>
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
