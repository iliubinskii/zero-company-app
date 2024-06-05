import type { FC } from "react";
import React from "react";
import { lang } from "../langs";

export const Stepper: FC<Props> = ({ step, totalSteps }) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div>
      <div className="h-0.5 rounded bg-gray-200">
        <div
          className="h-0.5 rounded bg-blue-500 transition-width duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-gray-700">
        {step} {lang.of} {totalSteps}
      </div>
    </div>
  );
};

export interface Props {
  readonly step: number;
  readonly totalSteps: number;
}
