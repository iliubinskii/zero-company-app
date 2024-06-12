"use client";

import {
  AccordionFlatContainer,
  AuthGuard,
  IconAccordionItem,
  InputElement
} from "../../../components";
import type { FieldError, UserUpdate } from "../../../schema";
import { FaPencilAlt } from "react-icons/fa";
import type { FormEvent } from "react";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React, { useState } from "react";
import { lang } from "../../../langs";

const Page: NextPage = () => {
  const [errorMessages, setErrorMessages] = useState<readonly FieldError[]>([]);

  const [update, setUpdate] = useState<UserUpdate>({});

  const resetErrorHandlers = (path?: string): void => {
    setErrorMessages(prev => prev.filter(error => error.path !== path));
  };

  const saveHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // eslint-disable-next-line no-console -- Postponed
    console.log(update);
  };

  return (
    <AuthGuard>
      <ProfileLayout>
        <AccordionFlatContainer>
          <IconAccordionItem
            Icon={FaPencilAlt}
            alwaysOpen
            description="Edit your profile info"
            title="Settings"
          >
            <form className="flex flex-col gap-11" onSubmit={saveHandler}>
              {/* First name */}
              <InputElement
                autoComplete="given-name"
                errorMessages={errorMessages}
                name="firstName"
                onChange={value => {
                  setUpdate({
                    firstName: value.length > 0 ? value : null
                  });
                }}
                onResetErrors={resetErrorHandlers}
                placeholder={lang.FirstName}
                type="text"
                value={update.firstName ?? ""}
              />
              {/* First name END */}

              {/* Last name */}
              <InputElement
                autoComplete="family-name"
                errorMessages={errorMessages}
                name="lastName"
                onChange={value => {
                  setUpdate({
                    lastName: value.length > 0 ? value : null
                  });
                }}
                onResetErrors={resetErrorHandlers}
                placeholder={lang.LastName}
                type="text"
                value={update.lastName ?? ""}
              />
              {/* Last name END */}
            </form>
          </IconAccordionItem>
        </AccordionFlatContainer>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
