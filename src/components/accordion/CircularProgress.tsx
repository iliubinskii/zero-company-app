import { CIRCULAR_SIZE, CIRCULAR_STROKE_WIDTH } from "../../consts";
import type { FC } from "react";
import React from "react";
import tw from "tailwind-styled-components";

export const CircularProgress: FC<Props> = ({
  disabled = false,
  progress,
  size = CIRCULAR_SIZE,
  strokeWidth = CIRCULAR_STROKE_WIDTH
}) => {
  const radius = 0.5 * (size - strokeWidth);

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <Container style={{ height: size, width: size }}>
      <svg className="absolute rotate-[-90deg]" height={size} width={size}>
        <circle
          className="text-gray-300"
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          className={disabled ? "text-gray-500" : "text-blue-500"}
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
      <Text className={disabled ? "text-gray-500" : "text-blue-500"}>
        {progress}%
      </Text>
    </Container>
  );
};

export interface Props {
  readonly disabled?: boolean | undefined;
  readonly progress: number;
  readonly size?: number | undefined;
  readonly strokeWidth?: number | undefined;
}

const Container = tw.div`flex items-center justify-center`;

const AnimatedCircle = tw.circle`transition-all duration-300`;

const Text = tw.span`absolute text-sm text-gray-600 font-medium`;
