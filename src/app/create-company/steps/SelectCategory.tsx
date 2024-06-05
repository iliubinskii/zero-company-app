"use client";

import type { ExistingCategory, MultipleDocsResponse } from "../../../schema";
import {
  setCompanyCategory,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import type { FC } from "react";
import React, { useState } from "react";
import { SelectElement } from "../../../components";
import { lang } from "../../../langs";

export const SelectCategory: FC<Props> = ({ categories: { docs } }) => {
  const initialCategory = useAppSelector(
    state => state.companyRegistration.category
  );

  const [category, setCategory] = useState(initialCategory);

  const dispatch = useAppDispatch();

  return (
    <form
      className="flex flex-col gap-20"
      onSubmit={e => {
        e.preventDefault();

        if (category) dispatch(setCompanyCategory(category));
      }}
    >
      <SelectElement
        onChange={value => {
          setCategory(docs.find(doc => doc._id === value));
        }}
        options={docs.map(doc => {
          return {
            label: doc.name,
            value: doc._id
          };
        })}
        placeholder={lang.SelectCategory}
        value={category ? category._id : ""}
      />
      <div className="flex justify-end">
        <button className="primary-button" disabled={!category} type="submit">
          {lang.Next}: {lang.SelectCountry}
        </button>
      </div>
    </form>
  );
};

export interface Props {
  categories: MultipleDocsResponse<ExistingCategory>;
}
