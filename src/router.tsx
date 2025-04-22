import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Home from "./Routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tv",
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
