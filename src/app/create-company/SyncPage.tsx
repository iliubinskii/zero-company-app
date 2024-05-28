"use client";

import { COMPANY_SHARE_STEP, COMPANY_TARGET_VALUE_STEP } from "../../consts";
import type {
  ExistingCategory,
  FieldError,
  MultipleDocsResponse
} from "../../schema";
import {
  FileInputElement,
  InputElement,
  SelectElement,
  TextareaElement
} from "../../components";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { assertDefined, assertHTMLFormElement, callAsync } from "../../utils";
import type { FormEventHandler } from "react";
import React from "react";
import { lang } from "../../langs";
import { postCompany } from "../../api";

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

  const [errorMessages, setErrorMessages] = React.useState<FieldError[]>([]);

  const onSubmit: FormEventHandler = e => {
    callAsync(async () => {
      e.preventDefault();

      const target = assertHTMLFormElement(e.target);

      const data = new FormData(target);

      if (data.get("website") === "") data.delete("website");

      const company = await postCompany(data);

      // eslint-disable-next-line no-warning-comments -- Assigned
      // TODO: Show errors to the user
      if ("error" in company) {
        if ("data" in company) setErrorMessages([...company.data]);
      } else {
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
        setErrorMessages([]);
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
      <form className="flex flex-col gap-11" onSubmit={onSubmit}>
        {/* Category */}
        <SelectElement
          errorMessages={errorMessages}
          name="categories[0]"
          onChange={value => {
            setCategories([value]);
          }}
          options={docs.map(category => {
            return {
              label: category.name,
              value: category._id
            };
          })}
          placeholder={lang.SelectCategory}
          value={categories[0]}
        />
        {/* Category END */}

        {/* Name */}
        <InputElement
          errorMessages={errorMessages}
          name="name"
          onChange={setName}
          placeholder={lang.Name}
          type="text"
          value={name}
        />
        {/* Name END */}

        {/* Description */}
        <TextareaElement
          errorMessages={errorMessages}
          name="description"
          onChange={setDescription}
          placeholder={lang.Description}
          value={description}
        />
        {/* Description END */}

        {/* Target value */}
        <InputElement
          errorMessages={errorMessages}
          min={COMPANY_TARGET_VALUE_STEP}
          name="targetValue"
          onChange={setTargetValue}
          placeholder={lang.TargetValue}
          step={COMPANY_TARGET_VALUE_STEP}
          type="number"
          value={targetValue}
        />
        {/* Target value END */}

        {/* Logo */}
        <div className="form-field-container">
          {lang.CompanyLogo}
          <FileInputElement
            accept="image/*"
            errorMessages={errorMessages}
            name="logo"
            type="file"
          />
        </div>
        {/* Logo END */}

        {/* Images */}
        <div className="form-field-container">
          {lang.CompanyImages}
          <FileInputElement
            accept="image/*"
            errorMessages={errorMessages}
            multiple
            name="images"
            type="file"
          />
        </div>
        {/* Images END */}

        {/* Website */}
        <InputElement
          name="website"
          onChange={setWebsite}
          placeholder={lang.Website}
          type="url"
          value={website}
        />
        {/* Website END */}

        {/* Founders */}
        <div className="flex flex-col gap-2">
          <h3>{lang.Founders}</h3>
          {founders.map((founder, index) => (
            <div className="flex gap-4 items-center w-full" key={index}>
              {/* Fields */}
              <div className="grid grid-cols-4 gap-2 w-full">
                {/* E-mail */}
                <InputElement
                  errorMessages={errorMessages}
                  name={`founders[${index}].email`}
                  onChange={value => {
                    editFounder(index, "email", value);
                  }}
                  placeholder={lang.Email}
                  type="email"
                  value={founder.email}
                />
                {/* E-mail END */}

                {/* First name */}
                <InputElement
                  errorMessages={errorMessages}
                  name={`founders[${index}].firstName`}
                  onChange={value => {
                    editFounder(index, "firstName", value);
                  }}
                  placeholder={lang.FirstName}
                  type="text"
                  value={founder.firstName}
                />
                {/* First name END */}

                {/* Last name */}
                <InputElement
                  errorMessages={errorMessages}
                  name={`founders[${index}].lastName`}
                  onChange={value => {
                    editFounder(index, "lastName", value);
                  }}
                  placeholder={lang.LastName}
                  type="text"
                  value={founder.lastName}
                />
                {/* Last name END */}

                {/* Share */}
                <InputElement
                  errorMessages={errorMessages}
                  min={COMPANY_SHARE_STEP}
                  name={`founders[${index}].share`}
                  onChange={value => {
                    editFounder(index, "share", value);
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
