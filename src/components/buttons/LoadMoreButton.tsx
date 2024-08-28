import { BeatLoader } from "react-spinners";
import type { FC } from "react";
import React, { useEffect, useRef } from "react";
import { lang } from "../../langs";

export const LoadMoreButton: FC<Props> = ({
  autoMode,
  fetchMoreData,
  loading
}) => {
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

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
  readonly autoMode: boolean;
  readonly fetchMoreData: () => void;
  readonly loading: boolean;
}
