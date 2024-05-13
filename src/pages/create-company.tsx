// eslint-disable-next-line no-warning-comments -- Postponed
// TODO:
// - Move API request to api/ folder
// - Select one or two categories
// - Style the form better
// - Validate the form

import { COMPANY_SHARE_STEP, COMPANY_TARGET_VALUE_STEP } from "../consts";
import {
  CheckboxField,
  CheckboxRow,
  FormCaptionGroup,
  Header2,
  InputField,
  PrimaryButton,
  SelectField,
  TextAreaField
} from "../components";
import { ExistingCategory, MultipleDocsResponse } from "../schema";
import { GetServerSideProps, NextPage } from "next";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { assertDefined, assertHTMLFormElement, callAsync } from "../utils";
import { clientAPI, serverAPI } from "../api";
import React, { FormEventHandler } from "react";
import { lang } from "../langs";
import { useRouter } from "next/router";

const Page: NextPage<Props> = ({ categories: { docs } }) => {
  const router = useRouter();

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

  const removeFounder = (index: number): void => {
    setFounders([...founders.slice(0, index), ...founders.slice(index + 1)]);
  };

  const setFounderDetail = (
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

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Style this
  if (router.isFallback) return <div>{lang.Loading}</div>;

  return (
    <form
      className="mx-auto max-w-screen-md flex flex-col gap-6"
      onSubmit={onSubmit}
    >
      <Header2>{lang.CreateCompany}</Header2>

      {/* Category */}
      <SelectField
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
      </SelectField>
      {/* Category END */}

      {/* Name */}
      <InputField
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
      <TextAreaField
        name="description"
        onChange={e => {
          setDescription(e.target.value);
        }}
        placeholder={lang.Description}
        value={description}
      />
      {/* Description END */}

      {/* Target value */}
      <InputField
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
      <FormCaptionGroup>
        {lang.CompanyLogo}
        <InputField name="logo" type="file" />
      </FormCaptionGroup>
      {/* Logo END */}

      {/* Images */}
      <FormCaptionGroup>
        {lang.CompanyImages}
        <InputField multiple name="images" type="file" />
      </FormCaptionGroup>
      {/* Images END */}

      {/* Website */}
      <InputField
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
              <InputField
                name={`founders[${index}].email`}
                onChange={e => {
                  setFounderDetail(index, "email", e.target.value);
                }}
                placeholder={lang.Email}
                type="email"
                value={founder.email}
              />
              {/* E-mail END */}

              {/* First name */}
              <InputField
                name={`founders[${index}].firstName`}
                onChange={e => {
                  setFounderDetail(index, "firstName", e.target.value);
                }}
                placeholder={lang.FirstName}
                type="text"
                value={founder.firstName}
              />
              {/* First name END */}

              {/* Last name */}
              <InputField
                name={`founders[${index}].lastName`}
                onChange={e => {
                  setFounderDetail(index, "lastName", e.target.value);
                }}
                placeholder={lang.LastName}
                type="text"
                value={founder.lastName}
              />
              {/* Last name END */}

              {/* Share */}
              <InputField
                min={COMPANY_SHARE_STEP}
                name={`founders[${index}].share`}
                onChange={e => {
                  setFounderDetail(index, "share", e.target.value);
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

      {/* Row */}
      <div className="flex justify-between">
        {/* Private company */}
        <CheckboxRow>
          <CheckboxField
            checked={privateCompany}
            name="privateCompany"
            onChange={e => {
              setPrivateCompany(e.target.checked);
            }}
          />
          {lang.PrivateCompany}
        </CheckboxRow>
        {/* Private company END */}

        {/* Submit button */}
        <PrimaryButton type="submit">{lang.Submit}</PrimaryButton>
        {/* Submit button END */}
      </div>
      {/* Row END */}
    </form>
  );
};

export default Page;

// eslint-disable-next-line no-warning-comments -- Ok
// TODO: Categories can be taken from layout
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await serverAPI.getCategories();

  return { props: { categories } };
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
