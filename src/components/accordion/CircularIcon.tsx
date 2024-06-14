import { CIRCULAR_SIZE, CIRCULAR_STROKE_WIDTH } from "../../consts";
import type { FC } from "react";
import type { IconType } from "react-icons";
import React from "react";

export const CircularIcon: FC<Props> = ({
  Icon,
  size = CIRCULAR_SIZE,
  strokeWidth = CIRCULAR_STROKE_WIDTH
}) => {
  const radius = 0.5 * (size - strokeWidth);

  return (
    <div
      className="flex items-center justify-center relative"
      style={{ height: size, width: size }}
    >
      <svg className="absolute" height={size} width={size}>
        <circle
          className="text-blue-500"
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-gray-600">
        <Icon className="text-2xl" />
      </div>
    </div>
  );
};

export interface Props {
  Icon: IconType;
  size?: number;
  strokeWidth?: number;
}
