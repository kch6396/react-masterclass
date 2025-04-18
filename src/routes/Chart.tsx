import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

const Error = styled.span`
  color: ${(props) => props.theme.overviewTextColor};
`;

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    refetchInterval: 10000,
  });
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : data?.length === 0 ? (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => ({
                  x: new Date(Number(price.time_close) * 1000).toISOString(),
                  y: [price.open, price.high, price.low, price.close],
                })) || [],
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(Number(price.time_close) * 1000).toISOString()
              ),
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      ) : (
        <Error>No Data</Error>
      )}
    </div>
  );
};

export default Chart;
