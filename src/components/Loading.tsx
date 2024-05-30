import { BeatLoader } from "react-spinners";
import type { FC } from "react";
import React from "react";

export const Loading: FC = () => (
  <div className="flex-grow flex justify-center items-center">
    <BeatLoader />
  </div>
);
