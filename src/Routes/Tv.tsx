import styled from "styled-components";
import { Banner, Slider, TvSlider } from "../Components";
import { useQueries } from "../hooks";
import TvBanner from "../Components/TvBanner copy";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Tv = () => {
  const {
    getPopularTvQuery,
    getTopRatedTvQuery,
    getLatestTvQuery,
    getAiringTodayTvQuery,
  } = useQueries();

  return (
    <>
      {getPopularTvQuery.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <TvBanner data={getAiringTodayTvQuery.data} />
          <TvSlider
            data={getTopRatedTvQuery.data}
            offset={5}
            title="최고 평점 TOP 10 프로그램"
            rank={true}
            category="top_rated"
            type="tv"
          />
          <TvSlider
            data={getPopularTvQuery.data}
            offset={6}
            title="인기 프로그램"
            rank={false}
            category="popular"
            type="tv"
          />

          {/* <Slider
            data={getLatestTvQuery.data}
            offset={6}
            title="개봉 예정작"
            rank={false}
            category="upcoming"
          /> */}
          <TvSlider
            data={getAiringTodayTvQuery.data}
            offset={6}
            title="오늘 방영하는 프로그램"
            rank={false}
            category="upcoming"
            type="tv"
          />
        </>
      )}
    </>
  );
};

export default Tv;
