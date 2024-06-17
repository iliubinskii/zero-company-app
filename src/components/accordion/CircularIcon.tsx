import { CIRCULAR_SIZE, CIRCULAR_STROKE_WIDTH } from "../../consts";
import type { FC } from "react";
import type { IconType } from "react-icons";
import React from "react";
import tw from "tailwind-styled-components";

export const CircularIcon: FC<Props> = ({
  Icon,
  disabled = false,
  size = CIRCULAR_SIZE,
  strokeWidth = CIRCULAR_STROKE_WIDTH
}) => {
  const radius = 0.5 * (size - strokeWidth);

  return (
    <Container style={{ height: size, width: size }}>
      <svg className="absolute" height={size} width={size}>
        <circle
          className={disabled ? "text-gray-500" : "text-blue-500"}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      </svg>
      <IconContainer className={disabled ? "text-gray-500" : "text-blue-500"}>
        <Icon className="text-2xl" />
      </IconContainer>
    </Container>
  );
};

export interface Props {
  readonly Icon: IconType;
  readonly disabled?: boolean | undefined;
  readonly size?: number | undefined;
  readonly strokeWidth?: number | undefined;
}

const Container = tw.div`flex items-center justify-center relative`;

const IconContainer = tw.span`absolute text-sm font-medium`;
