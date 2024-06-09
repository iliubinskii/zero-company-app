import type {
  ExistingCategory,
  ExistingCompany,
  FieldError
} from "../../../../schema";
import type { FC, FormEventHandler } from "react";
import {
  FileInputElement,
  type FileWithPreview,
  InputElement,
  TextareaElement
} from "../../../../components";
import { assertHTMLFormElement, callAsync } from "../../../../utils";
import { showSnackbar, useAppDispatch } from "../../../../store";
import { ERROR } from "../../../../consts";
import React, { useCallback, useState } from "react";

import { api } from "../../../../api";
import { lang } from "../../../../langs";

export const Public: FC<Props> = () => {
  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  const [images, setImages] = useState<readonly FileWithPreview[]>([]);

  const [logo, setLogo] = useState<readonly FileWithPreview[]>([]);

  const [website, setWebsite] = useState("");

  const [errorMessages, setErrorMessages] = useState<readonly FieldError[]>([]);

  const onSubmit: FormEventHandler = e => {
    callAsync(async () => {
      e.preventDefault();

      const target = assertHTMLFormElement(
        e.target,
        ERROR.EXPECTINT_EVENT_TARGET_AS_HTML_FORM_ELEMENT
      );

      const data = new FormData(target);

      for (const file of images) data.append("images", file, file.name);

      for (const file of logo) data.append("logo", file, file.name);

      if (category) {
        const company = await api.postCompany({
          categories: [category],
          country: "us"
        });

        if ("error" in company)
          if ("data" in company)
            setErrorMessages([
              ...(function* prepareErrors(): Generator<FieldError> {
                for (const error of company.data)
                  if (error.path === "founders") {
                    yield {
                      message: error.message,
                      path: "founders[0].email"
                    };
                    yield {
                      message: error.message,
                      path: "founders[0].firstName"
                    };
                    yield {
                      message: error.message,
                      path: "founders[0].lastName"
                    };
                    yield {
                      message: error.message,
                      path: "founders[0].share"
                    };
                  } else yield error;
              })()
            ]);
          else
            dispatch(
              showSnackbar({ message: company.errorMessage, variant: "error" })
            );
        else {
          setCategory("");
          setDescription("");
          setImages([]);
          setLogo([]);
          setWebsite("");
          setErrorMessages([]);
        }
      }
    });
  };

  const resetErrorsHandler = useCallback((path?: string): void => {
    setErrorMessages(prev => prev.filter(error => error.path !== path));
  }, []);

  return (
    <form className="flex flex-col gap-11" onSubmit={onSubmit}>
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

      {/* Submit button */}
      <div className="flex justify-end">
        <button className="primary-button" type="submit">
          {lang.Save}
        </button>
      </div>
      {/* Submit button END */}
    </form>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly company: ExistingCompany;
}
