import React from "react";
import type { ReactNode } from "react";
import { lang } from "../langs";

/**
 * A stepper component that shows the current step and the total steps.
 * @param props - The props for the stepper component.
 * @param props.step - The current step.
 * @param props.steps - The total steps.
 * @returns The stepper component.
 */
export function Stepper<T>({ step, steps }: Props<T>): ReactNode {
  const totalSteps = steps.length;

  const stepNumber = Math.max(steps.indexOf(step), 0) + 1;

  const progressPercentage = (stepNumber / totalSteps) * 100;

  return (
    <div>
      <div className="h-0.5 rounded bg-gray-200">
        <div
          className="h-0.5 rounded bg-blue-500 transition-width duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-gray-700">
        {stepNumber} {lang.of} {totalSteps}
      </div>
    </div>
  );
}

export interface Props<T> {
  readonly step: T;
  readonly steps: readonly T[];
}
