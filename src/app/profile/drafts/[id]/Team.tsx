import { COMPANY_SHARE_STEP, ERROR } from "../../../../consts";
import type {
  ExistingCategory,
  ExistingCompany,
  FieldError,
  Founder
} from "../../../../schema";
import type { FC, FormEventHandler } from "react";
import { type FileWithPreview, InputElement } from "../../../../components";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";
import {
  assertDefined,
  assertHTMLFormElement,
  callAsync
} from "../../../../utils";
import { showSnackbar, useAppDispatch } from "../../../../store";
import React, { useCallback, useState } from "react";
import { api } from "../../../../api";
import { lang } from "../../../../langs";

export const Team: FC<Props> = () => {
  const [category, setCategory] = useState("");

  const dispatch = useAppDispatch();

  const [founders, setFounders] = useState<readonly Founder[]>([
    {
      email: "",
      firstName: "",
      lastName: "",
      share: 0
    }
  ]);

  const [images, setImages] = useState<readonly FileWithPreview[]>([]);

  const [logo, setLogo] = useState<readonly FileWithPreview[]>([]);

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
          setFounders([
            {
              email: ""
            }
          ]);
          setImages([]);
          setLogo([]);
          setErrorMessages([]);
        }
      }
    });
  };

  const addFounder = (): void => {
    setFounders([
      ...founders,
      {
        email: ""
      }
    ]);
  };

  const editFounder = (
    index: number,
    field: keyof Founder,
    email: string
  ): void => {
    const founder = assertDefined(
      founders[index],
      ERROR.EXPECTING_VALID_FOUNDERS_ARRAY_INDEX
    );

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
    <form className="flex flex-col gap-11" onSubmit={onSubmit}>
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
                }}
                onResetErrors={resetErrorsHandler}
                placeholder={lang.FirstName}
                type="text"
                value={founder.firstName ?? ""}
              />
              {/* First name END */}

              {/* Last name */}
              <InputElement
                errorMessages={errorMessages}
                name={`founders[${index}].lastName`}
                onChange={value => {
                  editFounder(index, "lastName", value);
                }}
                onResetErrors={resetErrorsHandler}
                placeholder={lang.LastName}
                type="text"
                value={founder.lastName ?? ""}
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
                onResetErrors={resetErrorsHandler}
                placeholder={lang.Share}
                step={COMPANY_SHARE_STEP}
                type="number"
                value={founder.share ?? ""}
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
