"use client";

import {
  setCompanyCategory,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import type { FC } from "react";
import React, { useState } from "react";
import { SelectElement } from "../../../components";
import { lang } from "../../../langs";
import { useCategories } from "../../../contexts";

export const SelectCategory: FC = () => {
  const categories = useCategories();

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
          setCategory(categories.find(c => c._id === value));
        }}
        options={categories.map(c => {
          return { label: c.name, value: c._id };
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
