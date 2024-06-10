// components/CircularProgress.js

import {
  CIRCULAR_PROGRESS_SIZE,
  CIRCULAR_PROGRESS_STROKE_WIDTH
} from "../consts";
import type { FC } from "react";
import React from "react";

export const CircularProgress: FC<Props> = ({
  progress,
  size = CIRCULAR_PROGRESS_SIZE,
  strokeWidth = CIRCULAR_PROGRESS_STROKE_WIDTH
}) => {
  const radius = 0.5 * (size - strokeWidth);

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg className="rotate-[-90deg]" height={size} width={size}>
        <circle
          className="text-gray-300"
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <circle
          className="text-blue-500 transition-all duration-300"
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
        />
      </svg>
      <span className="absolute text-sm text-blue-500 font-medium">
        {progress}%
      </span>
    </div>
  );
};

export interface Props {
  progress: number;
  size?: number;
  strokeWidth?: number;
}
