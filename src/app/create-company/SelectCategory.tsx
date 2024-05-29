import type { ExistingCategory, MultipleDocsResponse } from "../../schema";
import {
  setCompanyCategory,
  useAppDispatch,
  useAppSelector
} from "../../services";
import { BlocksLayout } from "../../components/BlocksLayout";
import React from "react";
import { SelectElement } from "../../components";
import { lang } from "../../langs";

export const SelectCategory: React.FC<Props> = ({ categories: { docs } }) => {
  const initialCategory = useAppSelector(
    state => state.companyRegistration.category
  );

  const [category, setCategory] = React.useState(initialCategory);

  const dispatch = useAppDispatch();

  return (
    <BlocksLayout size="md">
      <form
        className="py-32 flex flex-col gap-10"
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
          value={category?._id}
        />
        <div className="flex justify-end">
          <button className="dark-button" disabled={!category} type="submit">
            {lang.Continue}
          </button>
        </div>
      </form>
    </BlocksLayout>
  );
};

export interface Props {
  categories: MultipleDocsResponse<ExistingCategory>;
}
