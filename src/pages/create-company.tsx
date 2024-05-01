import { GetServerSideProps, NextPage } from "next";
import { assertHTMLFormElement, callAsync } from "../utils";
import { CLIENT_API_URL } from "../config";
import { GetCategoriesResponse } from "../schema";
import React, { FormEventHandler } from "react";
import { getCategories } from "../api";
import { lang } from "../langs";
import { useRouter } from "next/router";
import zod from "zod";

const Page: NextPage<Props> = ({ categories }) => {
  const router = useRouter();

  const [category, setCategory] = React.useState<string>("");

  const [description, setDescription] = React.useState<string>("");

  const [name, setName] = React.useState<string>("");

  const [privateCompany, setPrivateCompany] = React.useState<boolean>(false);

  const [targetValue, setTargetValue] = React.useState<string>("");

  const [website, setWebsite] = React.useState<string>("");

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO:
  // - Get founders from the form
  // - Move API request to api/ folder
  // - Style the form better
  // - Validate the form
  const onSubmit: FormEventHandler = event => {
    callAsync(async () => {
      event.preventDefault();

      const formData = new FormData();

      formData.append("categories[]", category);
      formData.append("description", description);
      formData.append("name", name);
      formData.append("privateCompany", privateCompany ? "true" : "false");
      formData.append("targetValue", targetValue);
      formData.append("website", website);
      formData.append("founders[0].email", "sample@mail.com");
      formData.append("founders[0].share", "100");
      formData.append("founders[0].confirmed", "false");

      const target = assertHTMLFormElement(event.target);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
      for (const file of FilesSchema.parse(target["logo"].files))
        formData.append("logo", file);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
      for (const file of FilesSchema.parse(target["images"].files))
        formData.append("images", file);

      try {
        const response = await fetch(`${CLIENT_API_URL}companies`, {
          body: formData,
          credentials: "include",
          method: "POST"
        });

        const data = (await response.json()) as unknown;

        // eslint-disable-next-line no-console -- Postponed
        console.log(data);
      } catch (err) {
        // eslint-disable-next-line no-console -- Postponed
        console.error("Error uploading file:", err);
      }
    });
  };

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Style this
  if (router.isFallback) return <div>{lang.Loading}</div>;

  return (
    <form
      className="mx-auto max-w-screen-md flex flex-col items-stretch gap-3"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl">{lang.CreateCompany}</h2>

      {/* Category */}
      <select
        className="border border-gray-300 rounded-md p-2"
        onChange={e => {
          setCategory(e.target.value);
        }}
        value={category}
      >
        <option value="">{lang.SelectCategory}</option>
        {categories.docs.map(category => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {/* Category END */}

      {/* Name */}
      <input
        className="border border-gray-300 rounded-md p-2"
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
        className="border border-gray-300 rounded-md p-2"
        onChange={e => {
          setDescription(e.target.value);
        }}
        placeholder={lang.Description}
        value={description}
      />
      {/* Description END */}

      {/* Website */}
      <input
        className="border border-gray-300 rounded-md p-2"
        onChange={e => {
          setWebsite(e.target.value);
        }}
        placeholder={lang.Website}
        type="url"
        value={website}
      />
      {/* Website END */}

      {/* Private Company */}
      <input
        checked={privateCompany}
        name="privateCompany"
        onChange={() => {
          setPrivateCompany(!privateCompany);
        }}
        type="checkbox"
      />
      {lang.PrivateCompany}
      {/* Private Company END */}

      {/* Target Value */}
      <input
        className="border border-gray-300 rounded-md p-2"
        onChange={e => {
          setTargetValue(e.target.value);
        }}
        placeholder={lang.TargetValue}
        type="number"
        value={targetValue}
      />
      {/* Target Value END */}

      {/* Logo */}
      {lang.AddCompanyLogo}
      <input
        className="border border-gray-300 rounded-md p-2"
        name="logo"
        type="file"
      />
      {/* Logo END */}

      {/* Images */}
      {lang.AddCompanyImages}
      <input
        className="border border-gray-300 rounded-md p-2"
        multiple
        name="images"
        type="file"
      />
      {/* Images END */}

      {/* Founders */}
      <input
        className="border border-gray-300 rounded-md p-2"
        disabled
        type="email"
      />
      <input className="border border-gray-300 rounded-md p-2" type="text" />
      <input type="hidden" value="true" />
      {/* Founders END */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Page;

// eslint-disable-next-line no-warning-comments -- Ok
// TODO: Retrieve the categories on Client side
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await getCategories();

  return { props: { categories } };
};

export interface Props {
  readonly categories: GetCategoriesResponse;
}

const FilesSchema = zod.array(zod.union([zod.string(), zod.instanceof(Blob)]));
