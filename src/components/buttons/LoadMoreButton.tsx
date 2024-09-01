"use client";

import { BeatLoader } from "react-spinners";
import type { FC } from "react";
import React, { useEffect, useRef, useState } from "react";
import { lang } from "../../langs";
import { logger } from "../../services";
import { noop } from "lodash";

export const LoadMoreButton: FC<Props> = ({ fetchMoreData = noop }) => {
  const [loading, setLoading] = useState(false);

  const [autoMode, setAutoMode] = useState(false);

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (): void => {
    setLoading(true);
    setAutoMode(true);

    try {
      fetchMoreData();
    } catch (err) {
      setAutoMode(false);
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const target = loadMoreButtonRef.current;

    if (autoMode && target && !loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) fetchMoreData();
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 1
        }
      );

      observer.observe(target);

      return () => {
        observer.unobserve(target);
      };
    }

    return undefined;
  }, [autoMode, fetchMoreData, loading]);

  return (
    <div className="flex justify-center">
      <button
        className="dark-button relative"
        disabled={loading}
        onClick={handleClick}
        ref={loadMoreButtonRef}
      >
        {loading ? (
          <>
            <div className="opacity-0">{lang.LoadMore}</div>
            <div className="absolute inset-0 flex justify-center items-center">
              <BeatLoader color="#ffffff" />
            </div>
          </>
        ) : (
          <div>{lang.LoadMore}</div>
        )}
      </button>
    </div>
  );
};

interface Props {
  readonly fetchMoreData?: (() => void) | undefined;
}
