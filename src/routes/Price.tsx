import { useOutletContext } from "react-router-dom";
import { PriceData } from "../types";
import styled from "styled-components";
import { useState } from "react";

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
`;

const Li = styled.li`
  color: ${(props) => props.theme.overviewTextColor};
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 10px;
  font-weight: bold;
  background-color: transparent;
  color: ${(props) => props.theme.overviewTextColor};
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-weight: bold;
  margin-top: 20px;
`;

interface PriceProps {
  tickersData: PriceData;
}

enum PercentChange {
  Change15m = "percent_change_15m",
  Change30m = "percent_change_30m",
  Change1h = "percent_change_1h",
  Change6h = "percent_change_6h",
  Change12h = "percent_change_12h",
  Change24h = "percent_change_24h",
  Change7d = "percent_change_7d",
  Change30d = "percent_change_30d",
  Change1y = "percent_change_1y",
}

const Price = () => {
  const {
    tickersData: {
      quotes: { USD },
    },
  } = useOutletContext<PriceProps>();

  const [selectedPercentChange, setSelectedPercentChange] =
    useState<PercentChange>(PercentChange.Change15m);

  return (
    <>
      <Ul>
        <Li> market_cap: {USD?.market_cap}</Li>
        <Li> market_cap_change_24h: {USD?.market_cap_change_24h}</Li>

        <Li> percent_from_price_ath: {USD?.percent_from_price_ath} </Li>
        <Li> price: {USD?.price}</Li>
        <Li> volume_24h: {USD?.volume_24h}</Li>
        <Li> volume_24h_change_24h: {USD?.volume_24h_change_24h}</Li>

        <H2>PERCENT_CHANGE</H2>
        <Select
          value={selectedPercentChange}
          onChange={(e) =>
            setSelectedPercentChange(e.target.value as PercentChange)
          }
        >
          {Object.values(PercentChange).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
        <Li>{USD[selectedPercentChange]}%</Li>
      </Ul>
    </>
  );
};
export default Price;
