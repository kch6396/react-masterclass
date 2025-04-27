import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Home from "./Routes/Home";

const router = createBrowserRouter([
  {
    path: "/react-masterclass/netflix",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movie/:category/:movieId",
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "tv/:category/:tvId",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

export default router;
