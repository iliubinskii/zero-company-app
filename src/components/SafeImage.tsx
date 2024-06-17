"use client";

import type { FC, ImgHTMLAttributes } from "react";
import { logError, useAppDispatch } from "../store";
import React from "react";
import { lang } from "../langs";

export const SafeImage: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  ...props
}) => {
  const dispatch = useAppDispatch();

  const [error, setError] = React.useState(false);

  return (
    <img
      onError={() => {
        setError(true);
        dispatch(
          logError({
            error: `${lang.FailedToLoadImage}: ${src}`,
            message: lang.FailedToLoadImage
          })
        );
      }}
      src={error ? "/no-image.webp" : src}
      {...props}
    />
  );
};
