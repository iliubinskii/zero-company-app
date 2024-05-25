"use client";

import React from "react";
import { useAuthUserUpdater } from "./useAuthUserUpdater";

export const AppStateUpdater: React.FC = () => {
  useAuthUserUpdater();

  return <></>;
};
