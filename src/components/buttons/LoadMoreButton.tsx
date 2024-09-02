"use client";

import { BeatLoader } from "react-spinners";
import type { FC } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { callAsync } from "../../utils";
import { lang } from "../../langs";
import { logger } from "../../services";

export const LoadMoreButton: FC<Props> = ({
  fetchMoreData: rawFetchMoreData = defaultFetchMoreData
}) => {
  const [loading, setLoading] = useState(false);

  const [autoMode, setAutoMode] = useState(false);

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  const fetchMoreData = useCallback(() => {
    callAsync(async () => {
      setLoading(true);
      setAutoMode(true);

      try {
        await rawFetchMoreData();
      } catch (err) {
        logger.error(err);
      } finally {
        setLoading(false);
      }
    });
  }, [rawFetchMoreData]);

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
        onClick={fetchMoreData}
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
  readonly fetchMoreData?: (() => Promise<void>) | undefined;
}

/**
 * Default fetch more data function.
 */
// eslint-disable-next-line no-empty-function -- Ok
async function defaultFetchMoreData(): Promise<void> {}
