import type { FC, HTMLAttributes } from "react";
import React from "react";

export const ZeroCoin: FC<Props> = ({ amount, ...props }) => (
  <span {...props}>
    <svg
      className="inline-block transform -translate-y-[0.12em]"
      fill="currentColor"
      height="0.9em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 17.2 20.8"
    >
      <g transform={"translate(-31,-30)"}>
        <path
          d="
            M41.04,31.07c-2.95,0-5.23,2.16-6.01,6.17h-2.98v1.74h2.75c-0.04,0.48-0.06,0.98-0.06,1.51c0.01,0.39,0.02,0.79,0.04,1.15
            h-2.73v1.74h2.93c0.69,4.17,2.83,6.43,5.75,6.43c4.02,0,6.31-3.41,6.31-9.58C47.05,34.47,44.87,31.07,41.04,31.07z M40.88,47.92
            c-1.74,0-3-1.61-3.47-4.53h3.93v-1.74h-4.11c-0.03-0.36-0.04-0.73-0.04-1.13c0-0.55,0.02-1.06,0.06-1.54h4.08v-1.74h-3.86
            c0.55-2.81,1.82-4.28,3.43-4.28c2.54,0,3.68,2.92,3.68,7.4C44.59,45,43.4,47.92,40.88,47.92z
          "
        />
      </g>
    </svg>
    {typeof amount === "number" ? amount.toLocaleString() : amount}
  </span>
);

export interface Props extends HTMLAttributes<HTMLDivElement> {
  readonly amount: number | string;
}
