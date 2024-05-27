"use client";

import { COMPANY_SHARE_STEP, COMPANY_TARGET_VALUE_STEP } from "../../consts";
import type {
  ExistingCategory,
  FieldError,
  MultipleDocsResponse
} from "../../schema";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { assertDefined, assertHTMLFormElement, callAsync } from "../../utils";
import type { FormEventHandler } from "react";
import { InputElement } from "../../components/form/InputElement";
import React from "react";
import { SelectElement } from "../../components/form/SelectElement";
import { TextAreaElement } from "../../components/form/TextAreaElement";
import { lang } from "../../langs";
import { postCompany } from "../../api";

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

  const [errorArray, setErrorArray] = React.useState<FieldError[]>([]);

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
        console.error(company);
        if ("data" in company) setErrorArray([...company.data]);
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
        setErrorArray([]);
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

        <div className="relative">
          <SelectElement
            errorMessages={errorArray.filter(
              field => field.path === "categories[0]"
            )}
            name="categories[]"
            onChange={value => {
              setCategories([value]);
            }}
            options={docs.map(category => {
              return {
                label: category.name,
                value: category._id
              };
            })}
            otherStyles="form-field w-full"
            placeholder={lang.SelectCategory}
            value={categories[0]}
          />
        </div>

        {/* Category END */}

        {/* Name */}
        <div className="relative">
          <InputElement
            errorMessages={errorArray.filter(field => field.path === "name")}
            name={name}
            onChange={setName}
            otherStyles={"form-field w-full"}
            placeholder={lang.Name}
            type="text"
            value={name}
          />
        </div>
        {/* Name END */}

        {/* Description */}
        <div className="relative">
          <TextAreaElement
            errorMessages={errorArray.filter(
              field => field.path === "description"
            )}
            name="description"
            onChange={setDescription}
            otherStyles="form-field w-full"
            placeholder={lang.Description}
            value={description}
          />
        </div>
        {/* Description END */}

        {/* Target value */}
        <div className="relative">
          <InputElement
            errorMessages={errorArray.filter(
              field => field.path === "targetValue"
            )}
            min={COMPANY_TARGET_VALUE_STEP}
            name="targetValue"
            onChange={setTargetValue}
            otherStyles="form-field w-full"
            placeholder={lang.TargetValue}
            step={COMPANY_TARGET_VALUE_STEP}
            type="number"
            value={targetValue}
          />
        </div>
        {/* Target value END */}

        {/* Logo */}
        <div className="form-field-container">
          {lang.CompanyLogo}
          <div className="relative">
            <InputElement
              accept="image/*"
              errorMessages={errorArray.filter(field => field.path === "logo")}
              name="logo"
              otherStyles="form-field w-full"
              type="file"
            />
          </div>
        </div>
        {/* Logo END */}

        {/* Images */}
        <div className="form-field-container">
          {lang.CompanyImages}
          <div className="relative">
            <InputElement
              accept="image/*"
              errorMessages={errorArray.filter(
                field => field.path === "images"
              )}
              multiple
              name="images"
              otherStyles="form-field w-full"
              type="file"
            />
          </div>
        </div>
        {/* Images END */}

        {/* Website */}
        <InputElement
          name="website"
          onChange={setWebsite}
          otherStyles="form-field w-full"
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
                <div className="relative">
                  <InputElement
                    errorMessages={errorArray.filter(
                      field => field.path === "founders[0].email"
                    )}
                    name={`founders[${index}].email`}
                    onChange={value => {
                      editFounder(index, "email", value);
                    }}
                    otherStyles="form-field w-full"
                    placeholder={lang.Email}
                    type="email"
                    value={founder.email}
                  />
                </div>

                {/* First name */}
                <div className="relative">
                  <InputElement
                    errorMessages={errorArray.filter(
                      field => field.path === "founders[0].firstName"
                    )}
                    name={`founders[${index}].firstName`}
                    onChange={value => {
                      editFounder(index, "firstName", value);
                    }}
                    otherStyles="form-field w-full"
                    placeholder={lang.FirstName}
                    type="text"
                    value={founder.firstName}
                  />
                </div>
                {/* First name END */}

                {/* Last name */}
                <div className="relative">
                  <InputElement
                    errorMessages={errorArray.filter(
                      field => field.path === "founders[0].lastName"
                    )}
                    name={`founders[${index}].lastName`}
                    onChange={value => {
                      editFounder(index, "lastName", value);
                    }}
                    otherStyles="form-field w-full"
                    placeholder={lang.LastName}
                    type="text"
                    value={founder.lastName}
                  />
                </div>
                {/* Last name END */}

                {/* Share */}
                <div className="relative">
                  <InputElement
                    errorMessages={errorArray.filter(
                      field => field.path === "founders[0].share"
                    )}
                    min={COMPANY_SHARE_STEP}
                    name={`founders[${index}].share`}
                    onChange={value => {
                      editFounder(index, "share", value);
                    }}
                    otherStyles="form-field w-full"
                    placeholder={lang.Share}
                    step={COMPANY_SHARE_STEP}
                    type="number"
                    value={founder.share}
                  />
                </div>
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
