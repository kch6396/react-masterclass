import { useLocation } from "react-router-dom";
import { IGetMoviesResult, IGetTvResult, searchMovies, searchTv } from "../api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: #ffffff20;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  z-index: 10;
  aspect-ratio: 1/0.6;
  position: relative;
`;

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: movieSearchData } = useQuery<IGetMoviesResult>({
    queryKey: ["search", "movie", keyword],
    queryFn: () => searchMovies(keyword as string),
    enabled: !!keyword,
  });

  const { data: tvSearchData } = useQuery<IGetTvResult>({
    queryKey: ["search", "tv", keyword],
    queryFn: () => searchTv(keyword as string),
    enabled: !!keyword,
  });

  return (
    <div style={{ padding: "0 4%", marginTop: "100px" }}>
      <div style={{ marginTop: "40px" }}>
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>Movie</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            width: "100%",
            gap: "10px",
          }}
        >
          {movieSearchData?.results.map((movie) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box bgPhoto={makeImagePath(movie.backdrop_path || "")}></Box>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px 2px",
                }}
              >
                {movie.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>Tv</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            width: "100%",
            gap: "10px",
          }}
        >
          {tvSearchData?.results.map((movie) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Box bgPhoto={makeImagePath(movie.backdrop_path || "")}></Box>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px 2px",
                }}
              >
                {movie.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
