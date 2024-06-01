"use client";

import type { FC } from "react";
import React from "react";
import { useAuthUserUpdater } from "./useAuthUserUpdater";

/**
 * App global actions utility component.
 * @returns The app global actions utility component.
 */
export const AppGlobalActions: FC = () => {
  useAuthUserUpdater();

  return <></>;
};
