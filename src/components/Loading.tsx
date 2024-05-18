import { BeatLoader } from "react-spinners";
import React from "react";

export const Loading: React.FC = () => (
  <div className="flex-grow flex justify-center items-center">
    <BeatLoader />
  </div>
);
