"use client";

import {
  AccordionFlatContainer,
  AuthGuard,
  IconAccordionItem,
  InputElement,
  MarketOverview
} from "../../../components";
import type { FieldError, UserUpdate } from "../../../schema";
import {
  logError,
  selectUser,
  setUser,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import type { FormEventHandler } from "react";
import { LuUser2 } from "react-icons/lu";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React, { useState } from "react";
import { api } from "../../../api";
import { callAsync } from "../../../utils";
import { lang } from "../../../langs";

const Page: NextPage = () => {
  const dispatch = useAppDispatch();

  const [errorMessages, setErrorMessages] = useState<readonly FieldError[]>([]);

  const [update, setUpdate] = useState<UserUpdate>({});

  const user = useAppSelector(selectUser);

  const disabled = user === undefined;

  const modified = Object.keys(update).length > 0;

  const updatedUser = user ? { ...user, ...update } : undefined;

  const onResetErrors = (path?: string): void => {
    setErrorMessages(prev => prev.filter(error => error.path !== path));
  };

  const onSave: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    callAsync(async () => {
      const response = await api.putMe(update);

      if ("error" in response)
        if ("data" in response && response.data.some(x => x.path.length))
          setErrorMessages(response.data);
        else
          dispatch(
            logError({
              error: response,
              message: response.errorMessage
            })
          );
      else {
        dispatch(setUser(response));
        setUpdate({});
      }
    });
  };

  return (
    <AuthGuard>
      <ProfileLayout info={<MarketOverview />}>
        <AccordionFlatContainer>
          <IconAccordionItem
            Icon={LuUser2}
            alwaysOpen
            description={lang.app.profile.settings.EditProfile.description}
            title={lang.app.profile.settings.EditProfile.title}
          >
            <form className="flex flex-col gap-11" onSubmit={onSave}>
              {/* First name */}
              <InputElement
                autoComplete="given-name"
                disabled={disabled}
                errorMessages={errorMessages}
                name="firstName"
                onChange={value => {
                  setUpdate(prev => {
                    return {
                      ...prev,
                      firstName: value.length > 0 ? value : null
                    };
                  });
                }}
                onResetErrors={onResetErrors}
                placeholder={lang.FirstName}
                type="text"
                value={
                  updatedUser && typeof updatedUser.firstName === "string"
                    ? updatedUser.firstName
                    : ""
                }
              />
              {/* First name END */}

              {/* Last name */}
              <InputElement
                autoComplete="family-name"
                disabled={disabled}
                errorMessages={errorMessages}
                name="lastName"
                onChange={value => {
                  setUpdate(prev => {
                    return {
                      ...prev,
                      lastName: value.length > 0 ? value : null
                    };
                  });
                }}
                onResetErrors={onResetErrors}
                placeholder={lang.LastName}
                type="text"
                value={
                  updatedUser && typeof updatedUser.lastName === "string"
                    ? updatedUser.lastName
                    : ""
                }
              />
              {/* Last name END */}

              {/* Save button */}
              <div className="flex justify-end">
                <button
                  className="primary-button"
                  disabled={!modified}
                  type="submit"
                >
                  {lang.Save}
                </button>
              </div>
              {/* Save button END */}
            </form>
          </IconAccordionItem>
        </AccordionFlatContainer>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
