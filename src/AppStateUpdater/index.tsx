"use client";

import type { FC } from "react";
import React from "react";
import { useAuthUserUpdater } from "./useAuthUserUpdater";

export const AppStateUpdater: FC = () => {
  useAuthUserUpdater();

  return <></>;
};
