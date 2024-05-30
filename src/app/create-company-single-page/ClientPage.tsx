"use client";

import { COMPANY_SHARE_STEP, COMPANY_TARGET_VALUE_STEP } from "../../consts";
import type {
  ExistingCategory,
  FieldError,
  MultipleDocsResponse
} from "../../schema";
import type { FC, FormEventHandler } from "react";
import {
  FileInputElement,
  InputElement,
  SelectElement,
  Snackbar,
  TextareaElement
} from "../../components";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { assertDefined, assertHTMLFormElement, callAsync } from "../../utils";
import type { FileWithPreview } from "../../components";
import React, { useCallback, useState } from "react";
import { lang } from "../../langs";
import { postCompany } from "../../api";

export const ClientPage: FC<Props> = ({ categories: { docs } }) => {
  const [categories, setCategories] = useState<readonly [string]>([""]);

  const [description, setDescription] = useState<string>("");

  const [founders, setFounders] = useState<readonly Founder[]>([
    {
      email: "",
      firstName: "",
      lastName: "",
      share: ""
    }
  ]);

  const [images, setImages] = useState<readonly FileWithPreview[]>([]);

  const [logo, setLogo] = useState<readonly FileWithPreview[]>([]);

  const [name, setName] = useState<string>("");

  const [privateCompany, setPrivateCompany] = useState<boolean>(false);

  const [targetValue, setTargetValue] = useState<string>("");

  const [website, setWebsite] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState("");

  const [errorMessages, setErrorMessages] = useState<readonly FieldError[]>([]);

  const [isSnackbarActive, setIsSnackbarActive] = useState(false);

  const onSubmit: FormEventHandler = e => {
    callAsync(async () => {
      e.preventDefault();

      const target = assertHTMLFormElement(e.target);

      const data = new FormData(target);

      for (const file of images) data.append("images", file, file.name);

      for (const file of logo) data.append("logo", file, file.name);

      if (data.get("website") === "") data.delete("website");

      const company = await postCompany(data);

      if ("error" in company)
        if ("data" in company) setErrorMessages(company.data);
        else {
          setErrorMessage(company.errorMessage);
          setIsSnackbarActive(true);
        }
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
        setImages([]);
        setLogo([]);
        setName("");
        setPrivateCompany(false);
        setTargetValue("");
        setWebsite("");
        setErrorMessage("");
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

  const resetErrorsHandler = useCallback((path?: string): void => {
    setErrorMessages(prev => prev.filter(error => error.path !== path));
  }, []);

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
            setErrorMessages(prev =>
              prev.filter(error => error.path !== "categories[0]")
            );
          }}
          onResetErrors={resetErrorsHandler}
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
          onResetErrors={resetErrorsHandler}
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
          onResetErrors={resetErrorsHandler}
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
          onResetErrors={resetErrorsHandler}
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
            files={logo}
            name="logo"
            onResetErrors={resetErrorsHandler}
            setFiles={setLogo}
          />
        </div>
        {/* Logo END */}

        {/* Images */}
        <div className="form-field-container">
          {lang.CompanyImages}
          <FileInputElement
            accept="image/*"
            errorMessages={errorMessages}
            files={images}
            multiple
            name="images"
            onResetErrors={resetErrorsHandler}
            setFiles={setImages}
          />
        </div>
        {/* Images END */}

        {/* Website */}
        <InputElement
          name="website"
          onChange={setWebsite}
          onResetErrors={resetErrorsHandler}
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
                    setErrorMessages(prev =>
                      prev.filter(
                        error => error.path !== `founders[${index}].email`
                      )
                    );
                  }}
                  onResetErrors={resetErrorsHandler}
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
                    setErrorMessages(prev =>
                      prev.filter(
                        error => error.path !== `founders[${index}].firstName`
                      )
                    );
                  }}
                  onResetErrors={resetErrorsHandler}
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
                    setErrorMessages(prev =>
                      prev.filter(
                        error => error.path !== `founders[${index}].lastName`
                      )
                    );
                  }}
                  onResetErrors={resetErrorsHandler}
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
                    setErrorMessages(prev =>
                      prev.filter(
                        error => error.path !== `founders[${index}].share`
                      )
                    );
                  }}
                  onResetErrors={resetErrorsHandler}
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
      <Snackbar
        isOpen={isSnackbarActive}
        message={errorMessage}
        onClose={() => {
          setIsSnackbarActive(false);
        }}
        variant="error"
      />
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