"use client";

import { COMPANY_SHARE_STEP, COMPANY_TARGET_VALUE_STEP } from "../../consts";
import type { ExistingCategory, MultipleDocsResponse } from "../../schema";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { assertDefined, assertHTMLFormElement, callAsync } from "../../utils";
import type { FormEventHandler } from "react";
import React from "react";
import { clientAPI } from "../../api";
import { lang } from "../../langs";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO:
// - Move API request to api/ folder
// - Select one or two categories
// - Style the form better
// - Validate the form
export const SyncPage: React.FC<Props> = ({ categories: { docs } }) => {
  const [categories, setCategories] = React.useState<readonly [string]>([""]);

  const [description, setDescription] = React.useState<string>("");

  const [founders, setFounders] = React.useState<readonly Founder[]>([
    {
      email: "",
      firstName: "",
      lastName: "",
      share: ""
    }
  ]);

  const [name, setName] = React.useState<string>("");

  const [privateCompany, setPrivateCompany] = React.useState<boolean>(false);

  const [targetValue, setTargetValue] = React.useState<string>("");

  const [website, setWebsite] = React.useState<string>("");

  const onSubmit: FormEventHandler = e => {
    callAsync(async () => {
      e.preventDefault();

      const target = assertHTMLFormElement(e.target);

      const data = new FormData(target);

      if (data.get("website") === "") data.delete("website");

      const company = await clientAPI.postCompany(data);

      // eslint-disable-next-line no-warning-comments -- Postponed
      // TODO: Show errors to the user
      if ("error" in company) console.error(company);
      else {
        setCategories([""]);
        setDescription("");
        setFounders([
          {
            email: "",
            firstName: "",
            lastName: "",
            share: ""
          }
        ]);
        setName("");
        setPrivateCompany(false);
        setTargetValue("");
        setWebsite("");
      }
    });
  };

  const addFounder = (): void => {
    setFounders([
      ...founders,
      {
        email: "",
        firstName: "",
        lastName: "",
        share: ""
      }
    ]);
  };

  const editFounder = (
    index: number,
    field: keyof Founder,
    email: string
  ): void => {
    const founder = assertDefined(founders[index]);

    setFounders([
      ...founders.slice(0, index),
      { ...founder, [field]: email },
      ...founders.slice(index + 1)
    ]);
  };

  const removeFounder = (index: number): void => {
    setFounders([...founders.slice(0, index), ...founders.slice(index + 1)]);
  };

  return (
    <div className="blocks-layout-md">
      <div className="header2">{lang.CreateCompany}</div>
      <form className="flex flex-col gap-9" onSubmit={onSubmit}>
        {/* Category */}
        <select
          className="form-field"
          name="categories[]"
          onChange={e => {
            setCategories([e.target.value]);
          }}
          value={categories[0]}
        >
          <option value="">{lang.SelectCategory}</option>
          {docs.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* Category END */}

        {/* Name */}
        <input
          className="form-field"
          name="name"
          onChange={e => {
            setName(e.target.value);
          }}
          placeholder={lang.Name}
          type="text"
          value={name}
        />
        {/* Name END */}

        {/* Description */}
        <textarea
          className="form-field"
          name="description"
          onChange={e => {
            setDescription(e.target.value);
          }}
          placeholder={lang.Description}
          value={description}
        />
        {/* Description END */}

        {/* Target value */}
        <input
          className="form-field"
          min={COMPANY_TARGET_VALUE_STEP}
          name="targetValue"
          onChange={e => {
            setTargetValue(e.target.value);
          }}
          placeholder={lang.TargetValue}
          step={COMPANY_TARGET_VALUE_STEP}
          type="number"
          value={targetValue}
        />
        {/* Target value END */}

        {/* Logo */}
        <div className="form-field-container">
          {lang.CompanyLogo}
          <input className="form-field" name="logo" type="file" />
        </div>
        {/* Logo END */}

        {/* Images */}
        <div className="form-field-container">
          {lang.CompanyImages}
          <input className="form-field" multiple name="images" type="file" />
        </div>
        {/* Images END */}

        {/* Website */}
        <input
          className="form-field"
          name="website"
          onChange={e => {
            setWebsite(e.target.value);
          }}
          placeholder={lang.Website}
          type="url"
          value={website}
        />
        {/* Website END */}

        {/* Founders */}
        <div className="flex flex-col gap-2">
          <h3>{lang.Founders}</h3>
          {founders.map((founder, index) => (
            <div className="flex gap-4 items-center" key={index}>
              {/* Fields */}
              <div className="grid grid-cols-4 gap-2">
                {/* E-mail */}
                <input
                  className="form-field"
                  name={`founders[${index}].email`}
                  onChange={e => {
                    editFounder(index, "email", e.target.value);
                  }}
                  placeholder={lang.Email}
                  type="email"
                  value={founder.email}
                />
                {/* E-mail END */}

                {/* First name */}
                <input
                  className="form-field"
                  name={`founders[${index}].firstName`}
                  onChange={e => {
                    editFounder(index, "firstName", e.target.value);
                  }}
                  placeholder={lang.FirstName}
                  type="text"
                  value={founder.firstName}
                />
                {/* First name END */}

                {/* Last name */}
                <input
                  className="form-field"
                  name={`founders[${index}].lastName`}
                  onChange={e => {
                    editFounder(index, "lastName", e.target.value);
                  }}
                  placeholder={lang.LastName}
                  type="text"
                  value={founder.lastName}
                />
                {/* Last name END */}

                {/* Share */}
                <input
                  className="form-field"
                  min={COMPANY_SHARE_STEP}
                  name={`founders[${index}].share`}
                  onChange={e => {
                    editFounder(index, "share", e.target.value);
                  }}
                  placeholder={lang.Share}
                  step={COMPANY_SHARE_STEP}
                  type="number"
                  value={founder.share}
                />
                {/* Share END */}
              </div>
              {/* Fields END */}

              {/* Buttons */}
              {index === founders.length - 1 ? (
                <button onClick={addFounder} type="button">
                  <IoIosAddCircle className="h-6 w-6 text-success" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    removeFounder(index);
                  }}
                  type="button"
                >
                  <IoMdRemoveCircle className="h-6 w-6 text-error" />
                </button>
              )}
              {/* Buttons END */}
            </div>
          ))}
        </div>
        {/* Founders END */}

        {/* Buttons */}
        <div className="flex justify-between">
          {/* Private company */}
          <div className="checkbox-field-container">
            <input
              checked={privateCompany}
              className="checkbox-field"
              name="privateCompany"
              onChange={e => {
                setPrivateCompany(e.target.checked);
              }}
              type="checkbox"
            />
            {lang.PrivateCompany}
          </div>
          {/* Private company END */}

          {/* Submit button */}
          <button className="primary-button" type="submit">
            {lang.Submit}
          </button>
          {/* Submit button END */}
        </div>
        {/* Buttons END */}
      </form>
    </div>
  );
};

export interface Props {
  readonly categories: MultipleDocsResponse<ExistingCategory>;
}

interface Founder {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly share: string;
}
