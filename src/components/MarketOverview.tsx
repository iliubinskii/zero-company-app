"use client";

import { FaBuilding, FaChartLine, FaChartPie, FaCoins } from "react-icons/fa";
import type { FC } from "react";
import React from "react";
import { ZeroCoin } from ".";
import tw from "tailwind-styled-components";

export const MarketOverview: FC = () => (
  <Container>
    <Title>Market Overview</Title>

    {/* Zero Coins */}
    <Section>
      <Header>
        <FaCoins className="text-orange-500" />
        Zero Coins
      </Header>
      <Text>
        Transactions: <ZeroCoin amount={1023} />
      </Text>
      <Text>
        Market Cap: <ZeroCoin amount={123_456_789} />
      </Text>
      <Text>
        24h Volume: <ZeroCoin amount={12_345_678} />
      </Text>
    </Section>
    {/* Zero Coins END */}

    {/* Stocks */}
    <Section>
      <Header>
        <FaChartLine className="text-blue-500" />
        Stocks
      </Header>
      <Text>Total Stocks: 50</Text>
      <Text>
        Today&apos;s Change:{" "}
        <ZeroCoin
          amount={
            // eslint-disable-next-line no-magic-numbers -- Ok
            `+${(3.45).toLocaleString()} (${(1.23).toLocaleString()}%)`
          }
        />
      </Text>
      <Text>
        Market Value: <ZeroCoin amount={5_678_910} />
      </Text>
    </Section>
    {/* Stocks END */}

    {/* IPOs */}
    <Section>
      <Header>
        <FaBuilding className="text-green-500" />
        IPOs
      </Header>
      <Text>Upcoming IPOs: 5</Text>
      <Text>Recent IPOs: 3</Text>
      <Text>
        IPO Market Value: <ZeroCoin amount={1_234_567} />
      </Text>
    </Section>
    {/* IPOs END */}

    {/* Indexes */}
    <Section>
      <Header>
        <FaChartPie className="text-purple-500" />
        Indexes
      </Header>
      <Text>Expert: 33,456 (+1.41%)</Text>
      <Text>Community: 12,345 (+0.23%)</Text>
    </Section>
    {/* Indexes END */}
  </Container>
);

const Container = tw.div`w-72 border border-gray-300 rounded-sm py-2 px-6 divide-y divide-gray-300`;

const Title = tw.div`py-4 text-xl font-bold`;

const Section = tw.div`py-4 flex flex-col gap-2`;

const Header = tw.h3`text-lg font-semibold flex items-center gap-2`;

const Text = tw.p`text-sm text-gray-600`;
