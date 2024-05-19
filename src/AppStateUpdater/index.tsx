"use client";

import React from "react";
import { useJwtUserUpdater } from "./useJwtUserUpdater";

export const AppStateUpdater: React.FC = () => {
  useJwtUserUpdater();

  return <></>;
};
