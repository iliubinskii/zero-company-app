// eslint-disable-next-line no-warning-comments -- Assigned
/*
TODO
1. Use src\app\categories\[id] as prototype
2. Use universal scrolling component
3. Use `InternshipCard`
*/

import type { FC } from "react";
import React from "react";
import { ScrollView } from "../../components";

export const ClientPage: FC<Props> = () => {
  ("");

  return (
    <ScrollView
      fetchMoreData={
        // eslint-disable-next-line @typescript-eslint/require-await -- Temp
        async () => {
          ("");

          return true;
        }
      }
    >
      Listings
    </ScrollView>
  );
};

export interface Props {}
