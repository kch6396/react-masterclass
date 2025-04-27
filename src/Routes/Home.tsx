import styled from "styled-components";
import { Banner, Slider } from "../Components";
import { useQueries } from "../hooks";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Home = () => {
  const {
    getMoviesQuery,
    getTopRatedMoviesQuery,
    getUpcomingMoviesQuery,
    getLatestMoviesQuery,
  } = useQueries();

  return (
    <>
      {getMoviesQuery.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={getMoviesQuery.data} />
          {/* <Slider data={getTopRatedMoviesQuery.data} /> */}
          <Slider
            data={getTopRatedMoviesQuery.data}
            offset={5}
            title="최고 평점 TOP 10"
            rank={true}
            category="top_rated"
            type="movie"
          />

          <Slider
            data={getUpcomingMoviesQuery.data}
            offset={6}
            title="개봉 예정작"
            rank={false}
            category="upcoming"
            type="movie"
          />
          <Slider
            // data={getLatestMoviesQuery.data}
            offset={6}
            title="최신 영화(데이터가 배열이 아니여서 오류 발생)"
            rank={false}
            category="latest"
            type="movie"
          />
        </>
      )}
    </>
  );
};

export default Home;
