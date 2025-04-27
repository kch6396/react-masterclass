import { useQuery } from "@tanstack/react-query";
import {
  getAiringTodayTv,
  getLatestMovies,
  getLatestTv,
  getMovies,
  getPopularTv,
  getTopRatedMovies,
  getTopRatedTv,
  getUpcomingMovies,
  IGetMoviesResult,
  IGetTvResult,
} from "../api";

export function useQueries() {
  const getMoviesQuery = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "now-playing"],
    queryFn: getMovies,
  });
  const getTopRatedMoviesQuery = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "top-rated"],
    queryFn: getTopRatedMovies,
  });

  const getUpcomingMoviesQuery = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "upcoming"],
    queryFn: getUpcomingMovies,
  });

  const getLatestMoviesQuery = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "latest"],
    queryFn: getLatestMovies,
  });

  const getPopularTvQuery = useQuery<IGetTvResult>({
    queryKey: ["tv", "popular"],
    queryFn: getPopularTv,
  });

  const getTopRatedTvQuery = useQuery<IGetTvResult>({
    queryKey: ["tv", "top-rated"],
    queryFn: getTopRatedTv,
  });

  const getLatestTvQuery = useQuery<IGetTvResult>({
    queryKey: ["tv", "latest"],
    queryFn: getLatestTv,
  });

  const getAiringTodayTvQuery = useQuery<IGetTvResult>({
    queryKey: ["tv", "airing-today"],
    queryFn: getAiringTodayTv,
  });

  return {
    getMoviesQuery,
    getTopRatedMoviesQuery,
    getUpcomingMoviesQuery,
    getLatestMoviesQuery,
    getPopularTvQuery,
    getTopRatedTvQuery,
    getLatestTvQuery,
    getAiringTodayTvQuery,
  };
}
