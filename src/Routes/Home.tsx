import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });

  return (
    <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}>home</div>
  );
};

export default Home;
